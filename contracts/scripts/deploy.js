const hre = require("hardhat");

async function main() {
  console.log("Deploying InsuranceClaims contract...");

  // Deploy the contract
  const InsuranceClaims = await hre.ethers.getContractFactory("InsuranceClaims");
  const insuranceClaims = await InsuranceClaims.deploy();
  await insuranceClaims.waitForDeployment();

  const address = await insuranceClaims.getAddress();
  console.log("InsuranceClaims deployed to:", address);

  // Set up initial configuration
  const [owner] = await hre.ethers.getSigners();
  console.log("Contract owner:", owner.address);

  // Verify the contract on Etherscan (if not on a local network)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await insuranceClaims.deployTransaction.wait(6);
    
    console.log("Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 