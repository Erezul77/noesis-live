import { NextResponse } from 'next/server'
import { Contract, Wallet, JsonRpcProvider } from 'ethers'
import * as W3 from '@web3-storage/w3up-client'

export async function POST(req: Request) {
  const { text } = await req.json()

  const client = await W3.create()
  await client.login(process.env.WEB3_STORAGE_EMAIL! as `${string}@${string}`)
  await client.setCurrentSpace(process.env.WEB3_STORAGE_SPACE_DID! as `did:${string}:${string}`)

  const file = new File([text], 'reflection.txt', { type: 'text/plain' })
  const cid = await client.uploadFile(file)
  const url = `https://${cid}.ipfs.w3s.link/reflection.txt`

  const provider = new JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  )
  const wallet = new Wallet(process.env.PRIVATE_KEY!, provider)

  const contract = new Contract(
    process.env.REFLECTION_VAULT_CONTRACT!,
    ['function submitReflection(string memory uri) public'],
    wallet
  )

  const tx = await contract.submitReflection(url)
  await tx.wait()

  return NextResponse.json({ success: true })
}
