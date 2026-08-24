import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, CustomDialog } from '../../components/ui/Dialog'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { IconAlertTriangle } from '../../components/ui/icons/IconAlertTriangle'
import { colors } from '../../utils/colors'

import {
  dialogPropsData,
  dialogHeaderPropsData,
  dialogTitlePropsData,
  dialogBodyPropsData,
  dialogFooterPropsData,
  customDialogPropsData,
} from '../propsData/dialog'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Dialog.tsx'

const componentNames = ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'CustomDialog']
const manualPath = {
  Dialog: '../../components/ui/Dialog',
  DialogHeader: '../../components/ui/Dialog',
  DialogTitle: '../../components/ui/Dialog',
  DialogBody: '../../components/ui/Dialog',
  DialogFooter: '../../components/ui/Dialog',
  CustomDialog: '../../components/ui/Dialog',
  Button: '../../components/ui/Button',
}

const DialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader icon={<IconSettings className="w-5 h-5" />}>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">
            Dismissible via Escape, the backdrop, or the close button — standard settings-panel behavior.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const SizeDialogDemo = () => {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<(typeof sizes)[number]>('md')

  return (
    <>
      {sizes.map((s) => (
        <Button
          key={s}
          onClick={() => {
            setSize(s)
            setOpen(true)
          }}
          className="mr-2 mb-2"
        >
          {s}
        </Button>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)} size={size}>
        <DialogHeader>
          <DialogTitle>size=&quot;{size}&quot;</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">Panel max-width follows the size prop passed above.</p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

const ScrollDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Terms</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="font-body">
              Section {i + 1}. Long-form content scrolls inside DialogBody only — the header and footer stay fixed
              (sticky) above and below it.
            </p>
          ))}
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>I Agree</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

const NoCloseDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={() => setOpen(false)} variant="simple">
        <DialogHeader hideClose>
          <DialogTitle>No Close Icon</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="m-0 font-body">
            hideClose removes the header X. Escape and backdrop click still close it — only the accidental-click
            affordance is gone.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Got It</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

const CustomDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Account</Button>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onAction={() => setOpen(false)}
        title="Delete Account"
        message="This action is irreversible. Choose Cancel or Delete to continue."
        actionLabel="Delete"
        buttonVariant="solid"
        buttonColor="#FF0000"
        offsetColor="#FF0000"
        icon={<IconAlertTriangle className="w-5 h-5" style={{ color: colors.error }} />}
      />
    </>
  )
}

