import { Input } from '../../../components/ui/Input'

export const InputSizesExample = () => (
  <>
    <Input size="sm" placeholder="Small (h-8)" />
    <Input size="default" className="mt-4" placeholder="Default (h-10)" />
    <Input size="md" className="mt-4" placeholder="Medium (h-11)" />
    <Input size="lg" className="mt-4" placeholder="Large (h-12)" />
  </>
)
