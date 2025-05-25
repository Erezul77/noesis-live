// lib/submit.ts — handles reflection submission
import { BrowserProvider, Contract } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
const ABI = [
  'function submitReflection(string text) public'
]

const WEB3_STORAGE_TOKEN = process.env.WEB3_STORAGE_TOKEN || ''

export async function uploadToIPFS(text: string): Promise<string> {
  const file = new Blob([text], { type: 'text/plain' })
  const formData = new FormData()
  formData.append('file', file, 'reflection.txt')

  const res = await fetch('https://api.web3.storage/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WEB3_STORAGE_TOKEN}`,
    },
    body: formData,
  })

  const result = await res.json()
  return result.cid
}

export async function submitReflection(text: string) {
  const cid = await uploadToIPFS(text)

  if (!window.ethereum) throw new Error('MetaMask not found')
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new Contract(VAULT_ADDRESS, ABI, signer)
  const tx = await contract.submitReflection(cid.toString())
  await tx.wait()
  return tx.hash
}
