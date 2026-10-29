import { Marquee } from '../../../components/ui/Marquee'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'

export const MarqueeInteractiveExample = () => (
  <Marquee fadeEdges speed="slow" className="py-4">
    {[
      { title: 'Zero-Gap', badge: 'STABLE', icon: '■' },
      { title: 'YIQ Contrast', badge: 'AUTOMATED', icon: '◐' },
      { title: 'Specificity', badge: 'FLAT', icon: '▲' },
      { title: 'Physics', badge: 'NATIVE', icon: '⬣' },
    ].map((item, idx) => (
      <Card key={idx} interactive className="w-48 p-3 bg-(--lithos-surface) shadow-[3px_3px_0_0_var(--lithos-shadow)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg">{item.icon}</span>
          <Badge size="sm" intent="accent">
            {item.badge}
          </Badge>
        </div>
        <p className="font-mono font-bold text-xs text-(--lithos-text)">{item.title}</p>
      </Card>
    ))}
  </Marquee>
)
