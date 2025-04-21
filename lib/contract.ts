// lib/contract.ts
import { ethers } from 'ethers';
import ReflectionVaultABI from './ReflectionVaultABI.json';

const CONTRACT_ADDRESS = '0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D';

export function getContract() {
  if (!process.env.PRIVATE_KEY || !process.env.ALCHEMY_API_KEY) {
    throw new Error('Missing PRIVATE_KEY or ALCHEMY_API_KEY in .env');
  }

  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  return new ethers.Contract(CONTRACT_ADDRESS, ReflectionVaultABI, wallet);
}
