/**
 * @fileoverview Lithos UI accordion stack.
 * - Packs questions into a hard-edged vertical wall with explicit open/closed slabs.
 * - Uses the same zero-gap spacing language as the rest of the system.
 * - Keeps the reveal motion physical by changing fill weight, not layout flow.
 */

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Is this product scalable?',
    answer:
      'Absolutely. We handle millions of requests a day without breaking a sweat.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No long-term contracts. You can cancel your subscription at any time with one click.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes, we offer a 14-day free trial on all plans. No credit card required.',
  },
  {
    question: 'What happens if I go over my plan limits?',
    answer:
      'We will notify you before you hit your limits. We never cut off service unexpectedly.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Frequently Asked Questions
        </h2>

        {/* - 24px shell keeps the accordion aligned with the page rhythm. */}
        <div className="mt-20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className={
                  index === 0
                    ? 'border-2 border-(--lithos-border) bg-(--lithos-surface) transition-all duration-150 ease-out'
                    : 'mt-6 border-2 border-(--lithos-border) bg-(--lithos-surface) transition-all duration-150 ease-out'
                }
              >
                {/* - Open/closed states shift color and mass, not geometry. */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className={
                    isOpen
                      ? 'flex w-full items-center justify-between bg-(--lithos-accent) px-6 py-6 text-left transition-all duration-150 ease-out cursor-pointer'
                      : 'group flex w-full items-center justify-between bg-(--lithos-surface) hover:bg-(--lithos-accent) px-6 py-6 text-left shadow-[4px_4px_0px_0px_var(--lithos-shadow)] transition-all duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)] active:shadow-[2px_2px_0px_0px_var(--lithos-shadow)] cursor-pointer'
                  }
                >
                  <span
                    className={`pr-6 text-2xl font-black uppercase tracking-tighter leading-none md:text-3xl ${isOpen ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors'}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`text-5xl font-black uppercase tracking-tighter leading-none ${isOpen ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors'}`}
                    aria-hidden="true"
                  >
                    {isOpen ? '-' : '+'}
                  </span>
                </button>

                {/* - The answer is a separate slab with a hard top border to preserve the stack. */}
                {isOpen ? (
                  <div className="border-t-4 border-(--lithos-border) bg-(--lithos-accent) px-6 py-6">
                    <p className="text-lg font-bold uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
};

export { FAQ }
