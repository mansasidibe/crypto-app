const hre = require("hardhat");

async function main() {
  const Transactions = await hre.ethers.getContractFactory("Transactions");

  // Ajout d'un gas limit et d'un gas price raisonnable
  const transactions = await Transactions.deploy({
    gasLimit: 500000, // Limite de gas
    gasPrice: hre.ethers.utils.parseUnits("10", "gwei"), // Réduction du coût du gas
  });
  
  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
