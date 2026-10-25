import { useState } from 'react'
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from '../../../components/ui/Drawer'
import { Button } from '../../../components/ui/Button'

export const ResponsiveDrawerExample = () => {
  const [open, onOpenChange] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      mode="responsive"
      trigger={<Button onClick={() => onOpenChange(true)}>Edit Profile</Button>}
      aria-label="Edit Profile"
    >
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <p className="text-sm text-(--lithos-text)/80">Make changes to your profile here.</p>
        <input type="text" placeholder="Username" className="mt-4 w-full rounded-md border p-2 text-sm" />
        <input type="email" placeholder="Email" className="mt-3 w-full rounded-md border p-2 text-sm" />
      </DrawerBody>
      <DrawerFooter className="space-x-2">
        <Button variant="text" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
      </DrawerFooter>
    </Drawer>
  )
}
