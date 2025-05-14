#!/usr/bin/env ts-node

import prompts from 'prompts'
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import { ethers } from 'ethers'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'

dotenv.config()

const personas = ['The Seer', 'The Oracle', 'The Architect', 'The Wanderer']

async function main() {
  const { persona } = await prompts({
    type: 'select',
    name: 'persona',
    message: 'Choose your Persona:',
    choices: personas.map((p) => ({ title: p, value: p })),
  })

  console.log(`🧠 Persona activated: ${persona}`)

  const { text } = await prompts({
    type: 'text',
    name: 'text',
    message: 'What is your reflection?',
  })

  if (!text || text.trim().length === 0) {
    console.log('❌ No reflection entered. Aborting.')
    return
  }

  // Save to local file
  const filename = `reflection-${randomUUID().slice(0, 8)}.txt`
  writeFileSync(filename, text)

  // Upload using w3 CLI
  console.log('📦 Uploading to IPFS using w3 CLI...')
  const result = execSync(`w3 up ${filename}`).toString()
  const cidMatch = result.match(/baf\w+/)
  const cid = cidMatch ? cidMatch[0] : null

  if (!cid) {
    console.log('❌ Upload failed.')
    return
  }

  console.log(`✅ Uploaded to IPFS with CID: ${cid}`)

  // Submit to Ethereum
  const contractAddress = process.env.CONTRACT_ADDRESS
  const abi = [
    'function propose(string memory _text) public',
    'event ProposalCreated(address indexed proposer, string text)',
  ]
  const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY
  const PRIVATE_KEY = process.env.PRIVATE_KEY
  
  if (!ALCHEMY_KEY || !PRIVATE_KEY) {
    throw new Error('❌ Missing ALCHEMY_API_KEY or PRIVATE_KEY in .env')
  }
  
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`)  
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
  const contract = new ethers.Contract(contractAddress!, abi, wallet)

  console.log('📡 Submitting reflection to Ethereum...')
  const tx = await contract.propose(text)
  console.log('⏳ Awaiting confirmation...')
  await tx.wait()

  console.log(`✅ Reflection recorded on-chain in tx: ${tx.hash}`)
}

main().catch((err) => {
  console.error('🔥 CLI error:', err)
})
