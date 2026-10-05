export const removeImports = (code: string) => {
  return code.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\n*/gm, '').trim()
}
