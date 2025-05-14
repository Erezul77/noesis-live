// lib/contract.ts
// lib/contract.ts
declare global {
  interface Window {
    ethereum?: any
  }
}
import { ethers } from 'ethers'
import ReflectionVaultABI from './ReflectionVaultABI.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export async function submitReflection(text: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ReflectionVaultABI, signer)
  const tx = await contract.submitReflection(text)
  await tx.wait()
}
