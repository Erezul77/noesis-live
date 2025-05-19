import * as W3 from '@web3-storage/w3up-client'
import { File } from '@web-std/file'

export async function submitReflection(text: string) {
  const client = await W3.create()

  // ✅ TypeScript bypass — trust this env var even if TS complains
  const email = process.env.WEB3_STORAGE_EMAIL as any
  const space = await client.login(email)
  await client.setCurrentSpace(space.did())

  const file = new File([text], 'reflection.txt', { type: 'text/plain' })
  const cid = await client.uploadFile(file)

  return cid.toString()
}
