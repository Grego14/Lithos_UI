import React from 'react'

// Components
import { Hero1 } from './Hero/1'
import { Hero2 } from './Hero/2'
import { Footer1 } from './Footer/1'
import { Footer2 } from './Footer/2'
import { Testimonials1 } from './Testimonials/1'
import { Navbar1 } from './Navbar/1'
import { Pricing1 } from './Pricing/1'
import { FAQ1 } from './FAQ/1'
import { FeatureGrid1 } from './FeatureGrid/1'

// Code strings
import hero1Code from './Hero/1.tsx?raw'
import hero2Code from './Hero/2.tsx?raw'
import footer1Code from './Footer/1.tsx?raw'
import footer2Code from './Footer/2.tsx?raw'
import testimonials1Code from './Testimonials/1.tsx?raw'
import navbar1Code from './Navbar/1.tsx?raw'
import pricing1Code from './Pricing/1.tsx?raw'
import faq1Code from './FAQ/1.tsx?raw'
import featureGrid1Code from './FeatureGrid/1.tsx?raw'

export interface BlockVariant {
  slug: string
  name: string
  component: React.ComponentType
  code: string
  githubUrl: string
}

export interface BlockCategory {
  slug: string
  title: string
  description: string
  variants: BlockVariant[]
}

const GITHUB_BASE = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/blocks'

export const blockCategories: BlockCategory[] = [
  {
    slug: 'hero',
    title: 'Hero Sections',
    description: 'Heavy, high-contrast entry sections that anchor the page and drive immediate action.',
    variants: [
      {
        slug: 'hero-1',
        name: 'Standard Hero',
        component: Hero1,
        code: hero1Code,
        githubUrl: `${GITHUB_BASE}/Hero/1.tsx`
      },
      {
        slug: 'hero-2',
        name: 'Split Layout Hero',
        component: Hero2,
        code: hero2Code,
        githubUrl: `${GITHUB_BASE}/Hero/2.tsx`
      }
    ]
  },
  {
    slug: 'footers',
    title: 'Footers',
    description: 'Closing structural slabs that anchor the bottom of the page and provide deep navigation.',
    variants: [
      {
        slug: 'footer-1',
        name: 'Multi-column Footer',
        component: Footer1,
        code: footer1Code,
        githubUrl: `${GITHUB_BASE}/Footer/1.tsx`
      },
      {
        slug: 'footer-2',
        name: 'Minimal Footer',
        component: Footer2,
        code: footer2Code,
        githubUrl: `${GITHUB_BASE}/Footer/2.tsx`
      }
    ]
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    description: 'Social proof plaques that turn customer quotes into structural page elements.',
    variants: [
      {
        slug: 'testimonials-1',
        name: 'Standard Grid',
        component: Testimonials1,
        code: testimonials1Code,
        githubUrl: `${GITHUB_BASE}/Testimonials/1.tsx`
      }
    ]
  },
  {
    slug: 'navbars',
    title: 'Navbars',
    description: 'Zero-gap top navigation bars that maintain the structural boundary of the viewport.',
    variants: [
      {
        slug: 'navbar-1',
        name: 'Standard Navbar',
        component: Navbar1,
        code: navbar1Code,
        githubUrl: `${GITHUB_BASE}/Navbar/1.tsx`
      }
    ]
  },
  {
    slug: 'pricing',
    title: 'Pricing Tables',
    description: 'High-contrast comparative grids for distinct tier differentiation.',
    variants: [
      {
        slug: 'pricing-1',
        name: '3-Tier Grid',
        component: Pricing1,
        code: pricing1Code,
        githubUrl: `${GITHUB_BASE}/Pricing/1.tsx`
      }
    ]
  },
  {
    slug: 'faq',
    title: 'FAQs',
    description: 'Expandable accordion grids for compact information delivery.',
    variants: [
      {
        slug: 'faq-1',
        name: 'Standard FAQ',
        component: FAQ1,
        code: faq1Code,
        githubUrl: `${GITHUB_BASE}/FAQ/1.tsx`
      }
    ]
  },
  {
    slug: 'feature-grids',
    title: 'Feature Grids',
    description: 'Structured layout arrays for highlighting core capabilities and benefits.',
    variants: [
      {
        slug: 'feature-grids-1',
        name: 'Classic Grid',
        component: FeatureGrid1,
        code: featureGrid1Code,
        githubUrl: `${GITHUB_BASE}/FeatureGrid/1.tsx`
      }
    ]
  }
]
