
const hre = require("hardhat");

async function main() {

  const MakeMeLaugh = await hre.ethers.getContractFactory("MakeMeLaugh");
  const makemelaugh = await MakeMeLaugh.deploy();

  await makemelaugh.deployed();

  console.log("MakeMeLaugh deployed to:", makemelaugh.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
