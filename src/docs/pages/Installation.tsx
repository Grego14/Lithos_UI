import { CodeViewer } from '../../components/ui/CodeViewer'

const cssConfig = `@import "tailwindcss";
@import "lithos-ui/tokens.css";

/* If you need static global overrides, declare them here: */
:root {
  --lithos-accent: #FF00FF; 
  --lithos-accent-text: #FFFFFF; 
  --lithos-radius: 8px;
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

      <div className="border-l-4 border-blue-500 pl-6 py-2 mt-8 mb-6 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Tailwind v4 Configuration</strong>
          <br />
          If you are using Tailwind CSS v4, you must explicitly tell the compiler to scan the Lithos UI library to
          generate the correct utility classes for dynamic variants.
        </p>
      </div>
      <CodeViewer code={`@import 'tailwindcss';\n@source '../node_modules/lithos-ui';`} language="css" />

      <p className="mt-8 mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Start importing components and building your UI:
      </p>
      <CodeViewer code={"import { Button } from 'lithos-ui'"} language="tsx" />

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
        The most robust way to do this is by importing our tokens directly inside your main CSS file (e.g.,{' '}
        <code>index.css</code>), immediately after Tailwind.
      </p>

      <div className="border-l-4 border-red-500 pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>CRITICAL: Tailwind v4 Layer Ordering & Cascade Rules</strong>
          <br />
          You must import Tailwind <strong>before</strong> importing <code>lithos-ui/tokens.css</code> so that our{' '}
          <code>@layer components</code> are prioritized correctly.
          <br />
          <br />
          Additionally, importing the tokens directly inside your CSS file (rather than in your JS entrypoint) ensures
          your custom <code>:root</code> overrides evaluate last. This allows them to successfully win the CSS cascade
          without requiring specificity hacks like <code>html:root</code>.
        </p>
      </div>

      <CodeViewer
        code={`@import "tailwindcss";
@import "lithos-ui/tokens.css"; /* Must be imported second */

/* Your overrides safely go here and win the cascade! */
:root {
  --lithos-accent: #b910ae;
}`}
        language="css"
      />

      <h2 id="theming" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Theming
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Lithos UI relies entirely on native CSS custom properties for theming. You have two paths to configure your
        aesthetic:
      </p>

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mb-2">
        Live In-App Theming (Recommended)
      </h3>
      <p className="mb-4 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        If you want your users to change themes dynamically at runtime, you can opt-in to using the{' '}
        <code>useLithosTheme</code> hook. This hook automatically injects live overrides into the DOM without forcing
        React to re-render the entire component tree.
      </p>

      <CodeViewer
        code={`import { Button, useLithosTheme } from 'lithos-ui'

export function App() {
  // Destructure toggleObsidian to correctly toggle dark mode
  const { toggleObsidian } = useLithosTheme({ accentColor: '#123456', radius: 8 })

  return <Button onClick={toggleObsidian}>Toggle Theme</Button>
}`}
        language="tsx"
      />

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mt-8 mb-2">Static Override</h3>
      <p className="mb-4 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        An alternative, highly performant way to theme your application is to simply override the root tokens in your
        global CSS after importing <code>tokens.css</code>. For instance, updating <code>--lithos-accent</code> and{' '}
        <code>--lithos-radius</code> globally. No JavaScript is required.
      </p>

      <div className="border-l-4 border-yellow-500 pl-6 py-2 mb-6 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Warning: Static Overrides & Text Contrast</strong>
          <br />
          Because pure CSS cannot perform YIQ contrast math, if you override <code>--lithos-accent</code> manually, you{' '}
          <strong>must</strong> also manually define <code>--lithos-accent-text</code> (e.g. #000000 or #FFFFFF). The
          dynamic YIQ engine only runs if you use the <code>useLithosTheme</code> React Hook.
        </p>
      </div>

      <CodeViewer code={cssConfig} language="css" />

      <h3 className="text-xl font-bold tracking-tighter text-(--lithos-text) mt-8 mb-2">Obsidian Mode (Dark Mode)</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        <strong>If using Static Overrides:</strong> Dark mode is handled entirely by a single class. Simply toggle the{' '}
        <code>.obsidian</code> or <code>.dark</code> class on your <code>&lt;html&gt;</code> element to instantly invert
        the environmental tokens across your app.
      </p>

      <CodeViewer
        code={`// Example of a manual toggle for Static Overrides
const toggleStaticTheme = () => {
  document.documentElement.classList.toggle('obsidian')
}`}
        language="ts"
      />
      <div className="border-l-4 border-yellow-500 pl-6 py-2 mb-6 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Warning: Do not manually toggle classes if using useLithosTheme!</strong>
          <br />
          If you are using the <code>useLithosTheme</code> hook, you <strong>must</strong> use the{' '}
          <code>toggleObsidian</code> function it returns to change themes. Manually toggling classes on the DOM will
          bypass the engine, breaking YIQ contrast calculations and localStorage persistence.
        </p>
      </div>
    </div>
  )
}
