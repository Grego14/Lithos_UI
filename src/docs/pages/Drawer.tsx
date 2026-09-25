import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Drawer } from '../../components/ui/Drawer'
import { Button } from '../../components/ui/Button'

import { IconClose } from '../../components/ui/icons/IconClose'
import { IconMenu } from '../../components/ui/icons/IconMenu'
import { IconArrowLeft } from '../../components/ui/icons/IconArrowLeft'
import { IconCircle } from '../../components/ui/icons/IconCircle'
import { IconFolder } from '../../components/ui/icons/IconFolder'
import { IconSearch } from '../../components/ui/icons/IconSearch'
import { IconSettings } from '../../components/ui/icons/IconSettings'

import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { drawerPropsData, useDrawerReturnData } from '../propsData/drawer'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Drawer.tsx'

const defaultDrawerCode = {
  body: `export const DefaultDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button onClick={() => setOpen(true)}>Open Drawer</Button>}
      aria-label='Navigation drawer'
    >
      <div className='flex h-full w-80 flex-col bg-(--lithos-surface) p-6'>
        <div className='flex items-center justify-between border-b pb-4'>
          <h2 className='text-lg font-semibold'>Menu</h2>
          <Button
            variant='text'
            onClick={() => setOpen(false)}
            aria-label='Close menu'
          >
            <IconClose />
          </Button>
        </div>

        <nav className='flex-1 space-y-2 py-4'>
          <a
            href='#home'
            className='block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100'
          >
            Home
          </a>
          <a
            href='#profile'
            className='block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100'
          >
            Profile
          </a>
          <a
            href='#settings'
            className='block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100'
          >
            Settings
          </a>
        </nav>

        <div className='border-t pt-4'>
          <Button
            className='w-full'
            onClick={() => setOpen(false)}
          >
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState'],
  manualPath: {
    Drawer: '../../components/ui/Drawer',
    Button: '../../components/ui/Button',
    react: 'useState',
  },
}

const permanentDrawerCode = {
  body: `export const PermanentDrawer = () => {
  const [open, setOpen] = useState(true)

  const linkClass = 'duration-150 ease-out hover:translate-x-1 hover:text-(--lithos-accent)'

  return (
    <div className='flex h-87.5 w-full border border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden'>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        mode='permanent'
        expandedWidth='w-56'
        aria-label='App navigation drawer'
      >
        <div className='h-full border-r border-(--lithos-border) bg-(--lithos-surface) p-4 text-(--lithos-text)'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='font-bold text-xl'>Lithos UI</h4>
            <Button aria-label='Collapse menu' onClick={() => setOpen(false)}>
              <IconArrowLeft />
            </Button>
          </div>
          <ul className='space-y-4 text-sm flex flex-col'>
            <a href='#' className={linkClass}>Installation</a>
            <a href='#' className={linkClass}>Components</a>
            <a href='#' className={linkClass}>Templates</a>
          </ul>
        </div>
      </Drawer>

      <div className='flex-1 p-4 bg-(--lithos-background) text-(--lithos-text) flex items-start'>
        <div className='flex items-center space-x-4'>
          {!open && (
            <Button aria-label='Expand menu' onClick={() => setOpen(true)}>
              <IconMenu />
            </Button>
          )}

          <p className='text-sm'>
            When you toggle the state, the Drawer animates its width or height and adjusts the spacing of this panel.
          </p>
        </div>
      </div>
    </div>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState'],
  manualPath: {
    Drawer: '../../components/ui/Drawer',
    Button: '../../components/ui/Button',
    react: 'useState',
  },
}

const miniDrawerCode = {
  body: `export const MiniDrawer = () => {
  const [open, setOpen] = useState(false)

  const linkClass = 'flex items-center space-x-3 p-2 rounded-(--lithos-radius) duration-150 ease-out hover:bg-(--lithos-background) hover:text-(--lithos-accent)'

  return (
    <div className='flex h-87.5 w-full border border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden'>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        mode='mini'
        expandedWidth='w-56'
        aria-label='Navigation drawer'
      >
        <div className='h-full border-r border-(--lithos-border) bg-(--lithos-surface) p-3 text-(--lithos-text) flex flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between mb-6 h-10'>
              {open && <h4 className='font-bold text-lg truncate'>Lithos UI</h4>}
              <Button
                aria-label={open ? 'Collapse menu' : 'Expand menu'}
                onClick={() => setOpen(!open)}
                className={!open ? 'mx-auto' : ''}
              >
                {open ? <IconArrowLeft /> : <IconMenu />}
              </Button>
            </div>

            <nav className={\`space-y-2 flex flex-col \${open ? '' : 'items-center'}\`}>
              <a href='#installation' className={linkClass}>
                <IconCircle className='shrink-0' strokeWidth='3' />
                {open && <span className='text-sm font-medium truncate'>Installation</span>}
              </a>
              <a href='#components' className={linkClass}>
                <IconFolder className='shrink-0' strokeWidth='3' />
                {open && <span className='text-sm font-medium truncate'>Components</span>}
              </a>
              <a href='#templates' className={linkClass}>
                <IconSearch className='shrink-0' strokeWidth='3' />
                {open && <span className='text-sm font-medium truncate'>Templates</span>}
              </a>
            </nav>
          </div>

          <div className={\`border-t border-(--lithos-border) pt-3 flex \${open ? '' : 'justify-center'}\`}>
            <a href='#settings' className={linkClass}>
              <IconSettings className='shrink-0' strokeWidth='3' />
              {open && <span className='text-sm font-medium truncate'>Settings</span>}
            </a>
          </div>
        </div>
      </Drawer>

      <div className='flex-1 p-6 bg-(--lithos-background) text-(--lithos-text)'>
        <h3 className='font-bold text-xl mb-2'>Main Content Area</h3>
        <div className='text-sm text-(--lithos-text-muted)'>
          <p>
            In mini mode, the sidebar keeps icons visible when collapsed <i>(defaults to w-16)</i> and expands smoothly to show text labels when toggled <i>(w-56)</i>.
          </p>
          <p className='mt-4'>
            You can change the collapsed width by passing a value to the <code>collapsedWidth</code> prop and the expanded width by passing a value to the <code>expandedWidth</code> prop.
          </p>
        </div>
      </div>
    </div>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState'],
  manualPath: {
    Drawer: '../../components/ui/Drawer',
    Button: '../../components/ui/Button',
    react: 'useState',
  },
}

const swipeDrawerCode = {
  body: `export const SwipeableBottomSheet = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Bottom Sheet
      </Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement="bottom"
        indicator
        threshold={80}
        className="max-w-md mx-auto rounded-t-2xl p-6"
        aria-label="Actions menu"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <h4 className="text-lg font-bold text-(--lithos-text)">Confirm Action</h4>
            <p className="text-sm text-(--lithos-text) opacity-70">
              Are you sure you want to proceed with this action? You can swipe down to dismiss this sheet.
            </p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState'],
  manualPath: {
    Drawer: '../../components/ui/Drawer',
    Button: '../../components/ui/Button',
    react: 'useState',
  },
}

export const SwipeDrawerPreview = () => {
  const [open, setOpen] = useState(false)
  const [swipeOnlyOnIndicator, setSwipeOnlyOnIndicator] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-(--lithos-surface) rounded-(--lithos-radius) border border-(--lithos-border) space-y-6">
      <div className="text-center max-w-sm">
        <p className="text-sm font-body text-(--lithos-text) opacity-80 mb-4">
          Test swipe gestures by dragging the sheet downwards using your mouse or touch screen.
        </p>

        <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
      </div>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement="bottom"
        swipeOnlyOnIndicator={swipeOnlyOnIndicator}
        threshold={80}
        className="max-w-md mx-auto rounded-t-2xl p-6"
        aria-label="Swipeable menu"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <h4 className="text-lg font-bold text-(--lithos-text)">Swipe to Dismiss</h4>
            <p className="text-sm text-(--lithos-text) opacity-70">
              Drag down from {swipeOnlyOnIndicator ? 'handler' : 'anywhere on the card (or the handler)'} to close it.
            </p>
          </div>

          <div className="p-4 bg-(--lithos-background) border border-(--lithos-border) rounded-(--lithos-radius) flex items-center justify-between">
            <span className="text-sm font-medium text-(--lithos-text)">Restrict swipe to indicator only</span>
            <input
              type="checkbox"
              checked={swipeOnlyOnIndicator}
              onChange={(e) => setSwipeOnlyOnIndicator(e.target.checked)}
              className="accent-(--lithos-accent) h-4 w-4 cursor-pointer"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

const DefaultDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button onClick={() => setOpen(true)}>Open Drawer</Button>}
      aria-label="Navigation drawer"
    >
      <div className="flex h-full w-80 flex-col bg-(--lithos-surface) p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="text" onClick={() => setOpen(false)} aria-label="Close menu">
            <IconClose />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 py-4">
          <a href="#home" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Home
          </a>
          <a href="#profile" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Profile
          </a>
          <a href="#settings" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Settings
          </a>
        </nav>

        <div className="border-t pt-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export const PermanentDrawer = () => {
  const [open, setOpen] = useState(true)

  const linkClass = 'duration-150 ease-out hover:translate-x-1 hover:text-(--lithos-accent)'

  return (
    <div className="flex h-87.5 w-full border border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden">
      <Drawer
        open={open}
        onOpenChange={setOpen}
        mode="permanent"
        expandedWidth="w-56"
        aria-label="App navigation drawer"
      >
        <div className="h-full border-r border-(--lithos-border) bg-(--lithos-surface) p-4 text-(--lithos-text)">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-xl">Lithos UI</h4>
            <Button aria-label="Collapse menu" onClick={() => setOpen(false)}>
              <IconArrowLeft />
            </Button>
          </div>
          <ul className="space-y-4 text-sm flex flex-col">
            <a href="#installation-fake" className={linkClass}>
              Installation
            </a>
            <a href="#components" className={linkClass}>
              Components
            </a>
            <a href="#templates" className={linkClass}>
              Templates
            </a>
          </ul>
        </div>
      </Drawer>

      <div className="flex-1 p-4 bg-(--lithos-background) text-(--lithos-text) flex items-start">
        <div className="flex items-center space-x-4">
          {!open && (
            <Button aria-label="Expand menu" onClick={() => setOpen(true)}>
              <IconMenu />
            </Button>
          )}

          <p className="text-sm">
            When you toggle the state, the Drawer animates its width/height and adjusts the spacing of this panel.
          </p>
        </div>
      </div>
    </div>
  )
}

export const MiniDrawer = () => {
  const [open, setOpen] = useState(false)

  const linkClass =
    'flex items-center space-x-3 p-2 rounded-(--lithos-radius) duration-150 ease-out hover:bg-(--lithos-background) hover:text-(--lithos-accent)'

  return (
    <div className="flex h-87.5 w-full border border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden">
      <Drawer open={open} onOpenChange={setOpen} mode="mini" expandedWidth="w-56" aria-label="Navigation drawer">
        <div className="h-full border-r border-(--lithos-border) bg-(--lithos-surface) p-3 text-(--lithos-text) flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 h-10">
              {open && <h4 className="font-bold text-lg truncate">Lithos UI</h4>}
              <Button
                aria-label={open ? 'Collapse menu' : 'Expand menu'}
                onClick={() => setOpen(!open)}
                className={!open ? 'mx-auto' : ''}
              >
                {open ? <IconArrowLeft /> : <IconMenu />}
              </Button>
            </div>

            <nav className={`space-y-2 flex flex-col \${open ? '' : 'items-center'}`}>
              <a href="#installation-fake" className={linkClass}>
                <IconCircle className="shrink-0" strokeWidth="3" />
                {open && <span className="text-sm font-medium truncate">Installation</span>}
              </a>
              <a href="#components" className={linkClass}>
                <IconFolder className="shrink-0" strokeWidth="3" />
                {open && <span className="text-sm font-medium truncate">Components</span>}
              </a>
              <a href="#templates" className={linkClass}>
                <IconSearch className="shrink-0" strokeWidth="3" />
                {open && <span className="text-sm font-medium truncate">Templates</span>}
              </a>
            </nav>
          </div>

          <div className={`border-t border-(--lithos-border) pt-3 flex ${open ? '' : 'justify-center'}`}>
            <a href="#settings" className={linkClass}>
              <IconSettings className="shrink-0" strokeWidth="3" />
              {open && <span className="text-sm font-medium truncate">Settings</span>}
            </a>
          </div>
        </div>
      </Drawer>

      <div className="flex-1 p-6 bg-(--lithos-background) text-(--lithos-text)">
        <h3 className="font-bold text-xl mb-2">Main Content Area</h3>
        <div className="text-sm text-(--lithos-text-muted)">
          <p>
            In mini mode, the sidebar keeps icons visible when collapsed <i>(default to w-16)</i> and expands smoothly
            to show text labels when toggled <i>(w-56)</i>.
          </p>
          <p className="mt-4">
            You can change the collapsed width by passing a value to the <code>collapsedWidth</code> prop and the
            expanded width by passing a value to the <code>expandedWidth</code> prop.
          </p>
        </div>
      </div>
    </div>
  )
}

export const DrawerDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Drawer
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A flexible sliding panel primitive that supports temporary overlays, permanent sidebars, touch gestures, and
          customizable transitions.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Drawer component provides an accessible, slide-out surface for navigation, forms, and supplemental
          content. It seamlessly switches between an overlay modal and layout-bound sidebars.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Drawers automatically handle mobile touch gestures, body scroll locking, and focus traps when opened in
          temporary mode, ensuring a native-feeling experience across desktop and mobile devices.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Drawer', 'useDrawer']}
        manualPath="../../components/ui/Drawer"
        requires={[
          'utils/cn.ts',
          'utils/classMaps.ts',
          'components/ui/drawer/Drawer.tsx',
          'components/ui/drawer/DrawerIndicator.tsx',
          'components/ui/drawer/drawer.utils.ts',
          'components/ui/drawer/useDrawerSwipe.ts',
          'components/ui/Popover.ts',
          '@floating-ui/react',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default (temporary)
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Renders as a temporary overlay modal with a semi-transparent backdrop. It captures focus, traps interaction
        within the panel, and blocks body scrolling while active. It can be dismissed by clicking the backdrop, pressing
        the <code>Escape</code> key, or dragging the panel off-screen via swipe gestures.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultDrawerCode} githubUrl={githubUrl}>
          <DefaultDrawer />
        </PreviewBlock>
      </div>

      <h3 id="permanent" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Permanent
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Integrates directly into the layout document flow as a persistent sidebar. It does not render a backdrop or
        block main content interactions. Ideal for primary desktop application navigation where the panel expands or
        collapses without obstructing the user's workspace.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={permanentDrawerCode} githubUrl={githubUrl}>
          <PermanentDrawer />
        </PreviewBlock>
      </div>

      <h3 id="mini" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Mini
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        A compact sidebar variant that stays permanently visible in a collapsed state showing icon-only triggers, and
        expands on interaction or toggle to reveal full menu labels and extra controls.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={miniDrawerCode} githubUrl={githubUrl}>
          <MiniDrawer />
        </PreviewBlock>
      </div>

      <h3 id="swipeable" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Swipeable
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Enables touch and mouse drag gestures to dismiss the panel on vertical placements. You can display a drag handle
        with <code>indicator</code> and restrict swipe interactions exclusively to the handle using{' '}
        <code>swipeOnlyOnIndicator</code>.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={swipeDrawerCode} githubUrl={githubUrl}>
          <SwipeDrawerPreview />
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Automatically applies <code>role="dialog"</code> and <code>aria-modal="true"</code> when rendered in
            temporary mode.
          </li>
          <li>Restricts keyboard focus using a focus trap to prevent users from navigating behind the overlay.</li>
          <li>Restores focus automatically to the trigger element when closed.</li>
          <li>
            Listens for the <kbd>Escape</kbd> key to close the panel seamlessly.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Rounded corners defined by the global <code>--lithos-radius</code> token are
          selectively applied exclusively to the unattached outer edges of the Drawer panel depending on its current{' '}
          <code>placement</code> (for instance, top-right and bottom-right corners when anchored to <code>left</code>).
          The edges flush against the screen viewport remain unrounded for a clean layout boundary.
        </div>

        <PropsAccordion title="Drawer Props" data={drawerPropsData} />
        <PropsAccordion title="useDrawer return" data={useDrawerReturnData} isHook />
      </section>
    </div>
  )
}
