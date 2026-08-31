import { useInstallPreference, type PackageManager } from '../../core/useInstallPreference'
import { Button } from '../../components/ui/Button'
import { CodeViewer } from '../../components/ui/CodeViewer'

import { deriveImportLines, type ManualPath } from '../utils/deriveUsageCode'

const commands = {
  pnpm: 'pnpm add lithos-ui',
  npm: 'npm install lithos-ui',
  yarn: 'yarn add lithos-ui',
  bun: 'bun add lithos-ui',
}

interface SetupGuideProps {
  componentNames: string[]
  manualPath: ManualPath
  requires?: string[]
  manualOnly?: boolean
  bordered?: boolean
}

export const SetupGuide = ({
  componentNames,
  manualPath,
  requires,
  manualOnly = false,
  bordered = true,
}: SetupGuideProps) => {
  const { installTab, updateInstallTab, packageManager, updatePackageManager } = useInstallPreference()

  const commandImport = deriveImportLines({ componentNames, manualPath, mode: 'command' })
  const manualImport = deriveImportLines({ componentNames, manualPath, mode: 'manual' })

  // If manualOnly is true, we force it to act like the manual tab is selected.
  const isManual = manualOnly || installTab === 'manual'

  const containerClasses = bordered
    ? 'border-2 border-(--lithos-border) bg-(--lithos-bg) p-4 md:p-6 overflow-hidden transform-[translateZ(0)] rounded-(--lithos-radius)'
    : 'bg-(--lithos-bg) p-4 md:p-6'

  return (
    <div className={bordered ? 'mb-8' : ''}>
      {!manualOnly && (
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => updateInstallTab('command')}
            variant={installTab !== 'command' ? 'secondary' : 'primary'}
          >
            Command
          </Button>
          <Button
            onClick={() => updateInstallTab('manual')}
            variant={installTab !== 'manual' ? 'secondary' : 'primary'}
          >
            Manual
          </Button>
        </div>
      )}

      <div className={containerClasses}>
        {!isManual ? (
          <>
            <div className="mb-6 space-x-4">
              {(Object.keys(commands) as PackageManager[]).map((command) => (
                <Button
                  key={`commands-${command}`}
                  variant={command === packageManager ? 'primary' : 'text'}
                  onClick={() => updatePackageManager(command)}
                >
                  {command}
                </Button>
              ))}
            </div>

            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">Install package:</p>
            <CodeViewer code={commands[packageManager]} language="bash" className="mb-6" />
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">Import:</p>
            <CodeViewer code={commandImport} language="tsx" />
          </>
        ) : (
          <>
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">
              Copy the source components and import:
            </p>
            <CodeViewer code={manualImport} language="tsx" className="mb-6" />
            {Array.isArray(requires) && (
              <p className="mt-6 text-sm font-body opacity-80 text-(--lithos-text) wrap-break-word">
                <strong>Requires:</strong>{' '}
                {requires.map((res, i) => (
                  <span key={res}>
                    {res}
                    {i !== requires.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
