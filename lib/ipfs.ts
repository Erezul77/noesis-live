// lib/ipfs.ts
// @ts-ignore
import * as W3 from '@web3-storage/w3up-client'
import { File } from '@web-std/file'

console.log('⚙️ Initializing w3up client...')

// Initialize client
const client = await W3.create()

// Restore identity (DID) and select space
await client.login(`mailto:${process.env.WEB3_STORAGE_EMAIL!}` as `${string}@${string}`)
await client.setCurrentSpace(process.env.WEB3_STORAGE_SPACE_DID! as `did:${string}:${string}`)

/**
 * Uploads a reflection text to Web3.Storage via W3UP client.
 */
export async function storeReflectionToIPFS(text: string): Promise<string> {
  const file = new File([text], 'reflection.txt', { type: 'text/plain' })
  const cid = await client.uploadFile(file)
  console.log('✅ Uploaded to IPFS with CID:', cid.toString())
  return cid.toString()
}
