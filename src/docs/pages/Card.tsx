import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  cardPropsData,
  cardImagePropsData,
  cardContentPropsData,
  cardTitlePropsData,
  cardDescriptionPropsData,
  cardFooterPropsData,
} from '../propsData/card'
import { removeImports } from '../examples/removeImports'
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
import { DefaultCardExample } from '../examples/card/default'
import defaultSource from '../examples/card/default.tsx?raw'
import { AccentCardExample } from '../examples/card/accent'
import accentSource from '../examples/card/accent.tsx?raw'
import { SolidCardExample } from '../examples/card/solid'
import solidSource from '../examples/card/solid.tsx?raw'
import { ElevateCardExample } from '../examples/card/elevate'
import elevateSource from '../examples/card/elevate.tsx?raw'
import { SpacingCardExample } from '../examples/card/spacing'
import { ImageCardExample } from '../examples/card/image'
import imageSource from '../examples/card/image.tsx?raw'
import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('card')
const cardCode = (source: string, componentNames: string[]) => ({
  body: removeImports(source).replace(/\bsrc=\{card[12]\}/g, 'src="/example-card.webp"'),
  componentNames,
  manualPath: {
    others: '../../components/ui/Card',
    Button: '../../components/ui/Button',
  },
})

export const CardDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Card"
      description="A hard-bordered container with hard-shadow lift physics on hover, built from composable image, content, and footer parts."
    />

    <DocSection>
      <DocLeadText>
        Card is a foundational container composed of <Code text="CardImage" />, <Code text="CardContent" /> (with{' '}
        <Code text="CardTitle" /> and <Code text="CardDescription" />) and <Code text="CardFooter" />. Every part is
        optional — compose only what the content needs.
      </DocLeadText>
      <DocCallout>
        <strong>Default</strong>, <strong>accent</strong>, <strong>solid</strong>, and <strong>image</strong> are the
        available variants, all shown below. Hover lift is opt-in via the <Code text="interactive" /> prop and off by
        default.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        componentNames={['Card']}
        manualPath="../../components/ui/Card"
        requires={['utils/cn.ts', 'components/ui/Button.tsx']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          Use this to encapsulate distinct, standalone pieces of information or interactive content. It renders with a
          solid background, a robust 2px border, and a sharp shadow. Set <Code text="interactive" /> to true to enable
          hover expansion of the shadow. It supports nested semantic elements like <Code text="CardTitle" /> and{' '}
          <Code text="CardFooter" />. Accessible by default, but if marked interactive, it should contain focusable
          navigation elements.
        </>
      }
    >
      <PreviewBlock
        code={cardCode(defaultSource, [
          'Card',
          'CardImage',
          'CardContent',
          'CardTitle',
          'CardDescription',
          'CardFooter',
          'Button',
        ])}
        githubUrl={githubUrl}
      >
        <DefaultCardExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="accent"
      title="Accent"
      description="Use this to highlight premium or active state cards without overpowering the layout immediately. It renders identical to the default card but floods the background with the theme's solid accent color on hover. The content limits and structure are identical to default. When filled, the text color automatically adapts using the YIQ engine for readability."
    >
      <PreviewBlock
        code={cardCode(accentSource, ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'])}
        githubUrl={githubUrl}
      >
        <AccentCardExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="solid"
      title="Solid"
      description="Use this for high-emphasis or featured cards that must draw immediate attention upon page load. It permanently renders the background in the accent color, contrasting strongly with the page background. Text contrast is automatically managed. Ensure usage is sparse to preserve visual hierarchy. Structural accessibility remains standard."
    >
      <PreviewBlock
        code={cardCode(solidSource, ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'])}
        githubUrl={githubUrl}
      >
        <SolidCardExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="elevate"
      title="Interactive: Elevate"
      description={
        <>
          Use this alternative physics mode when shadow expansion feels too heavy for the surrounding layout. Setting{' '}
          <Code text='interactive="elevate"' /> causes the card itself to translate upwards along the Y-axis on hover,
          leaving the shadow footprint behind. Avoid nesting elevate cards within other translating layouts. Interactive
          bounds remain consistent for assistive technology.
        </>
      }
    >
      <PreviewBlock
        code={cardCode(elevateSource, ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'])}
        githubUrl={githubUrl}
      >
        <ElevateCardExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="spacing"
      title="Spacing"
      description={
        <>
          Use the <Code text="spacing" /> prop on child components to adjust internal padding rhythm. It scales layout
          density (<Code text="sm" /> for tight data grids, <Code text="md" /> for standard text, <Code text="lg" /> for
          spacious hero cards). Does not alter the outer card dimensions directly but shifts the inner baseline grid.
          Consistent spacing aids cognitive accessibility.
        </>
      }
    >
      <PreviewBlock
        code={{
          body: `export const SpacingCard = () => (
  <Card className="max-w-sm">
    <CardContent spacing="lg">
      <CardTitle>Spacious Card</CardTitle>
      <CardDescription>This card uses the lg spacing token for maximum internal breathing room.</CardDescription>
    </CardContent>
    <CardFooter spacing="lg">
      <Button>Action</Button>
    </CardFooter>
  </Card>
)`,
          componentNames: ['Card', 'CardContent', 'CardTitle', 'CardDescription', 'CardFooter', 'Button'],
          manualPath: {
            others: '../../components/ui/Card',
            Button: '../../components/ui/Button',
          },
        }}
        githubUrl={githubUrl}
      >
        <SpacingCardExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="image"
      title="Image"
      description={
        <>
          Use this to render full-bleed, visually immersive cards where the background is an image. It relies on the{' '}
          <Code text='variant="image"' /> prop on the root card. Requires a minimum height to be set via utility classes
          to prevent collapse. Title and description text require dark scrims or explicit contrast handling to guarantee
          WCAG compliance against arbitrary image backgrounds.
        </>
      }
    >
      <PreviewBlock
        code={cardCode(imageSource, ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'])}
        githubUrl={githubUrl}
      >
        <ImageCardExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Card>
  <CardImage />
  <CardContent>
    <CardTitle />
    <CardDescription />
  </CardContent>
  <CardFooter />
</Card>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Card renders a plain <Code text="div" /> — it carries no implicit role or focus behavior of its own.
        </li>
        <li>
          <Code text="CardTitle" /> renders an <Code text="h3" />, so cards compose into the surrounding document
          heading order rather than skipping levels.
        </li>
        <li>
          Always pass descriptive <Code text="alt" /> text to <Code text="CardImage" />; it is required, not optional,
          on the component's props.
        </li>
        <li>
          When a Card wraps interactive controls (links, buttons), keyboard focus and activation come from those native
          elements, not from the Card itself.
        </li>
        <li>
          If an entire Card is meant to be a single click target, wrap it in a native <Code text="a" /> or{' '}
          <Code text="button" /> rather than relying on an <Code text="onClick" /> on the <Code text="div" />, so it
          stays keyboard operable.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <Code text="--lithos-radius" /> CSS token,
        or per-instance via <Code text="className" /> (e.g. <Code text="rounded-full" />
        ). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="Card Props" data={cardPropsData} />
      <PropsAccordion title="CardImage Props" data={cardImagePropsData} />
      <PropsAccordion title="CardContent Props" data={cardContentPropsData} />
      <PropsAccordion title="CardTitle Props" data={cardTitlePropsData} />
      <PropsAccordion title="CardDescription Props" data={cardDescriptionPropsData} />
      <PropsAccordion title="CardFooter Props" data={cardFooterPropsData} />
    </DocSection>
  </div>
)
