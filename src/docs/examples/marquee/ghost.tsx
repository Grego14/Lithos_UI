import { Marquee } from '../../../components/ui/Marquee'

export const MarqueeGhostExample = () => (
  <Marquee variant="ghost">
    <span className="font-mono font-bold text-sm uppercase opacity-75">TRANSPARENT BACKGROUND</span>
    <span className="font-mono text-xs opacity-50">✦</span>
    <span className="font-bold text-sm uppercase">SEAMLESS BACKGROUND INHERITANCE</span>
    <span className="font-mono text-xs opacity-50">✦</span>
    <span className="font-mono font-bold text-sm uppercase opacity-75">MINIMALIST AMBIENT TICKER</span>
    <span className="font-mono text-xs opacity-50">✦</span>
  </Marquee>
)
