import { Spinner } from '../../../components/ui/Spinner'
import { Button } from '../../../components/ui/Button'
import { InputGroup, InputGroupInput } from '../../../components/ui/Input'
import { Badge } from '../../../components/ui/Badge'
import { Alert } from '../../../components/ui/Alert'

export const SpinnerIntegration = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-10">
      {/* Button Examples */}
      <div className="flex flex-wrap justify-center -m-3">
        <div className="p-3">
          <Button disabled variant="primary" iconLeft={<Spinner size={16} icon="FiSettings" />}>
            Applying Configuration
          </Button>
        </div>
        <div className="p-3">
          <Button disabled variant="inverse" iconLeft={<Spinner size={16} icon="PiSpinnerGap" />}>
            Authenticating
          </Button>
        </div>
      </div>

      {/* Input Example */}
      <div className="w-full max-w-sm">
        <InputGroup startAdornment={<Spinner size={16} icon="LuLoader" />}>
          <InputGroupInput placeholder="Searching database..." disabled />
        </InputGroup>
      </div>

      {/* Badge Examples */}
      <div className="flex flex-wrap justify-center -m-3">
        <div className="p-3">
          <Badge intent="warning" className="flex items-center space-x-2 px-3 py-1.5">
            <Spinner size={12} icon="FiRefreshCw" />
            <span>SYNCING CLOUD</span>
          </Badge>
        </div>
        <div className="p-3">
          <Badge intent="success" className="flex items-center space-x-2 px-3 py-1.5">
            <Spinner size={12} icon="FiRefreshCcw" anticlockwise />
            <span>RESTORING BACKUP</span>
          </Badge>
        </div>
      </div>

      {/* Alert Example */}
      <div className="w-full max-w-lg">
        <Alert intent="info" variant="outlined" size="md" title="Migration in progress">
          <span className="flex items-center space-x-3">
            <Spinner size={20} icon="VscLoading" />
            <span>Moving 2.4 million records to the new cluster...</span>
          </span>
        </Alert>
      </div>
    </div>
  )
}
