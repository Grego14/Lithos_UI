import {
  useState,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type FocusEventHandler,
  type KeyboardEvent,
  type MouseEvent,
  type FocusEvent
} from "react"
import { Button } from "../../components/ui/Button"
import { CodeViewer } from "../../components/ui/CodeViewer"
import { useToast } from "../../core/hooks/useToast"

const commands = {
  pnpm: 'pnpm add lithos-ui',
  npm: 'npm install lithos-ui',
  yarn: 'yarn add lithos-ui',
  bun: 'bun add lithos-ui'
}

type Commands = keyof typeof commands

interface SetupGuideProps {
  commandImport: string
  manualImport: string,
  requires?: string[]
}

interface RequiredResourceProps {
  resource: string
  isLast: boolean
  hoveredId: string | null
  handlers: {
    onMouseEnter: MouseEventHandler<HTMLSpanElement>
    onMouseLeave: () => void
    onFocus: FocusEventHandler<HTMLSpanElement>
    onBlur: () => void
    onClick: MouseEventHandler<HTMLSpanElement>
    onKeyDown: KeyboardEventHandler<HTMLSpanElement>
  }
}

const RequiredResource = ({ resource, isLast, hoveredId, handlers }: RequiredResourceProps) => {
  const id = `id-${resource}`.replace('/', '-').replace(/\.\D+$/, '')

  const classes = hoveredId === id
    ? 'bg-(--lithos-accent)/25'
    : 'bg-(--lithos-surface)'

  return (
    <>
      <span {...handlers} tabIndex={0} data-resource-id={id}>
        <code className={`${classes} cursor-pointer`}>{resource}</code>
      </span>
      {!isLast ? ',' : ''}
    </>
  )
}

export const SetupGuide = ({ commandImport, manualImport, requires }: SetupGuideProps) => {
  const [installTab, setInstallTab] = useState<'command' | 'manual'>('command')
  const [usedCommand, setUsedCommand] = useState<Commands>('pnpm')

  const [hoveredId, setHoveredId] = useState<null | string>(null)
  const toast = useToast()

  const handleHover = (e: FocusEvent<HTMLSpanElement> | MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget
    setHoveredId(target.getAttribute('data-resource-id'))
  }

  const handleBlur = () => setHoveredId(null)

  const handleCopy =
    async (e: KeyboardEvent<HTMLSpanElement> | MouseEvent<HTMLSpanElement>) => {
      const addToastExists = typeof toast?.addToast === 'function'

      if ('key' in e && e.key !== 'Enter') return

      try {
        const resource = (e.currentTarget as HTMLSpanElement).textContent
        await navigator.clipboard.writeText(resource)

        // TODO: make the toast duration shorter (that feature must be added)
        if (addToastExists) {
          toast.addToast({
            title: 'SUCCESS',
            message: 'Copied to clipboard',
            type: 'success',
          })
        }
      } catch {
        if (addToastExists) {
          toast.addToast({
            title: 'ERROR',
            message: 'Failed to copy code to clipboard',
            type: 'error',
          })
        }
      }
    }

  const handlers = {
    onMouseEnter: handleHover,
    onMouseLeave: handleBlur,
    onFocus: handleHover,
    onBlur: handleBlur,
    onClick: handleCopy,
    onKeyDown: handleCopy
  }

  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => setInstallTab('command')}
          intent={installTab !== 'command' ? 'secondary' : 'primary'}
        >
          Command
        </Button>
        <Button
          onClick={() => setInstallTab('manual')}
          intent={installTab !== 'manual' ? 'secondary' : 'primary'}
        >
          Manual
        </Button>
      </div>

      <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) p-4 md:p-6">
        {installTab === 'command' ? (
          <>
            <div className='mb-6 space-x-4'>
              {(Object.keys(commands) as Commands[]).map((command) => (
                <Button
                  key={`commands-${command}`}
                  intent={command === usedCommand ? 'primary' : 'text'}
                  onClick={() => setUsedCommand(command)}>
                  {command}
                </Button>
              ))}
            </div>

            <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Install package:</p>
            <CodeViewer code={commands[usedCommand]} language="bash" className="mb-6" />
            <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Import:</p>
            <CodeViewer code={commandImport} language="tsx" />
          </>
        ) : (
          <>
            <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Copy the source components and import:</p>
            <CodeViewer code={manualImport} language="tsx" className="mb-6" />
            {Array.isArray(requires) && (
              <p className="text-sm font-bold opacity-80 text-(--lithos-text)">Requires:
                {requires.map((res, i) => (
                  <RequiredResource
                    hoveredId={hoveredId}
                    handlers={handlers}
                    resource={res}
                    key={`required-item-${i}`}
                    isLast={i === requires?.length - 1}
                  />
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
