import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../../../components/ui/Popover'
import { Button } from '../../../components/ui/Button'

export const DefaultPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>

      <PopoverContent className="w-64">
        <div className="flex flex-col">
          <h4 className="font-bold">Settings</h4>
          <p className="text-sm mt-2">Configure your preferences here.</p>
          <PopoverClose asChild>
            <Button variant="secondary" className="mt-4" fullWidth>
              Close
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
