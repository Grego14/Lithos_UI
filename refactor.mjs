import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      callback(fullPath);
    }
  }
}

walk(srcDir, (file) => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Change `export default function X` to `export function X`
  const exportDefaultFuncRegex = /export\s+default\s+function\s+([A-Za-z0-9_]+)/g;
  if (exportDefaultFuncRegex.test(content)) {
    content = content.replace(exportDefaultFuncRegex, 'export function $1');
    changed = true;
  }

  // 2. Change `export default X` to `export { X }`
  const exportDefaultRegex = /^export\s+default\s+([A-Za-z0-9_]+);?$/gm;
  if (exportDefaultRegex.test(content)) {
    content = content.replace(exportDefaultRegex, 'export { $1 }');
    changed = true;
  }

  // 3. Fix imports from local files
  // E.g., `import X from './X'` -> `import { X } from './X'`
  const importRegex = /^import\s+([A-Za-z0-9_]+)\s+from\s+['"](\.[^'"]+)['"]/gm;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, "import { $1 } from '$2'");
    changed = true;
  }

  // E.g., `import X, { Y } from './X'` -> `import { X, Y } from './X'`
  const importMixedRegex = /^import\s+([A-Za-z0-9_]+)\s*,\s*\{\s*([^}]+)\s*\}\s+from\s+['"](\.[^'"]+)['"]/gm;
  if (importMixedRegex.test(content)) {
    content = content.replace(importMixedRegex, "import { $1, $2 } from '$3'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
