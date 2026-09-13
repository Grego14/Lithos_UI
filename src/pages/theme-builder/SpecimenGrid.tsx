import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Accordion } from '../../components/ui/Accordion'
import { AvatarGroup } from '../../components/ui/Avatar'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { Checkbox } from '../../components/ui/Checkbox'
import { Toggle } from '../../components/ui/Toggle'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../components/ui/Dialog'
import { KineticGrid } from '../../components/ui/KineticGrid'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'
import { Select } from '../../components/ui/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { ToastProvider } from '../../components/ui/Toast'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/Tooltip'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsTable } from '../../components/ui/PropsTable'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PANEL } from './constants'
import { useToast } from '../../core/hooks/useToast'

const LandingPageContent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [yearlyBilling, setYearlyBilling] = useState(true)
  const { addToast } = useToast()

  const handleSubscribe = () => {
    addToast({
      title: 'Subscribed',
      message: 'You have been added to the waitlist.',
      intent: 'success',
    })
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-[100] overflow-y-auto bg-(--lithos-bg) text-(--lithos-text)'
    : 'relative overflow-y-auto w-full h-full'

  return (
    <div className={containerClasses}>
      {/* Navbar Mock */}
      <header className="px-6 py-4 border-b border-(--lithos-border)/15 flex justify-between items-center bg-(--lithos-surface) sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="font-black tracking-tight text-xl">LITHOS</div>
          <div className="hidden sm:block">
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Platform', href: '#' },
                { label: 'Features', active: true },
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={toggleFullscreen} className="text-xs px-3">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Actions</Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 space-y-1">
              <div className="lithos-click p-2 hover:bg-(--lithos-bg) rounded text-sm font-bold cursor-pointer">
                Settings
              </div>
              <div className="lithos-click p-2 hover:bg-(--lithos-bg) rounded text-sm font-bold cursor-pointer">
                Logout
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Hero Section */}
      <KineticGrid baseOpacity="opacity-20" className="py-24 md:py-32 border-b border-(--lithos-border)/15">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <div className="flex justify-center">
            <Alert intent="info" size="md" title="Welcome to Lithos V2.0">
              Discover the new set of components in our brutalist design system.
            </Alert>
          </div>
          <Badge intent="accent" size="md">
            V2.0 Released
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
            Build The Future <br />
            <span className="text-[var(--lithos-accent)] drop-shadow-[4px_4px_0_var(--lithos-shadow)]">Fast.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-70 font-medium max-w-2xl mx-auto font-body">
            Use the full suite of Lithos UI components to create brutalist, accessible, and stunning interfaces.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Tooltip placement="top">
              <TooltipTrigger asChild>
                <Button variant="accent" className="px-8 py-4 text-lg" onClick={() => setIsDialogOpen(true)}>
                  Start Free Trial
                </Button>
              </TooltipTrigger>
              <TooltipContent>No credit card required</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </KineticGrid>

      {/* Testimonials */}
      <section className="px-6 py-12 bg-(--lithos-surface) border-b border-(--lithos-border)/15 flex flex-col md:flex-row justify-center items-center gap-6 text-center">
        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Trusted by builders at</span>
        <AvatarGroup
          size="md"
          items={[
            { alt: 'Alice Smith' },
            { alt: 'Bob Jones' },
            { alt: 'Charlie Brown' },
            { alt: 'David Lee' },
            { alt: 'Eve Torres' },
            { alt: 'Frank Wright' },
          ]}
        />
      </section>

      {/* Interactive Features */}
      <section className="px-6 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase border-b-4 border-(--lithos-border) inline-block pb-2">
            Component Demo
          </h2>
          <Tabs defaultValue="code" variant="default">
            <TabsList>
              <TabsTrigger value="code">Source Code</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeViewer code={`<Button variant="accent">Click Me</Button>`} language="tsx" className="mt-4" />
            </TabsContent>
            <TabsContent value="preview">
              <div className="mt-4 bg-(--lithos-surface) p-8 flex justify-center">
                <PreviewBlock code={''}>
                  <Button variant="accent">Click Me</Button>
                </PreviewBlock>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase border-b-4 border-(--lithos-border) inline-block pb-2">
            Configuration
          </h2>
          <Card interactive className="w-full">
            <CardContent spacing="lg">
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Adjust your preferences below.</CardDescription>

              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between border-b border-(--lithos-border)/10 pb-4">
                  <span className="font-bold text-sm">Yearly Billing</span>
                  <Toggle
                    checked={yearlyBilling}
                    onToggle={() => setYearlyBilling(!yearlyBilling)}
                    label="Yearly Billing"
                  />
                </div>

                <div className="space-y-3 border-b border-(--lithos-border)/10 pb-4">
                  <span className="font-bold text-sm">Role</span>
                  <Select
                    placeholder="Select role"
                    options={[
                      { label: 'Developer', value: 'dev' },
                      { label: 'Designer', value: 'des' },
                      { label: 'Manager', value: 'man' },
                    ]}
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    label="Subscribe to newsletter"
                    description="Get the latest updates from Lithos UI."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Docs / API Section */}
      <section className="px-6 py-24 bg-(--lithos-surface) border-y border-(--lithos-border)/15">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-4xl font-black uppercase text-center">Extensive API</h2>
          <div className="bg-(--lithos-bg) p-6 rounded-(--lithos-radius) border border-(--lithos-border)">
            <PropsTable
              data={[
                {
                  name: 'variant',
                  type: "'primary' | 'secondary'",
                  defaultValue: "'primary'",
                  description: 'The visual style variant of the component.',
                },
                {
                  name: 'intent',
                  type: "'default' | 'accent' | 'error'",
                  defaultValue: "'default'",
                  description: 'Contextual color intent.',
                },
                { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents user interaction.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black uppercase text-center mb-12">FAQ</h2>
        <div className="space-y-4">
          <Accordion title="Is this free to use?">
            <p className="p-4 m-0 font-body text-sm">
              Yes, Lithos UI is completely open-source and free to use in your projects.
            </p>
          </Accordion>
          <Accordion title="How do I customize the theme?">
            <p className="p-4 m-0 font-body text-sm">
              Use the Theme Builder to adjust colors, radii, and mode, then export the JSON configuration!
            </p>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-(--lithos-accent) text-(--lithos-bg) text-center border-t border-(--lithos-border)/15">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-5xl font-black uppercase leading-tight">Ready to Start?</h2>
          <div className={`${PANEL} p-8 flex flex-col sm:flex-row gap-4 bg-(--lithos-surface) text-(--lithos-text)`}>
            <Input placeholder="Email Address" className="w-full sm:flex-1" />
            <Button variant="primary" onClick={handleSubscribe} className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Dialog overlay (rendered when isDialogOpen is true) */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} size="md">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="mb-4">By proceeding, you agree to the Lithos UI terms of service and privacy policy.</p>
          <p>Are you ready to create something amazing?</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setIsDialogOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button variant="accent" onClick={() => setIsDialogOpen(false)}>
            Accept
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export const SpecimenGrid = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div
      className="rounded-(--lithos-radius) overflow-hidden border border-(--lithos-border)/15 bg-(--lithos-bg) text-(--lithos-text) h-full"
      style={style}
    >
      <ToastProvider>
        <LandingPageContent />
      </ToastProvider>
    </div>
  )
}
