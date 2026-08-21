const fs = require('fs')
const path = require('path')
const blocksDir = 'c:/Users/U/Downloads/WORK/LithosUI/src/components/blocks'

function replaceInFile(filePath, search, replace) {
  let content = fs.readFileSync(filePath, 'utf8')
  const newContent = content.split(search).join(replace)
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent)
    console.log(`Updated ${filePath}`)
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath)
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath, 'intent=', 'variant=')
      replaceInFile(fullPath, 'type="success"', 'intent="success"')
      replaceInFile(fullPath, 'type="error"', 'intent="error"')
      replaceInFile(fullPath, 'type="info"', 'intent="info"')
      replaceInFile(fullPath, 'type="warning"', 'intent="warning"')
      replaceInFile(fullPath, "type='success'", "intent='success'")
      replaceInFile(fullPath, "type='error'", "intent='error'")
      replaceInFile(fullPath, "type='info'", "intent='info'")
      replaceInFile(fullPath, "type='warning'", "intent='warning'")
    }
  }
}

processDir(blocksDir)
processDir('c:/Users/U/Downloads/WORK/LithosUI/src/showroom')
processDir('c:/Users/U/Downloads/WORK/LithosUI/src/pages')
processDir('c:/Users/U/Downloads/WORK/LithosUI/src/docs/layout')

console.log('DONE')
