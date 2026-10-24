import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import card2 from '../../assets/images/card2.webp'

export const AccentCardExample = () => (
  <Card variant="accent" interactive className="max-w-sm">
    <CardImage src={card2} alt="Preview" />
    <CardContent>
      <CardTitle>Accent Card</CardTitle>
      <CardDescription>Hover over this card to see the background fill with the active theme color.</CardDescription>
    </CardContent>
  </Card>
)
