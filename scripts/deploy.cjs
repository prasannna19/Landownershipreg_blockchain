const hre = require("hardhat");

async function main() {
  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");

  console.log("📦 Deploying LandRegistry contract...");
  const landRegistry = await LandRegistry.deploy();

  await landRegistry.waitForDeployment(); // ✅ correct function instead of .deployed()

  const address = await landRegistry.getAddress(); // ✅ get the deployed address

  console.log("✅ Contract deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
