import { Typography } from '../../../components/ui/Typography'

export const UsagePreview = () => {
  return (
    <div className="flex flex-col space-y-6">
      <Typography variant="h1">H1 - Display Title</Typography>
      <Typography variant="h2">H2 - Section Header</Typography>
      <Typography variant="h3">H3 - Sub section Header</Typography>
      <Typography variant="h4">H4 - Card Title</Typography>
      <Typography variant="h5">H5 - Small Header</Typography>
      <Typography variant="h6">H6 - Micro Header</Typography>
      <Typography>
        Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seamless fluid typography built for
        high-contrast interfaces.
      </Typography>
      <Typography variant="blockquote">
        Blockquote - "Neobrutalism is not about ugly UI, it is about raw layout clarity and structural personality."
      </Typography>
      <Typography variant="label">Label - Label Example</Typography>
      <div>
        <Typography variant="caption">Caption - CAPTION TEXT</Typography>
      </div>
      <div>
        Text with <Typography variant="mark">highlighted mark</Typography> and inline{' '}
        <Typography variant="code">const code = true</Typography> snippets.
      </div>
    </div>
  )
}
