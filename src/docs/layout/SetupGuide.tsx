import { useState } from "react"
import { Button } from "../../components/ui/Button"
import { CodeViewer } from "../../components/ui/CodeViewer"

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

export const SetupGuide = ({ commandImport, manualImport, requires }: SetupGuideProps) => {
  const [installTab, setInstallTab] = useState<'command' | 'manual'>('command')
  const [usedCommand, setUsedCommand] = useState<Commands>('pnpm')

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
              <p className="text-sm font-bold opacity-80 text-(--lithos-text)">Requires:{' '}
                {requires.map((res, i) => (
                  <span>{res}{i !== requires.length - 1 ? ',' : ''}</span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
