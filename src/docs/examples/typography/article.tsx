import { Typography } from '../../../components/ui/Typography'

export const ArticleSnippet = () => {
  return (
    <article className="p-6 bg-(--lithos-bg) border-2 border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] flex flex-col space-y-4">
      <Typography variant="caption">Featured Note</Typography>

      <Typography variant="h2">Raw Layout Clarity</Typography>

      <Typography>
        Lithos UI relies on <Typography variant="mark">structural weight</Typography> and high contrast rather than
        smooth gradients.
      </Typography>

      <Typography variant="blockquote">"Neobrutalism is not about ugly UI, it is about raw layout clarity."</Typography>

      <Typography variant="small" className="text-(--lithos-text)/80">
        Run <Typography variant="code">npm i lithos-ui</Typography> to get started.
      </Typography>
    </article>
  )
}
