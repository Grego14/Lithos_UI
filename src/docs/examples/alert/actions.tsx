import { useState } from 'react'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'

export const AlertActionsExample = () => {
  const [dismissed, setDismissed] = useState(false)

  return (
    <div className="flex flex-col w-full">
      {dismissed ? (
        <Button variant="secondary" className="mb-4 text-sm" onClick={() => setDismissed(false)}>
          Reset example
        </Button>
      ) : (
        <Alert className="mb-4" size="md" intent="error" title="Deployment failed" onClose={() => setDismissed(true)}>
          Build #482 failed structural checks.
        </Alert>
      )}
      <Alert size="md" intent="warning" title="Config changed" onUndo={() => {}}>
        Timeout threshold updated to 30s.
      </Alert>
    </div>
  )
}
