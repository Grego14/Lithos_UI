import { Marquee } from '../../../components/ui/Marquee'

export const MarqueeBorderedExample = () => (
  <Marquee variant="bordered">
    <span className="font-mono font-bold text-sm uppercase">FULL-BLEED SECTION DIVIDER</span>
    <span className="font-mono text-xs opacity-60">◆</span>
    <span className="font-bold text-sm uppercase">TOP AND BOTTOM BORDERS ONLY</span>
    <span className="font-mono text-xs opacity-60">◆</span>
    <span className="font-mono font-bold text-sm uppercase">ZERO LATERAL OVERFLOW</span>
    <span className="font-mono text-xs opacity-60">◆</span>
  </Marquee>
)
