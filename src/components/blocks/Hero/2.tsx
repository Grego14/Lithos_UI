/**
 * @fileoverview Generic hero block (Variant 2).
 * - Split-pane layout for product showcase.
 * - Text content on the left, visual asset placeholder on the right.
 */
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'
import { Card } from '../../ui/Card'

const Hero2 = () => (
  <section id="hero-block" className="bg-(--lithos-surface) overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:flex lg:items-center lg:gap-12">
      <div className="lg:w-1/2 flex flex-col items-start text-left mb-16 lg:mb-0">
        <div className="mb-6">
          <Badge variant="default" size="sm">
            Deployment Engine
          </Badge>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none md:text-7xl text-(--lithos-text)">
          Ship Without <br className="hidden lg:block" /> Compromise
        </h1>
        
        <p className="mt-8 text-xl font-normal leading-relaxed text-(--lithos-text) font-body">
          Stop rebuilding the same components. Use a system that guarantees 
          structural integrity across every viewport and device context.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-start w-full sm:w-auto">
          <Button className="w-full sm:w-auto text-lg px-8 py-4 sm:mr-4 mb-4 sm:mb-0">
            Start Free Trial
          </Button>
          <Button intent="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
            View Pricing
          </Button>
        </div>
      </div>
      
      <div className="lg:w-1/2 w-full">
        <Card variant="default" className="w-full h-full min-h-64 sm:min-h-96 flex items-center justify-center bg-(--lithos-bg)">
          <p className="font-black uppercase tracking-widest text-(--lithos-text) opacity-50 text-center p-8">
            [ Application Interface ]
          </p>
        </Card>
      </div>
    </div>
  </section>
)

export { Hero2 }
