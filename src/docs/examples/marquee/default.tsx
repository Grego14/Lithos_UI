import { Marquee } from '../../../components/ui/Marquee'
import { Badge } from '../../../components/ui/Badge'

export const DefaultMarqueeExample = () => (
  <Marquee>
    <span className="font-mono font-bold text-sm">LITHOS UI V0.1.5</span>
    <Badge size="sm" intent="accent">
      NEW
    </Badge>
    <span className="font-bold text-sm">ZERO-GAP ARCHITECTURAL STABILITY</span>
    <span className="font-mono text-xs opacity-60">·</span>
    <span className="font-bold text-sm">AUTOMATED YIQ CONTRAST</span>
    <span className="font-mono text-xs opacity-60">·</span>
  </Marquee>
)
