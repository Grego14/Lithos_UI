import { Alert } from '../../../components/ui/Alert'

export const FilledAlertsExample = () => (
  <div className="flex flex-col w-full">
    <Alert className="mb-4" size="lg" variant="filled" title="Default">
      Structural review pending.
    </Alert>
    <Alert className="mb-4" size="lg" intent="success" variant="filled" title="Success">
      Deployment verified.
    </Alert>
    <Alert className="mb-4" size="lg" intent="warning" variant="filled" title="Warning">
      Load tolerance nearing limit.
    </Alert>
    <Alert className="mb-4" size="lg" intent="error" variant="filled" title="Error">
      Integrity check failed.
    </Alert>
    <Alert className="mb-4" size="lg" intent="info" variant="filled" title="Info">
      Maintenance window scheduled.
    </Alert>
    <Alert size="lg" intent="accent" variant="filled" title="Accent">
      Theme accent applied.
    </Alert>
  </div>
)
