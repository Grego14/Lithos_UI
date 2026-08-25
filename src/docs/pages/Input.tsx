import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Input } from '../../components/ui/Input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/InputGroup'
import { IconSearch } from '../../components/ui/icons/IconSearch'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { inputPropsData } from '../propsData/input'
import { inputGroupAddonPropsData, inputGroupInputPropsData, inputGroupPropsData } from '../propsData/inputGroup'
import { SetupGuide } from '../layout/SetupGuide'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Input.tsx'
const INPUT_PATH = '../../components/ui/Input'

export const InputDoc = () => {
  const basicCode = {
    body: `export const InputBasic = () => {
  return (
    <div className='flex flex-col items-center'>
      <Input placeholder='Enter your name' />
    </div>
  )
}`,
    componentNames: ['Input'],
    manualPath: INPUT_PATH,
  }

  const nativeAttributesCode = {
    body: `export const InputNativeAttributes = () => {
  return (
    <div className='flex flex-col items-center'>
      <Input type='email' placeholder='you@example.com' />
      <Input className='mt-4' type='password' placeholder='Password' />
      <Input className='mt-4' type='number' placeholder='Age' min={0} max={120} />
    </div>
  )
}`,
    componentNames: ['Input'],
    manualPath: INPUT_PATH,
  }

  const disabledCode = {
    body: `export const InputDisabled = () => {
  return (
    <div className='flex flex-col items-center'>
      <Input placeholder='Disabled field' disabled />
    </div>
  )
}`,
    componentNames: ['Input'],
    manualPath: INPUT_PATH,
  }

  const invalidCode = {
    body: `export const InputInvalid = () => {
  return (
    <div className='flex flex-col items-center'>
      <Input invalid placeholder='Required field' />
    </div>
  )
}`,
    componentNames: ['Input'],
    manualPath: INPUT_PATH,
  }

  const customCode = {
    body: `export const CustomizedInput = () => {
  return (
    <Input
      placeholder='Styled via className'
      className='border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-border)] p-2 font-(--font-mono)'
    />
  )
}`,
    componentNames: ['Input'],
    manualPath: INPUT_PATH,
  }

  const groupCode = {
    body: `export const InputGroupSearch = () => {
  return (
    <InputGroup className='max-w-xs'>
      <InputGroupInput placeholder='Search...' />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupAddon align='inline-end'>12 results</InputGroupAddon>
    </InputGroup>
  )
}`,
    componentNames: ['InputGroup', 'InputGroupInput', 'InputGroupAddon', 'IconSearch'],
    manualPath: {
      InputGroup: '../../components/ui/Input',
      InputGroupInput: '../../components/ui/Input',
      InputGroupAddon: '../../components/ui/Input',
      IconSearch: '../../components/ui/icons/IconSearch',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Input</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A foundational form primitive that wraps the native input element with theme awareness.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Input is an atomic primitive built around the native HTML input element. It resolves the active accent
          color through the theme engine and forwards every native attribute, so it drops into any form without fighting
          your types or your styles.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          The component intentionally ships unopinionated base styling. Use <code>className</code> to align it with the
          brutalist geometry of your layout.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Input']}
        manualPath="../../components/ui/Input"
        requires={[
          'utils/cn.ts',
          'utils/colors.ts',
          'components/ui/InputGroup.tsx',
          'components/ui/icons/IconSearch.tsx',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="basic-usage" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Basic usage
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={basicCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Input placeholder="Enter your name" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="native-attributes" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Native attributes
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={nativeAttributesCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Input type="email" placeholder="you@example.com" />
            <Input className="mt-8" type="password" placeholder="Password" />
            <Input className="mt-8" type="number" placeholder="Age" min={0} max={120} />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="disabled" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Disabled
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={disabledCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Input placeholder="Disabled field" disabled />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="invalid" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Invalid state
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={invalidCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Input invalid placeholder="Required field" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-styling" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom styling
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Input
              placeholder="Styled via className"
              className="border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-border)] p-2 font-(--font-mono)"
            />
            <Button variant="primary" className="mt-6 text-sm">
              Submit
            </Button>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="input-group" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Input group
      </h3>

      <div className="mt-8 mb-16">
        <p className="mb-6 text-lg text-(--lithos-text) max-w-3xl font-body">
          The <code>InputGroup</code> compound wraps a bare field with addon segments pinned to either edge. Addons keep
          their position through the <code>align</code> prop regardless of DOM order.
        </p>
        <PreviewBlock code={groupCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <InputGroup className="max-w-xs">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>

            <InputGroup className="mt-8 max-w-xs">
              <InputGroupInput type="password" placeholder="Password" />
              <InputGroupAddon align="inline-end">Required</InputGroupAddon>
            </InputGroup>
          </div>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Renders a real native input element, preserving keyboard navigation and focus behavior.</li>
          <li>
            Pair it with a label element and pass <code>id</code> to keep forms screen-reader friendly.
          </li>
          <li>Disabled inputs are excluded from the focus order automatically by the browser.</li>
          <li>
            InputGroup renders with <code>role=&quot;group&quot;</code>; pass an <code>aria-label</code> when the
            surrounding form context is not self-describing.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Because the component extends the native input props, any valid attribute such as{' '}
          <code>type</code>, <code>value</code>, <code>onChange</code>, or <code>autoComplete</code> works without extra
          configuration.
        </div>

        <PropsAccordion title="Input Props" data={inputPropsData} />

        <h3 id="input-group-api" className="mt-8 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
          InputGroup
        </h3>
        <PropsAccordion title="InputGroup Props" data={inputGroupPropsData} />
        <PropsAccordion title="InputGroupInput Props" data={inputGroupInputPropsData} />
        <PropsAccordion title="InputGroupAddon Props" data={inputGroupAddonPropsData} />
      </section>
    </div>
  )
}
