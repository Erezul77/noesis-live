'use client'

import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_REFLECTION_VAULT_CONTRACT || ''
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''
const EVENT_TOPIC = '0x289b0813a020f5c56dfb1dea0624765395ad4a1355ea266095553416e50ad6e6'

const config = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(config)

export function useReflections() {
  const [reflections, setReflections] = useState<string[]>([])

  useEffect(() => {
    async function fetchLogs() {
      try {
        const latestBlock = await alchemy.core.getBlockNumber()
        const fromBlock = latestBlock - 1000

        const logs = await alchemy.core.getLogs({
          address: VAULT_ADDRESS,
          fromBlock: '0x' + fromBlock.toString(16),
          toBlock: 'latest',
          topics: [EVENT_TOPIC],
        })

        const parsed = logs.map((log) => {
          const decoded = ethers.utils.defaultAbiCoder.decode(['string'], log.data)
          return decoded[0]
        })

        setReflections(parsed.reverse())
      } catch (err) {
        console.error('❌ Error fetching logs:', err)
      }
    }

    fetchLogs()
  }, [])

  return reflections
}
