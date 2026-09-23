import { useInstallPreference, type PackageManager } from '../../core/useInstallPreference'
import { Button } from '../../components/ui/Button'
import { CodeViewer } from '../../components/ui/CodeViewer'

import { deriveImportLines, type ManualPath } from '../utils/deriveUsageCode'
import { getCliCommand } from '../utils/cliCommand'
import { registry } from '../../cli/registry'

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
  slug?: string
  manualOnly?: boolean
  bordered?: boolean
}

export const SetupGuide = ({
  componentNames,
  manualPath,
  requires,
  slug,
  manualOnly = false,
  bordered = true,
}: SetupGuideProps) => {
  const { installTab, updateInstallTab, packageManager, updatePackageManager } = useInstallPreference()

  const commandImport = deriveImportLines({ componentNames, manualPath, mode: 'command' })
  const manualImport = deriveImportLines({ componentNames, manualPath, mode: 'manual' })
  const cliCommand = getCliCommand(packageManager, slug || componentNames)

  // If manualOnly is true, we force it to act like the source tab is selected.
  const isManual = manualOnly || installTab === 'source'

  const containerClasses = bordered
    ? 'border-2 border-(--lithos-border) bg-(--lithos-bg) p-4 md:p-6 overflow-hidden transform-[translateZ(0)] rounded-(--lithos-radius)'
    : 'bg-(--lithos-bg) p-4 md:p-6'

  return (
    <div className={bordered ? 'mb-8' : ''}>
      {!manualOnly && (
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => updateInstallTab('package')}
            variant={installTab !== 'package' ? 'secondary' : 'primary'}
          >
            Package
          </Button>
          <Button
            onClick={() => updateInstallTab('source')}
            variant={installTab !== 'source' ? 'secondary' : 'primary'}
          >
            Source
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
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">Download via CLI:</p>
            <CodeViewer code={cliCommand} language="bash" className="mb-8" />
            <hr className="border-t-2 border-(--lithos-border) my-8" />
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">
              Or manually copy the source components:
            </p>
            <CodeViewer code={manualImport} language="tsx" className="mb-6" />
            {(() => {
              const activeRequires = slug && registry[slug] ? registry[slug].requires : requires
              return Array.isArray(activeRequires) && activeRequires.length > 0 ? (
                <p className="mt-6 text-sm font-body opacity-80 text-(--lithos-text) wrap-break-word">
                  <strong>Requires:</strong>{' '}
                  {activeRequires.map((res, i) => (
                    <span key={res}>
                      {res}
                      {i !== activeRequires.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              ) : null
            })()}
          </>
        )}
      </div>
    </div>
  )
}
