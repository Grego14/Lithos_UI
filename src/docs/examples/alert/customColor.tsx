import { useRef, useState } from 'react'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { isHexColor } from '../../../core/types'
import { colors } from '../../../utils/colors'

export const CustomColorAlertExample = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCustomColor = () => {
    const value = inputRef.current?.value
    if (!value) return
    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #FF00FF)')
      return
    }
    setCustomColor(value)
    setError('')
  }

  return (
    <div className="flex flex-col w-full">
      <Alert size="md" color={customColor} title="Custom">
        Custom color alert.
      </Alert>
      <div className="mt-4 text-center flex items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          onFocus={() => setError('')}
          defaultValue={customColor}
          className="p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-30"
        />
        <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
          Use color
        </Button>
      </div>
      {error && (
        <span className="mt-2 text-xs block text-center" style={{ color: colors.error }}>
          {error}
        </span>
      )}
    </div>
  )
}
