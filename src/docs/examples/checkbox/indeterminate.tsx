import { Checkbox } from '../../../components/ui/Checkbox'
import { useState } from 'react'

export const IndeterminateCheckboxExample = () => {
  const options = ['cheese', 'pepperoni', 'olives']
  const [value, setValue] = useState<string[]>(['cheese'])
  const allChecked = value.length === options.length

  return (
    <>
      <Checkbox
        label="Select all toppings"
        checked={allChecked}
        indeterminate={value.length > 0 && !allChecked}
        onChange={(event) => setValue(event.target.checked ? options : [])}
      />
      <div className="ml-6 flex flex-col [&>*:not(:first-child)]:mt-2">
        {options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={value.includes(option)}
            onChange={(event) =>
              setValue(event.target.checked ? [...value, option] : value.filter((item) => item !== option))
            }
          />
        ))}
      </div>
    </>
  )
}
