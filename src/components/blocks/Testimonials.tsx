/**
 * @fileoverview Lithos UI testimonial wall.
 * - Turns social proof into the same hard-surfaced card language as the rest of the system.
 * - Uses explicit margins and shadow steps so the quotes read as physical plaques.
 * - Keeps the grid wide and stable to avoid visual drift in the proof section.
 */
import { Card } from '../ui/Card'

interface Testimonial {
  quote: string
  name: string
  title: string
}

// NOTE: These are example names/quotes for template purposes, not real Lithos testimonials.
const testimonials: Testimonial[] = [
  {
    quote: 'Lithos UI gave our launch page a spine. It looks aggressive and stays readable.',
    name: 'Maya Chen',
    title: 'Design Lead',
  },
  {
    quote: 'The components feel like they were engineered, not skinned. That matters.',
    name: 'Jordan Lee',
    title: 'Frontend Director',
  },
  {
    quote: 'Fast to assemble, hard to break, and impossible to confuse with generic UI kits.',
    name: 'Ari Patel',
    title: 'Product Builder',
  },
]

const Testimonials = () => <section id="testimonials" className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) py-24">
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
          className="m-4 flex w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] flex-col p-6 shadow-[4px_4px_0px_0px_var(--lithos-shadow)] transition-all duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)] active:shadow-[2px_2px_0px_0px_var(--lithos-shadow)]"
        >
          {/* - 6px shadow offset gives the quote plaque a clear physical edge. */}
          <p className="text-lg font-black uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
            ★★★★★
          </p>
          <p className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
            {testimonial.quote}
          </p>

          {/* - Avatar + byline stay compact so the plaque weight remains on the quote. */}
          <div className="mt-8 flex items-center">
            <div
              className="h-12 w-12 rounded-full border-4 border-(--lithos-border) bg-(--lithos-surface)"
              aria-hidden="true"
            />
            <div className="ml-4">
              <p className="font-black uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
                {testimonial.name}
              </p>
              <p className="mt-2 font-bold uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
                {testimonial.title}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>;

export { Testimonials }
