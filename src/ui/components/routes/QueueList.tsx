import React from 'react'
import { Store } from '../hooks/useStore'
import { QueueNav } from '../QueueNav'
import { STATUSES } from '../constants'
import { AppQueue } from '../../../@types/app'

export const escapeRegExp = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

interface QueueListProps {
  store: Store
}

// We need to extend so babel doesn't think it's JSX
const keysOf = <Target extends {}>(target: Target) =>
  Object.keys(target) as (keyof Target)[]

export const QueueList = (props: QueueListProps) => {
  const { store } = props
  const { state } = store
  const regex = state.search
    ? new RegExp(escapeRegExp(state.search), 'i')
    : undefined

  return (
    <>
      {state.loading ? (
        'Loading...'
      ) : (
        <table>
          <thead>
            <tr>
              <th>name</th>
              {keysOf(STATUSES).map(status => (
                <th key={`${status}`}>{status}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.data?.queueNames
              .map(name => state.data?.queues[name] as AppQueue)
              .filter(queue => {
                return regex ? queue.name.match(regex) : true
              })
              .filter(queue => {
                const { selectedStatus } = store
                if (selectedStatus?.[0]) {
                  return queue.name === selectedStatus[0]
                }
                return true
              })
              .map(queue => (
                <QueueNav queue={queue} key={queue.name} />
              ))}
          </tbody>
        </table>
      )}
    </>
  )
}
