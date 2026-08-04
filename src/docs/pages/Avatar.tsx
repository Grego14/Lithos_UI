import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Avatar } from '../../components/ui/Avatar'

export const AvatarDoc = () => {
  const variantsCode = `import { Avatar } from '../../components/ui/Avatar'

export const AvatarVariants = () => {
  return (
    <div className='flex items-center gap-4'>
      {/* default: image */}
      <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
      {/* default: no src, two-word alt falls back to double-letter initials */}
      <Avatar alt="Jane Doe" />
      {/* default: single-word alt falls back to single-letter initial */}
      <Avatar alt="Amy" />
      {/* solid: broken src falls back to initials */}
      <Avatar variant='solid' src="https://broken.example/404.png" alt="Jane Doe" />
    </div>
  )
}`

  const sizesCode = `import { Avatar } from '../../components/ui/Avatar'

export const AvatarSizes = () => {
  return (
    <div className='flex items-end gap-4'>
      <Avatar size='sm' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='md' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='lg' src="https://picsum.photos/200" alt="Jane Doe" />
    </div>
  )
}`

  const groupCode = `import { Avatar } from '../../components/ui/Avatar'

export const AvatarGroup = () => {
  // Overflow count is a group-level indicator, not a per-person avatar — styled to match, rendered raw.
  return (
    <div className='flex -space-x-3'>
      <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar src="https://picsum.photos/201" alt="John Smith" />
      <Avatar variant='solid' alt="Amy Lee" />
      <div className='relative inline-flex items-center justify-center shrink-0 w-12 h-12 text-base rounded-full border-2 border-(--lithos-border) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] bg-(--lithos-surface) text-(--lithos-text) font-(--font-sans) font-bold'>
        +3
      </div>
    </div>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Avatar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-edge identity primitive that renders a picture and falls back to initials or custom content when none is available.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Avatar is an atomic primitive designed to represent a user or entity. It swaps to its fallback automatically when the image fails to load.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Fallback initials are rendered whenever `src` is missing or the image fails to load — derived from `alt`. A single-word `alt` renders one letter; two or more words render the first letter of each of the first two words.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        States
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={variantsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <div className='flex items-center gap-4'>
            <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar alt="Jane Doe" />
            <Avatar alt="Amy" />
            <Avatar variant='solid' src="https://broken.example/404.png" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Sizes
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <div className='flex items-end gap-4'>
            <Avatar size='sm' src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size='md' src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size='lg' src="https://picsum.photos/200" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="group" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Group
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={groupCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <div className='flex -space-x-3'>
            <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar src="https://picsum.photos/201" alt="John Smith" />
            <Avatar variant='solid' alt="Amy Lee" />
            <Avatar variant='solid' alt="Sam" />
            <div className='relative inline-flex items-center justify-center shrink-0 w-12 h-12 text-base rounded-full border-2 border-(--lithos-border) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] bg-(--lithos-surface) text-(--lithos-text) font-(--font-sans) font-bold'>
              +3
            </div>
          </div>
        </PreviewBlock>
      </div>
    </div>
  )
}
