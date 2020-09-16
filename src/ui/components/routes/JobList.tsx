import React from 'react'
import { Store } from '../hooks/useStore'
import { Jobs } from '../Jobs'
import { QueueActions } from '../QueueActions'
import { JobPagination } from '../JobPagination'

interface JobListProps {
  store: Store
}

export const JobList = (props: JobListProps) => {
  const { store } = props

  if (!store.state.data) {
    return null
  }

  if (!store.selectedStatus) {
    return null
  }

  const [name, status] = store.selectedStatus
  if (!name) {
    return null
  }

  const queue = store.state.data?.queues[name]
  if (!queue) {
    throw new Error(`Couldn't find queue in store: ${name}`)
  }

  return (
    <>
      <div className="queue-navigation">
        <QueueActions
          retryAll={store.retryAll(queue.name)}
          cleanAllActive={store.cleanAllActive(queue.name)}
          cleanAllDelayed={store.cleanAllDelayed(queue.name)}
          cleanAllFailed={store.cleanAllFailed(queue.name)}
          cleanAllCompleted={store.cleanAllCompleted(queue.name)}
          cleanAllWaiting={store.cleanAllWaiting(queue.name)}
          queue={queue}
          status={status ?? 'latest'}
        />
        <JobPagination queue={queue} status={status} />
      </div>
      <Jobs
        retryJob={store.retryJob(name)}
        promoteJob={store.promoteJob(name)}
        cleanJob={store.cleanJob(name)}
        queue={queue}
        status={status}
      />
    </>
  )
}
