const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/U/Downloads/WORK/LithosUI/src';

function replaceInFile(filePath, search, replace) {
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.split(search).join(replace);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function replaceRegexInFile(filePath, search, replace) {
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(search, replace);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

// Alert.tsx docs
replaceInFile(path.join(srcDir, 'docs/pages/Alert.tsx'), 'type=', 'intent=');
replaceInFile(path.join(srcDir, 'docs/pages/Alert.tsx'), 'type:', 'intent:');
replaceInFile(path.join(srcDir, 'docs/pages/Alert.tsx'), 'type?', 'intent?');

// Toast.tsx component
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'type?: ToastType', 'intent?: ToastIntent');
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'export type ToastType', 'export type ToastIntent');
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'type =', 'intent =');
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'type ===', 'intent ===');
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'colors[type]', 'colors[intent]');
replaceInFile(path.join(srcDir, 'components/ui/Toast.tsx'), 'type: ToastType', 'intent: ToastIntent');

// Toast.tsx docs
replaceInFile(path.join(srcDir, 'docs/pages/Toast.tsx'), 'type:', 'intent:');

// Badge.tsx component
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'variant?: BadgeVariant', 'intent?: BadgeIntent');
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'export type BadgeVariant', 'export type BadgeIntent');
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'variant =', 'intent =');
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'variantClass[variant]', 'intentClass[intent]');
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'BadgeVariant', 'BadgeIntent');
replaceInFile(path.join(srcDir, 'components/ui/Badge.tsx'), 'variantClass', 'intentClass');

// Badge.tsx docs
replaceInFile(path.join(srcDir, 'docs/pages/Badge.tsx'), 'variant=', 'intent=');

// Breadcrumb.tsx component
replaceRegexInFile(path.join(srcDir, 'components/ui/Breadcrumb.tsx'), /variant\?: 'collapsible' \| 'icon'/g, "mode?: 'collapsible'\n  showIcons?: boolean");
replaceRegexInFile(path.join(srcDir, 'components/ui/Breadcrumb.tsx'), /variant = 'collapsible',/g, "mode = 'collapsible',\n  showIcons = false,");
replaceRegexInFile(path.join(srcDir, 'components/ui/Breadcrumb.tsx'), /variant === 'icon'/g, 'showIcons');
replaceRegexInFile(path.join(srcDir, 'components/ui/Breadcrumb.tsx'), /variant === 'collapsible'/g, "mode === 'collapsible'");

// Breadcrumb.tsx docs
replaceInFile(path.join(srcDir, 'docs/pages/Breadcrumb.tsx'), 'variant="collapsible"', 'mode="collapsible"');
replaceInFile(path.join(srcDir, 'docs/pages/Breadcrumb.tsx'), 'variant="icon"', 'showIcons');

// Button.tsx component
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'intent?: ButtonIntent', 'variant?: ButtonVariant');
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'export type ButtonIntent', 'export type ButtonVariant');
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'intent =', 'variant =');
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'intentClass[intent]', 'variantClass[variant]');
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'ButtonIntent', 'ButtonVariant');
replaceInFile(path.join(srcDir, 'components/ui/Button.tsx'), 'intentClass', 'variantClass');
replaceInFile(path.join(srcDir, 'core/types.ts'), 'ButtonIntent', 'ButtonVariant');

// Button.tsx docs
replaceInFile(path.join(srcDir, 'docs/pages/Button.tsx'), 'intent=', 'variant=');
replaceInFile(path.join(srcDir, 'docs/pages/Button.tsx'), 'intent"', 'variant"');
replaceInFile(path.join(srcDir, 'docs/pages/Button.tsx'), 'intent prop', 'variant prop');

// Also update other components that use Button
['Alert.tsx', 'Card.tsx', 'Toast.tsx', 'carousel/CarouselButton.tsx', 'Calendar.tsx', 'carousel/CarouselPagination.tsx', 'carousel/CarouselControls.tsx'].forEach(file => {
  replaceInFile(path.join(srcDir, 'components/ui', file), 'intent=', 'variant=');
});

console.log('Refactor script finished.');
