async function main() {
    const [account] = await ethers.getSigners();
    console.log("Your public address is:", account.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  