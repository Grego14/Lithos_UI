import { Button } from '../../../components/ui/Button'
import { IconHome, IconSettings } from '../../../components/ui/icons'

export const WithIconButtonsExample = () => (
  <div className="flex items-center">
    <Button iconLeft={<IconHome />}>Home</Button>
    <Button variant="secondary" iconRight={<IconSettings />} className="ml-3">
      Settings
    </Button>
  </div>
)
