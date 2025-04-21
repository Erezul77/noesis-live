// lib/ipfs.ts
import { create } from '@web3-storage/w3up-client'
import { File } from '@web3-storage/w3up-client/file'

console.log('⚙️ Initializing w3up client...')

const client = await create()

const SPACE_DID = process.env.WEB3_STORAGE_SPACE_DID as string
const EMAIL = process.env.WEB3_STORAGE_EMAIL as string

await client.login(EMAIL)
await client.setCurrentSpace(SPACE_DID)

export async function storeReflectionToIPFS(text: string): Promise<string> {
  console.log('📨 Received reflection:', text)

  const file = new File([new TextEncoder().encode(text)], 'reflection.txt', {
    type: 'text/plain',
  })

  const cid = await client.uploadFile(file)
  console.log('✅ Pinned to IPFS with CID:', cid)
  return cid.toString()
}
