/**
 * @fileoverview Lithos UI testimonial wall.
 * - Turns social proof into the same hard-surfaced card language as the rest of the system.
 * - Uses explicit margins and shadow steps so the quotes read as physical plaques.
 * - Keeps the grid wide and stable to avoid visual drift in the proof section.
 */
import { Card } from '../../ui/Card'
import { Avatar } from '../../ui/Avatar'

interface Testimonial {
  quote: string
  name: string
  title: string
}

// NOTE: These are example names/quotes for template purposes, not real Lithos testimonials.
const testimonials: Testimonial[] = [
  {
    quote: 'This product completely transformed how we operate. The workflow is incredibly smooth and efficient.',
    name: 'Jane Doe',
    title: 'Marketing Director',
  },
  {
    quote: "I've tried every solution on the market, but nothing comes close to this level of polish and reliability.",
    name: 'John Smith',
    title: 'Lead Engineer',
  },
  {
    quote: "The return on investment was immediate. Our team adopted it in hours and we've never looked back.",
    name: 'Sarah Jones',
    title: 'Founder & CEO',
  },
]

const Testimonials1 = () => (
  <section id="testimonials" className="bg-(--lithos-surface) py-24">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
        Proof From the Front Lines
      </h2>

      {/* - Negative outer margin keeps the quote grid centered without gap-based layout math. */}
      <div className="mt-20 -m-4 flex flex-wrap justify-center">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            variant="accent"
            className="m-4 flex w-[calc(100%-2rem)] sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] flex-col p-6 shadow-[4px_4px_0px_0px_var(--lithos-shadow)] transition-all duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)] active:shadow-[2px_2px_0px_var(--lithos-shadow)]"
          >
            {/* - 6px shadow offset gives the quote plaque a clear physical edge. */}
            <p className="text-lg font-black uppercase tracking-tighter leading-none">★★★★★</p>
            <p className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none">{testimonial.quote}</p>

            {/* - Avatar + byline stay compact so the plaque weight remains on the quote. */}
            <div className="mt-8 flex items-center">
              <Avatar alt={testimonial.name} />
              <div className="ml-4">
                <p className="font-black uppercase tracking-tighter leading-none">{testimonial.name}</p>
                <p className="mt-2 font-bold uppercase tracking-tighter leading-none">{testimonial.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

export { Testimonials1 }
