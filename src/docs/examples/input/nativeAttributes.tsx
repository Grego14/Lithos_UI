import { Input } from '../../../components/ui/Input'

export const NativeAttributesInputExample = () => (
  <>
    <Input type="email" placeholder="you@example.com" />
    <Input className="mt-4" type="password" placeholder="Password" />
    <Input className="mt-4" type="number" placeholder="Age" min={0} max={120} />
  </>
)
