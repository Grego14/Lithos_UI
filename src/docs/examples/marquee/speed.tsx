import { Marquee } from '../../../components/ui/Marquee'
import { Badge } from '../../../components/ui/Badge'

export const MarqueeSpeedExample = () => (
  <div>
    <div className="mb-4">
      <div className="flex items-center mb-1.5">
        <Badge size="sm" intent="default" className="mr-2 font-mono">
          SLOW · 60S
        </Badge>
        <span className="text-xs font-mono font-bold uppercase opacity-70 text-(--lithos-text)">Relaxed & Ambient</span>
      </div>
      <Marquee speed="slow">
        <span className="font-mono font-bold text-sm">SLOW VELOCITY</span>
        <span className="font-mono text-xs opacity-50">·</span>
        <span className="text-sm font-bold">SMOOTH AND LEISURELY READING PACING</span>
        <span className="font-mono text-xs opacity-50">·</span>
      </Marquee>
    </div>

    <div className="mb-4">
      <div className="flex items-center mb-1.5">
        <Badge size="sm" intent="accent" className="mr-2 font-mono">
          NORMAL · 36S (DEFAULT)
        </Badge>
        <span className="text-xs font-mono font-bold uppercase opacity-70 text-(--lithos-text)">
          Balanced & Legible
        </span>
      </div>
      <Marquee speed="normal">
        <span className="font-mono font-bold text-sm">DEFAULT SPEED PRESET</span>
        <span className="font-mono text-xs opacity-50">·</span>
        <span className="text-sm font-bold">BALANCED VELOCITY FOR CONTINUOUS READING</span>
        <span className="font-mono text-xs opacity-50">·</span>
      </Marquee>
    </div>

    <div>
      <div className="flex items-center mb-1.5">
        <Badge size="sm" intent="default" className="mr-2 font-mono">
          FAST · 18S
        </Badge>
        <span className="text-xs font-mono font-bold uppercase opacity-70 text-(--lithos-text)">Brisk & Urgent</span>
      </div>
      <Marquee speed="fast" variant="accent">
        <span className="font-mono font-black text-sm">FAST VELOCITY PRESET</span>
        <span className="font-mono text-xs">▲</span>
        <span className="text-sm font-bold">HIGH-ENERGY BREAKING ANNOUNCEMENTS</span>
        <span className="font-mono text-xs">▲</span>
      </Marquee>
    </div>
  </div>
)
