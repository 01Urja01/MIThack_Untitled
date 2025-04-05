const hre = require("hardhat");

async function main() {
  // Get the contract factory and deploy
  const InsuranceClaims = await hre.ethers.getContractFactory("InsuranceClaims");
  const insuranceClaims = await InsuranceClaims.deploy();
  await insuranceClaims.waitForDeployment();
  console.log("InsuranceClaims deployed to:", await insuranceClaims.getAddress());

  // Get signers
  const [owner, policyholder, insurer] = await hre.ethers.getSigners();
  console.log("Owner:", owner.address);
  console.log("Policyholder:", policyholder.address);
  console.log("Insurer:", insurer.address);

  // Set insurer
  await insuranceClaims.connect(owner).setInsurer(insurer.address);
  console.log("Insurer set to:", insurer.address);

  // Create health insurance policy
  const startDate = Math.floor(Date.now() / 1000);
  const endDate = startDate + 365 * 24 * 60 * 60; // 1 year

  console.log("\nCreating health insurance policy...");
  const healthPolicyTx = await insuranceClaims.connect(insurer).createPolicy(
    policyholder.address,
    hre.ethers.parseEther("100"), // Coverage amount
    startDate,
    endDate,
    "HEALTH",
    hre.ethers.parseEther("10"), // Max coverage per claim
    20, // Copay percentage
    ["SURGERY", "MEDICATION"], // Covered treatments
    ["COSMETIC"], // Excluded treatments
    0, // Waiting period
    5, // Max claims per year
    true, // Pre-existing conditions covered
    30, // Max hospitalization days
    hre.ethers.parseEther("0.1"), // Max room rent
    hre.ethers.parseEther("0.2"), // Max ICU charges
    hre.ethers.parseEther("5"), // Max operation charges
    hre.ethers.parseEther("1"), // Max medicine charges
    hre.ethers.parseEther("0.5"), // Max diagnostic charges
    hre.ethers.parseEther("0.1"), // Max ambulance charges
    30, // Max pre-hospitalization days
    60, // Max post-hospitalization days
    // Travel-specific parameters (not used for health)
    0,
    false,
    0
  );

  await healthPolicyTx.wait();
  const healthPolicyNumber = 1;
  console.log("Health policy created with number:", healthPolicyNumber);

  // Try to submit a claim for cosmetic surgery (excluded treatment)
  console.log("\nAttempting to submit a claim for cosmetic surgery (excluded treatment)...");
  try {
    await insuranceClaims.connect(policyholder).submitClaim(
      healthPolicyNumber,
      hre.ethers.parseEther("5"),
      "COSMETIC", // This is in the excluded treatments list
      "AABHA123",
      Math.floor(Date.now() / 1000) - 86400,
      0,
      false,
      0,
      0
    );
  } catch (error) {
    console.log("Claim rejected! Error:", error.message);
  }

  // Try to submit a claim for an uncovered treatment
  console.log("\nAttempting to submit a claim for an uncovered treatment...");
  try {
    await insuranceClaims.connect(policyholder).submitClaim(
      healthPolicyNumber,
      hre.ethers.parseEther("5"),
      "DENTAL", // This is not in the covered treatments list
      "AABHA123",
      Math.floor(Date.now() / 1000) - 86400,
      0,
      false,
      0,
      0
    );
  } catch (error) {
    console.log("Claim rejected! Error:", error.message);
  }

  // Try to submit a claim without AABHA ID
  console.log("\nAttempting to submit a claim without AABHA ID...");
  try {
    await insuranceClaims.connect(policyholder).submitClaim(
      healthPolicyNumber,
      hre.ethers.parseEther("5"),
      "SURGERY",
      "", // Missing AABHA ID
      Math.floor(Date.now() / 1000) - 86400,
      0,
      false,
      0,
      0
    );
  } catch (error) {
    console.log("Claim rejected! Error:", error.message);
  }

  // Submit a valid claim
  console.log("\nSubmitting a valid claim...");
  const validClaimTx = await insuranceClaims.connect(policyholder).submitClaim(
    healthPolicyNumber,
    hre.ethers.parseEther("5"),
    "SURGERY",
    "AABHA123",
    Math.floor(Date.now() / 1000) - 86400,
    0,
    false,
    0,
    0
  );

  await validClaimTx.wait();
  const validClaimId = 1;
  console.log("Valid claim submitted with ID:", validClaimId);

  // Verify and process the valid claim
  console.log("\nVerifying and processing the valid claim...");
  await insuranceClaims.connect(insurer).verifyClaim(validClaimId);
  await insuranceClaims.connect(insurer).processClaim(validClaimId);
  console.log("Valid claim processed successfully");

  // Get claim details
  console.log("\nValid claim details:");
  const claim = await insuranceClaims.getClaim(validClaimId);
  console.log("Treatment type:", claim.treatmentType);
  console.log("AABHA ID:", claim.aabhaId);
  console.log("Amount:", hre.ethers.formatEther(claim.amount), "ETH");
  console.log("Paid amount:", hre.ethers.formatEther(claim.paidAmount), "ETH");
  console.log("Is verified:", claim.isVerified);
  console.log("Is paid:", claim.isPaid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 