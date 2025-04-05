const { Pool } = require('pg');
const { ethers } = require('ethers');
const InsuranceService = require('../../services/claims/insuranceService');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const insuranceService = new InsuranceService(
    process.env.CONTRACT_ADDRESS,
    process.env.PROVIDER_URL
);
insuranceService.connectSigner(process.env.PRIVATE_KEY);

const getPendingClaims = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT 
                c.claim_id,
                c.claim_amount,
                c.claim_status,
                c.claim_type,
                c.filing_date,
                u.full_name as policyholder_name,
                sp.policy_number
             FROM claims c
             JOIN users u ON c.user_id = u.user_id
             JOIN subscribed_policies sp ON c.policy_number = sp.policy_number
             WHERE c.claim_status = 'pending'
             ORDER BY c.filing_date DESC`
        );

        res.json({
            success: true,
            count: result.rows.length,
            claims: result.rows
        });
    } catch (error) {
        console.error('Error fetching pending claims:', error);
        res.status(500).json({ error: 'Error fetching pending claims' });
    } finally {
        client.release();
    }
};

const getClaimDetails = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT 
                c.*,
                u.full_name as policyholder_name,
                sp.policy_number,
                ip.type as policy_type
             FROM claims c
             JOIN users u ON c.user_id = u.user_id
             JOIN subscribed_policies sp ON c.policy_number = sp.policy_number
             JOIN insurance_policies ip ON sp.policy_id = ip.policy_id
             WHERE c.claim_id = $1`,
            [req.params.claimId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Claim not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching claim details:', error);
        res.status(500).json({ error: 'Error fetching claim details' });
    } finally {
        client.release();
    }
};

