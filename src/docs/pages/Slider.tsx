import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { DocCallout, DocExample, DocHeader, DocHeading, DocList, DocSection } from '../layout/DocPage'
import { sliderPropsData } from '../propsData/slider'
import { DefaultSliderExample } from '../examples/slider/default'
import { ControlledSliderExample } from '../examples/slider/controlled'
import { SteppedSliderExample } from '../examples/slider/steps'
import { SliderSizesExample } from '../examples/slider/sizes'
import controlledSource from '../examples/slider/controlled.tsx?raw'
import { removeImports } from '../examples/removeImports'
import { DifficultySliderExample } from '../examples/slider/difficulty'
import { SliderShapesExample } from '../examples/slider/shapes'
import { AppBrightnessExample } from '../examples/slider/brightness'
import brightnessSource from '../examples/slider/brightness.tsx?raw'
import shapesSource from '../examples/slider/shapes.tsx?raw'
import difficultySource from '../examples/slider/difficulty.tsx?raw'
import { RangeSliderExample } from '../examples/slider/range'
import rangeSource from '../examples/slider/range.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Slider.tsx'
const sliderCode = (body: string) => ({ body, componentNames: ['Slider'], manualPath: '../../components/ui/Slider' })

export const SliderDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Slider"
      description="Choose a numeric value within a range using a native, keyboard-accessible control."
    />
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="slider"
        componentNames={['Slider']}
        manualPath="../../components/ui/Slider"
        requires={['core/types.ts', 'utils/cn.ts', 'utils/yiq.ts']}
      />
      <DocCallout>
        Use React 19 and Tailwind CSS v4. Import your Tailwind stylesheet before <code>lithos-ui/tokens.css</code>.
        Slider uses the global accent, border, surface, shadow, and radius tokens.
      </DocCallout>
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description="Use defaultValue for an uncontrolled slider. Associate a visible label with its id; name includes its value in native form submission."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={sliderCode(
          '<label htmlFor="slider-volume">Volume</label>\n<Slider id="slider-volume" name="volume" defaultValue={40} />'
        )}
      >
        <DefaultSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="controlled"
      title="Controlled"
      description="Keep the value in React state to display it elsewhere. aria-valuetext supplies meaningful units for assistive technology."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(controlledSource),
          componentNames: ['Slider', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useState'] },
        }}
      >
        <ControlledSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="sizes"
      title="Sizes"
      description="Choose a thumb size for the surrounding interface. Every size retains a 44px-tall input area without changing the track position."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={sliderCode(
          '<label htmlFor="slider-small">Small</label>\n<Slider id="slider-small" size="sm" defaultValue={25} />\n<label htmlFor="slider-medium">Medium</label>\n<Slider id="slider-medium" size="md" defaultValue={50} />\n<label htmlFor="slider-large">Large</label>\n<Slider id="slider-large" size="lg" defaultValue={75} />'
        )}
      >
        <SliderSizesExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="shapes"
      title="Shapes"
      description="Choose square corners or a round track and thumb. Omit shape to follow the global radius token."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(shapesSource),
          componentNames: ['Slider'],
          manualPath: '../../components/ui/Slider',
        }}
      >
        <SliderShapesExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="brightness"
      title="Filled slider"
      description="Use a filled track for settings such as app brightness, with icons inside or outside the bar. Each sample keeps its own value; focusing or moving either control applies its brightness to the whole app. Original brightness is restored when you leave this demo."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(brightnessSource),
          componentNames: ['Slider', 'useState', 'useId', 'useEffect', 'LuSun', 'LuSunDim'],
          manualPath: {
            Slider: '../../components/ui/Slider',
            react: ['useState', 'useId', 'useEffect'],
            'react-icons/lu': ['LuSun', 'LuSunDim'],
          },
        }}
      >
        <AppBrightnessExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="steps"
      title="Stepped slider"
      description="Set finite min and max bounds and a positive step for precise increments. Use step='any' for continuous values. Native range inputs clamp values and snap them to valid steps."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={sliderCode(
          '<label htmlFor="slider-temperature">Temperature (°C)</label>\n<Slider id="slider-temperature" name="temperature" min={-10} max={40} step={0.5} defaultValue={20} aria-describedby="slider-temperature-help" />\n<p id="slider-temperature-help">−10 to 40 °C in half-degree steps.</p>'
        )}
      >
        <SteppedSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="difficulty"
      title="Distribution slider"
      description="Drag the two dividers to distribute 100% between Easy, Medium, and Hard in 1% increments. The colored segments and three percentages update together. Any share can be zero; for example, Easy 50%, Medium 50%, Hard 0%."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(difficultySource),
          componentNames: ['Slider', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useState'] },
        }}
      >
        <DifficultySliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="range-slider"
      title="Range slider"
      description="Select a lower and upper value with two circular handles on one track. Drag either handle, or Tab between them and use the arrow keys. Values move in 1% steps and cannot cross. This example composes two native Slider inputs."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(rangeSource),
          componentNames: ['Slider', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useState'] },
        }}
      >
        <RangeSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Provide a visible label with htmlFor/id, or use aria-label or aria-labelledby. Use aria-describedby for
          additional instructions.
        </li>
        <li>
          Tab focuses the control and shows a visible outline. Arrow keys adjust the value by step; Home and End select
          the minimum and maximum. Keyboard details follow the user's browser and text direction.
        </li>
        <li>
          Native range semantics expose the current value and bounds to screen readers. Use aria-valuetext for units or
          human-readable descriptions.
        </li>
        <li>
          Mouse and touch dragging use the browser's native range interaction. Disabled controls cannot be adjusted.
        </li>
        <li>
          Native forms submit the numeric value via name and reset uncontrolled sliders to defaultValue. Reset
          controlled values through your form's onReset handler.
        </li>
      </DocList>
      <DocCallout>
        This primitive is a horizontal, single-value slider. For exact text entry, pair it with a labelled numeric
        input. The range input stays stationary during dragging; thumb shadows provide the hard-press feedback.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Slider Props" data={sliderPropsData} />
    </DocSection>
  </div>
)
