import { useToast } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

export const DefaultToast = () => {
  const toast = useToast()

  const triggerToast = () => {
    if (toast && toast.addToast)
      toast.addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        intent: 'default',
      })
  }

  return <Button onClick={triggerToast}>Trigger Toast</Button>
}
