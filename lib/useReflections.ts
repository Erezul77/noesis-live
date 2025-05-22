// lib/useReflections.ts — final production version for dynamic deployment
"use client"

import { useEffect, useState } from 'react'
import { Interface, LogDescription, id } from 'ethers'
import { Alchemy, Network } from 'alchemy-sdk'

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_REFLECTION_VAULT_CONTRACT || ''
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''

const ABI = [
  'event ReflectionSubmitted(address sender, string cid, uint256 timestamp)'
]

const config = {
  apiKey: ALCHEMY_KEY,
  network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(config)
const iface = new Interface(ABI)
const eventTopic = id('ReflectionSubmitted(address,string,uint256)')

interface Reflection {
  address: string
  cid: string
  timestamp: number
  text: string
}

export function useReflections() {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const currentBlock = await alchemy.core.getBlockNumber()
        const fromBlock = Math.max(0, currentBlock - 1000)

        const logs = await alchemy.core.getLogs({
          fromBlock,
          toBlock: 'latest',
          address: VAULT_ADDRESS,
          topics: [eventTopic],
        })

        const parsed = logs.map((log) => {
          try {
            const parsedLog = iface.parseLog(log) as LogDescription
            const args = parsedLog.args as unknown as readonly [string, string, bigint]
            const [sender, cid, timestamp] = args
            return {
              address: sender,
              cid,
              timestamp: Number(timestamp),
              text: '',
            }
          } catch (err) {
            console.error('Log parse error:', err)
            return null
          }
        }).filter(Boolean) as Reflection[]

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

    fetchReflections()
    const interval = setInterval(fetchReflections, 30000)
    return () => clearInterval(interval)
  }, [])

  return { reflections, loading }
}

