import { Marquee } from '../../../components/ui/Marquee'

export const MarqueeDirectionExample = () => (
  <div>
    <div className="mb-4">
      <Marquee direction="left" speed="normal">
        <span className="font-mono font-bold text-sm">LEFT SCROLLING DIRECTION (DEFAULT)</span>
        <span className="font-mono text-xs opacity-60">←</span>
        <span className="font-bold text-sm">TRANSLATES FROM RIGHT TO LEFT</span>
        <span className="font-mono text-xs opacity-60">←</span>
      </Marquee>
    </div>

    <Marquee direction="right" speed="normal" variant="accent">
      <span className="font-mono font-black text-sm">RIGHT SCROLLING DIRECTION (REVERSE)</span>
      <span className="font-mono text-xs">→</span>
      <span className="font-black text-sm">TRANSLATES FROM LEFT TO RIGHT</span>
      <span className="font-mono text-xs">→</span>
    </Marquee>
  </div>
)
