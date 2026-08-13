import { useInstallPreference, type PackageManager } from "../../core/useInstallPreference"
import { Button } from "../../components/ui/Button"
import { CodeViewer } from "../../components/ui/CodeViewer"

const commands = {
  pnpm: 'pnpm add lithos-ui',
  npm: 'npm install lithos-ui',
  yarn: 'yarn add lithos-ui',
  bun: 'bun add lithos-ui'
}

interface SetupGuideProps {
  componentNames: string[]
  manualPath: string | Partial<Record<string, string>>
  requires?: string[]
}

export const SetupGuide = ({ componentNames, manualPath, requires }: SetupGuideProps) => {
  const { installTab, updateInstallTab, packageManager, updatePackageManager } = useInstallPreference()

  const commandImport = `import { ${componentNames.join(', ')} } from 'lithos-ui'`

  let manualImport: string
  if (typeof manualPath === 'string') {
    manualImport = `import { ${componentNames.join(', ')} } from '${manualPath}'`
  } else {
    // Group component names by their specific manual path
    const pathsToNames: Record<string, string[]> = {}
    componentNames.forEach(name => {
      // Default to root if not mapped, though users should map all if using Record
      const path = manualPath[name]
      if (path) {
        if (!pathsToNames[path]) pathsToNames[path] = []
        pathsToNames[path].push(name)
      }
    })

    manualImport = Object.entries(pathsToNames).map(([path, names]) => {
      return `import { ${names.join(', ')} } from '${path}'`
    }).join('\n')
  }

  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => updateInstallTab('command')}
          intent={installTab !== 'command' ? 'secondary' : 'primary'}
        >
          Command
        </Button>
        <Button
          onClick={() => updateInstallTab('manual')}
          intent={installTab !== 'manual' ? 'secondary' : 'primary'}
        >
          Manual
        </Button>
      </div>

      <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) p-4 md:p-6">
        {installTab === 'command' ? (
          <>
            <div className='mb-6 space-x-4'>
              {(Object.keys(commands) as PackageManager[]).map((command) => (
                <Button
                  key={`commands-${command}`}
                  intent={command === packageManager ? 'primary' : 'text'}
                  onClick={() => updatePackageManager(command)}>
                  {command}
                </Button>
              ))}
            </div>

            <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Install package:</p>
            <CodeViewer code={commands[packageManager]} language="bash" className="mb-6" />
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">Import:</p>
            <CodeViewer code={commandImport} language="tsx" />
          </>
        ) : (
          <>
            <p className="mb-4 text-sm font-body opacity-80 text-(--lithos-text)">Copy the source components and import:</p>
            <CodeViewer code={manualImport} language="tsx" className="mb-6" />
            {Array.isArray(requires) && (
              <p className="mt-6 text-sm font-body opacity-80 text-(--lithos-text) wrap-break-word"><strong>Requires:</strong>{' '}
                {requires.map((res, i) => (
                  <span key={res}>{res}{i !== requires.length - 1 ? ', ' : ''}</span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
