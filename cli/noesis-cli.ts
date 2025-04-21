#!/usr/bin/env ts-node

import prompts from 'prompts'
import { writeReflection } from '@/lib/ipfs'
import { submitReflection } from '@/lib/contract'

const personas = ['The Seer', 'The Oracle', 'The Architect', 'The Wanderer']

async function main() {
  console.log(`\n🌌 Welcome to Noēsis CLI`)
  const { persona } = await prompts({
    type: 'select',
    name: 'persona',
    message: 'Choose your Persona',
    choices: personas.map(p => ({ title: p, value: p }))
  })

  console.log(`\n🧠 Persona activated: ${persona}`)
  const { reflection } = await prompts({
    type: 'text',
    name: 'reflection',
    message: `[${persona}] What would you like to reflect?`
  })

  console.log(`\n📦 Uploading to IPFS...`)
  const cid = await writeReflection(reflection)
  console.log(`✅ Pinned to IPFS with CID: ${cid}`)

  console.log(`📡 Submitting to contract...`)
  await submitReflection(cid)
  console.log(`✅ Reflection submitted to blockchain!`)

  console.log(`\n✨ All done. Visit the feed to view.`)
}

main()
