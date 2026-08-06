import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Alert } from '../../components/ui/Alert'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'

export const AlertDoc = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')

  const inputRef = useRef<null | HTMLInputElement>(null)

  const variantsCode = `import { Alert } from '../../components/ui/Alert'

export const AlertVariants = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' variant='success' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' variant='warning' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' variant='error' title='Error'>Integrity check failed.</Alert>
      <Alert variant='info' title='Info'>Maintenance window scheduled.</Alert>
    </div>
  )
}`

  const sizesCode = `import { Alert } from '../../components/ui/Alert'

export const AlertSizes = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='small' title='Small'>Structural review pending.</Alert>
      <Alert className='mb-4' title='Default'>Structural review pending.</Alert>
      <Alert size='medium' title='Medium'>Structural review pending.</Alert>
    </div>
  )
}`

  const titlelessCode = `import { Alert } from '../../components/ui/Alert'

export const AlertNoTitle = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert variant='warning'>Load tolerance nearing limit.</Alert>
    </div>
  )
}`

  const customCode = `import { Alert } from '../../components/ui/Alert'

export const CustomizedAlert = () => {
  return (
    <Alert color='#FF0033' title='Custom'>Custom color alert.</Alert>
  )
}`

  const handleFocus = () => setError('')

  const handleCustomColor = () => {
    if (!inputRef.current) return

    const value = inputRef.current.value

    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #FF00FF)')
      return
    }

    setCustomColor(value)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Alert
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A structural plaque for inline messaging that supports distinct status colors.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Alert is an atomic primitive designed for persistent, blocking, in-flow messaging. Unlike the Toast, it never floats and never auto-dismisses.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Alerts have no close control. Mount and unmount them from your own layout state.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Variants
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={variantsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert className='mb-4' title='Default'>Structural review pending.</Alert>
            <Alert className='mb-4' variant='success' title='Success'>Deployment verified.</Alert>
            <Alert className='mb-4' variant='warning' title='Warning'>Load tolerance nearing limit.</Alert>
            <Alert className='mb-4' variant='error' title='Error'>Integrity check failed.</Alert>
            <Alert variant='info' title='Info'>Maintenance window scheduled.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Sizes
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert className='mb-4' size='small' title='Small'>Structural review pending.</Alert>
            <Alert className='mb-4' title='Default'>Structural review pending.</Alert>
            <Alert size='medium' title='Medium'>Structural review pending.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="title" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Without a title
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={titlelessCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert variant='warning'>Load tolerance nearing limit.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-color" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Custom color
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={customCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert color={customColor} title='Custom'>Custom color alert.</Alert>

            <div className='mt-4 text-center flex items-center justify-center'>
              <input ref={inputRef} type='text' onFocus={handleFocus} defaultValue={customColor} max={7} min={4} className='p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-[7.5rem]' />
              <Button intent='primary' className='ml-6 text-sm' onClick={handleCustomColor}>Use color</Button>
            </div>

            {error && (<span className='mt-2 text-xs block text-center' style={{ color: colors.error }}>{error}</span>)}
          </div>
        </PreviewBlock>
      </div>
    </div>
  )
}
