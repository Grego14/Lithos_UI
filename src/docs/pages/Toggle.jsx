import { useState } from 'react'
import Toggle from '../../components/ui/Toggle'
import PreviewBlock from '../../components/ui/PreviewBlock'
import toggleRaw from '../../components/ui/Toggle.jsx?raw'

export const ToggleDoc = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Kinetic Toggle
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          A high-contrast binary control with strict mathematical dimensions.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Unlike native checkboxes, this toggle is engineered as a stationary shell. Only the internal thumb and external shadow translate, ensuring the surrounding layout never suffers from sub-pixel shifting during interaction.
        </p>
      </section>

      <h2 id="architecture" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Architecture
      </h2>
      <p className="mb-4 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        Interact with the live assembly below to observe the binary contrast flip.
      </p>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <PreviewBlock code={toggleRaw} githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/Toggle.jsx">
        <Toggle checked={checked} onToggle={() => setChecked(!checked)} label="Documentation Toggle" />
      </PreviewBlock>
    </div>
  )
}