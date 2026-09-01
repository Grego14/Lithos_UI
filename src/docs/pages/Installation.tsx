import { CodeViewer } from '../../components/ui/CodeViewer'

const cssConfig = `@import './tokens.css';

/* If you need static global overrides, declare them here: */
:root {
  /* --lithos-accent: #FF00FF; */
  /* --lithos-radius: 8px; */
}`

export const Installation = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Installation
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          How to integrate the zero-gap architecture into your project
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Lithos UI offers two ways to build: install components via NPM for quick setup, or copy-paste the source
        directly into your codebase if you want absolute ownership over the structure and physics.
      </p>
      <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        <strong>Note:</strong> Every component's docs page has a Manual tab with the copy-paste source. Blocks remain
        copy-paste only.
      </p>

      <h2 id="npm-installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        NPM
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Install the package directly into your project. You can then import components and global tokens out of the box.
      </p>
      <CodeViewer code={'pnpm add lithos-ui\n# or npm install / yarn add / bun add'} language="bash" />
      <p className="mt-6 mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Import the global tokens in your root file (e.g., <code>App.tsx</code>) and start building:
      </p>
      <CodeViewer code={"import 'lithos-ui/tokens.css'\nimport { Button } from 'lithos-ui'"} language="tsx" />

      <h2 id="manual" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Manual
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        If you prefer the original code-ownership model, the fastest way to start is by cloning the official Vite
        template. It comes pre-configured with Tailwind v4, our dynamic Theme Engine, and the base Obsidian mode CSS.
      </p>
      <CodeViewer
        code={'git clone https://github.com/lithosui/Lithos_UI my-app\ncd my-app\npnpm install\npnpm dev'}
        language="bash"
      />

      <h2 id="global-css" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Global CSS
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        If you are integrating into an existing project, you must define the Lithos UI physics engine and root tokens.
        If you are importing these in your JavaScript entrypoint (like <code>main.tsx</code> or <code>App.tsx</code>),{' '}
        <strong>the import order is critical</strong>.
      </p>

      <div className="border-l-4 border-red-500 pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>CRITICAL: Tailwind v4 Layer Ordering</strong>
          <br />
          You must import your Tailwind CSS file <strong>before</strong> importing <code>lithos-ui/tokens.css</code>. If
          you import Lithos UI first, the browser will drop its <code>@layer components</code> to the bottom of the
          priority stack, causing Tailwind's Preflight to accidentally erase button padding and interactive physics.
        </p>
      </div>

      <CodeViewer
        code={`// Correct Import Order
import './index.css' // Your Tailwind configuration MUST come first
import 'lithos-ui/tokens.css' // Lithos UI tokens come second`}
        language="tsx"
      />

      <h2 id="theming" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Theming
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Lithos UI relies entirely on native CSS custom properties for theming. You have two paths to configure your
        aesthetic:
      </p>

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mb-2">Static Override (Recommended)</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        The primary and most performant way to theme your application is to simply override the root tokens in your
        global CSS after importing <code>tokens.css</code>. For instance, updating <code>--lithos-accent</code> and{' '}
        <code>--lithos-radius</code> globally. No JavaScript is required.
      </p>
      <CodeViewer code={cssConfig} language="css" />

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mb-2">Live In-App Theming</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        If you want your users to change themes dynamically at runtime, you can opt-in to using the{' '}
        <code>useLithosTheme</code> hook. This hook automatically injects live overrides into the DOM without forcing
        React to re-render the entire component tree.
      </p>

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mb-2">Obsidian Mode</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        Dark mode is handled entirely by a single class. Simply toggle the <code>.obsidian</code> or <code>.dark</code>{' '}
        class on your <code>&lt;html&gt;</code> element to instantly invert the environmental tokens across your app.
      </p>
    </div>
  )
}
