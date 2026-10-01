/**
 * @fileoverview Lithos UI native table primitives.
 * - React 19 refs are ordinary props, typed by ComponentPropsWithRef and passed through to native elements.
 * - Theme tokens provide colors, YIQ-derived accent text, radius, and hard shadows; cn() preserves class overrides.
 * - Cell padding controls density without CSS gap; interactive behavior is composed with shared controls.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../utils/cn'

type TableElementProps<T extends 'div' | 'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td' | 'caption'> = Omit<
  ComponentPropsWithRef<T>,
  'className'
> & { className?: LithosClass }

export type TableContainerProps = TableElementProps<'div'>

/** Name the scroll region with aria-label or aria-labelledby. */
export const TableContainer = ({ className, ...props }: TableContainerProps) => (
  <div
    data-slot="table-container"
    role="region"
    tabIndex={0}
    className={cn(
      'relative w-full min-w-0 overflow-auto rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lithos-text)',
      className
    )}
    {...props}
  />
)

export interface TableProps extends TableElementProps<'table'> {
  size?: 'sm' | 'md' | 'lg'
  striped?: boolean
  hoverable?: boolean
  stickyHeader?: boolean
}

/** Native table semantics; state and data transformations belong to the consumer. */
export const Table = ({
  size = 'md',
  striped = false,
  hoverable = false,
  stickyHeader = false,
  className,
  ...props
}: TableProps) => (
  <table
    data-slot="table"
    className={cn(
      'w-full border-separate border-spacing-0 caption-bottom text-start font-body text-sm text-(--lithos-text)',
      size === 'sm' && '[--table-cell-x:0.75rem] [--table-cell-y:0.5rem]',
      size === 'md' && '[--table-cell-x:1rem] [--table-cell-y:0.75rem]',
      size === 'lg' && '[--table-cell-x:1.25rem] [--table-cell-y:1rem]',
      striped &&
        '[&>tbody>tr:nth-child(odd):not([data-state=selected])]:bg-[color-mix(in_srgb,var(--lithos-text)_5%,var(--lithos-surface))]',
      hoverable &&
        '[&>tbody>tr:not([data-state=selected]):hover]:bg-[color-mix(in_srgb,var(--lithos-text)_10%,var(--lithos-surface))]',
      stickyHeader && '[&>thead]:sticky [&>thead]:top-0 [&>thead]:z-(--lithos-z-sticky)',
      className
    )}
    {...props}
  />
)

export type TableHeaderProps = TableElementProps<'thead'>
export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead data-slot="table-header" className={cn('bg-(--lithos-text) text-(--lithos-bg)', className)} {...props} />
)

export type TableBodyProps = TableElementProps<'tbody'>
export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody data-slot="table-body" className={cn('[&>tr:last-child>*]:border-b-0', className)} {...props} />
)

export type TableFooterProps = TableElementProps<'tfoot'>
export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    data-slot="table-footer"
    className={cn(
      'bg-(--lithos-surface) font-bold [&>tr:first-child>*]:border-t-2 [&>tr:last-child>*]:border-b-0',
      className
    )}
    {...props}
  />
)

export interface TableRowProps extends TableElementProps<'tr'> {
  /** Visual selection only. Supply a labeled checkbox for interactive selection. */
  selected?: boolean
}
export const TableRow = ({ selected = false, className, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    data-state={selected ? 'selected' : undefined}
    className={cn(
      'data-[state=selected]:bg-(--lithos-accent) data-[state=selected]:text-(--lithos-accent-text)',
      className
    )}
    {...props}
  />
)

export type TableHeadProps = TableElementProps<'th'>
export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th
    data-slot="table-head"
    className={cn(
      'px-(--table-cell-x) py-(--table-cell-y) border-b-2 border-(--lithos-border) text-start align-middle font-black',
      className
    )}
    {...props}
  />
)

export type TableCellProps = TableElementProps<'td'>
export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    data-slot="table-cell"
    className={cn(
      'px-(--table-cell-x) py-(--table-cell-y) border-b-2 border-(--lithos-border) align-middle',
      className
    )}
    {...props}
  />
)

export type TableCaptionProps = TableElementProps<'caption'>
export const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    data-slot="table-caption"
    className={cn('px-4 py-3 text-start text-sm text-(--lithos-text)', className)}
    {...props}
  />
)
