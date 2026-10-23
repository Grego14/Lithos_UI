import { Alert } from '../../../components/ui/Alert'

export const TitlelessAlertExample = () => (
  <div className="flex flex-col w-full">
    <Alert size="md" intent="warning">
      Load tolerance nearing limit.
    </Alert>
  </div>
)
