import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import { type DrawerPlacement } from '../../components/ui/Drawer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'
import { Typography } from '../../components/ui/Typography'
import { removeImports } from '../examples/removeImports'
import {
  drawerPropsData,
  drawerHeaderPropsData,
  drawerBodyPropsData,
  drawerFooterPropsData,
  drawerTitlePropsData,
  useDrawerReturnData,
} from '../propsData/drawer'
import { DefaultDrawerExample } from '../examples/drawer/default'
import defaultSource from '../examples/drawer/default.tsx?raw'
import { ResponsiveDrawerExample } from '../examples/drawer/responsive'
import responsiveSource from '../examples/drawer/responsive.tsx?raw'
import { PlacementsDrawerExample } from '../examples/drawer/placements'
import placementsSource from '../examples/drawer/placements.tsx?raw'
import { colors } from '../../utils/colors'
import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('drawer')
const drawerPath = '../../components/ui/Drawer'
const drawerCode = (
  source: string,
  componentNames: string[],
  types: string[] = [],
  extraPaths: Record<string, string | string[]> = {}
) => ({
  body: removeImports(source),
  componentNames,
  types,
  manualPath: {
    others: drawerPath,
    Button: '../../components/ui/Button',
    ...extraPaths,
  },
})

const PlacementsPreview = () => {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<DrawerPlacement>('right')
  const positions: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']

  return (
    <>
      <div className="flex flex-wrap -m-1.5">
        {positions.map((position) => (
          <Button
            key={position}
            onClick={() => {
              setPlacement(position)
              setOpen(true)
            }}
            className="capitalize m-1.5"
          >
            {position}
          </Button>
        ))}
      </div>
      <PlacementsDrawerExample open={open} placement={placement} onOpenChange={setOpen} />
    </>
  )
}

export const DrawerDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Drawer"
      description="A flexible sliding panel primitive with touch gestures, responsive viewport adaptation, and customizable transitions."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Drawer provides an accessible, slide-out surface for navigation, forms, and supplemental content. It adapts
        across mobile and desktop viewports while handling touch interactions cleanly.
      </DocLeadText>
      <DocCallout>Drawers handle touch swipe gestures, body scroll locking, and focus traps while active.</DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="drawer"
        componentNames={['Drawer', 'useDrawer']}
        manualPath={drawerPath}
        requires={[
          'utils/cn.ts',
          'components/ui/drawer/Drawer.tsx',
          'components/ui/drawer/DrawerIndicator.tsx',
          'components/ui/drawer/DrawerHeader.tsx',
          'components/ui/drawer/DrawerBody.tsx',
          'components/ui/drawer/DrawerFooter.tsx',
          'components/ui/drawer/DrawerTitle.tsx',
          'components/ui/Dialog.tsx',
          'components/ui/drawer/drawer.utils.ts',
          'components/ui/drawer/useDrawer.ts',
          'components/ui/Popover.ts',
          '@floating-ui/react',
          'core/hooks/useMediaQuery.ts',
          'core/hooks/useSwipe.ts',
        ]}
      />
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="scrollable-content"
      title="Scrollable content"
      description="Use a Drawer for a navigation menu with its own scrollable content and pinned actions."
    >
      <PreviewBlock
        code={drawerCode(defaultSource, ['Drawer', 'Button', 'IconClose', 'useState'], [], {
          IconClose: '../../components/ui/icons',
          react: ['useState'],
        })}
        githubUrl={githubUrl}
      >
        <DefaultDrawerExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="placements"
      title="Placements"
      description="Set placement to slide the panel in from the left, right, top, or bottom edge."
    >
      <PreviewBlock
        code={drawerCode(placementsSource, ['Drawer', 'DrawerPlacement'], ['DrawerPlacement'])}
        githubUrl={githubUrl}
      >
        <PlacementsPreview />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="responsive"
      title="Responsive"
      description="Set mode to responsive to adapt the presentation to the viewport while keeping one Drawer composition."
    >
      <DocCallout borderColor={colors.info}>
        Responsive Subcomponents Note
        <Typography className="text-sm mt-2 font-medium">
          Always use the <Code text="DrawerHeader" />, <Code text="DrawerTitle" />, <Code text="DrawerBody" />, and{' '}
          <Code text="DrawerFooter" /> family inside your drawer composition. When mode="responsive" activates desktop
          viewports, these subcomponents automatically proxy and render their corresponding <Code text="Dialog" />{' '}
          counterparts under the hood for clean layout continuity.
        </Typography>
      </DocCallout>

      <PreviewBlock
        code={drawerCode(
          responsiveSource,
          ['Drawer', 'DrawerHeader', 'DrawerTitle', 'DrawerBody', 'DrawerFooter', 'Button', 'useState'],
          [],
          { react: ['useState'] }
        )}
        githubUrl={githubUrl}
      >
        <ResponsiveDrawerExample />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Drawer can be composed with its header, title, body, and footer parts.
      </p>
      <CodeViewer
        language="tsx"
        code={`<Drawer>
  <DrawerHeader>
    <DrawerTitle></DrawerTitle>
  </DrawerHeader>
  <DrawerBody></DrawerBody>
  <DrawerFooter></DrawerFooter>
</Drawer>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>Focus is managed while the drawer is open and restored when it closes.</li>
        <li>Escape and backdrop interaction dismiss the drawer.</li>
        <li>Pass an accessible label when the content does not provide a visible title.</li>
        <li>Touch swipe gestures support opening and closing on mobile devices.</li>
      </DocList>
    </DocSection>

    <DocCallout>
      <Typography variant="span" className="text-sm font-medium">
        <Typography variant="span" className="font-bold mr-1">
          Note:
        </Typography>
        Rounded corners defined by the global <Code text="--lithos-radius" /> token are selectively applied exclusively
        to the unattached outer edges of the <Code text="Drawer" /> panel depending on its current placement (for
        instance, top-right and bottom-right corners when anchored to left). The edges flush against the screen viewport
        remain unrounded for a clean layout boundary.
      </Typography>
    </DocCallout>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Drawer Props" data={drawerPropsData} />
      <div className="mt-8">
        <PropsAccordion title="DrawerHeader Props" data={drawerHeaderPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DrawerTitle Props" data={drawerTitlePropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DrawerBody Props" data={drawerBodyPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DrawerFooter Props" data={drawerFooterPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="useDrawer Return" data={useDrawerReturnData} isHook />
      </div>
    </DocSection>
  </div>
)
