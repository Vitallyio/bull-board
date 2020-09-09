import React from 'react'
import { Store } from '../hooks/useStore'
import { Queue as QueueElement } from '../Queue'

export const escapeRegExp = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

interface QueueListProps {
  store: Store
}

export const QueueList = (props: QueueListProps) => {
  const { state } = props.store
  const regex = state.search
    ? new RegExp(escapeRegExp(state.search), 'i')
    : undefined

  return (
    <main>
      {props.store.state.loading ? (
        'Loading...'
      ) : (
        <>
          {props.store.state.data?.queues
            .filter(queue => {
              return regex ? queue.name.match(regex) : true
            })
            .map(queue => (
              <QueueElement
                queue={queue}
                key={queue.name}
                selectedStatus={props.store.selectedStatus}
                selectStatus={props.store.setSelectedStatus}
                promoteJob={props.store.promoteJob(queue.name)}
                retryJob={props.store.retryJob(queue.name)}
                retryAll={props.store.retryAll(queue.name)}
                cleanAllDelayed={props.store.cleanAllDelayed(queue.name)}
                cleanAllFailed={props.store.cleanAllFailed(queue.name)}
                cleanAllCompleted={props.store.cleanAllCompleted(queue.name)}
                cleanAllWaiting={props.store.cleanAllWaiting(queue.name)}
              />
            ))}
        </>
      )}
    </main>
  )
}
