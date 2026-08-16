/**
 * @fileoverview Generic footer block (Variant 2).
 * - Minimal, centered layout.
 * - Prioritizes brand focus and simplified navigation.
 */

const Footer2 = () => (
  <section id="footer-block" className="border-t-2 border-(--lithos-border) bg-(--lithos-bg) py-16 px-6">
    <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
      <div className="mb-8">
        <p className="text-4xl font-black tracking-tighter leading-none text-(--lithos-text) uppercase">BRAND MARK</p>
      </div>

      <nav className="mb-12 flex flex-wrap justify-center">
        <a
          href="#"
          className="mx-4 my-2 font-bold text-sm uppercase tracking-widest hover:text-(--lithos-accent) transition-colors text-(--lithos-text)"
        >
          Features
        </a>
        <a
          href="#"
          className="mx-4 my-2 font-bold text-sm uppercase tracking-widest hover:text-(--lithos-accent) transition-colors text-(--lithos-text)"
        >
          Pricing
        </a>
        <a
          href="#"
          className="mx-4 my-2 font-bold text-sm uppercase tracking-widest hover:text-(--lithos-accent) transition-colors text-(--lithos-text)"
        >
          Blog
        </a>
        <a
          href="#"
          className="mx-4 my-2 font-bold text-sm uppercase tracking-widest hover:text-(--lithos-accent) transition-colors text-(--lithos-text)"
        >
          Contact
        </a>
      </nav>

      <div className="w-full border-t-2 border-(--lithos-border) pt-8 flex flex-col sm:flex-row justify-between items-center text-sm font-bold opacity-60 text-(--lithos-text)">
        <p className="mb-4 sm:mb-0">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:opacity-100 transition-opacity">
            Privacy Policy
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </section>
)

export { Footer2 }
