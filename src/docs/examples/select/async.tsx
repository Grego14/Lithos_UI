import { useCallback, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Select } from '../../../components/ui/Select'
import type { SelectOption } from '../../../components/ui/select/select.types'

export const AsyncSelectExample = () => {
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)

  const fetchOptions = useCallback(() => {
    setLoading(true)
    setOptions([])

    new Promise<SelectOption[]>((resolve) => {
      setTimeout(() => {
        resolve(
          Array.from({ length: 300 }, (_, index) => ({
            label: `Option ${index + 1}`,
            value: `opt-${index + 1}`,
          }))
        )
      }, 600)
    }).then((data) => {
      setOptions(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <Button onClick={fetchOptions} disabled={loading} className="w-full justify-center mb-4">
        {loading ? 'Fetching 300 items...' : 'Load Async Options'}
      </Button>
      <Select
        options={options}
        placeholder={loading ? 'Loading...' : options.length > 0 ? 'Select option' : 'Click button to load options'}
      />
    </div>
  )
}
