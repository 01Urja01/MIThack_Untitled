const { ethers } = require('ethers');
const InsuranceClaimsArtifact = require('../artifacts/contracts/InsuranceClaims.sol/InsuranceClaims.json');

class InsuranceService {
    constructor(contractAddress, providerUrl) {
        // Initialize provider and contract
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
        this.contract = new ethers.Contract(
            contractAddress,
            InsuranceClaimsArtifact.abi,
            this.provider
        );
    }

    // Connect with a signer (for write operations)
    connectSigner(privateKey) {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        this.contractWithSigner = this.contract.connect(wallet);
    }

    // Read Operations
    async getPolicy(policyNumber) {
        try {
            const policy = await this.contract.getPolicy(policyNumber);
            return {
                policyholder: policy[0],
                coverageAmount: policy[1].toString(),
                startDate: new Date(policy[2].toNumber() * 1000),
                endDate: new Date(policy[3].toNumber() * 1000),
                policyType: policy[4],
                isActive: policy[5]
            };
        } catch (error) {
            console.error('Error getting policy:', error);
            throw error;
        }
    }

    async getClaim(claimId) {
        try {
            const claim = await this.contract.getClaim(claimId);
            return {
                policyNumber: claim[0].toString(),
                policyholder: claim[1],
                amount: claim[2].toString(),
                treatmentType: claim[3],
                timestamp: new Date(claim[4].toNumber() * 1000),
                isVerified: claim[5],
                isPaid: claim[6],
                paidAmount: claim[7].toString(),
                aabhaId: claim[8],
                patientAdmissionDate: claim[9].toNumber(),
                flightId: claim[10].toString(),
                flightCancellationStatus: claim[11],
                flightDelayMinutes: claim[12].toNumber(),
                flightDurationMinutes: claim[13].toNumber()
            };
        } catch (error) {
            console.error('Error getting claim:', error);
            throw error;
        }
    }

    // Write Operations (requires signer)
    async submitClaim(
        policyNumber,
        amount,
        treatmentType,
        aabhaId = "",
        patientAdmissionDate = 0,
        flightId = 0,
        flightCancellationStatus = false,
        flightDelayMinutes = 0,
        flightDurationMinutes = 0
    ) {
        try {
            console.log('Submitting claim to blockchain with params:', {
                policyNumber: typeof policyNumber === 'object' ? policyNumber.toString() : policyNumber,
                amount: typeof amount === 'object' ? amount.toString() : amount,
                treatmentType,
                aabhaId,
                patientAdmissionDate,
                flightId,
                flightCancellationStatus,
                flightDelayMinutes,
                flightDurationMinutes
            });

            const tx = await this.contractWithSigner.submitClaim(
                policyNumber,
                amount,
                treatmentType,
                aabhaId,
                patientAdmissionDate,
                flightId,
                flightCancellationStatus,
                flightDelayMinutes,
                flightDurationMinutes
            );
            
            console.log('Transaction submitted:', tx.hash);
            const receipt = await tx.wait();
            console.log('Receipt received:', {
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                status: receipt.status,
                eventsLength: receipt.events ? receipt.events.length : 0
            });
            
            // Check if events exists and has valid items
            if (!receipt.events || receipt.events.length === 0) {
                console.warn('No events found in transaction receipt');
                return {
                    claimId: '0', // Default claim ID when no event is found
                    transactionHash: receipt.transactionHash,
                    success: true,
                    status: 'submitted_without_event'
                };
            }
            
            // Get the ClaimSubmitted event
            const event = receipt.events.find(e => e && e.event === 'ClaimSubmitted');
            if (!event) {
                console.warn('ClaimSubmitted event not found in transaction receipt');
                return {
                    claimId: '0',
                    transactionHash: receipt.transactionHash,
                    success: true,
                    status: 'submitted_without_specific_event'
                };
            }

            console.log('ClaimSubmitted event found:', {
                event: event.event,
                args: event.args ? 'Has args' : 'No args'
            });
            
            // Check if event has args
            if (!event.args || !event.args.claimId) {
                console.warn('ClaimSubmitted event has no args or claimId');
                return {
                    claimId: '0',
                    transactionHash: receipt.transactionHash,
                    success: true,
                    status: 'submitted_without_claim_id'
                };
            }

            return {
                claimId: event.args.claimId.toString(),
                transactionHash: receipt.transactionHash,
                success: true,
                status: 'submitted_with_claim_id'
            };
        } catch (error) {
            console.error('Error submitting claim:', error);
            
            // Provide more details on the error
            const errorDetails = {
                message: error.message,
                code: error.code,
                reason: error.reason,
                stack: error.stack
            };
            console.error('Error details:', errorDetails);
            
            throw error;
        }
    }

    async verifyClaim(claimId) {
        try {
            const tx = await this.contractWithSigner.verifyClaim(claimId);
            const receipt = await tx.wait();
            return {
                verified: true,
                transactionHash: receipt.transactionHash
            };
        } catch (error) {
            console.error('Error verifying claim:', error);
            throw error;
        }
    }

    async processClaim(claimId) {
        try {
            const tx = await this.contractWithSigner.processClaim(claimId);
            const receipt = await tx.wait();
            
            // Get the ClaimProcessed event
            const event = receipt.events.find(e => e.event === 'ClaimProcessed');
            return {
                claimId: event.args.claimId.toString(),
                paidAmount: event.args.paidAmount.toString(),
                transactionHash: receipt.transactionHash
            };
        } catch (error) {
            console.error('Error processing claim:', error);
            throw error;
        }
    }
}

module.exports = InsuranceService; 