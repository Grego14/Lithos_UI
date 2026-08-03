import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { PreviewBlock } from '../components/ui/PreviewBlock'
import { Testimonials } from '../components/blocks/Testimonials'
import { Navbar as NavbarBlock } from '../components/blocks/Navbar'
import { Pricing } from '../components/blocks/Pricing'

interface BlocksIndexProps {
  isDarkMode: boolean
  toggleObsidian: () => void
}

import testimonialsCode from '../components/blocks/Testimonials.tsx?raw'
import navbarCode from '../components/blocks/Navbar.tsx?raw'
import pricingTableCode from '../components/blocks/Pricing.tsx?raw'

export const BlocksIndex = ({ isDarkMode, toggleObsidian }: BlocksIndexProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
        {/* Hero Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 text-(--lithos-text)">
              Blocks
            </h1>
            <p className="text-xl md:text-2xl font-normal max-w-3xl mb-16 font-body">
              Pre-composed, production-ready sections built from Lithos primitives. Shipping a page means copying a section, not hand-building one from scratch.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col space-y-12">

              {/* Testimonial Grids */}
              <div className="mb-16">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Testimonial Grids
                </h3>
                <PreviewBlock code={testimonialsCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Testimonials.tsx" slug="testimonials" height="600px">
                  <div className="w-full">
                    <Testimonials />
                  </div>
                </PreviewBlock>
              </div>

              {/* Navbars */}
              <div className="mb-16">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Nav Bars
                </h3>
                <PreviewBlock code={navbarCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Navbar.tsx" height="400px" noPadding slug="navbar">
                  <div className="w-full relative h-[400px]">
                    <NavbarBlock />
                  </div>
                </PreviewBlock>
              </div>

              {/* Pricing Tables */}
              <div className="mb-16">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Pricing Tables
                </h3>
                <PreviewBlock code={pricingTableCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Pricing.tsx" slug="pricing" height="800px">
                  <div className="w-full">
                    <Pricing />
                  </div>
                </PreviewBlock>
              </div>

              {/* Coming Soon Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 sapce-x-6">
                <Card variant="default" className="opacity-70 bg-(--lithos-surface) grayscale">
                  <CardContent className="flex flex-col items-center justify-center min-h-48 text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Hero Sections</h3>
                    <span className="mt-4 px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                  </CardContent>
                </Card>

                <Card variant="default" className="opacity-70 bg-(--lithos-surface) grayscale">
                  <CardContent className="flex flex-col items-center justify-center min-h-48 text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Footers</h3>
                    <span className="mt-4 px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                  </CardContent>
                </Card>

                <Card variant="default" className="opacity-70 bg-(--lithos-surface) grayscale">
                  <CardContent className="flex flex-col items-center justify-center min-h-48 text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Feature Grids</h3>
                    <span className="mt-4 px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
    </>
  )
}
