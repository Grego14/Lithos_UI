# Contributing to Lithos UI

Thank you for helping improve Lithos UI.

## Local Setup

```bash
git clone https://github.com/lithosui/Lithos_UI.git
cd Lithos_UI
pnpm install
pnpm dev
```

Useful project scripts from `package.json`:

- `pnpm dev` - start local development server
- `pnpm build` - production build
- `pnpm lint` - run ESLint
- `pnpm preview` - preview production build
- `pnpm format` - run Prettier

## Core Architecture Rules

These are required for all contributions:

- Zero-Gap Rule: do not use CSS `gap` for layout structure. Use explicit margin/padding math instead.
- Contrast integrity: when adding dynamic color behavior, route foreground contrast through the YIQ engine in `src/utils/yiq.ts`.
- Specificity override pattern: do not bypass theme token rebinding in `src/core/useTheme.ts` (`#lithos-theme-overrides` style injection).
- Physics token consistency: interactive controls should use the shared `.lithos-click` utility from `src/index.css` unless there is a documented exception.
- No soft shadow blur: keep the brutalist hard-shadow style (`0px` blur) intact.

## Code Style and Tooling

This repository currently uses:

- ESLint via `eslint.config.js`
- Prettier via `.prettierrc`
- Vite for dev/build
- TypeScript (`.ts`/`.tsx` instead of `.js`)

### Coding Conventions

- **Exports & Functions**: Always use named exports and arrow functions. Only use default exports or standard `function` declarations if strictly required by a framework or library.
- **File Types**: Always use `.tsx` and `.ts` rather than `.js`.

Before opening a PR, run:

```bash
pnpm lint
pnpm build
```

## Proposing a New Component

For a new component, include all of the following:

1. Component implementation under the appropriate `src/components/*` folder.
2. Any required shared logic/hooks under `src/core` or `src/utils`.
3. Route usage or integration where relevant (showroom/docs).
4. A docs page under `src/docs/pages` if it is a reusable public primitive.
5. README updates in the `Component Status` table.
6. Tests for behavior that affects architecture guarantees (contrast, specificity, interaction state, accessibility).

## Pull Request Process

1. Create a focused branch (recommended naming: `feat/...`, `fix/...`, `docs/...`, `test/...`, `chore/...`).
2. Keep changes scoped and include rationale in the PR description.
3. In the PR description, include:
   what changed
   why it changed
   architectural impact (Zero-Gap/contrast/specificity/physics tokens)
   screenshots or short clips for UI-impacting changes
4. Ensure CI is green before merge. Current workflow: `.github/workflows/main.yml` (lint + build). When test CI is added/expanded, link the run in the PR.

## Code of Conduct

Be respectful and constructive. Harassment, discrimination, and personal attacks are not tolerated.

By contributing, you agree your contributions are provided under this repository's license.
