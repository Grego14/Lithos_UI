import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { Button } from '../../../components/ui/Button'

export const PrimaryExample = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary">Primary</Button>
      </TooltipTrigger>
      <TooltipContent variant="primary">
        <p>Primary variant</p>
      </TooltipContent>
    </Tooltip>
  )
}
