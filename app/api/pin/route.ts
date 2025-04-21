// app/api/pin/route.ts
import { NextResponse } from 'next/server'
import { storeReflectionToIPFS } from '@/lib/ipfs'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = body?.text

    if (!text) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 })
    }

    console.log('📨 Received reflection:', text)
    const cid = await storeReflectionToIPFS(text)
    return NextResponse.json({ cid }, { status: 200 })
  } catch (err) {
    console.error('❌ Upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
