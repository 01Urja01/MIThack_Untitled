const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("InsuranceClaims", function () {
    let InsuranceClaims;
    let insuranceClaims;
    let owner;
    let policyholder;
    let insurer;
    let healthPolicyNumber;
    let travelPolicyNumber;

    beforeEach(async function () {
        [owner, policyholder, insurer] = await ethers.getSigners();
        InsuranceClaims = await ethers.getContractFactory("InsuranceClaims");
        insuranceClaims = await InsuranceClaims.deploy();
        await insuranceClaims.waitForDeployment();
        await insuranceClaims.connect(owner).setInsurer(insurer.address);
    });

    describe("Policy Creation", function () {
        it("Should create a health insurance policy", async function () {
            const startDate = Math.floor(Date.now() / 1000);
            const endDate = startDate + 365 * 24 * 60 * 60; // 1 year

            const tx = await insuranceClaims.connect(insurer).createPolicy(
                policyholder.address,
                ethers.parseEther("100"), // Coverage amount
                startDate,
                endDate,
                "HEALTH",
                ethers.parseEther("10"), // Max coverage per claim
                20, // Copay percentage
                ["SURGERY", "MEDICATION"], // Covered treatments
                ["COSMETIC"], // Excluded treatments
                0, // Waiting period
                5, // Max claims per year
                true, // Pre-existing conditions covered
                30, // Max hospitalization days
                ethers.parseEther("0.1"), // Max room rent
                ethers.parseEther("0.2"), // Max ICU charges
                ethers.parseEther("5"), // Max operation charges
                ethers.parseEther("1"), // Max medicine charges
                ethers.parseEther("0.5"), // Max diagnostic charges
                ethers.parseEther("0.1"), // Max ambulance charges
                30, // Max pre-hospitalization days
                60, // Max post-hospitalization days
                // Travel-specific parameters (not used for health)
                0,
                false,
                0
            );

            await tx.wait();
            healthPolicyNumber = 1;

            const policy = await insuranceClaims.getPolicy(healthPolicyNumber);
            expect(policy.policyType).to.equal("HEALTH");
            expect(policy.policyholder).to.equal(policyholder.address);
        });

        it("Should create a travel insurance policy", async function () {
            const startDate = Math.floor(Date.now() / 1000);
            const endDate = startDate + 365 * 24 * 60 * 60; // 1 year

            const tx = await insuranceClaims.connect(insurer).createPolicy(
                policyholder.address,
                ethers.parseEther("100"), // Coverage amount
                startDate,
                endDate,
                "TRAVEL",
                ethers.parseEther("10"), // Max coverage per claim
                20, // Copay percentage
                [], // Covered treatments (not used for travel)
                [], // Excluded treatments (not used for travel)
                0, // Waiting period
                5, // Max claims per year
                false, // Pre-existing conditions covered
                0, // Max hospitalization days (not used for travel)
                0, // Max room rent (not used for travel)
                0, // Max ICU charges (not used for travel)
                0, // Max operation charges (not used for travel)
                0, // Max medicine charges (not used for travel)
                0, // Max diagnostic charges (not used for travel)
                0, // Max ambulance charges (not used for travel)
                0, // Max pre-hospitalization days (not used for travel)
                0, // Max post-hospitalization days (not used for travel)
                // Travel-specific parameters
                120, // Delay time minutes
                true, // Cancellation status
                24 // Travel time hours
            );

            await tx.wait();
            const policyNumber = 1;

            const policy = await insuranceClaims.getPolicy(policyNumber);
            expect(policy.policyType).to.equal("TRAVEL");
            expect(policy.policyholder).to.equal(policyholder.address);
        });
    });

    describe("Health Claims", function () {
        beforeEach(async function () {
            // Create health policy first
            const startDate = Math.floor(Date.now() / 1000);
            const endDate = startDate + 365 * 24 * 60 * 60;
            await insuranceClaims.connect(insurer).createPolicy(
                policyholder.address,
                ethers.parseEther("100"),
                startDate,
                endDate,
                "HEALTH",
                ethers.parseEther("10"),
                20,
                ["SURGERY", "MEDICATION"],
                ["COSMETIC"],
                0,
                5,
                true,
                30,
                ethers.parseEther("0.1"),
                ethers.parseEther("0.2"),
                ethers.parseEther("5"),
                ethers.parseEther("1"),
                ethers.parseEther("0.5"),
                ethers.parseEther("0.1"),
                30,
                60,
                0,
                false,
                0
            );
            healthPolicyNumber = 1;
        });

        it("Should submit a valid health claim", async function () {
            const tx = await insuranceClaims.connect(policyholder).submitClaim(
                healthPolicyNumber,
                ethers.parseEther("5"),
                "SURGERY",
                "AABHA123", // AABHA ID
                Math.floor(Date.now() / 1000) - 86400, // Admission date (1 day ago)
                0, // Flight ID (not used for health)
                false, // Flight cancellation status (not used for health)
                0, // Flight delay minutes (not used for health)
                0 // Flight duration minutes (not used for health)
            );

            await tx.wait();
            const claim = await insuranceClaims.getClaim(1);
            expect(claim.treatmentType).to.equal("SURGERY");
            expect(claim.aabhaId).to.equal("AABHA123");
        });

        it("Should reject health claim with excluded treatment", async function () {
            await expect(
                insuranceClaims.connect(policyholder).submitClaim(
                    healthPolicyNumber,
                    ethers.parseEther("5"),
                    "COSMETIC",
                    "AABHA123",
                    Math.floor(Date.now() / 1000) - 86400,
                    0,
                    false,
                    0,
                    0
                )
            ).to.be.revertedWith("Treatment excluded by policy");
        });

        it("Should reject health claim without AABHA ID", async function () {
            await expect(
                insuranceClaims.connect(policyholder).submitClaim(
                    healthPolicyNumber,
                    ethers.parseEther("5"),
                    "SURGERY",
                    "",
                    Math.floor(Date.now() / 1000) - 86400,
                    0,
                    false,
                    0,
                    0
                )
            ).to.be.revertedWith("Health claim must include AABHA ID");
        });
    });

    describe("Travel Claims", function () {
        beforeEach(async function () {
            // Create travel policy first
            const startDate = Math.floor(Date.now() / 1000);
            const endDate = startDate + 365 * 24 * 60 * 60;
            await insuranceClaims.connect(insurer).createPolicy(
                policyholder.address,
                ethers.parseEther("100"),
                startDate,
                endDate,
                "TRAVEL",
                ethers.parseEther("10"),
                20,
                [],
                [],
                0,
                5,
                false,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                120, // Delay time minutes
                true, // Cancellation status
                24 // Travel time hours
            );
            travelPolicyNumber = 1;
        });

        it("Should submit a valid travel claim", async function () {
            const tx = await insuranceClaims.connect(policyholder).submitClaim(
                travelPolicyNumber,
                ethers.parseEther("5"),
                "DELAY", // Treatment type for travel
                "", // AABHA ID (not used for travel)
                0, // Patient admission date (not used for travel)
                1, // Flight ID
                true, // Flight cancellation status
                60, // Flight delay minutes
                720 // Flight duration minutes (12 hours)
            );

            await tx.wait();
            const claim = await insuranceClaims.getClaim(1);
            expect(claim.flightId).to.equal(1);
            expect(claim.flightDelayMinutes).to.equal(60);
            expect(claim.flightDurationMinutes).to.equal(720);
        });

        it("Should reject travel claim with excessive delay", async function () {
            await expect(
                insuranceClaims.connect(policyholder).submitClaim(
                    travelPolicyNumber,
                    ethers.parseEther("5"),
                    "DELAY",
                    "",
                    0,
                    1,
                    true,
                    180, // Delay exceeds policy limit of 120 minutes
                    720,
                )
            ).to.be.revertedWith("Flight delay exceeds policy limit");
        });

        it("Should reject travel claim without flight ID", async function () {
            await expect(
                insuranceClaims.connect(policyholder).submitClaim(
                    travelPolicyNumber,
                    ethers.parseEther("5"),
                    "DELAY",
                    "",
                    0,
                    0,
                    true,
                    60,
                    720,
                )
            ).to.be.revertedWith("Travel claim must include flight ID");
        });
    });

    describe("Claim Processing", function () {
        beforeEach(async function () {
            // Create health policy and submit a claim
            const startDate = Math.floor(Date.now() / 1000);
            const endDate = startDate + 365 * 24 * 60 * 60;
            await insuranceClaims.connect(insurer).createPolicy(
                policyholder.address,
                ethers.parseEther("100"),
                startDate,
                endDate,
                "HEALTH",
                ethers.parseEther("10"),
                20,
                ["SURGERY", "MEDICATION"],
                ["COSMETIC"],
                0,
                5,
                true,
                30,
                ethers.parseEther("0.1"),
                ethers.parseEther("0.2"),
                ethers.parseEther("5"),
                ethers.parseEther("1"),
                ethers.parseEther("0.5"),
                ethers.parseEther("0.1"),
                30,
                60,
                0,
                false,
                0
            );

            await insuranceClaims.connect(policyholder).submitClaim(
                1,
                ethers.parseEther("5"),
                "SURGERY",
                "AABHA123",
                Math.floor(Date.now() / 1000) - 86400,
                0,
                false,
                0,
                0
            );
        });

        it("Should verify and process a claim", async function () {
            // Verify claim
            await insuranceClaims.connect(insurer).verifyClaim(1);
            const claimAfterVerification = await insuranceClaims.getClaim(1);
            expect(claimAfterVerification.isVerified).to.be.true;

            // Process claim
            await insuranceClaims.connect(insurer).processClaim(1);
            const claimAfterProcessing = await insuranceClaims.getClaim(1);
            expect(claimAfterProcessing.isPaid).to.be.true;
            expect(claimAfterProcessing.paidAmount).to.equal(ethers.parseEther("4")); // 5 ETH - 20% copay
        });

        it("Should not process unverified claim", async function () {
            await expect(
                insuranceClaims.connect(insurer).processClaim(1)
            ).to.be.revertedWith("Claim not verified");
        });

        it("Should not process already paid claim", async function () {
            await insuranceClaims.connect(insurer).verifyClaim(1);
            await insuranceClaims.connect(insurer).processClaim(1);
            await expect(
                insuranceClaims.connect(insurer).processClaim(1)
            ).to.be.revertedWith("Claim already paid");
        });
    });
}); 