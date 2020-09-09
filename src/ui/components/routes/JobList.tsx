import React from 'react'
import { Store } from '../hooks/useStore'
import { Jobs } from '../Jobs'
import { QueueActions } from '../QueueActions'
import { useParams } from 'react-router-dom'

interface JobListProps {
  store: Store
}

export const JobList = (props: JobListProps) => {
  const { store } = props
  const { queue: name, status } = useParams()

  if (!store.state.data) {
    return null
  }

  const queue = store.state.data?.queues.find(queue => queue.name === name)

  if (!queue) {
    throw new Error(`Couldn't find queue in store: ${name}`)
  }

  return (
    <>
      <QueueActions
        retryAll={store.retryAll(queue.name)}
        cleanAllDelayed={store.cleanAllDelayed(queue.name)}
        cleanAllFailed={store.cleanAllFailed(queue.name)}
        cleanAllCompleted={store.cleanAllCompleted(queue.name)}
        cleanAllWaiting={store.cleanAllWaiting(queue.name)}
        queue={queue}
        status={store.selectedStatus?.[1] ?? 'latest'}
      />
      <Jobs
        retryJob={store.retryJob(name)}
        promoteJob={store.promoteJob(name)}
        queue={queue}
        status={status}
      />
    </>
  )
}
