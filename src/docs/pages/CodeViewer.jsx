import PreviewBlock from '../../components/ui/PreviewBlock'
import CodeViewer from '../../components/ui/CodeViewer' // The actual component
import codeViewerRaw from '../../components/ui/CodeViewer.jsx?raw' // The raw string

export const CodeViewerDoc = () => {
  // Sample code to display inside the preview pane
  const sampleCode = `export default function BrutalistButton() {
  return (
    
      Click Me
    
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Code Viewer
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          A hard-shelled syntax highlighter with built-in clipboard interactions and toast feedback.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Code Viewer is an atomic primitive designed to display raw architectural blueprints. It strictly avoids soft styling, utilizing explicit borders and a high-contrast terminal aesthetic.
        </p>
        
        {/* Structural Callout for Dependencies */}
        <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
          <h3 className="font-black uppercase tracking-widest text-sm mb-2 text-(--lithos-text)">Dependencies</h3>
          <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
            This component requires <code className="bg-(--lithos-bg) text-(--lithos-text) px-1 py-0.5 border-2 border-(--lithos-border) font-code font-black">react-syntax-highlighter</code> for parsing and depends on the Lithos <code className="bg-(--lithos-bg) text-(--lithos-text) px-1 py-0.5 border-2 border-(--lithos-border) font-code font-black">ToastContext</code> to dispatch clipboard notifications.
          </p>
        </div>
      </section>

      <h2 id="architecture" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Architecture
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Test the live clipboard interaction below. You can toggle the <code className="font-black">showControls</code> prop to switch between a language label and structural window squares.
      </p>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>
      
      {/* Enforcing structural zero-gap compliance using standard margins */}
      <div className="mt-8 mb-16">
        <PreviewBlock code={codeViewerRaw} githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/CodeViewer.jsx">
          <CodeViewer code={sampleCode} language="jsx" showControls={true} className="mb-0" />
        </PreviewBlock>
      </div>
    </div>
  )
}