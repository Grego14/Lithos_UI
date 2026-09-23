import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { registry, type RegistryItem } from './registry.js'
import { getConfig, fetchFile, getLocalDestination, rewriteImports, ensureDir } from './utils.js'

const getAllRequires = (item: RegistryItem): string[] => {
  const visited = new Set<string>()
  const deps = new Set<string>()

  const traverse = (currentItem: RegistryItem) => {
    if (visited.has(currentItem.slug)) return
    visited.add(currentItem.slug)

    for (const req of currentItem.requires) {
      deps.add(req)

      // If this required file is itself a registered component, fetch its requires too
      const matchedComp = Object.values(registry).find((comp) => comp.githubUrl.endsWith('/' + req))
      if (matchedComp) {
        traverse(matchedComp)
      }
    }
  }

  traverse(item)
  return Array.from(deps)
}

export const add = async (components: string[]) => {
  if (!components || components.length === 0) {
    console.error('✖ Please specify a component to add.')
    process.exit(1)
  }

  const config = getConfig()

  for (const compName of components) {
    const item = registry[compName]
    if (!item) {
      console.error(`✖ Component '${compName}' not found.`)
      console.log('\nAvailable components:')
      Object.keys(registry).forEach((k) => console.log(`- ${k}`))
      continue
    }

    console.log(`\nAdding ${item.name}...`)

    // We need to download the component itself, PLUS all transitive dependencies.
    const allRequires = getAllRequires(item)
    const filesToDownload = [
      {
        url: item.githubUrl,
        repoPath: item.githubUrl.split('/main/src/')[1]!,
        requires: allRequires, // Provide full flat requires for import rewriting
      },
    ]

    for (const req of allRequires) {
      if (req.endsWith('.ts') || req.endsWith('.tsx')) {
        filesToDownload.push({
          url: `https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src/${req}`,
          repoPath: req,
          requires: allRequires, // All files share the same flat requires list for rewriting context
        })
      } else {
        console.log(`i Dependency '${req}' is an NPM package. Ensure it is installed.`)
      }
    }

    // Download and write
    for (const file of filesToDownload) {
      try {
        const dest = getLocalDestination(file.repoPath, config)
        if (fs.existsSync(dest)) {
          console.log(`i ${file.repoPath} already exists. Skipping.`)
          continue
        }

        const content = await fetchFile(file.url)
        const rewritten = rewriteImports(content, file.repoPath, file.requires, config)

        ensureDir(dest)
        fs.writeFileSync(dest, rewritten)
        console.log(`✓ Created ${path.relative(process.cwd(), dest)}`)
      } catch (e: unknown) {
        console.error(`✖ Error processing ${file.repoPath}:`, (e as Error).message)
      }
    }
  }
}
