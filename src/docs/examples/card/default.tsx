import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import card1 from '../../assets/images/card1.webp'

export const DefaultCardExample = () => (
  <Card interactive className="max-w-sm">
    <CardImage src={card1} alt="Preview thumbnail" />
    <CardContent>
      <CardTitle>John 10:11</CardTitle>
      <CardDescription>I am the good shepherd: the good shepherd giveth his life for the sheep.</CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" className="mr-3">
        Cancel
      </Button>
      <Button>Confirm</Button>
    </CardFooter>
  </Card>
)
