import { Input } from '../../../components/ui/Input'

export const CustomizedInputExample = () => (
  <Input
    placeholder="Styled via className"
    className="border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-border)] p-2 font-(--font-mono)"
  />
)
