import { Card } from '../../ui/Card'
import { Button } from '../../ui/Button'

interface PricingFeature {
  label: string
  included: boolean
}

interface PricingPlan {
  key: string
  title: string
  price: string
  highlighted: boolean
  features: PricingFeature[]
  goal: string
  cta: string
}

const plans: PricingPlan[] = [
  {
    key: 'starter',
    title: 'STARTER',
    price: '$29',
    highlighted: false,
    features: [
      { label: 'Up to 5 Users', included: true },
      { label: 'Basic Analytics', included: true },
      { label: '24/7 Support', included: false },
      { label: 'Custom Domain', included: false },
    ],
    goal: 'Perfect for small teams getting started.',
    cta: 'Start Free Trial',
  },
  {
    key: 'pro',
    title: 'PRO',
    price: '$79',
    highlighted: true,
    features: [
      { label: 'Up to 20 Users', included: true },
      { label: 'Advanced Analytics', included: true },
      { label: '24/7 Support', included: true },
      { label: 'Custom Domain', included: false },
    ],
    goal: 'For growing businesses that need more power.',
    cta: 'Upgrade to Pro',
  },
  {
    key: 'enterprise',
    title: 'ENTERPRISE',
    price: '$199',
    highlighted: false,
    features: [
      { label: 'Unlimited Users', included: true },
      { label: 'Custom Analytics', included: true },
      { label: '24/7 Priority Support', included: true },
      { label: 'Custom Domain', included: true },
    ],
    goal: 'Maximum performance and dedicated support.',
    cta: 'Contact Sales',
  },
]

export const Pricing1 = () => {
  return (
    <section className="bg-(--lithos-bg) py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg font-bold leading-none text-center text-(--lithos-text) opacity-70 md:text-xl">
          Choose the plan that fits your needs.
        </p>

        <div className="mt-20 -m-4 flex flex-wrap justify-center items-stretch">
          {plans.map((tier) => {
            const highlighted = tier.highlighted === true

            return (
              <Card
                key={tier.key}
                variant={highlighted ? 'solid' : 'default'}
                className={
                  highlighted
                    ? 'm-4 flex w-[calc(100%-2rem)] md:w-[calc(33.333%-2rem)] flex-col border-4 p-6 sm:p-8 shadow-[8px_8px_0px_0px_var(--lithos-shadow)] hover:shadow-[10px_10px_0px_0px_var(--lithos-shadow)] transition-shadow duration-200 md:scale-105 md:z-10'
                    : 'm-4 flex w-[calc(100%-2rem)] md:w-[calc(33.333%-2rem)] flex-col p-6 sm:p-8 hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)] transition-shadow duration-200'
                }
              >
                <h3
                  className={`text-2xl font-black uppercase tracking-tighter leading-none ${
                    highlighted ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text)'
                  }`}
                >
                  {tier.title}
                </h3>
                <p
                  className={`mt-4 text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none ${
                    highlighted ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text)'
                  }`}
                >
                  {tier.price}
                  <span className="text-xl opacity-70">/mo</span>
                </p>
                <p
                  className={`mt-4 text-base font-medium leading-snug ${
                    highlighted ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text)'
                  }`}
                >
                  {tier.goal}
                </p>

                <div className="mt-8">
                  <ul>
                    {tier.features &&
                      tier.features.map((feature, i) => (
                        <li
                          key={`${tier.key}-f-${i}`}
                          className={
                            'leading-snug font-bold uppercase tracking-tighter' +
                            (feature.included
                              ? highlighted
                                ? ' text-(--lithos-accent-text)'
                                : ' text-(--lithos-text)'
                              : highlighted
                                ? ' line-through opacity-50 text-(--lithos-accent-text)'
                                : ' line-through opacity-50 text-(--lithos-text)') +
                            (i < tier.features.length - 1 ? ' mb-3' : '')
                          }
                        >
                          {feature.included ? '✓ ' : '✕ '}
                          {feature.label}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <Button intent={highlighted ? 'secondary' : 'primary'} fullWidth>
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
