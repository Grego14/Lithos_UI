import { Spinner } from '../../../components/ui/Spinner'

export const SpinnerRotation = () => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={32} icon="FiRefreshCw" />
      <Spinner size={32} icon="FiRefreshCcw" anticlockwise />
    </div>
  )
}
