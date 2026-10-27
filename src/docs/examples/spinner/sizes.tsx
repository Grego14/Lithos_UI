import { Spinner } from '../../../components/ui/Spinner'

export const SpinnerSizes = () => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
    </div>
  )
}
