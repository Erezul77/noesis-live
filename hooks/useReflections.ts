import { Interface, LogDescription, BrowserProvider, Contract, id } from 'ethers'
import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import * as W3 from '@web3-storage/w3up-client'
import { File } from '@web-std/file'

// ✅ Declare MetaMask support on the Window type
declare global {
  interface Window {
    ethereum?: any
  }
}

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D'
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''
const WEB3_STORAGE_EMAIL = process.env.WEB3_STORAGE_EMAIL ?? 'erezsnz@gmail.com'
const WEB3_STORAGE_SPACE_DID = process.env.WEB3_STORAGE_SPACE_DID! // DID string
const ABI = [
  'function submitReflection(string text) public',
  'event ReflectionSubmitted(address sender, string cid, uint256 timestamp)',
]

const config = {
  apiKey: ALCHEMY_KEY,
  network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(config)

export async function submitReflection(text: string) {
  const client = await W3.create()
  const space = await client.login(WEB3_STORAGE_EMAIL as `${string}@${string}`)
  await client.setCurrentSpace(space.did())

  const file = new File([text], 'reflection.txt', { type: 'text/plain' })
  const cid = await client.uploadFile(file)

  if (!window.ethereum) throw new Error('MetaMask not found')
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new Contract(VAULT_ADDRESS, ABI, signer)
  const tx = await contract.submitReflection(cid.toString())
  await tx.wait()
  return tx.hash
}

export function useReflections() {
  const [reflections, setReflections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReflections = async () => {
    try {
      setLoading(true)

      const iface = new Interface([
        'event ReflectionSubmitted(address sender, string cid, uint256 timestamp)',
      ])
      const eventTopic = id('ReflectionSubmitted(address,string,uint256)')

      const currentBlock = await alchemy.core.getBlockNumber()
      const fromBlock = currentBlock - 1000

      const logs = await alchemy.core.getLogs({
        fromBlock,
        toBlock: 'latest',
        address: VAULT_ADDRESS,
        topics: [eventTopic],
      })

      const parsed = logs.map((log) => {
        const parsedLog = iface.parseLog(log) as LogDescription
        const { args } = parsedLog
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
