import PreviewBlockUI from '../../components/ui/PreviewBlock'
import previewBlockRaw from '../../components/ui/PreviewBlock.jsx?raw'

export const PreviewBlockDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Preview Block
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          The interactive documentation shell that encapsulates live components and raw source code.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          This structural shell manages state between a live interactive component and its raw Vite string import. It carries heavy brutalist borders to explicitly separate documentation logic from the component being demonstrated.
        </p>
      </section>

      <h2 id="architecture" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Architecture
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        This is a meta-demonstration: you are looking at a PreviewBlock wrapped inside another PreviewBlock.
      </p>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <PreviewBlockUI code={previewBlockRaw} githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/PreviewBlock.jsx">
 
         <PreviewBlockUI
          code={previewBlockRaw}
          githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/PreviewBlock.jsx"
        >
          <p className="text-base md:text-lg text-(--lithos-text) font-body">
            This is the inner live preview surface rendered by the nested PreviewBlock.
          </p>
        </PreviewBlockUI>
      </PreviewBlockUI>
    </div>
  )
}