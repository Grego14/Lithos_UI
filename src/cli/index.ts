#!/usr/bin/env node

import process from 'node:process'
import { init } from './init.js'
import { add } from './add.js'

const main = async () => {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command) {
    console.log(`
Lithos UI CLI

Usage:
  npx lithos-ui init
  npx lithos-ui add <component> [component2 ...]
`)
    process.exit(0)
  }

  if (command === 'init') {
    await init()
  } else if (command === 'add') {
    const components = args.slice(1)
    await add(components)
  } else {
    console.error(`✖ Unknown command: ${command}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('✖ An unexpected error occurred:', err)
  process.exit(1)
})
