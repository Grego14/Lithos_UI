import { Spinner } from '../../components/ui/Spinner'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { spinnerProps } from '../propsData/spinner'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'

export const SpinnerDoc = () => {
  const [customColor, setCustomColor] = useState('#f59e0b')
  const [error, setError] = useState('')
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleFocus = () => setError('')

  const handleCustomColor = () => {
    if (!inputRef.current) return
    const value = inputRef.current.value
    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #00FF00)')
      return
    }
    setCustomColor(value)
  }

  const usageCode = {
    body: `export const SpinnerExample = () => {
  return (
    <div className="flex items-center gap-8">
      <Spinner size={32} variant="default" />
      <Spinner size={32} variant="accent" />
      <Spinner size={32} color="${customColor}" />
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const sizesCode = {
    body: `export const SpinnerSizes = () => {
  return (
    <div className="flex items-center gap-8">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const iconsCode = {
    body: `export const SpinnerIcons = () => {
  return (
    <div className="flex items-center gap-8 flex-wrap">
      {/* Default FiLoader */}
      <Spinner size={32} />
      <Spinner size={32} icon="FiRefreshCw" />
      <Spinner size={32} icon="LuLoaderCircle" />
      <Spinner size={32} icon="TbLoader2" />
      <Spinner size={32} icon="PiSpinnerGap" />
      <Spinner size={32} icon="RiLoader4Line" />
      <Spinner size={32} icon="MdAutorenew" />
      {/* ... and many more */}
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Spinner
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          An animated loading indicator for pending states.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A drop-in icon for any neobrutalist control. Use this component to indicate loading states during pending
          submits, fetches, and inline busy states.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Spinners do not disrupt layout or block interactions directly; combine them with disabled states on parent
          interactive elements.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide componentNames={['Spinner']} manualPath="../../components/ui/Spinner" requires={['utils/cn.ts']} />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom Color
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Renders a simple rotating loader. It inherits text color by default, making it easy to drop into buttons, cards,
        or alerts.
      </p>

      <PreviewBlock
        code={usageCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
      >
        <div className="flex flex-col items-center p-8">
          <div className="flex items-center justify-center gap-8">
            <Spinner size={32} variant="default" />
            <Spinner size={32} variant="accent" />
            <Spinner size={32} color={customColor} />
          </div>

          <div className="mt-6 text-center flex items-center">
            <input
              ref={inputRef}
              type="text"
              onFocus={handleFocus}
              defaultValue={customColor}
              maxLength={7}
              minLength={4}
              className="p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-30"
            />
            <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
              Use color
            </Button>
          </div>

          {error && (
            <span className="mt-2 text-xs" style={{ color: colors.error }}>
              {error}
            </span>
          )}
        </div>
      </PreviewBlock>

      <h3 id="sizes" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Scale the spinner to any proportion using the <code>size</code> prop, which accepts a number (in pixels) or a
        string.
      </p>

      <div className="mb-12">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
        >
          <div className="flex flex-col items-center p-8">
            <div className="flex items-end justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Spinner size={16} />
                <span className="text-xs font-mono opacity-70">16px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={24} />
                <span className="text-xs font-mono opacity-70">24px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={32} />
                <span className="text-xs font-mono opacity-70">32px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={48} />
                <span className="text-xs font-mono opacity-70">48px</span>
              </div>
            </div>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="icons" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Choosing the Spinner
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        You can pass a predefined string to the <code>icon</code> prop. The Spinner will render the corresponding icon
        and automatically pass down the <code>size</code> while spinning indefinitely.
      </p>

      <div className="mb-12">
        <PreviewBlock
          code={iconsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
        >
          <div className="flex flex-col items-center p-8">
            <div className="flex flex-wrap items-end justify-center gap-8">
              {[
                'FiLoader',
                'FiRefreshCw',
                'FiRefreshCcw',
                'FiSettings',
                'VscLoading',
                'LuLoaderCircle',
                'LuLoader',
                'TbLoader2',
                'TbLoader3',
                'PiSpinnerGap',
                'PiCircleNotch',
                'RiLoader2Line',
                'RiLoader3Line',
                'RiLoader4Line',
                'FiSlack',
              ].map((iconName) => (
                <div key={iconName} className="flex flex-col items-center gap-2">
                  <Spinner size={32} icon={iconName as any} />
                  <span className="text-[10px] font-mono opacity-70">{iconName}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="status"</code> to announce its presence to screen readers dynamically.
          </li>
          <li>
            Includes a visually hidden <code>.sr-only</code> text node ("Loading...") as a fallback.
          </li>
          <li>
            Respects system animation settings; while the spin class handles rotation, ensure you don't over-use
            animations for users sensitive to motion.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Spinner Props" data={spinnerProps} />
      </section>
    </div>
  )
}
