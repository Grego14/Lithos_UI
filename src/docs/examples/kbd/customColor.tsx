import { Kbd } from '../../../components/ui/Kbd'

export const CustomColorKbd = () => {
  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <Kbd color="#00FF00" size="lg">
        Ctrl
      </Kbd>
      <Kbd color="#00FFFF" size="lg">
        Alt
      </Kbd>
      <Kbd color="#FFFF00" size="lg">
        Shift
      </Kbd>
      <Kbd color="#FF0055" size="lg">
        ⌘
      </Kbd>
      <Kbd color="#A855F7" size="lg">
        Custom
      </Kbd>
    </div>
  )
}
