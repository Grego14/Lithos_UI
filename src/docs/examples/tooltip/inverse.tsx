import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { Button } from '../../../components/ui/Button'

export const InverseExample = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="inverse">Inverse</Button>
      </TooltipTrigger>
      <TooltipContent variant="inverse">
        <p>Inverse variant</p>
      </TooltipContent>
    </Tooltip>
  )
}
