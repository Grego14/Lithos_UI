import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import card1 from '../../assets/images/card1.webp'

export const SolidCardExample = () => (
  <Card variant="solid" interactive className="max-w-sm">
    <CardImage src={card1} alt="Preview" />
    <CardContent>
      <CardTitle>Solid Card</CardTitle>
      <CardDescription>
        A card that permanently stays in the accent color rather than waiting for a hover interaction.
      </CardDescription>
    </CardContent>
  </Card>
)
