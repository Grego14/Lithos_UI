# Component Documentation Review Checklist

Use this checklist when reviewing new component PRs. Copy the template below, fill it out, and share with reviewers for consistent, thorough feedback.

---

## Template

```
## Component: [COMPONENT_NAME]
PR: #[PR_NUMBER]

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
  - ❌ Bad: `{['sm', 'md'].map(size => <Component size={size} />)}`
  - ✅ Good: `<Component size="sm" />` and `<Component size="md" />` as separate JSX
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

---

## Common Issues to Flag

| Issue | Example | Fix |
|-------|---------|-----|
| Loop-based usage code | `map(size => <Comp size={size} />)` | Show each variant as standalone JSX |
| Anatomy section when not needed | Pagination, simple buttons | Remove entirely |
| Complex generated code | `export const StylePagination = () => (...)` | Use plain JSX in code blocks |
| Unclear prop documentation | `"Used for styling"` | `"Applies custom CSS classes via cn() utility"` |
| TOC mismatch | Section ID `#basic` but TOC says `#example` | Ensure IDs match exactly |
| Missing accessibility info | No aria-labels documented | List keyboard support, roles, announcements |

---

## How to Use

1. **Clone the template above**
2. **Fill in component name and PR number**
3. **Check off boxes as you review**
4. **Paste into a GitHub comment or DM to reviewers**
5. **Reviewers can provide specific fixes using the "Common Issues" reference**

---

## Quick Reference: What to Look For by Section

### Usage Code Blocks
- ✅ Standalone, realistic examples
- ✅ No maps/loops over demo data
- ✅ Plain JSX, not function exports
- ✅ Copy-paste ready

### Props Table
- ✅ Every prop documented
- ✅ Types match component definition
- ✅ Descriptions explain purpose, not just type
- ✅ Defaults clearly marked

### Accessibility
- ✅ Keyboard navigation documented
- ✅ ARIA attributes listed
- ✅ Screen reader behavior explained
- ✅ Focus management mentioned if relevant

### Structure
- ✅ Installation section
- ✅ Examples (basic + variations)
- ✅ Accessibility section
- ✅ API Reference
- ✅ NO Anatomy unless component has distinct parts
- ✅ TOC entries match all section IDs
```
