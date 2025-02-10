async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Sepolia Balance: ${(await deployer.getBalance()).toString()}`);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  