export const DialogDoc = () => {
  const dialogCode = {
    body: `export const DialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader icon={<IconSettings className="w-5 h-5" />}>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Dismissible via Escape, the backdrop, or the close button.</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}`,
    componentNames: ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'Button', 'IconSettings'],
    manualPath: { ...manualPath, IconSettings: '../../components/ui/icons/IconSettings' },
  }

  const sizeDialogCode = {
    body: `const sizes = ['sm', 'md', 'lg', 'xl'] as const

export const SizeDialogDemo = () => {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<(typeof sizes)[number]>('md')

  return (
    <>
      {sizes.map((s) => (
        <Button key={s} onClick={() => { setSize(s); setOpen(true) }} className="mr-2 mb-2">
          {s}
        </Button>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)} size={size}>
        <DialogHeader>
          <DialogTitle>size="{size}"</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Panel max-width follows the size prop passed above.</p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}`,
    componentNames: ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'Button'],
    manualPath,
  }

  const scrollDialogCode = {
    body: `export const ScrollDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Terms</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>Section {i + 1}. DialogBody scrolls; DialogHeader/DialogFooter stay sticky.</p>
          ))}
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>I Agree</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}`,
    componentNames: ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'Button'],
    manualPath,
  }

  const noCloseDialogCode = {
    body: `export const NoCloseDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={() => setOpen(false)} variant="simple">
        <DialogHeader hideClose>
          <DialogTitle>No Close Icon</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>hideClose removes the header X. Escape and backdrop click still close it.</p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Got It</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}`,
    componentNames: ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'Button'],
    manualPath,
  }

  const customDialogCode = {
    body: `export const CustomDialogDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Account</Button>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onAction={() => setOpen(false)}
        title="Delete Account"
        message="This action is irreversible. Choose Cancel or Delete to continue."
        actionLabel="Delete"
        buttonVariant="solid"
        buttonColor="#FF0000"
        offsetColor="#FF0000"
        icon={<IconAlertTriangle style={{ color: '#FF0000' }} />}
      />
    </>
  )
}`,
    componentNames: ['CustomDialog', 'Button', 'IconAlertTriangle'],
    manualPath: { ...manualPath, IconAlertTriangle: '../../components/ui/icons/IconAlertTriangle' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Dialog
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A focus-trapped, always-dismissible overlay for dialogs and confirmations.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Dialog renders as a hard-edged plaque above a scrim, portaled to <code>document.body</code>. It always closes
          on Escape, a backdrop click, or the header close button — while open, it traps Tab focus inside the panel and
          restores focus to the trigger element on close.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Try the examples below with keyboard only: Tab cycles inside the panel, Shift+Tab reverses, and Escape closes
          it.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={componentNames}
        manualPath={manualPath}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/Button.tsx',
          'core/hooks/useFocusTrap.ts',
          'utils/colors.ts',
          'utils/cn.ts',
        ]}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Dialog is a controlled component: it owns no open state of its own. Compose it from the four subcomponents
          below inside a consumer-managed <code>open</code>/<code>onClose</code> pair.
        </p>
        <CodeViewer
          language="tsx"
          code={`<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
  <DialogBody>Content</DialogBody>
  <DialogFooter>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </DialogFooter>
</Dialog>
`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Header, body, footer composed by hand — the raw anatomy from a controlled open/onClose pair.
      </p>

      <PreviewBlock code={dialogCode} githubUrl={githubUrl}>
        <DialogDemo />
      </PreviewBlock>

      <h3 id="sizes" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Same dialog re-opened at each of the four <code>size</code> values to compare panel max-width.
      </p>

      <PreviewBlock code={sizeDialogCode} githubUrl={githubUrl}>
        <SizeDialogDemo />
      </PreviewBlock>

      <h3 id="scrollable-content" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Scrollable Content
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Twelve paragraphs force DialogBody to scroll while DialogHeader/DialogFooter stay pinned.
      </p>

      <PreviewBlock code={scrollDialogCode} githubUrl={githubUrl}>
        <ScrollDialogDemo />
      </PreviewBlock>

      <h3 id="no-close" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        No close icon
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        <code>hideClose</code> on DialogHeader drops the X. Escape and backdrop click still work.
      </p>

      <PreviewBlock code={noCloseDialogCode} githubUrl={githubUrl}>
        <NoCloseDialogDemo />
      </PreviewBlock>

      <h3 id="custom-dialog" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom Dialog
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Cancel/Action pair with highly customizable styling for destructive confirmations.
      </p>

      <PreviewBlock code={customDialogCode} githubUrl={githubUrl}>
        <CustomDialogDemo />
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Panel carries <code>role="dialog"</code> (<code>role="alertdialog"</code> when <code>intent="error"</code>),{' '}
            <code>aria-modal="true"</code>, and <code>aria-labelledby</code> pointed at the <code>DialogTitle</code>{' '}
            automatically.
          </li>
          <li>
            Focus moves into the panel on open (first focusable element, or <code>initialFocusRef</code> when supplied)
            and is trapped there — Tab and Shift+Tab cycle without leaving the panel.
          </li>
          <li>Focus is restored to the element that triggered the open on close.</li>
          <li>
            <code>Escape</code> and backdrop click always close the panel, alongside the header close button.
          </li>
          <li>Background scroll is locked for the lifetime of the overlay.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Dialog Props" data={dialogPropsData} />
        <div className="mt-8">
          <PropsAccordion title="DialogHeader Props" data={dialogHeaderPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="DialogTitle Props" data={dialogTitlePropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="DialogBody Props" data={dialogBodyPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="DialogFooter Props" data={dialogFooterPropsData} />
        </div>

        <div className="mt-8">
          <PropsAccordion title="CustomDialog Props" data={customDialogPropsData} />
        </div>
      </section>
    </div>
  )
}
