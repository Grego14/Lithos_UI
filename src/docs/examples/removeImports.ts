/** removes the imports of the raw examples as they are handled by the
 * PreviewBlock component*/
export const removeImports = (code: string) => {
  return code.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\n*/gm, '').trim()
}
