import { Badge } from '../../../components/ui/Badge'

export const BadgeVariantsExample = () => (
  <div className="flex flex-col items-center text-center flex-wrap">
    <Badge className="mb-4">Default</Badge>
    <Badge className="mb-4" intent="accent">
      Accent
    </Badge>
    <Badge className="mb-4" intent="success">
      Success
    </Badge>
    <Badge className="mb-4" intent="warning">
      Warning
    </Badge>
    <Badge className="mb-4" intent="error">
      Error
    </Badge>
    <Badge intent="info">Info</Badge>
  </div>
)
