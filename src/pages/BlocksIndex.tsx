import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { PreviewBlock } from '../components/ui/PreviewBlock'
import { KineticGrid } from '../components/ui/KineticGrid'
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
      <Navbar />
      <main className="pt-24 min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
        {/* Hero Section */}
        <section className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
          <KineticGrid baseOpacity="opacity-10" className="py-12 md:py-24 w-full">
            <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
              <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
                  ASSEMBLE PAGES, NOT ATOMS
                </p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
                  BLOCKS THAT<br /> HOLD WEIGHT
                </h1>
                <h2 className="mt-4 text-3xl sm:text-4xl font-display md:text-5xl italic font-medium text-(--lithos-accent) max-w-4xl mx-auto lg:mx-0">
                  Pre-composed, production-ready sections built from Lithos primitives.
                </h2>
              </div>
            </div>
          </KineticGrid>
        </section>

        {/* Category Catalog */}
        <section className="py-12 border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap -m-3">
              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <a
                  href="#block-testimonials"
                  className="block group lithos-click h-full"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('block-testimonials')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border)">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-[250%] scale-[0.4] origin-top-left">
                        <Testimonials1 />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      Testimonials
                    </h3>
                  </div>
                </a>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <a
                  href="#block-navbars"
                  className="block group lithos-click h-full"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('block-navbars')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border)">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-[200%] scale-[0.5] origin-top-left">
                        <NavbarBlock />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      Navbars
                    </h3>
                  </div>
                </a>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <a
                  href="#block-pricing"
                  className="block group lithos-click h-full"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('block-pricing')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border)">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-[250%] scale-[0.4] origin-top-left">
                        <Pricing1 />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      Pricing Tables
                    </h3>
                  </div>
                </a>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <a
                  href="#block-faq"
                  className="block group lithos-click h-full"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('block-faq')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border)">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-[200%] scale-[0.5] origin-top-left">
                        <FAQ1 />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      FAQs
                    </h3>
                  </div>
                </a>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <a
                  href="#block-features"
                  className="block group lithos-click h-full"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('block-features')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border)">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-[200%] scale-[0.5] origin-top-left">
                        <FeatureGrid1 />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      Features
                    </h3>
                  </div>
                </a>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <div className="block h-full opacity-70 grayscale">
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border) flex items-center justify-center">
                    <span className="px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text)">
                      Hero Sections
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                <div className="block h-full opacity-70 grayscale">
                  <div className="h-48 overflow-hidden bg-(--lithos-surface) relative border-2 border-(--lithos-border) flex items-center justify-center">
                    <span className="px-3 py-1 bg-(--lithos-border) text-(--lithos-bg) text-xs font-bold uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text)">
                      Footers
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col space-y-12">

              {/* Testimonial Grids */}
              <div id="block-testimonials" className="mb-16 scroll-mt-32">
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
              <div id="block-navbars" className="mb-16 scroll-mt-32">
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
              <div id="block-pricing" className="mb-16 scroll-mt-32">
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
              <div id="block-faq" className="mb-16 scroll-mt-32">
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
              <div id="block-features" className="mb-16 scroll-mt-32">
                <h3 className="text-3xl font-black tracking-tighter mb-8 border-b-2 border-(--lithos-border) pb-4">
                  Features
                </h3>
                <PreviewBlock code={featureGridCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks/FeatureGrid/1.tsx" slug="feature-grids" height="600px">
                  <div className="w-full">
                    <FeatureGrid1 />
                  </div>
                </PreviewBlock>
              </div>



            </div>
          </div>
        </section>
      </main>
      <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
    </>
  )
}
