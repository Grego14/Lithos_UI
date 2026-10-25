import { useState } from 'react'
import { CustomDialog } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'
import { IconAlertTriangle } from '../../../components/ui/icons/IconAlertTriangle'

export const CustomDialogExample = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Account</Button>
      <CustomDialog
        open={open}
        onClose={onClose}
        onAction={onClose}
        title="Delete Account"
        message="This action is irreversible. Choose Cancel or Delete to continue."
        actionLabel="Delete"
        buttonVariant="solid"
        buttonColor="#FF0000"
        offsetColor="#FF0000"
        icon={<IconAlertTriangle className="w-5 h-5" style={{ color: '#FF0000' }} />}
      />
    </>
  )
}
