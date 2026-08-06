import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Alert } from '../../components/ui/Alert'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'

export const AlertDoc = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')
  const [closeDismissed, setCloseDismissed] = useState(false)

  const inputRef = useRef<null | HTMLInputElement>(null)

  const typesCode = `import { Alert } from '../../components/ui/Alert'

export const AlertTypes = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='lg' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' size='lg' type='success' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' size='lg' type='warning' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' size='lg' type='error' title='Error'>Integrity check failed.</Alert>
      <Alert className='mb-4' size='lg' type='info' title='Info'>Maintenance window scheduled.</Alert>
      <Alert size='lg' type='accent' title='Accent'>Theme accent applied.</Alert>
    </div>
  )
}`

  const filledCode = `import { Alert } from '../../components/ui/Alert'

export const AlertFilled = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='lg' variant='filled' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' size='lg' type='success' variant='filled' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' size='lg' type='warning' variant='filled' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' size='lg' type='error' variant='filled' title='Error'>Integrity check failed.</Alert>
      <Alert className='mb-4' size='lg' type='info' variant='filled' title='Info'>Maintenance window scheduled.</Alert>
      <Alert size='lg' type='accent' variant='filled' title='Accent'>Theme accent applied.</Alert>
    </div>
  )
}`

  const outlineCode = `import { Alert } from '../../components/ui/Alert'

export const AlertOutline = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='lg' variant='outlined' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' size='lg' type='success' variant='outlined' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' size='lg' type='warning' variant='outlined' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' size='lg' type='error' variant='outlined' title='Error'>Integrity check failed.</Alert>
      <Alert className='mb-4' size='lg' type='info' variant='outlined' title='Info'>Maintenance window scheduled.</Alert>
      <Alert size='lg' type='accent' variant='outlined' title='Accent'>Theme accent applied.</Alert>
    </div>
  )
}`

  const sizesCode = `import { Alert } from '../../components/ui/Alert'

export const AlertSizes = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='sm' title='Small'>Structural review pending.</Alert>
      <Alert className='mb-4' size='md' title='Medium'>Structural review pending.</Alert>
      <Alert size='lg' title='Large'>Structural review pending.</Alert>
    </div>
  )
}`

  const titlelessCode = `import { Alert } from '../../components/ui/Alert'

export const AlertNoTitle = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert size='md' type='warning'>Load tolerance nearing limit.</Alert>
    </div>
  )
}`

  const actionsCode = `import { useState } from 'react'
import { Alert } from '../../components/ui/Alert'

export const AlertWithClose = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert size='md' type='error' title='Deployment failed' onClose={() => setDismissed(true)}>
      Build #482 failed structural checks.
    </Alert>
  )
}

export const AlertWithUndo = () => {
  return (
    <Alert size='md' type='warning' title='Config changed' onUndo={() => alert('Reverting configuration change.')}>
      Timeout threshold updated to 30s.
    </Alert>
  )
}`

  const customCode = `import { Alert } from '../../components/ui/Alert'

export const CustomizedAlert = () => {
  return (
    <Alert size='md' color='#FF0033' title='Custom'>Custom color alert.</Alert>
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
          Alerts never dismiss themselves. The close and undo actions only appear when you pass <code>onClose</code>/<code>onUndo</code>, and it's on you to remove the Alert from your layout state.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="types" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Types
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={typesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert className='mb-4' size='lg' title='Default'>Structural review pending.</Alert>
            <Alert className='mb-4' size='lg' type='success' title='Success'>Deployment verified.</Alert>
            <Alert className='mb-4' size='lg' type='warning' title='Warning'>Load tolerance nearing limit.</Alert>
            <Alert className='mb-4' size='lg' type='error' title='Error'>Integrity check failed.</Alert>
            <Alert className='mb-4' size='lg' type='info' title='Info'>Maintenance window scheduled.</Alert>
            <Alert size='lg' type='accent' title='Accent'>Theme accent applied.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="filled" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Filled
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={filledCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert className='mb-4' size='lg' variant='filled' title='Default'>Structural review pending.</Alert>
            <Alert className='mb-4' size='lg' type='success' variant='filled' title='Success'>Deployment verified.</Alert>
            <Alert className='mb-4' size='lg' type='warning' variant='filled' title='Warning'>Load tolerance nearing limit.</Alert>
            <Alert className='mb-4' size='lg' type='error' variant='filled' title='Error'>Integrity check failed.</Alert>
            <Alert className='mb-4' size='lg' type='info' variant='filled' title='Info'>Maintenance window scheduled.</Alert>
            <Alert size='lg' type='accent' variant='filled' title='Accent'>Theme accent applied.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="outline" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Outline
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={outlineCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            <Alert className='mb-4' size='lg' variant='outlined' title='Default'>Structural review pending.</Alert>
            <Alert className='mb-4' size='lg' type='success' variant='outlined' title='Success'>Deployment verified.</Alert>
            <Alert className='mb-4' size='lg' type='warning' variant='outlined' title='Warning'>Load tolerance nearing limit.</Alert>
            <Alert className='mb-4' size='lg' type='error' variant='outlined' title='Error'>Integrity check failed.</Alert>
            <Alert className='mb-4' size='lg' type='info' variant='outlined' title='Info'>Maintenance window scheduled.</Alert>
            <Alert size='lg' type='accent' variant='outlined' title='Accent'>Theme accent applied.</Alert>
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
            <Alert className='mb-4' size='sm' title='Small'>Structural review pending.</Alert>
            <Alert className='mb-4' size='md' title='Medium'>Structural review pending.</Alert>
            <Alert size='lg' title='Large'>Structural review pending.</Alert>
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
            <Alert size='md' type='warning'>Load tolerance nearing limit.</Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="actions" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Actions
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={actionsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx"
        >
          <div className='flex flex-col w-full'>
            {closeDismissed ? (
              <Button intent='secondary' className='mb-4 text-sm' onClick={() => setCloseDismissed(false)}>Reset example</Button>
            ) : (
              <Alert className='mb-4' size='md' type='error' title='Deployment failed' onClose={() => setCloseDismissed(true)}>
                Build #482 failed structural checks.
              </Alert>
            )}

            <Alert size='md' type='warning' title='Config changed' onUndo={() => window.alert('Reverting configuration change.')}>
              Timeout threshold updated to 30s.
            </Alert>
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
            <Alert size='md' color={customColor} title='Custom'>Custom color alert.</Alert>

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
