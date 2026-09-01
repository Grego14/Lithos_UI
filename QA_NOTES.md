# Lithos UI QA & E2E Testing Notes

This file tracks important findings, gotchas, and test results from the End-to-End (E2E) verification of Lithos UI in external consumer projects.

## Core System Audit Findings

### 1. Tailwind v4 Dependency Scanning

- **Finding**: In Vite projects, Tailwind v4's Vite plugin automatically hooks into the module graph. When a consumer project imports `{ Button } from 'lithos-ui'`, Tailwind automatically scans the compiled code inside `node_modules/lithos-ui/dist/index.js` for classes.
- **Action**: You **do not** need to instruct users to add `@source "../node_modules/lithos-ui"` in their `index.css` for standard Vite setups. The plugin handles it natively.

### 2. CSS Layer Ordering (`p-2` Padding Bug)

- **Finding**: The import order of CSS files in the root (e.g., `App.tsx` or `main.tsx`) is critical for CSS layer precedence.
  - If a user imports `lithos-ui/tokens.css` **before** importing their own Tailwind `index.css`, the browser parses `@layer components` before Tailwind has a chance to establish the correct global layer order (`theme, base, components, utilities`).
  - This accidentally drops the `components` layer to the absolute bottom of the priority stack (below the `base` layer).
  - As a result, Tailwind's Preflight (`base` layer) resets like `padding: 0;` on `<button>` elements will erroneously override the `p-2` (`padding: 0.5rem`) assigned to `.lithos-click`.
- **Action**: Always ensure `import './index.css'` comes **before** `import 'lithos-ui/tokens.css'`. This establishes Tailwind's layer hierarchy first, ensuring `.lithos-click` (in `components`) safely overrides browser defaults and Preflight resets (`base`).

## Component Testing Progress

_(Update this section as components are verified in `lithos-test`)_

### Core System Audit

- [x] Global tokens load via `import 'lithos-ui/tokens.css'` — no undefined colors/borders/shadows.
- [x] `.lithos-click` physics work correctly on hover/active.
- [x] `.obsidian` (dark mode) toggles correctly across components with zero Lithos JS involved.
- [x] `--lithos-accent` override in the scratch project's own CSS takes effect with zero edits to Lithos source.
- [x] `--lithos-radius` override applies globally, and a per-instance `className="rounded-full"` still wins over it on at least one component — confirms the `cn()`/`tailwind-merge` resolution works outside the monorepo, not just inside it.
