import React from 'react'
import { STATUSES, Status } from './constants'
import { AppQueue, AppJob } from '../../@types/app'
import { SelectedStatus } from '../components/hooks/useStore'
import { Jobs } from './Jobs'
import { Link } from 'react-router-dom'

type MenuItemProps = {
  status: Status
  count: number
  onClick: () => void
  selected: boolean
}

const MenuItem = ({ status, count, onClick, selected }: MenuItemProps) => (
  <div
    className={`menu-item ${status} ${selected ? 'selected' : ''} ${
      count === 0 ? 'off' : 'on'
    }`}
    onClick={onClick}
  >
    {status !== 'latest' && <b className="count">{count}</b>} {status}
  </div>
)
const ACTIONABLE_STATUSES: Array<Status> = [
  'failed',
  'delayed',
  'completed',
  'waiting',
]

interface QueueActionProps {
  queue: QueueProps['queue']
  retryAll: QueueProps['retryAll']
  cleanAllFailed: QueueProps['cleanAllFailed']
  cleanAllDelayed: QueueProps['cleanAllDelayed']
  cleanAllCompleted: QueueProps['cleanAllCompleted']
  cleanAllWaiting: QueueProps['cleanAllWaiting']
  status: Status
}

const isStatusActionable = (status: Status): boolean =>
  ACTIONABLE_STATUSES.includes(status)

const QueueActions = ({
  status,
  retryAll,
  cleanAllFailed,
  cleanAllDelayed,
  cleanAllCompleted,
  cleanAllWaiting,
}: QueueActionProps) => {
  if (!isStatusActionable(status)) {
    return <div />
  }

  return (
    <div>
      {status === 'failed' && (
        <div>
          <button style={{ margin: 10 }} onClick={retryAll}>
            Retry all
          </button>
          <button style={{ margin: 10 }} onClick={cleanAllFailed}>
            Clean all
          </button>
        </div>
      )}
      {status === 'delayed' && (
        <button style={{ margin: 10 }} onClick={cleanAllDelayed}>
          Clean all
        </button>
      )}
      {status === 'completed' && (
        <button style={{ margin: 10 }} onClick={cleanAllCompleted}>
          Clean all
        </button>
      )}
      {status === 'waiting' && (
        <button style={{ margin: 10 }} onClick={cleanAllWaiting}>
          Clean all
        </button>
      )}
    </div>
  )
}

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

export const Queue = ({
  cleanAllDelayed,
  cleanAllFailed,
  cleanAllCompleted,
  cleanAllWaiting,
  queue,
  retryAll,
  retryJob,
  promoteJob,
  selectedStatus,
  selectStatus,
}: QueueProps) => {
  const currentJobSelected =
    selectedStatus != null && selectedStatus[0] === queue.name
  return (
    <section>
      <h3>{queue.name}</h3>
      <div className="menu-list">
        {keysOf(STATUSES).map(status => (
          <div key={status}>
            <Link
              to={{
                pathname: `/bull-board/${encodeURIComponent(
                  queue.name,
                )}/${status}`,
                // search: "?sort=name",
              }}
            >
              {status}
            </Link>
          </div>
        ))}
        {keysOf(STATUSES).map(status => (
          <MenuItem
            key={`${queue.name}-${status}`}
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
        ))}
      </div>
      {currentJobSelected && selectedStatus && (
        <>
          <QueueActions
            retryAll={retryAll}
            cleanAllDelayed={cleanAllDelayed}
            cleanAllFailed={cleanAllFailed}
            cleanAllCompleted={cleanAllCompleted}
            cleanAllWaiting={cleanAllWaiting}
            queue={queue}
            status={selectedStatus[1]}
          />
          <Jobs
            retryJob={retryJob}
            promoteJob={promoteJob}
            queue={queue}
            status={selectedStatus[1]}
          />
        </>
      )}
    </section>
  )
}
