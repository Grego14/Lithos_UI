import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { PreviewBlock } from '../components/ui/PreviewBlock'
import { Testimonials1 } from '../components/blocks/Testimonials/1'
import { Navbar1 as NavbarBlock } from '../components/blocks/Navbar/1'
import { Pricing1 } from '../components/blocks/Pricing/1'
import { FAQ1 } from '../components/blocks/FAQ/1'
import { FeatureGrid1 } from '../components/blocks/FeatureGrid/1'

interface BlocksIndexProps {
  isDarkMode: boolean
  toggleObsidian: () => void
}

import testimonialsCode from '../components/blocks/Testimonials/1.tsx?raw'
import navbarCode from '../components/blocks/Navbar/1.tsx?raw'
import pricingTableCode from '../components/blocks/Pricing/1.tsx?raw'
import faqCode from '../components/blocks/FAQ/1.tsx?raw'
import featureGridCode from '../components/blocks/FeatureGrid/1.tsx?raw'

export const BlocksIndex = ({ isDarkMode, toggleObsidian }: BlocksIndexProps) => {
  return (
    <>
      <Navbar isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
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
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Testimonials
                </h3>
                <PreviewBlock code={testimonialsCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Testimonials/1.tsx" slug="testimonials" height="600px">
                  <div className="w-full">
                    <Testimonials1 />
                  </div>
                </PreviewBlock>
              </div>

              {/* Navbars */}
              <div className="mb-16">
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Navbars
                </h3>
                <PreviewBlock code={navbarCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Navbar/1.tsx" height="400px" noPadding slug="navbar">
                  <div className="w-full relative h-100">
                    <NavbarBlock />
                  </div>
                </PreviewBlock>
              </div>

              {/* Pricing Tables */}
              <div className="mb-16">
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Pricing Tables
                </h3>
                <PreviewBlock code={pricingTableCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/Pricing/1.tsx" slug="pricing" height="800px">
                  <div className="w-full">
                    <Pricing1 />
                  </div>
                </PreviewBlock>
              </div>

              {/* FAQs */}
              <div className="mb-16">
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  FAQs
                </h3>
                <PreviewBlock code={faqCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/FAQ/1.tsx" slug="faq" height="600px">
                  <div className="w-full">
                    <FAQ1 />
                  </div>
                </PreviewBlock>
              </div>

              {/* Feature Grids */}
              <div className="mb-16">
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Features
                </h3>
                <PreviewBlock code={featureGridCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/FeatureGrid/1.tsx" slug="feature-grids" height="600px">
                  <div className="w-full">
                    <FeatureGrid1 />
                  </div>
                </PreviewBlock>
              </div>

              {/* Coming Soon Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <Card variant="default" className="opacity-70 bg-(--lithos-surface) grayscale">
                  <CardContent className="flex flex-col items-center justify-center min-h-48 text-center">
                    <h3 className="text-2xl font-black tracking-tighter">Hero Sections</h3>
                    <span className="mt-4 px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                  </CardContent>
                </Card>

                <Card variant="default" className="opacity-70 bg-(--lithos-surface) grayscale">
                  <CardContent className="flex flex-col items-center justify-center min-h-48 text-center">
                    <h3 className="text-2xl font-black tracking-tighter">Footers</h3>
                    <span className="mt-4 px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
