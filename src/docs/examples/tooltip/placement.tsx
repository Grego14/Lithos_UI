import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { Button } from '../../../components/ui/Button'

const placements = ['left', 'top', 'bottom', 'right'] as const

export const PlacementExample = () => {
  return (
    <div className="flex flex-wrap items-center justify-center [&>button:not(last-child)]:mr-4 w-full">
      {placements.map((placement) => (
        <Tooltip placement={placement} key={placement}>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="capitalize">
              {placement}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize">{placement} placement</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
