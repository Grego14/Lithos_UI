import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { Button } from '../../../components/ui/Button'

export const DefaultExample = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover Me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a neo-brutalist tooltip.</p>
      </TooltipContent>
    </Tooltip>
  )
}
