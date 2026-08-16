/**
 * @fileoverview Generic hero block (Variant 1).
 * - Heavy, high-contrast entry section.
 * - Centers on a dominant headline with supporting copy and dual CTAs.
 */
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

const Hero1 = () => (
  <section id="hero-block" className="bg-(--lithos-surface) py-24 md:py-32">
    <div className="mx-auto max-w-5xl px-6 text-center flex flex-col items-center">
      <div className="mb-6">
        <Badge variant="default" size="sm">
          New Feature Announcement
        </Badge>
      </div>

      <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
        Build Something <br className="hidden md:block" /> Unbreakable
      </h1>

      <p className="mt-8 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) font-body max-w-3xl">
        Stop fighting with fragile layouts. Start shipping with confidence. A reliable system built for maximum velocity
        and aesthetics.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center">
        <Button className="w-full sm:w-auto text-lg px-8 py-4 sm:mr-6 mb-4 sm:mb-0">Start Free Trial</Button>
        <Button intent="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
          Read Documentation
        </Button>
      </div>
    </div>
  </section>
)

export { Hero1 }
