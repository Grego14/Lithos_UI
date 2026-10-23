import { Alert } from '../../../components/ui/Alert'

export const AlertSizesExample = () => (
  <div className="flex flex-col w-full">
    <Alert className="mb-4" size="sm" title="Small">
      Structural review pending.
    </Alert>
    <Alert className="mb-4" size="md" title="Medium">
      Structural review pending.
    </Alert>
    <Alert size="lg" title="Large">
      Structural review pending.
    </Alert>
  </div>
)
