import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D'
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''
const config = {
  apiKey: ALCHEMY_KEY,
  network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(config)

export function useReflections() {
  const [reflections, setReflections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReflections = async () => {
    try {
      setLoading(true)

      const iface = new ethers.utils.Interface([
        'event ReflectionSubmitted(address sender, string cid, uint256 timestamp)',
      ])
      const eventTopic = iface.getEventTopic('ReflectionSubmitted')

      const currentBlock = await alchemy.core.getBlockNumber()
      const fromBlock = currentBlock - 1000

      const logs = await alchemy.core.getLogs({
        fromBlock,
        toBlock: 'latest',
        address: VAULT_ADDRESS,
        topics: [eventTopic],
      })

      const parsed = logs.map((log) => {
        const { args } = iface.parseLog(log)
        return {
          address: args.sender,
          cid: args.cid,
          timestamp: Number(args.timestamp),
          text: '', // Will be populated after IPFS fetch
        }
      })

      const filled = await Promise.all(
        parsed.map(async (r) => {
          try {
            const res = await fetch(`https://${r.cid}.ipfs.w3s.link`)
            const text = await res.text()
            return { ...r, text }
          } catch {
            return { ...r, text: '[Error loading text]' }
          }
        })
      )

      setReflections(filled.reverse())
    } catch (err) {
      console.error('❌ Error fetching logs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReflections()
    const interval = setInterval(fetchReflections, 30000)
    return () => clearInterval(interval)
  }, [])

  return { reflections, loading }
}
