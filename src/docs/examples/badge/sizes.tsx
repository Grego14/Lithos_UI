import { Badge } from '../../../components/ui/Badge'

export const BadgeSizesExample = () => (
  <div className="flex flex-col items-center text-center">
    <Badge>Default</Badge>
    <Badge className="mt-4" size="sm">
      Small
    </Badge>
    <Badge className="mt-4" size="md">
      Medium
    </Badge>
    <Badge className="mt-4" size="lg">
      Large
    </Badge>
  </div>
)
