import React, { useState } from 'react'
import { Button, ButtonGroup } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Alert } from '../../../components/ui/Alert'
import { Accordion } from '../../../components/ui/Accordion'
import { AvatarGroup } from '../../../components/ui/Avatar'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Toggle } from '../../../components/ui/Toggle'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { KineticGrid } from '../../../components/ui/KineticGrid'
import { Popover, PopoverTrigger, PopoverContent } from '../../../components/ui/Popover'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'
import { ToastProvider } from '../../../components/ui/Toast'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { CodeViewer } from '../../../components/ui/CodeViewer'
import { PropsTable } from '../../../components/ui/PropsTable'
import { PANEL } from '../utils/constants'
import { AccentColorProvider } from '../../../core/useAccentColor'
import { getContrastText } from '../../../utils/yiq'
import { useToast } from '../../../core/hooks/useToast'

const LandingPageContent = ({ style }: { style?: React.CSSProperties }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [yearlyBilling, setYearlyBilling] = useState(true)
  const [role, setRole] = useState('Developer')
  const { addToast } = useToast()

  const handleSubscribe = () => {
    addToast({
      title: 'Subscribed',
      message: 'You have been added to the waitlist.',
      intent: 'accent',
    })
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-[100] overflow-y-auto no-scrollbar bg-(--lithos-bg) text-(--lithos-text)'
    : 'relative overflow-y-auto w-full h-full no-scrollbar overflow-x-hidden'

  return (
    <div className={containerClasses}>
      {/* Navbar */}
      <header className="px-4 md:px-6 py-4 border-b border-(--lithos-border)/15 bg-(--lithos-surface) sticky top-0 z-40 shadow-sm w-full">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4">
          {/* 1. Logo (Always left) */}
          <div className="font-black tracking-tight text-xl shrink-0 order-1">LITHOS</div>

          {/* 2. Actions (Mobile: Top Right | Desktop: Far Right) */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0 order-2 md:order-3">
            <Button variant="secondary" onClick={toggleFullscreen} className="text-xs px-3 whitespace-nowrap">
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary" className="whitespace-nowrap shrink-0">
                  Actions
                </Button>
              </PopoverTrigger>
              <PopoverContent
                portaled={false}
                className="p-2 w-48 shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) theme-builder-floating"
              >
                <ButtonGroup mode="vertical" className="w-full">
                  <Button variant="secondary" fullWidth className="hover:bg-(--lithos-accent) justify-start">
                    Settings
                  </Button>
                  <Button variant="secondary" fullWidth className="hover:bg-(--lithos-accent) justify-start">
                    Logout
                  </Button>
                </ButtonGroup>
              </PopoverContent>
            </Popover>
          </div>

          {/* 3. Breadcrumb (Mobile: Bottom Row Full Width | Desktop: Middle Flexible) */}
          <div className="order-3 md:order-2 basis-full md:basis-auto w-full md:w-auto md:flex-1 min-w-0 overflow-x-auto no-scrollbar mt-2 md:mt-0">
            <div className="flex items-center min-w-max py-1">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Platform', href: '#' },
                  { label: 'Features', active: true },
                ]}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <KineticGrid
        baseOpacity="opacity-20"
        className="py-16 sm:py-24 md:py-32 border-b border-(--lithos-border)/15 w-full min-w-0"
      >
        <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex justify-center w-full min-w-0 px-2">
            <Alert intent="accent" size="sm" title="Lithos V2.0" className="text-left w-full sm:w-auto max-w-lg">
              Discover the new set of components in our brutalist design system.
            </Alert>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tight uppercase leading-[1.1] sm:leading-none w-full wrap-break-word">
            Build The Future <br className="hidden sm:block" />
            <span className="text-(--lithos-accent) drop-shadow-[3px_3px_0_var(--lithos-shadow)] sm:drop-shadow-[5px_5px_0_var(--lithos-shadow)] block sm:inline mt-2 sm:mt-0">
              Fast.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-75 font-medium max-w-2xl mx-auto font-body px-2">
            Without fighting your design system. Use the full suite of Lithos UI components to create brutalist,
            accessible, and stunning interfaces.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto px-2 sm:px-4">
            <Tooltip placement="top">
              <TooltipTrigger asChild>
                <Button
                  variant="accent"
                  className="flex-1 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold shrink-0 whitespace-nowrap"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Explore Components
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-(--lithos-radius) theme-builder-floating">
                Interactive Demo
              </TooltipContent>
            </Tooltip>
            <Button
              variant="secondary"
              className="flex-1 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold shrink-0 whitespace-nowrap"
            >
              View Docs
            </Button>
          </div>
        </div>
      </KineticGrid>

      {/* Social Proof */}
      <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto px-2 sm:px-4">
        <span className="text-xs sm:text-sm font-bold opacity-60 uppercase tracking-widest shrink-0">
          Trusted by builders
        </span>
        <div className="flex justify-end sm:justify-center items-center min-w-0 overflow-hidden mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)">
          <div className="flex shrink-0">
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
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 w-full max-w-7xl mx-auto flex flex-wrap gap-12 lg:gap-16 min-w-0 justify-items-center">
        {/* Left Column: Component Demo */}
        <div className="flex flex-col gap-8 flex-1 min-w-[280px] w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-black uppercase border-b-4 border-(--lithos-border) self-start pb-2">
            Component Demo
          </h2>
          <Tabs defaultValue="preview" variant="default" className="w-full min-w-0">
            <TabsList className="w-full flex-wrap gap-2 sm:gap-0 [&>*:not(:first-child)]:ml-0 sm:[&>*:not(:first-child)]:ml-4">
              <TabsTrigger value="preview" className="flex-1 sm:flex-none">
                Live Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 sm:flex-none">
                Source Code
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="preview"
              className="bg-transparent outline-none shadow-transparent border-none w-full min-w-0 flex justify-center sm:justify-start pt-4"
            >
              <Card
                interactive
                className="w-full max-w-full sm:max-w-sm relative z-10 sm:rotate-1 sm:hover:rotate-0 transition-transform duration-300 shadow-[6px_6px_0_0_var(--lithos-shadow)] sm:shadow-[8px_8px_0_0_var(--lithos-shadow)] bg-(--lithos-surface) rounded-(--lithos-radius)"
              >
                <CardContent spacing="lg" className="p-6 sm:p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="space-y-3 min-w-0 flex-1">
                      <Badge
                        intent="accent"
                        className="font-black tracking-widest text-[10px] px-2 py-1 shadow-none border-[3px] border-(--lithos-border)"
                      >
                        PRO PLAN
                      </Badge>
                      <CardTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tight truncate">
                        Lithos Pro
                      </CardTitle>
                    </div>
                    <div className="text-left sm:text-right flex flex-col sm:items-end shrink-0">
                      <h2 className="text-4xl sm:text-5xl font-black leading-none tracking-tighter">$29</h2>
                      <span className="text-[10px] font-black text-(--lithos-muted) uppercase tracking-widest mt-2 block">
                        Per Month
                      </span>
                    </div>
                  </div>

                  <CardDescription className="text-sm font-bold text-(--lithos-text) leading-relaxed">
                    Unleash the full power of neo-brutalism. Build bold, beautiful interfaces faster than ever.
                  </CardDescription>

                  <div className="flex flex-col gap-4 pt-6 border-t-[3px] border-(--lithos-border) border-dashed mt-6 w-full">
                    <Checkbox
                      checked={true}
                      onChange={() => {}}
                      label={
                        <span className="font-bold text-sm sm:text-base wrap-break-word">Unlimited Components</span>
                      }
                    />
                    <Checkbox
                      checked={true}
                      onChange={() => {}}
                      label={<span className="font-bold text-sm sm:text-base wrap-break-word">Premium Themes</span>}
                    />
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      label={
                        <span className="font-bold text-(--lithos-muted) text-sm sm:text-base wrap-break-word">
                          Dedicated Support
                        </span>
                      }
                    />
                  </div>

                  <div className="pt-8 w-full">
                    <Button
                      variant="primary"
                      fullWidth
                      className="group relative overflow-hidden text-base sm:text-lg font-black py-4 sm:py-6 border-[3px] border-(--lithos-border) rounded-(--lithos-radius)"
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block tracking-widest uppercase">
                        Upgrade Now
                      </span>
                      <div className="absolute inset-0 bg-black/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="code"
              className="bg-transparent outline-none shadow-transparent border-none w-full min-w-0 pt-4"
            >
              <div className="w-full max-w-full overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) border border-(--lithos-border)">
                <div className="w-full overflow-x-auto min-w-0">
                  <CodeViewer
                    language="tsx"
                    className="border-none shadow-none rounded-none w-full"
                    code={`<Card interactive className="w-full max-w-sm rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0_0_var(--lithos-shadow)]">
  <CardContent spacing="lg" className="p-8">
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-3">
        <Badge intent="accent" className="font-black tracking-widest text-[10px] px-2 py-1 shadow-none border-[3px]">
          PRO PLAN
        </Badge>
        <CardTitle className="text-3xl font-black uppercase tracking-tight">Lithos Pro</CardTitle>
      </div>
      <div className="text-right flex flex-col items-end">
        <h2 className="text-5xl font-black leading-none tracking-tighter">$29</h2>
        <span className="text-[10px] font-black text-muted uppercase tracking-widest mt-2 block">
          Per Month
        </span>
      </div>
    </div>
    
    <CardDescription className="text-sm font-bold leading-relaxed">
      Unleash the full power of neo-brutalism. Build bold, beautiful interfaces faster than ever.
    </CardDescription>
    
    <div className="space-y-4 pt-6 border-t-[3px] border-border border-dashed mt-6">
      <Checkbox checked={true} label={<span className="font-bold">Unlimited Components</span>} />
      <Checkbox checked={true} label={<span className="font-bold">Premium Themes</span>} />
      <Checkbox checked={false} label={<span className="font-bold text-muted">Dedicated Support</span>} />
    </div>
    
    <div className="pt-8">
      <Button variant="primary" fullWidth className="text-lg font-black py-6 border-[3px]">
        UPGRADE NOW
      </Button>
    </div>
  </CardContent>
</Card>`}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Configuration Panel */}
        <div className="flex flex-col gap-8 flex-1 min-w-[280px] w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-black uppercase border-b-4 border-(--lithos-border) self-start pb-2">
            Configuration
          </h2>
          <Card interactive className="w-full rounded-(--lithos-radius) shadow-[4px_4px_0_0_var(--lithos-shadow)]">
            <CardContent spacing="lg" className="p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl">System Settings</CardTitle>
              <CardDescription className="text-(--lithos-muted)">Interactive state demonstration.</CardDescription>

              <div className="flex flex-col gap-6 mt-6 w-full min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--lithos-border)/10 pb-4 w-full">
                  <span className="font-bold text-sm sm:text-base">Yearly Billing</span>
                  <Toggle
                    checked={yearlyBilling}
                    onToggle={() => setYearlyBilling(!yearlyBilling)}
                    label="Toggle yearly billing"
                  />
                </div>

                <div className="flex flex-col gap-3 border-b border-(--lithos-border)/10 pb-4 w-full min-w-0">
                  <span className="font-bold text-sm sm:text-base block">Primary Role</span>
                  <div className="flex flex-wrap gap-2 w-full">
                    {['Developer', 'Designer', 'Manager'].map((r) => (
                      <Button
                        key={r}
                        variant={role === r ? 'primary' : 'secondary'}
                        onClick={() => setRole(r)}
                        className="flex-1 sm:flex-none text-xs sm:text-sm py-2 px-4 rounded-(--lithos-radius)"
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 w-full">
                  <Checkbox
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    label={<span className="text-sm sm:text-base">Subscribe to newsletter</span>}
                    description={
                      <span className="text-xs sm:text-sm text-(--lithos-muted)">
                        Get the latest updates from Lithos UI.
                      </span>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Docs / API Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-(--lithos-surface) border-y border-(--lithos-border)/15 w-full min-w-0">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-12 min-w-0">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-center w-full">Extensive API</h2>

          <div className="w-full bg-(--lithos-bg) rounded-(--lithos-radius) border border-(--lithos-border) overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)]">
            <div className="w-full overflow-x-auto min-w-0 p-4 sm:p-6">
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
                  {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Prevents user interaction.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 sm:mb-12">FAQ</h2>
        <div className="flex flex-col gap-4 w-full min-w-0">
          <Accordion title="Is this free to use?">
            <p className="p-4 m-0 font-body text-sm sm:text-base text-(--lithos-text)">
              Yes, Lithos UI is completely open-source and free to use in your projects.
            </p>
          </Accordion>
          <Accordion title="How do I customize the theme?">
            <p className="p-4 m-0 font-body text-sm sm:text-base text-(--lithos-text)">
              Use the Theme Builder to adjust colors, radii, and mode, then export the JSON configuration directly into
              your codebase.
            </p>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-(--lithos-accent) text-(--lithos-bg) text-center border-t border-(--lithos-border)/15 w-full min-w-0">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 min-w-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight">
            Ready to Start?
          </h2>

          <div
            className={`${PANEL} p-6 sm:p-8 flex flex-col sm:flex-row flex-wrap gap-4 bg-(--lithos-surface) text-(--lithos-text) w-full rounded-(--lithos-radius) shadow-[6px_6px_0_0_var(--lithos-shadow)]`}
          >
            <Input placeholder="Email Address" className="w-full sm:flex-1 min-w-0 rounded-(--lithos-radius)" />
            <Button
              variant="primary"
              onClick={handleSubscribe}
              className="w-full md:w-auto shrink-0 px-8 py-3 rounded-(--lithos-radius)"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Dialog overlay */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        size="md"
        style={style}
        className="theme-builder-floating"
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-black uppercase">Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="mb-4 text-sm sm:text-base text-(--lithos-text)">
            By proceeding, you agree to the Lithos UI terms of service and privacy policy.
          </p>
          <p className="font-bold text-sm sm:text-base text-(--lithos-text)">
            Are you ready to create something amazing?
          </p>
        </DialogBody>
        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="text"
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto rounded-(--lithos-radius)"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto rounded-(--lithos-radius)"
          >
            Accept
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export const SpecimenGrid = ({ style, accentColor }: { style: React.CSSProperties; accentColor?: string }) => {
  const currentAccent = accentColor || '#00FF00'
  const accentText = getContrastText(currentAccent)

  const cssOverrides = Object.entries(style)
    .map(([key, value]) => `${key}: ${value} !important;`)
    .join('\n        ')

  return (
    <div
      id="specimen-grid-container"
      className="rounded-none overflow-hidden overflow-y-auto overflow-x-hidden bg-(--lithos-bg) text-(--lithos-text) h-full w-full min-w-0"
      style={style}
    >
      <style>{`
        #specimen-grid-container, 
        #specimen-grid-container *,
        .theme-builder-floating,
        .theme-builder-floating * {
          ${cssOverrides}
          --lithos-accent-text: ${accentText} !important;
        }
      `}</style>
      <ToastProvider className="theme-builder-floating">
        <AccentColorProvider color={currentAccent}>
          <LandingPageContent style={{ ...style, '--lithos-accent-text': accentText } as React.CSSProperties} />
        </AccentColorProvider>
      </ToastProvider>
    </div>
  )
}
