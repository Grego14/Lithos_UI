import { Select } from '../../../components/ui/Select'

const FRAMEWORK_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Preact', value: 'preact' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const BasicSelectExample = () => <Select options={FRAMEWORK_OPTIONS} placeholder="Select a framework..." />
