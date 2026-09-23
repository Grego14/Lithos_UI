import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export interface LithosConfig {
  aliases: {
    components: string // e.g. "./src/components/ui"
    blocks: string // e.g. "./src/components/blocks"
    utils: string // e.g. "./src/utils"
    core: string // e.g. "./src/core"
  }
  css: string // e.g. "./src/index.css"
}

const DEFAULT_CONFIG: LithosConfig = {
  aliases: {
    components: './src/components/ui',
    blocks: './src/components/blocks',
    utils: './src/utils',
    core: './src/core',
  },
  css: './src/index.css',
}

export const getConfig = (): LithosConfig => {
  const configPath = path.join(process.cwd(), 'lithos.json')
  if (fs.existsSync(configPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      return { ...DEFAULT_CONFIG, ...parsed, aliases: { ...DEFAULT_CONFIG.aliases, ...(parsed.aliases || {}) } }
    } catch {
      console.warn('⚠️ Could not parse lithos.json. Using defaults.')
    }
  }

  // If no config and no src folder, fallback to root
  if (!fs.existsSync(path.join(process.cwd(), 'src'))) {
    return {
      aliases: {
        components: './components/ui',
        blocks: './components/blocks',
        utils: './utils',
        core: './core',
      },
      css: './index.css',
    }
  }

  return DEFAULT_CONFIG
}

export const fetchFile = async (url: string): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }
  return response.text()
}

export const getLocalDestination = (repoPath: string, config: LithosConfig): string => {
  // repoPath is like "components/ui/Button.tsx" or "utils/cn.ts"
  if (repoPath.startsWith('components/ui/')) {
    return path.join(process.cwd(), config.aliases.components, repoPath.replace('components/ui/', ''))
  }
  if (repoPath.startsWith('components/blocks/')) {
    return path.join(process.cwd(), config.aliases.blocks, repoPath.replace('components/blocks/', ''))
  }
  if (repoPath.startsWith('utils/')) {
    return path.join(process.cwd(), config.aliases.utils, repoPath.replace('utils/', ''))
  }
  if (repoPath.startsWith('core/')) {
    return path.join(process.cwd(), config.aliases.core, repoPath.replace('core/', ''))
  }
  return path.join(process.cwd(), repoPath)
}

const stripExt = (p: string) => p.replace(/\.tsx?$/, '')

export const rewriteImports = (
  content: string,
  sourceRepoPath: string,
  requires: string[],
  config: LithosConfig
): string => {
  let rewritten = content
  const sourceLocalDest = getLocalDestination(sourceRepoPath, config)
  const sourceLocalDir = path.dirname(sourceLocalDest)
  const sourceRepoDir = path.dirname(sourceRepoPath)

  for (const req of requires) {
    if (!req.endsWith('.ts') && !req.endsWith('.tsx')) {
      // It's an npm package, don't rewrite
      continue
    }

    // 1. Calculate the exact relative string used in the original source code
    let originalRelative = path.relative(sourceRepoDir, req)
    // Convert Windows backslashes to forward slashes for import strings
    originalRelative = originalRelative.split(path.sep).join('/')
    if (!originalRelative.startsWith('.')) {
      originalRelative = './' + originalRelative
    }
    const originalImportStr = stripExt(originalRelative)

    // 2. Calculate the new relative string based on the user's config
    const reqLocalDest = getLocalDestination(req, config)
    let newRelative = path.relative(sourceLocalDir, reqLocalDest)
    newRelative = newRelative.split(path.sep).join('/')
    if (!newRelative.startsWith('.')) {
      newRelative = './' + newRelative
    }
    const newImportStr = stripExt(newRelative)

    // 3. String replace
    // We use a simple replace. To be safe we could use a regex that matches quotes, but literal is fine.
    rewritten = rewritten.split(`'${originalImportStr}'`).join(`'${newImportStr}'`)
    rewritten = rewritten.split(`"${originalImportStr}"`).join(`"${newImportStr}"`)
  }

  return rewritten
}

export const ensureDir = (filePath: string) => {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
