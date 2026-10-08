## Description

<!-- Describe your changes in detail -->

## Related Issue

<!-- If applicable, link to the issue (e.g., Fixes #123) -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Component update / addition

## Component Documentation Review

<!-- If this PR includes a new component or component documentation, please review and check the following (expand to view): -->

<details>
<summary><strong>Component Review Checklist (Expand)</strong></summary>

### 1. COMPONENT FILE

- [ ] Component exported from `src/index.ts`
- [ ] TypeScript types properly defined (Props interface, variants)
- [ ] Default props sensible
- [ ] Accessibility attributes in place (aria-*, role, etc.)
- [ ] Event handlers follow naming convention (`onEventName`)

### 2. REGISTRY & NAVIGATION

- [ ] Entry added to `src/cli/registry.ts` in alphabetical order
- [ ] Dependencies correctly listed in `requires` array
- [ ] Component added to `src/docs/layout/Navbar.tsx`
- [ ] Component added to `src/docs/layout/Sidebar.tsx`
- [ ] Route added to `src/App.tsx` in `renderDocRoutes()`
- [ ] TOC entries added to `src/docs/DocsLayout.tsx`

### 3. DOCUMENTATION PAGE (`src/docs/pages/[Component].tsx`)

- [ ] Title and description present
- [ ] Installation/Setup section links to correct component path
- [ ] Examples section properly structured
- [ ] **NO Anatomy section** (remove if not needed)
- [ ] Accessibility section covers keyboard, screen readers, ARIA
- [ ] API Reference section with Props table
- [ ] All section IDs match TOC entries

### 4. EXAMPLE FILES (`src/docs/examples/[component]/`)

- [ ] **Basic/Default** example shows simplest usage
- [ ] **Variant/Style examples** show real consumer code, NOT loops/maps over const arrays
- [ ] **Position/Size/Shape examples** render standalone props, not in dynamic structures
- [ ] All examples use correct component imports
- [ ] `PreviewBlock` code snippets show plain JSX (no `export const`)
- [ ] Examples don't wrap multiple variations in the same returned element without clear labels

### 5. PROPS DATA FILE (`src/docs/propsData/[component].ts`)

- [ ] All props documented with `name`, `type`, `description`
- [ ] `defaultValue` provided where applicable
- [ ] Descriptions are clear and actionable
- [ ] TypeScript types match component definition exactly
- [ ] Union types formatted clearly: `'option1' | 'option2'`
- [ ] Complex types (functions) clearly documented
- [ ] `className / ref / native props` entries are clear (or split into separate rows)

### 6. TESTS (`src/tests/components/ui/[Component].test.tsx`)

- [ ] Unit tests for core functionality
- [ ] Accessibility tests (axe checks)
- [ ] Keyboard interaction tests
- [ ] Edge cases handled (empty state, disabled, etc.)
- [ ] Controlled vs. uncontrolled behavior tested
- [ ] All tests passing

### 7. COMPONENT SHOWCASE (`src/pages/ComponentsIndex.tsx`)

- [ ] Component added to `componentsList` with preview
- [ ] Preview uses small/compact variant for demo
- [ ] `to` link points to `/docs/[component]`

### 8. EXPORTS & PACKAGE

- [ ] Component exported from main `src/index.ts`
- [ ] All supporting types/enums exported if needed
- [ ] No unused imports in component or docs files

### 9. CONSISTENCY

- [ ] Naming follows repo conventions (PascalCase components, camelCase props)
- [ ] Styling uses Lithos design tokens (colors, spacing, typography)
- [ ] Example code style matches existing component docs
- [ ] Props table formatting consistent with other components

### 10. CONTENT QUALITY

- [ ] Section headings are descriptive and parallel
- [ ] Descriptions explain "what" and "when to use"
- [ ] Code examples are copy-paste ready
- [ ] No typos or broken links
- [ ] Accessibility guidance is actionable
- [ ] Progress/loading indicators or complex UX clearly documented

</details>