const createClaim = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const {
            policyNumber,
            claimAmount,
            incidentDescription,
            billStartDate,
            billEndDate,
            // Health claim specific fields
            aabhaId,
            // Travel claim specific fields
            flightId
        } = req.body;

        // Validate policy exists and belongs to user
        const policyResult = await client.query(
            `SELECT sp.*, ip.type as policy_type, ip.coverage 
             FROM subscribed_policies sp
             JOIN insurance_policies ip ON sp.policy_id = ip.policy_id
             WHERE sp.policy_number = $1 AND sp.user_id = $2 AND sp.status = 'active'`,
            [policyNumber, req.user.userId]
        );

        if (policyResult.rows.length === 0) {
            return res.status(404).json({ error: 'Active policy not found' });
        }

        const policy = policyResult.rows[0];

        // Validate claim amount doesn't exceed policy coverage
        if (claimAmount > policy.coverage) {
            return res.status(400).json({ 
                error: 'Claim amount exceeds policy coverage',
                coverage: policy.coverage
            });
        }

        // Additional validations based on claim type
        if (policy.policy_type === 'health' && !aabhaId) {
            return res.status(400).json({ error: 'AABHA ID is required for health claims' });
        }

        if (policy.policy_type === 'travel' && !flightId) {
            return res.status(400).json({ error: 'Flight ID is required for travel claims' });
        }

        // Validate AABHA record if health claim
        if (policy.policy_type === 'health') {
            const aabhaResult = await client.query(
                'SELECT * FROM aabha_records WHERE aabha_id = $1',
                [aabhaId]
            );
            if (aabhaResult.rows.length === 0) {
                return res.status(404).json({ error: 'AABHA record not found' });
            }
        }

        // Validate flight data if travel claim
        if (policy.policy_type === 'travel') {
            const flightResult = await client.query(
                'SELECT * FROM flight_data WHERE flight_id = $1',
                [flightId]
            );
            if (flightResult.rows.length === 0) {
                return res.status(404).json({ error: 'Flight record not found' });
            }
        }

        // Create claim in database
        const claimResult = await client.query(
            `INSERT INTO claims (
                user_id, policy_number, policy_id, claim_amount,
                incident_description, bill_start_date, bill_end_date,
                claim_type, aabha_id, flight_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING claim_id`,
            [
                req.user.userId,
                policyNumber,
                policy.policy_id,
                claimAmount,
                incidentDescription,
                billStartDate,
                billEndDate,
                policy.policy_type,
                policy.policy_type === 'health' ? aabhaId : null,
                policy.policy_type === 'travel' ? flightId : null
            ]
        );

        // Submit claim to blockchain
        const blockchainResult = await insuranceService.submitClaim(
            ethers.BigNumber.from(policyNumber),
            ethers.utils.parseEther(claimAmount.toString()),
            incidentDescription,
            aabhaId || "",
            billStartDate ? new Date(billStartDate).getTime() / 1000 : 0,
            flightId || 0,
            false, // flightCancellationStatus - will be fetched from flight_data if needed
            0,    // flightDelayMinutes - will be fetched from flight_data if needed
            0     // flightDurationMinutes - will be fetched from flight_data if needed
        );

        // Add audit log
        await client.query(
            `INSERT INTO audit_log (entity_type, entity_id, action, user_id, details)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                'claims',
                claimResult.rows[0].claim_id,
                'CREATE',
                req.user.userId,
                `Created ${policy.policy_type} claim with amount ${claimAmount}`
            ]
        );

        await client.query('COMMIT');

        res.status(201).json({
            success: true,
            claimId: claimResult.rows[0].claim_id,
            transactionHash: blockchainResult.transactionHash
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating claim:', error);
        res.status(500).json({ error: 'Error creating claim' });
    } finally {
        client.release();
    }
};

const verifyClaim = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if claim exists and is in pending status
        const claimResult = await client.query(
            `SELECT c.*, sp.policy_number, ip.type as policy_type
             FROM claims c 
             JOIN subscribed_policies sp ON c.policy_number = sp.policy_number
             JOIN insurance_policies ip ON sp.policy_id = ip.policy_id
             WHERE c.claim_id = $1 AND c.claim_status = 'pending'`,
            [req.params.claimId]
        );

        if (claimResult.rows.length === 0) {
            return res.status(404).json({ error: 'Claim not found or not in pending status' });
        }

        const claim = claimResult.rows[0];

        // For health claims, verify against AABHA records
        if (claim.policy_type === 'health') {
            const aabhaResult = await client.query(
                'SELECT * FROM aabha_records WHERE aabha_id = $1',
                [claim.aabha_id]
            );
            
            if (aabhaResult.rows.length === 0) {
                throw new Error('AABHA record not found');
            }

            const aabhaRecord = aabhaResult.rows[0];
            if (claim.claim_amount > aabhaRecord.bill_amount) {
                throw new Error('Claim amount exceeds hospital bill amount');
            }
        }

        // For travel claims, verify against flight data
        if (claim.policy_type === 'travel') {
            const flightResult = await client.query(
                'SELECT * FROM flight_data WHERE flight_id = $1',
                [claim.flight_id]
            );
            
            if (flightResult.rows.length === 0) {
                throw new Error('Flight record not found');
            }
        }

        // Verify claim on blockchain
        const verificationResult = await insuranceService.verifyClaim(req.params.claimId);

        // Update claim status in database
        await client.query(
            `UPDATE claims 
             SET claim_status = 'processing', 
                 processing_notes = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE claim_id = $2`,
            [`Claim verified on blockchain. Transaction hash: ${verificationResult.transactionHash}`, req.params.claimId]
        );

        // Add audit log
        await client.query(
            `INSERT INTO audit_log (entity_type, entity_id, action, user_id, details)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                'claims',
                req.params.claimId,
                'VERIFY',
                req.user.userId,
                `Verified claim on blockchain. TX: ${verificationResult.transactionHash}`
            ]
        );

        await client.query('COMMIT');

        res.json({
            success: true,
            message: 'Claim verified successfully',
            claimId: req.params.claimId,
            transactionHash: verificationResult.transactionHash
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error verifying claim:', error);
        res.status(500).json({ 
            error: 'Error verifying claim',
            details: error.message
        });
    } finally {
        client.release();
    }
};

const processClaim = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Process claim on blockchain
        const processResult = await insuranceService.processClaim(req.params.claimId);

        // Update claim status in database
        await client.query(
            `UPDATE claims 
             SET claim_status = 'paid',
                 approved_amount = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE claim_id = $2`,
            [processResult.paidAmount, req.params.claimId]
        );

        // Record transaction
        await client.query(
            `INSERT INTO claimed_transactions (
                claim_id, amount, transaction_hash, status, transaction_type
            ) VALUES ($1, $2, $3, $4, $5)`,
            [
                req.params.claimId,
                processResult.paidAmount,
                processResult.transactionHash,
                'completed',
                'claim_payout'
            ]
        );

        await client.query('COMMIT');

        res.json({
            claimId: req.params.claimId,
            paidAmount: processResult.paidAmount,
            transactionHash: processResult.transactionHash
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing claim:', error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
};

module.exports = {
    getPendingClaims,
    getClaimDetails,
    createClaim,
    verifyClaim,
    processClaim
}; 