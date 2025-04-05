const { ethers } = require('ethers');
const InsuranceClaimsArtifact = require('../../artifacts/contracts/InsuranceClaims.sol/InsuranceClaims.json');

class InsuranceService {
    constructor(contractAddress, providerUrl) {
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
        this.contract = new ethers.Contract(
            contractAddress,
            InsuranceClaimsArtifact.abi,
            this.provider
        );
    }

    connectSigner(privateKey) {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        this.contractWithSigner = this.contract.connect(wallet);
    }

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
            // Ensure policyNumber is properly converted to a string first, then to BigNumber
            const policyNumberStr = String(policyNumber);
            console.log('Policy Number (string):', policyNumberStr);
            const policyNumberBN = ethers.BigNumber.from(policyNumberStr);
            console.log('Policy Number (BigNumber):', policyNumberBN.toString());
            
            const tx = await this.contractWithSigner.submitClaim(
                policyNumberBN,
                amount,
                treatmentType,
                aabhaId,
                patientAdmissionDate,
                flightId,
                flightCancellationStatus,
                flightDelayMinutes,
                flightDurationMinutes
            );
            const receipt = await tx.wait();
            
            const event = receipt.events.find(e => e.event === 'ClaimSubmitted');
            return {
                claimId: event.args.claimId.toString(),
                transactionHash: receipt.transactionHash
            };
        } catch (error) {
            console.error('Error submitting claim:', error);
            throw error;
        }
    }

    // ... rest of the class implementation ...
} 