import { Select } from '../../../components/ui/Select'

const FRAMEWORK_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Preact', value: 'preact' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const MultipleSelectExample = () => (
  <Select multiple options={FRAMEWORK_OPTIONS} placeholder="Select frameworks..." />
)
