import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import card1 from '../../assets/images/card1.webp'

export const ElevateCardExample = () => (
  <Card interactive="elevate" className="max-w-sm">
    <CardImage src={card1} alt="Preview" />
    <CardContent>
      <CardTitle>Elevate Physics</CardTitle>
      <CardDescription>
        This interactive mode restores the legacy translation lift on hover instead of expanding the shadow.
      </CardDescription>
    </CardContent>
  </Card>
)
