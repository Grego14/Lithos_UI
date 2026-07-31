import { Navbar } from '../components/layout/Navbar'
import { Hero } from '../components/blocks/Hero'
import { FeatureGrid } from '../components/blocks/FeatureGrid'
import { ThemeEngine } from '../components/blocks/ThemeEngine'
import { Footer } from '../components/layout/Footer'

/**
 * Showroom Component - Landing Page UI Composition
 *
 * Isolates the landing page structure (Navbar, sections, Footer) from root App logic.
 * Accepts theme state and toggle function as props for downstream consumption.
 */
import type { HexColor } from '../core/types'

interface ShowroomProps {
  isDarkMode: boolean;
  toggleObsidian: () => void;
  accentColor: HexColor;
  updateAccentColor: (color: HexColor) => void;
}

export const Showroom = ({ isDarkMode, toggleObsidian, accentColor, updateAccentColor }: ShowroomProps) => {
  /**
   * ZERO-GAP SPACING MATH:
   * - pt-24 (main): padding-top: 6rem = 96px
   *   Accounts for fixed Navbar height (~96px) to prevent content overlap.
   *   Navbar height MUST equal pt-24 value for perfect zero-gap alignment.
   *
   * - Wrapper div mt-24: margin-top: 6rem = 96px
   *   Creates uniform inter-section spacing (96px between major blocks).
   *   This is the Lithos spacing unit. Do NOT mix with gap utilities.
   */
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <Hero accentColor={accentColor} updateAccentColor={updateAccentColor} />
        {/* All sections: mt-24 = 96px margin for zero-gap layout */}
        <div className="mt-24">
          <ThemeEngine accentColor={accentColor} updateAccentColor={updateAccentColor} />
        </div>
        <div className="mt-24">
          <FeatureGrid />
        </div>
        {/* TODO: Future stats strip section goes here.
            - Real GitHub star count (fetched, not hardcoded)
            - Component count
            - Block count
            - "Free. No tiers. No Pro plan."
        */}
      </main>

      <div className="mt-24">
        <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
      </div>
    </>
  )
};
