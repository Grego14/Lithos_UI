/**
 * @fileoverview Lithos UI hero slab.
 * - Opens the page with a zero-gap vertical anchor and a heavy terminal-style showcase.
 * - Utilizes the KineticGrid to create an interactive tracking environment.
 * - Keeps the opening rhythm controlled by explicit spacing math and centered containment.
 */
import { Link } from 'react-router-dom'
import CodeViewer from '../ui/CodeViewer'
import KineticGrid from '../ui/KineticGrid'

function Hero() {
  const appShowcaseCode = `import { 
  ThemeEngine, 
  Hero, 
  FeatureGrid, 
  Pricing, 
  FAQ 
} from './components';

export default function App() {
  return (
    <main className="obsidian">
      <ThemeEngine />
      <Hero
        heading="SHIP FASTER"
        motion="spring"
      />
      <FeatureGrid
        columns={3}
        icons="heavy-glyphs"
      />
      <Pricing
        tier="pro"
        highlight="accent"
      />
      <FAQ
        mode="single-active"
      />
    </main>
  );
}`;

  return (
    <section id="top" className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
      {/* Deploying the tracking engine to the main landing viewport */}
      <KineticGrid baseOpacity="opacity-10" className="py-12 md:py-24 w-full">
        
        {/* Centered lane: keeps the slab width inside the page’s vertical cadence */}
        <div className="mx-auto max-w-6xl px-6 text-center w-full">
          
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
            BUILD FRONTENDS THAT REFUSE TO BREAK
          </h1>

          <p className="mt-6 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) md:text-3xl font-body max-w-4xl mx-auto">
            Lithos UI is a neo-brutalist React component library engineered with absolute
            structural integrity.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center sm:flex-row flex-wrap">
            <Link
              to="/docs"
              className="inline-block border-2 border-(--lithos-border) bg-(--lithos-accent) px-8 py-4 font-black uppercase tracking-tighter leading-none text-(--lithos-accent-text) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] lithos-click mb-4 sm:mb-0 sm:mr-6"
            >
              Documentation
            </Link>

            <a
              href="https://github.com/IncredibleStand/Lithos_UI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-4 border-(--lithos-border) bg-(--lithos-surface) px-8 py-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) lithos-click"
            >
              View on GitHub
            </a>
          </div>

          {/* The CodeViewer itself now wrapped in a hard border */}
            <div className="border-4 border-(--lithos-border) bg-(--lithos-bg) mt-16">
              <CodeViewer code={appShowcaseCode} showControls={true} />
            </div>
          
        </div>
      </KineticGrid>
    </section>
  )
}

export default Hero