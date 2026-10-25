import { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

export const SizeDialogExample = () => {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<(typeof sizes)[number]>('md')

  const onClose = () => setOpen(false)

  return (
    <>
      {sizes.map((s) => (
        <Button
          key={s}
          onClick={() => {
            setSize(s)
            setOpen(true)
          }}
          className="mr-2 mb-2"
        >
          {s}
        </Button>
      ))}

      <Dialog open={open} onClose={onClose} size={size}>
        <DialogHeader>
          <DialogTitle>size="{size}"</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">Panel max-width follows the size prop.</p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
