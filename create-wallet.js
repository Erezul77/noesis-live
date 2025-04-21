// create-wallet.js
const { Wallet } = require("ethers");

const wallet = Wallet.createRandom();
console.log("💡 Address:", wallet.address);
console.log("🔑 Private Key:", wallet.privateKey);
