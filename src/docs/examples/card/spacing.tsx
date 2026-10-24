import { useState } from 'react'
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'

export const SpacingCardExample = () => {
  const [spacing, setSpacing] = useState<'sm' | 'md' | 'lg'>('md')

  return (
    <div className="flex flex-col">
      <div className="flex mb-6">
        <Button variant={spacing === 'sm' ? 'primary' : 'secondary'} onClick={() => setSpacing('sm')} className="mr-4">
          Small
        </Button>
        <Button variant={spacing === 'md' ? 'primary' : 'secondary'} onClick={() => setSpacing('md')} className="mr-4">
          Medium
        </Button>
        <Button variant={spacing === 'lg' ? 'primary' : 'secondary'} onClick={() => setSpacing('lg')}>
          Large
        </Button>
      </div>
      <Card className="max-w-sm">
        <CardContent spacing={spacing}>
          <CardTitle>Spacious Card</CardTitle>
          <CardDescription>
            This card uses the {spacing} spacing token for maximum internal breathing room.
          </CardDescription>
        </CardContent>
        <CardFooter spacing={spacing}>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
