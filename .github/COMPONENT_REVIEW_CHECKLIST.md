# Component Documentation Review Checklist

Use this checklist when reviewing new component PRs. Copy the template below, fill it out, and share with reviewers for consistent, thorough feedback.

---

## Template

```
**Component:** Pagination
**PR:** #350

### 1. COMPONENT FILE
- [x] Component exported from `src/index.ts`
- [x] TypeScript types properly defined (Props interface, variants)
- [x] Default props sensible
- [x] Accessibility attributes in place (aria-*, role, etc.)
- [x] Event handlers follow naming convention (`onEventName`)

### 2. REGISTRY & NAVIGATION
- [x] Entry added to `src/cli/registry.ts` in alphabetical order
- [x] Dependencies correctly listed in `requires` array
- [x] Component added to `src/docs/layout/Navbar.tsx`
- [x] Component added to `src/docs/layout/Sidebar.tsx`
- [x] Route added to `src/App.tsx` in `renderDocRoutes()`
- [x] TOC entries added to `src/docs/DocsLayout.tsx`

### 3. DOCUMENTATION PAGE (`src/docs/pages/[Component].tsx`)
- [x] Title and description present
- [x] Installation/Setup section links to correct component path
- [x] Examples section properly structured
- [x] **NO Anatomy section** (remove if not needed)
- [x] Accessibility section covers keyboard, screen readers, ARIA
- [x] API Reference section with Props table
- [x] All section IDs match TOC entries

### 4. EXAMPLE FILES (`src/docs/examples/[component]/`)
- [x] **Basic/Default** example shows simplest usage
- [x] **Variant/Style examples** show real consumer code, NOT loops/maps over const arrays
  - ❌ Bad: `{['sm', 'md'].map(size => <Component size={size} />)}`
  - ✅ Good: `<Component size="sm" />` and `<Component size="md" />` as separate JSX
- [x] **Position/Size/Shape examples** render standalone props, not in dynamic structures
- [x] All examples use correct component imports
- [x] `PreviewBlock` code snippets show plain JSX (no `export const`)
- [x] Examples don't wrap multiple variations in the same returned element without clear labels

### 5. PROPS DATA FILE (`src/docs/propsData/[component].ts`)
- [x] All props documented with `name`, `type`, `description`
- [x] `defaultValue` provided where applicable
- [x] Descriptions are clear and actionable
- [x] TypeScript types match component definition exactly
- [x] Union types formatted clearly: `'option1' | 'option2'`
- [x] Complex types (functions) clearly documented
- [x] `className / ref / native props` entries are clear (or split into separate rows)

### 6. TESTS (`src/tests/components/ui/[Component].test.tsx`)
- [x] Unit tests for core functionality
- [x] Accessibility tests (axe checks)
- [x] Keyboard interaction tests
- [x] Edge cases handled (empty state, disabled, etc.)
- [x] Controlled vs. uncontrolled behavior tested
- [x] All tests passing

### 7. COMPONENT SHOWCASE (`src/pages/ComponentsIndex.tsx`)
- [x] Component added to `componentsList` with preview
- [x] Preview uses small/compact variant for demo
- [x] `to` link points to `/docs/[component]`

### 8. EXPORTS & PACKAGE
- [x] Component exported from main `src/index.ts`
- [x] All supporting types/enums exported if needed
- [x] No unused imports in component or docs files

### 9. CONSISTENCY
- [x] Naming follows repo conventions (PascalCase components, camelCase props)
- [x] Styling uses Lithos design tokens (colors, spacing, typography)
- [x] Example code style matches existing component docs
- [x] Props table formatting consistent with other components

### 10. CONTENT QUALITY
- [x] Section headings are descriptive and parallel
- [x] Descriptions explain "what" and "when to use"
- [x] Code examples are copy-paste ready
- [x] No typos or broken links
- [x] Accessibility guidance is actionable
- [x] Progress/loading indicators or complex UX clearly documented

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
