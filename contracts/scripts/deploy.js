async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with address:", deployer.address);
  
    const Governance = await ethers.getContractFactory("Governance");
    const contract = await Governance.deploy();
  
    console.log("Governance contract deployed to:", contract.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  