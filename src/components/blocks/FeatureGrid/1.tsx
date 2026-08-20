import { Card, CardContent, CardTitle, CardDescription } from '../../ui/Card'

interface FeatureItem {
  title: string
  icon: string
  description: string
}

// Replace this array with data from your API or CMS
const features: FeatureItem[] = [
  {
    title: 'Real-time Analytics',
    icon: '■',
    description: 'Track your metrics in real-time with our beautiful, easy-to-use dashboard.',
  },
  {
    title: 'Enterprise Security',
    icon: '◐',
    description: 'Bank-grade encryption ensures your data is safe, secure, and fully compliant.',
  },
  {
    title: 'Seamless Integrations',
    icon: '▲',
    description: 'Connect to your favorite tools with one click. Zapier, Slack, and Salesforce ready.',
  },
  {
    title: '24/7 Support',
    icon: '⬣',
    description: 'Our dedicated team is here around the clock to ensure you never face downtime.',
  },
]

const FeatureGrid1 = () => {
  // - 24px shell keeps the block aligned with the page rhythm above and below.
  return (
    <section id="features" className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Everything you need to grow
        </h2>

        {/* - Negative outer margin cancels the card margin so the field stays centered. */}
        <div className="mt-20 -m-4 flex flex-wrap justify-center">
          {features.map((feature) => (
            <Card key={feature.title} variant="accent" interactive className="group m-4 w-full sm:w-[calc(50%-2rem)]">
              <CardContent className="flex flex-col h-full">
                {/* - 56px icon tile: enough mass to anchor the card without crowding copy. */}
                <div
                  className="flex h-14 w-14 items-center justify-center border-2 border-(--lithos-border) bg-(--lithos-accent) text-3xl text-(--lithos-accent-text) group-hover:bg-(--lithos-text) group-hover:text-(--lithos-surface) transition-colors duration-300"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <CardTitle className="mt-6 text-2xl mb-4">{feature.title}</CardTitle>
                <CardDescription className="text-base font-medium">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* - Footer link is centered to keep the card field visually sealed. */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="font-black uppercase tracking-tighter text-(--lithos-text) transition-colors hover:text-(--lithos-accent) cursor-pointer"
          >
            Explore all Features →
          </a>
        </div>
      </div>
    </section>
  )
}

export { FeatureGrid1 }
