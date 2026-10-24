import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import card1 from '../../assets/images/card1.webp'

export const ImageCardExample = () => (
  <Card variant="image" className="w-full max-w-sm min-h-75">
    <CardImage src={card1} alt="Full bleed background" isBackground />
    <CardContent>
      <CardTitle>Full Bleed Overlay</CardTitle>
      <CardDescription className="opacity-90">
        Using isBackground on CardImage to compose a rich media card.
      </CardDescription>
    </CardContent>
  </Card>
)
