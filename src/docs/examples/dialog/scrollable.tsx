import { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'

export const ScrollableDialogExample = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Terms</Button>
      <Dialog open={open} onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index} className="font-body">
              Section {index + 1}. Long-form content scrolls inside DialogBody only — the header and footer stay fixed
              (sticky) above and below it.
            </p>
          ))}
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>I Agree</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
