import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { Tooltip } from '../../components/ui/tooltip/Tooltip'
import { TooltipTrigger } from '../../components/ui/tooltip/TooltipTrigger'
import { TooltipContent } from '../../components/ui/tooltip/TooltipContent'
import { Checkbox, PlainCheckbox, IconCheckbox } from '../../components/ui/Checkbox'
import { Accordion } from '../../components/ui/Accordion'
import { PANEL } from './constants'

export const SpecimenGrid = ({ style }: { style: React.CSSProperties }) => {
  const [checked, setChecked] = useState(true)
  const [plainChecked, setPlainChecked] = useState(true)
  const [iconChecked, setIconChecked] = useState(true)

  return (
    <div className="rounded-(--lithos-radius) p-6 space-y-5 bg-(--lithos-bg) text-(--lithos-text)" style={style}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${PANEL} p-4`}>
          <p className="text-xs font-medium mb-3 opacity-60">Buttons &amp; actions</p>
          <div className="flex flex-wrap gap-2 items-center">
            <Button variant="primary" className="px-3 py-1.5 text-xs">
              Primary
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-xs">
              Secondary
            </Button>
            <Button variant="accent" className="px-3 py-1.5 text-xs">
              Accent
            </Button>
            <Button variant="inverse" className="px-3 py-1.5 text-xs">
              Inverse
            </Button>
          </div>
        </div>

        <div className={`${PANEL} p-4`}>
          <p className="text-xs font-medium mb-3 opacity-60">Form input &amp; checkboxes</p>
          <Input placeholder="Type query..." size="sm" className="mb-3" />
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Checkbox label="Check" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <PlainCheckbox label="Plain" checked={plainChecked} onChange={(e) => setPlainChecked(e.target.checked)} />
            <IconCheckbox label="Fav" checked={iconChecked} onChange={(e) => setIconChecked(e.target.checked)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card interactive className="h-full">
          <CardContent spacing="sm">
            <CardTitle className="text-base mb-1">Card component</CardTitle>
            <CardDescription className="text-xs">Surface tokens scale seamlessly across depth layers.</CardDescription>
          </CardContent>
          <CardFooter spacing="sm">
            <Button variant="primary" className="px-3 py-1.5 text-xs">
              Action
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-3">
          <div className={`${PANEL} p-4`}>
            <p className="text-xs font-medium mb-2 opacity-60">Badges</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge intent="accent" size="sm">
                Accent
              </Badge>
              <Badge intent="success" size="sm">
                Success
              </Badge>
              <Badge intent="error" size="sm">
                Error
              </Badge>
              <Badge intent="warning" size="sm">
                Warning
              </Badge>
            </div>
          </div>
          <Alert title="System notice" size="sm" intent="accent">
            Dynamic accent contrast test.
          </Alert>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Accordion title="Interactive accordion" defaultOpen classes={{ content: 'p-4 text-xs' }}>
          Smooth expand/collapse physics with configurable corner geometry.
        </Accordion>
        <div className={`${PANEL} p-4 flex flex-col justify-between gap-4`}>
          <div>
            <p className="text-xs font-medium mb-2 opacity-60">Tabs</p>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab A</TabsTrigger>
                <TabsTrigger value="t2">Tab B</TabsTrigger>
              </TabsList>
              <TabsContent value="t1" className="text-xs font-body pt-2">
                Active tab container panel.
              </TabsContent>
              <TabsContent value="t2" className="text-xs font-body pt-2">
                Secondary tab panel.
              </TabsContent>
            </Tabs>
          </div>
          <div className="pt-3 border-t border-(--lithos-border)/15 flex items-center justify-between">
            <span className="text-xs font-medium opacity-60">Tooltip</span>
            <Tooltip placement="top">
              <TooltipTrigger asChild>
                <Button variant="secondary" className="px-3 py-1.5 text-xs">
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>Themed tooltip content</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={`${PANEL} p-4`}>
        <p className="text-xs font-medium mb-2 opacity-60">Typography</p>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-lg font-semibold tracking-tight">Display heading specimen</span>
          <code className="text-xs font-code opacity-70">const accent = "var(--lithos-accent)";</code>
        </div>
      </div>
    </div>
  )
}
