import { Accordion, AccordionGroup } from '../../ui/Accordion'

interface FAQItem {
  question: string
  answer: string
}

// Replace this array with data from your API
const faqs: FAQItem[] = [
  {
    question: 'Is this product scalable?',
    answer: 'Absolutely. We handle millions of requests a day without breaking a sweat.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No long-term contracts. You can cancel your subscription at any time with one click.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a 14-day free trial on all plans. No credit card required.',
  },
  {
    question: 'What happens if I go over my plan limits?',
    answer: 'We will notify you before you hit your limits. We never cut off service unexpectedly.',
  },
]

const FAQ1 = () => {
  return (
    <section id="faq" className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Frequently Asked Questions
        </h2>

        <AccordionGroup className="mt-20 w-full" allowMultiple={false}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.question}
              value={faq.question}
              title={
                <span className="pr-6 text-2xl tracking-tighter leading-none text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors md:text-3xl">
                  {faq.question}
                </span>
              }
              classes={{
                container:
                  'border-2 border-(--lithos-border) bg-(--lithos-surface) transition-all duration-150 ease-out',
                header: 'group px-6 py-6 hover:bg-(--lithos-accent)',
                content: 'border-t-4 border-(--lithos-border) bg-(--lithos-surface) px-6 py-6',
              }}
            >
              <p className="text-lg font-body tracking-tighter leading-none text-(--lithos-text)">{faq.answer}</p>
            </Accordion>
          ))}
        </AccordionGroup>
      </div>
    </section>
  )
}

export { FAQ1 }
