#!/usr/bin/env ts-node

import prompts from 'prompts'
import { storeReflectionToIPFS } from '@/lib/ipfs'
import { submitReflection } from '@/lib/contract'

const personas = ['The Seer', 'The Oracle', 'The Architect', 'The Wanderer']

async function main() {
  const response = await prompts({
    type: 'select',
    name: 'persona',
    message: 'Choose your Persona:',
    choices: personas.map(p => ({ title: p, value: p })),
  })

  const reflection = await prompts({
    type: 'text',
    name: 'text',
    message: `[${response.persona}] Reflect something...`,
  })

  console.log(`📨 Received reflection: ${reflection.text}`)
  const cid = await storeReflectionToIPFS(reflection.text)
  await submitReflection(cid)
}

main()

