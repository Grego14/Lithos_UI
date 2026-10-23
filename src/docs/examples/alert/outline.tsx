import { Alert } from '../../../components/ui/Alert'

export const OutlineAlertsExample = () => (
  <div className="flex flex-col w-full">
    <Alert className="mb-4" size="lg" variant="outlined" title="Default">
      Structural review pending.
    </Alert>
    <Alert className="mb-4" size="lg" intent="success" variant="outlined" title="Success">
      Deployment verified.
    </Alert>
    <Alert className="mb-4" size="lg" intent="warning" variant="outlined" title="Warning">
      Load tolerance nearing limit.
    </Alert>
    <Alert className="mb-4" size="lg" intent="error" variant="outlined" title="Error">
      Integrity check failed.
    </Alert>
    <Alert className="mb-4" size="lg" intent="info" variant="outlined" title="Info">
      Maintenance window scheduled.
    </Alert>
    <Alert size="lg" intent="accent" variant="outlined" title="Accent">
      Theme accent applied.
    </Alert>
  </div>
)
