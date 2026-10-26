import { Spinner } from '../../../components/ui/Spinner'

export const SpinnerExample = ({ color = '#f59e0b' }: { color?: string }) => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={32} variant="default" />
      <Spinner size={32} variant="accent" />
      <Spinner size={32} color={color} />
    </div>
  )
}
