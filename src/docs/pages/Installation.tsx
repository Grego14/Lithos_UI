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
        Lithos UI is not distributed as an opaque NPM package. It is a collection of highly engineered React components
        that you copy directly into your codebase. This guarantees you have absolute ownership over the structure,
        physics, and styling of your application.
      </p>

      <h2 id="base-template" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        1. The Base Template
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        The fastest way to start is by cloning the official Vite template. It comes pre-configured with Tailwind v4, our
        dynamic Theme Engine, and the base Obsidian mode CSS.
      </p>
      <CodeViewer
        code={
          '# Scaffold using degit\nnpx degit lithosui/Lithos_UI my-app\n\n# OR clone directly\ngit clone https://github.com/lithosui/Lithos_UI my-app\n\ncd my-app\npnpm install\npnpm dev'
        }
        language="bash"
      />

      <h2 id="global-css" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        2. Global CSS Configuration
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        If you are integrating into an existing project, you must define the Lithos UI physics engine and root tokens in
        your global CSS file. This powers the zero-render theme switching.
      </p>
      <CodeViewer code={cssConfig} language="css" />

      <h2
        id="theming-configuration"
        className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)"
      >
        3. Theming & Configuration
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Lithos UI relies entirely on native CSS custom properties for theming. You have two paths to configure your
        aesthetic:
      </p>

      <h3 className="text-xl font-bold uppercase tracking-tighter text-(--lithos-text) mb-2">
        Static Override (Recommended)
      </h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        The primary and most performant way to theme your application is to simply override the root tokens in your
        global CSS after importing <code>tokens.css</code>. For instance, updating <code>--lithos-accent</code> and{' '}
        <code>--lithos-radius</code> globally. No JavaScript is required.
      </p>

      <h3 className="text-xl font-bold uppercase tracking-tighter text-(--lithos-text) mb-2">Live In-App Theming</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        If you want your users to change themes dynamically at runtime, you can opt-in to using the{' '}
        <code>useLithosTheme</code> hook. This hook automatically injects live overrides into the DOM without forcing
        React to re-render the entire component tree.
      </p>

      <h3 className="text-xl font-bold uppercase tracking-tighter text-(--lithos-text) mb-2">Obsidian Mode</h3>
      <p className="mb-6 text-sm md:text-base text-(--lithos-text) max-w-3xl font-body">
        Dark mode is handled entirely by a single class. Simply toggle the <code>.obsidian</code> or <code>.dark</code>{' '}
        class on your <code>&lt;html&gt;</code> element to instantly invert the environmental tokens across your app.
      </p>
    </div>
  )
}
