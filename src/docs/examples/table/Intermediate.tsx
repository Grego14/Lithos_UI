import { useId, useState } from 'react'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/Table'

export const IntermediateTable = () => {
  const id = useId()
  const [state, setState] = useState('ready')

  return (
    <div className="w-full min-w-0">
      <label id="preview-state" htmlFor={id} className="mr-3 font-bold">
        Preview state
      </label>
      <select
        id={id}
        value={state}
        onChange={(event) => setState(event.target.value)}
        className="mb-4 border-2 border-(--lithos-border) bg-(--lithos-surface) p-2"
      >
        <option value="ready">Ready</option>
        <option value="loading">Loading</option>
        <option value="empty">Empty</option>
        <option value="error">Error</option>
      </select>
      <TableContainer aria-label="Inventory preview" className="max-h-72">
        <Table size="sm" striped hoverable stickyHeader aria-busy={state === 'loading'}>
          <TableCaption className="caption-top">Inventory preview with a sticky header and compact rows.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Product</TableHead>
              <TableHead scope="col">Availability</TableHead>
              <TableHead scope="col" className="text-end">
                Stock
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state === 'ready' ? (
              Array.from({ length: 12 }, (_, index) => (
                <TableRow key={`SKU-${index + 1}`}>
                  <TableHead scope="row" className="min-w-56">
                    {index === 0
                      ? 'Studio monitor with an extra-long product description that wraps naturally'
                      : `Studio accessory ${index + 1}`}
                  </TableHead>
                  <TableCell>
                    <Badge intent={index % 3 === 0 ? 'warning' : 'success'}>
                      {index % 3 === 0 ? 'Low stock' : 'Available'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end tabular-nums">{index * 7 + 2}</TableCell>
                </TableRow>
              ))
            ) : state === 'loading' ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Spinner size={32} aria-label="Loading inventory" className="text-(--lithos-accent)" />
                    <span className="mt-3">Loading inventory</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : state === 'empty' ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center">
                    <span>No products yet. Add your first product to get started.</span>
                    <Button className="mt-3" onClick={() => setState('ready')}>
                      Add product
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div role="alert" className="flex flex-col items-center">
                    <span>Inventory could not be loaded.</span>
                    <Button className="mt-3" onClick={() => setState('ready')}>
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
