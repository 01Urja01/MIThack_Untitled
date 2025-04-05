const InsuranceService = require('./services/insuranceService');

// Example usage
async function main() {
    // Initialize the service
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address
    const providerUrl = 'http://127.0.0.1:8545/'; // e.g., 'https://polygon-mumbai.infura.io/v3/YOUR_PROJECT_ID'
    const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'; // Replace with your private key

    const insuranceService = new InsuranceService(contractAddress, providerUrl);
    
    // Connect with a signer for write operations
    insuranceService.connectSigner(privateKey);

    try {
        // Example: Submit a health claim
        const healthClaim = await insuranceService.submitClaim(
            1, // policyNumber
            ethers.utils.parseEther('1.0'), // amount (1 ETH)
            'SURGERY', // treatmentType
            'AABHA123', // aabhaId
            Math.floor(Date.now() / 1000), // patientAdmissionDate
            0, // flightId (not needed for health claim)
            false, // flightCancellationStatus
            0, // flightDelayMinutes
            0 // flightDurationMinutes
        );
        console.log('Health claim submitted:', healthClaim);

        // Example: Submit a travel claim
        const travelClaim = await insuranceService.submitClaim(
            2, // policyNumber
            ethers.utils.parseEther('0.5'), // amount (0.5 ETH)
            'DELAY', // treatmentType
            '', // aabhaId (not needed for travel claim)
            0, // patientAdmissionDate
            12345, // flightId
            false, // flightCancellationStatus
            120, // flightDelayMinutes
            180 // flightDurationMinutes
        );
        console.log('Travel claim submitted:', travelClaim);

        // Example: Verify a claim
        const verificationResult = await insuranceService.verifyClaim(healthClaim.claimId);
        console.log('Claim verified:', verificationResult);

        // Example: Process a claim
        const processResult = await insuranceService.processClaim(healthClaim.claimId);
        console.log('Claim processed:', processResult);

        // Example: Get claim details
        const claimDetails = await insuranceService.getClaim(healthClaim.claimId);
        console.log('Claim details:', claimDetails);

        // Example: Get policy details
        const policyDetails = await insuranceService.getPolicy(1);
        console.log('Policy details:', policyDetails);

    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 