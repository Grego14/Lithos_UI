import { Drawer, type DrawerPlacement } from '../../../components/ui/Drawer'
import { Button } from '../../../components/ui/Button'
import { IconClose } from '../../../components/ui/icons/IconClose'

export const PlacementsDrawerExample = ({
  open,
  placement,
  onOpenChange,
}: {
  open: boolean
  placement: DrawerPlacement
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Drawer open={open} placement={placement} onOpenChange={onOpenChange} aria-label={`${placement} placement drawer`}>
      <div className="flex h-full w-full flex-col p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold capitalize">{placement} Drawer</h2>
          <Button variant="text" onClick={() => onOpenChange(false)} aria-label="Close drawer">
            <IconClose aria-hidden="true" />
          </Button>
        </div>

        <p className="flex-1 py-4 text-sm text-(--lithos-text)/75">
          This drawer is aligned to the {placement} edge of the screen.
        </p>

        <div className="pt-4">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
