import { Alchemy, Network, AlchemySubscription } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(settings)

export function useReflections(contractAddress: string) {
  const [reflections, setReflections] = useState<string[]>([])

  useEffect(() => {
    async function fetchPast() {
      const logs = await alchemy.core.getLogs({
        address: contractAddress,
        topics: [
          '0x289b0813a020f5c56dfb1dea0624765395ad4a1355ea266095553416e50ad6e6',
        ],
        fromBlock: '0x7a1200',
      })

      const parsed = logs.map((log) => {
        const hex = log.data.replace(/^0x/, '')
        const bytes = Buffer.from(hex, 'hex')
        return bytes.toString().replace(/\0/g, '')
      })

      setReflections(parsed)
    }

    fetchPast()

    const sub = alchemy.ws.on(
      {
        address: contractAddress,
        topics: [
          '0x289b0813a020f5c56dfb1dea0624765395ad4a1355ea266095553416e50ad6e6',
        ],
      },
      (log) => {
        const hex = log.data.replace(/^0x/, '')
        const bytes = Buffer.from(hex, 'hex')
        const str = bytes.toString().replace(/\0/g, '')
        setReflections((r) => [str, ...r])
      }
    )

    return () => {
      alchemy.ws.removeAllListeners(AlchemySubscription.MINED_TRANSACTIONS)
    }
  }, [contractAddress])

  return reflections
}
