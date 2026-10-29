import { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'
import { IconSettings } from '../../../components/ui/icons'

export const DefaultDialogExample = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={onClose}>
        <DialogHeader icon={<IconSettings className="w-5 h-5" />}>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">
            Dismissible via Escape, the backdrop, or the close button — standard settings-panel behavior.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={onClose}>Save</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
