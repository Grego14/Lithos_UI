import { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'

export const NoCloseDialogExample = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={onClose} variant="simple">
        <DialogHeader hideClose>
          <DialogTitle>No Close Icon</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">
            hideClose removes the header X. Escape and backdrop click still close it — only the accidental-click
            affordance is gone.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>Got It</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
