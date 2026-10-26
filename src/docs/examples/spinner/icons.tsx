import { Spinner, type SpinnerIconType } from '../../../components/ui/Spinner'

export const SpinnerIcons = () => {
  const icons: SpinnerIconType[] = [
    'FiLoader',
    'FiRefreshCw',
    'FiRefreshCcw',
    'FiSettings',
    'VscLoading',
    'LuLoaderCircle',
    'LuLoader',
    'TbLoader2',
    'TbLoader3',
    'PiSpinnerGap',
    'PiCircleNotch',
    'RiLoader2Line',
    'RiLoader3Line',
    'RiLoader4Line',
  ]

  return (
    <div className="flex flex-wrap items-end justify-center -m-2 sm:-m-4">
      {icons.map((iconName) => (
        <div key={iconName} className="w-1/2 p-2 sm:w-auto sm:p-4">
          <div className="flex flex-col items-center space-y-2">
            <Spinner size={32} icon={iconName} />
            <span className="text-[10px] font-mono opacity-70">{iconName}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
