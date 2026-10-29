import { Marquee } from '../../../components/ui/Marquee'

export const MarqueeVariantsExample = () => (
  <div className="space-y-6">
    <div>
      <p className="text-xs font-mono font-bold uppercase opacity-60 mb-2">Default Variant</p>
      <Marquee variant="default">
        <span className="font-mono font-bold text-sm">STANDARD TICKER RIBBON</span>
        <span className="font-mono text-xs opacity-60">■</span>
        <span className="font-bold text-sm">HARD 2PX BRUTALIST BORDERS</span>
        <span className="font-mono text-xs opacity-60">■</span>
      </Marquee>
    </div>

    <div>
      <p className="text-xs font-mono font-bold uppercase opacity-60 mb-2">Accent Variant</p>
      <Marquee variant="accent">
        <span className="font-mono font-black text-sm">BRAND ACCENT ALERT</span>
        <span className="font-mono text-xs">▲</span>
        <span className="font-black text-sm">AUTOMATED FOREGROUND CONTRAST</span>
        <span className="font-mono text-xs">▲</span>
      </Marquee>
    </div>

    <div>
      <p className="text-xs font-mono font-bold uppercase opacity-60 mb-2">Warning Variant</p>
      <Marquee variant="warning" speed="fast">
        <span className="font-mono font-black text-sm uppercase">⚠ UNRELEASED COMPONENT · PENDING NEXT RELEASE ⚠</span>
      </Marquee>
    </div>

    <div>
      <p className="text-xs font-mono font-bold uppercase opacity-60 mb-2">Bordered (Full-Bleed Ribbon)</p>
      <Marquee variant="bordered">
        <span className="font-mono font-bold text-sm">TOP AND BOTTOM BORDERS ONLY</span>
        <span className="font-mono text-xs opacity-60">◆</span>
        <span className="font-bold text-sm">PERFECT FOR FULL-WIDTH SECTION DIVIDERS</span>
        <span className="font-mono text-xs opacity-60">◆</span>
      </Marquee>
    </div>
  </div>
)
