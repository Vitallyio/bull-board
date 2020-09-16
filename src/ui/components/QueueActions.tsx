import React from 'react'
import { Status } from './constants'
import { AppQueue } from '../../@types/app'

const ACTIONABLE_STATUSES: Array<Status> = [
  'active',
  'failed',
  'delayed',
  'completed',
  'waiting',
]

interface QueueActionProps {
  status: Status
  queue: AppQueue
  cleanAllActive: () => Promise<void>
  cleanAllDelayed: () => Promise<void>
  cleanAllFailed: () => Promise<void>
  cleanAllCompleted: () => Promise<void>
  cleanAllWaiting: () => Promise<void>
  retryAll: () => Promise<void>
}

const isStatusActionable = (status: Status): boolean =>
  ACTIONABLE_STATUSES.includes(status)

export const QueueActions = ({
  status,
  retryAll,
  cleanAllActive,
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
      {status === 'active' && (
        <button style={{ margin: 10 }} onClick={cleanAllActive}>
          Clean all
        </button>
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
