const fs = require('fs');
const path = require('path');

const uiDir = 'c:/Users/U/Downloads/WORK/LithosUI/src/components/ui';
const components = [
  'Accordion', 'Alert', 'Avatar', 'Badge', 'Breadcrumb', 
  'Button', 'Calendar', 'Card', 'carousel/Carousel', 'Toast', 
  'Toggle', 'CodeViewer', 'PreviewBlock'
];

let report = '# Component Audit Report\n\n';

components.forEach(comp => {
  const uiPath = path.join(uiDir, comp + '.tsx');
  if (!fs.existsSync(uiPath)) return;
  const content = fs.readFileSync(uiPath, 'utf8');
  
  report += `## ${comp}\n`;
  
  // 1. JSDoc
  if (!content.includes('@fileoverview')) report += `- [ ] Missing @fileoverview\n`;
  else report += `- [x] Has @fileoverview\n`;
  
  // 2. forwardRef
  if (content.includes('forwardRef')) report += `- [ ] Uses forwardRef\n`;
  else report += `- [x] No forwardRef\n`;
  
  // 3. export default
  if (content.includes('export default')) report += `- [ ] Uses default export\n`;
  else report += `- [x] No default export\n`;
  
  // 4. cn usage
  if (!content.includes('cn(')) report += `- [ ] Missing cn() usage\n`;
  else report += `- [x] Uses cn()\n`;
  
  report += '\n';
});

fs.writeFileSync('c:/Users/U/Downloads/WORK/LithosUI/npm_audit.md', report);
console.log('DONE');
