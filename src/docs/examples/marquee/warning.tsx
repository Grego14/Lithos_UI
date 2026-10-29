import { Marquee } from '../../../components/ui/Marquee'

export const MarqueeWarningExample = () => (
  <Marquee variant="warning">
    <span className="font-mono font-black text-sm uppercase tracking-wider">
      ⚠ CAUTION: ACTIVE SYSTEM MAINTENANCE · PACKAGES COMPILING · CHECK LOGS FOR STATUS ⚠
    </span>
    <span className="font-mono font-bold text-sm uppercase tracking-wide">
      SAFETY PROTOCOL · VERIFY DEPENDENCIES BEFORE INTEGRATION
    </span>
  </Marquee>
)
