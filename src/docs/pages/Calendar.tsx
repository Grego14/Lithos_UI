import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Calendar, type CalendarValue } from '../../components/ui/Calendar'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { calendarPropsData } from '../propsData/calendar'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Calendar.tsx'

export const CalendarDoc = () => {
  const [controlledValue, setControlledValue] = useState<CalendarValue>(null)
  const [controlledMonth, setControlledMonth] = useState(new Date())

  const singleCode = {
    body: `export const SingleCalendar = () => {
  return <Calendar mode='single' />
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const multipleCode = {
    body: `export const MultipleCalendar = () => {
  return <Calendar mode='multiple' />
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const multiColorCode = {
    body: `const gymColors = [
  { dates: [4, 5], color: '#ff6b6b' },
  { dates: [17, 18, 19], color: '#4dabf7' },
]

export const MultiColorCalendar = () => {
  return (
    <Calendar
      mode='multiple'
      dateColors={gymColors}
    />
  )
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const rainbowCode = {
    body: `export const RainbowCalendar = () => {
  return <Calendar mode="rainbow" />
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const rangeCode = {
    body: `export const RangeCalendar = () => {
  return <Calendar mode='range' />
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const disabledDatesCode = {
    body: `const bookedDates = [10, 11, 18]

export const DisabledDatesCalendar = () => {
  return (
    <Calendar 
      mode='single' 
      disabledDates={bookedDates} 
      minDate={new Date()} 
    />
  )
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const boundedYearsCode = {
    body: `export const BoundedYearsCalendar = () => {
  return <Calendar mode='single' yearRange={[1940, new Date().getFullYear()]} />
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  const controlledCode = {
    body: `export const ControlledCalendar = () => {
  const [value, setValue] = useState<CalendarValue>(null)
  const [month, setMonth] = useState(new Date())

  return (
    <Calendar
      mode='single'
      value={value}
      onChange={setValue}
      month={month}
      onMonthChange={setMonth}
    />
  )
}`,
    componentNames: ['Calendar'],
    manualPath: '../../components/ui/Calendar',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Calendar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A date grid for picking single dates, multiple dates, or ranges — with month/year jump, bounds, and disabled
          dates.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Calendar supports three selection modes via the <code>mode</code> prop: <code>single</code> for one date,{' '}
          <code>multiple</code> for any set of individual dates, and <code>range</code> for a contiguous start-to-end
          span. The displayed month and the selection are independently controlled or uncontrolled, so jumping years via
          the header selects never disturbs the current selection.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Pass <code>disabledDates</code>, <code>minDate</code>, or <code>maxDate</code> to block off booked or
          out-of-range days. Disabled days are unclickable and skipped by keyboard navigation.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Calendar']}
        manualPath="../../components/ui/Calendar"
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'utils/date.ts',
          'components/ui/Button.tsx',
          'components/ui/icons/IconChevronDown.tsx',
          'components/ui/icons/IconChevronLeft.tsx',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="single" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Single
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={singleCode} githubUrl={githubUrl}>
          <Calendar mode="single" />
        </PreviewBlock>
      </div>

      <h3 id="multiple" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Multiple
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={multipleCode} githubUrl={githubUrl}>
          <Calendar mode="multiple" />
        </PreviewBlock>
      </div>

      <h3 id="multicolor" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Multicolor selection
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={multiColorCode} githubUrl={githubUrl}>
          <Calendar
            mode="multiple"
            dateColors={[
              { dates: [4, 5], color: '#ff6b6b' },
              { dates: [17, 18, 19], color: '#4dabf7' },
            ]}
          />
        </PreviewBlock>
      </div>

      <h3 id="rainbow" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Rainbow
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={rainbowCode} githubUrl={githubUrl}>
          <Calendar mode="rainbow" />
        </PreviewBlock>
      </div>

      <h3 id="range" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Range
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={rangeCode} githubUrl={githubUrl}>
          <Calendar mode="range" />
        </PreviewBlock>
      </div>

      <h3 id="disabled-dates" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Disabled dates
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={disabledDatesCode} githubUrl={githubUrl}>
          <Calendar mode="single" disabledDates={[10, 11, 18]} minDate={new Date()} />
        </PreviewBlock>
      </div>

      <h3 id="bounded-years" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Bounded years
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={boundedYearsCode} githubUrl={githubUrl}>
          <Calendar mode="single" yearRange={[1940, new Date().getFullYear()]} />
        </PreviewBlock>
      </div>

      <h3 id="controlled" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Controlled
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={controlledCode} githubUrl={githubUrl}>
          <Calendar
            mode="single"
            value={controlledValue}
            onChange={setControlledValue}
            month={controlledMonth}
            onMonthChange={setControlledMonth}
          />
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="grid"</code>, <code>role="row"</code>, and <code>role="gridcell"</code> to create a
            semantically correct grid structure.
          </li>
          <li>
            Uses <code>display: contents</code> on rows to preserve the zero-gap grid layout while maintaining standard
            ARIA parent-child relationships.
          </li>
          <li>
            Uses <code>aria-selected</code> on the gridcells to indicate active selections.
          </li>
          <li>
            Applies <code>aria-disabled</code> to dates out of bounds or marked as disabled.
          </li>
          <li>
            Fully keyboard navigable (arrow keys to move between days, PageUp/PageDown for months, Home/End for week
            boundaries).
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Calendar Props" data={calendarPropsData} />
      </section>
    </div>
  )
}
