/**
 * @fileoverview Lithos UI feature matrix.
 * - Presents the system as a rigid card field with explicit margins and hard edges.
 * - Uses scale-on-hover and shadow steps to imply physical lift without layout drift.
 * - Keeps the grid readable by controlling wrap math instead of relying on soft spacing.
 */

const features = [
  {
    title: 'Zero-Gap Layout System',
    icon: '■',
    description: 'Strict avoidance of CSS gap utilities. Perfect geometric stacking via explicit mathematically proportional margins.',
  },
  {
    title: 'Automated YIQ Contrast Engine',
    icon: '◐',
    description: 'Real-time foreground color recalculation guarantees AA+ accessibility against any dynamic background token.',
  },
  {
    title: 'Universal Specificity Overrides',
    icon: '▲',
    description: 'Engineered with a flat selector hierarchy, eliminating !important wrestling and enabling instant global theming.',
  },
  {
    title: 'Global Physics Tokens',
    icon: '⬣',
    description: 'Standardized hard-shadow offsets, staggered spring curves, and hover lifts baked natively into the core.',
  }
]

function FeatureGrid() {
  // - 24px shell keeps the block aligned with the page rhythm above and below.
  return (
    <section id="features" className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Four Architectural Pillars
        </h2>

        {/* - Negative outer margin cancels the card margin so the field stays centered. */}
        <div className="mt-20 -m-4 flex flex-wrap justify-center">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden m-4 w-full sm:w-[calc(50%-2rem)] border-4 border-(--lithos-border) bg-(--lithos-surface) p-6 cursor-pointer transition-all duration-75 shadow-[2px_2px_0px_0px_var(--lithos-shadow)] hover:shadow-[4px_4px_0px_0px_var(--lithos-shadow)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              {/* - The scale wipe is a hard plane, not a fade; the card stays geometrically intact. */}
              <div
                className="absolute inset-0 z-0 origin-top-left scale-0 bg-(--lithos-accent) transition-transform duration-300 ease-out group-hover:scale-100"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col">
                {/* - 56px icon tile: enough mass to anchor the card without crowding copy. */}
                <div
                  className="flex h-14 w-14 items-center justify-center border-4 border-(--lithos-border) bg-(--lithos-accent) text-3xl text-(--lithos-accent-text) group-hover:bg-(--lithos-text) group-hover:text-(--lithos-surface) transition-colors duration-300 z-10"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase tracking-tighter leading-none text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base font-medium leading-none text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors duration-300 font-body">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* - Footer link is centered to keep the card field visually sealed. */}
        <div className="mt-12 flex justify-center">
          <a
            href="/docs"
            className="font-black uppercase tracking-tighter text-(--lithos-text) transition-colors hover:text-(--lithos-accent) cursor-pointer"
          >
            Explore the full library →
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid
