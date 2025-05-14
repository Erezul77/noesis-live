'use client'

import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import { formatDistanceToNow } from 'date-fns'

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(config)

export default function FeedPage() {
  const [reflections, setReflections] = useState<{ uri: string; timestamp: number }[]>([])

  async function fetchReflections() {
    const events = await alchemy.core.getLogs({
      address: process.env.NEXT_PUBLIC_REFLECTION_VAULT_CONTRACT!,
      fromBlock: '0x0',
      toBlock: 'latest',
      topics: [
        // keccak256("ReflectionSubmitted(address,string,uint256)")
        '0xb4a44d318e74fda4bba738adceef3c3f0aef68e9dd9a0d1c07d8234c9d7b3cf2',
      ],
    })

    const parsed = events.map((e) => {
      const data = e.data
      const cidHex = '0x' + data.slice(130, 130 + 90).replace(/0+$/, '')
      const cid = Buffer.from(cidHex.slice(2), 'hex').toString('utf8')
      const uri = `https://${cid}.ipfs.w3s.link/reflection.txt`

      const timestampHex = data.slice(-64)
      const timestamp = parseInt(timestampHex, 16) * 1000

      return { uri, timestamp }
    })

    setReflections(parsed.reverse())
  }

  useEffect(() => {
    fetchReflections()
    const interval = setInterval(fetchReflections, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Reflections</h1>
      <div className="space-y-6 max-w-3xl mx-auto">
        {reflections.map((r, idx) => (
          <div key={idx} className="border border-gray-300 p-4 rounded-xl shadow-sm">
            <p className="text-gray-600 text-sm mb-2">
              {formatDistanceToNow(new Date(r.timestamp))} ago
            </p>
            <iframe
              src={r.uri}
              className="w-full h-24 bg-gray-50 rounded text-sm p-2"
              sandbox=""
            />
          </div>
        ))}
      </div>
    </main>
  )
}
