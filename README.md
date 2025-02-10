# React + Vite

### Compliler Hardhat : 
```bash
npx hardhat compile
```

### Déployer : 
```bash
npx hardhat run src/scripts/deploy.js --network sepolia
```

### Voir son solde sepolia : 
```bash
npx hardhat console --network sepolia
-----
const [deployer] = await ethers.getSigners();
console.log(`Balance: ${(await deployer.getBalance()).toString()}`);
```