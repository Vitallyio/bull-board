import React from 'react'
import { STATUSES, Status } from './constants'
import { AppQueue, AppJob } from '../../@types/app'
import { SelectedStatus } from '../components/hooks/useStore'
import { Link } from 'react-router-dom'

type MenuItemProps = {
  status: Status
  name: string
  count: number
  onClick: () => void // TODO remove
  selected: boolean // TODO remove
}

const MenuItem = ({ status, count, name, selected }: MenuItemProps) => (
  <Link
    className={`menu-item ${status} ${selected ? 'selected' : ''} ${
      count === 0 ? 'off' : 'on'
    }`}
    to={{
      pathname: `/${encodeURIComponent(name)}/${status}`,
      // search: "?sort=name",
    }}
  >
    {status !== 'latest' && <b className="count">{count}</b>}
  </Link>
)

interface QueueProps {
  queue: AppQueue
  selectedStatus: SelectedStatus | undefined
  selectStatus: (status: SelectedStatus | undefined) => void
  cleanAllDelayed: () => Promise<void>
  cleanAllFailed: () => Promise<void>
  cleanAllCompleted: () => Promise<void>
  cleanAllWaiting: () => Promise<void>
  retryAll: () => Promise<void>
  retryJob: (job: AppJob) => () => Promise<void>
  promoteJob: (job: AppJob) => () => Promise<void>
}

// We need to extend so babel doesn't think it's JSX
const keysOf = <Target extends {}>(target: Target) =>
  Object.keys(target) as (keyof Target)[]

export const Queue = ({ queue, selectedStatus, selectStatus }: QueueProps) => {
  const currentJobSelected =
    selectedStatus != null && selectedStatus[0] === queue.name
  return (
    <tr>
      <td>{queue.name}</td>
      {keysOf(STATUSES).map(status => (
        <td key={`${queue.name}-${status}`}>
          <MenuItem
            name={queue.name}
            status={status}
            count={queue.counts[status]}
            onClick={() => {
              // Clear status if currently expanded
              if (
                selectedStatus &&
                queue.name === selectedStatus[0] &&
                status === selectedStatus[1]
              ) {
                selectStatus(undefined)
              } else {
                selectStatus([queue.name, status])
              }
            }}
            selected={
              currentJobSelected &&
              selectedStatus != null &&
              selectedStatus[1] === status
            }
          />
        </td>
      ))}
    </tr>
  )
}
