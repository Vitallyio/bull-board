import React, { useEffect } from 'react'

import { Queue as QueueElement } from './Queue'
import { RedisStats } from './RedisStats'
import { Header } from './Header'
import { useStore } from './hooks/useStore'

export const escapeRegExp = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
export const App = ({ basePath }: { basePath: string }) => {
  const {
    state,
    selectedStatus,
    setSearch,
    setSelectedStatus,
    promoteJob,
    retryJob,
    retryAll,
    cleanAllDelayed,
    cleanAllFailed,
    cleanAllCompleted,
    cleanAllWaiting,
  } = useStore(basePath)

  useEffect(() => {
    let dirty = false
    const params = new URLSearchParams(document.location.search)
    if (state.search) {
      if (params.get('search') !== state.search) {
        params.set('search', state.search)
        dirty = true
      }
    } else {
      if (params.get('search') != null) {
        params.delete('search')
        dirty = true
      }
    }
    if (dirty) {
      const next = new URL(document.location.toString())
      next.search = params.toString()
      const nexturl = next.toString()
      window.history.pushState({ path: nexturl }, '', nexturl);
    }
  })

  const regex = state.search
    ? new RegExp(escapeRegExp(state.search), 'i')
    : undefined

  return (
    <>
      <Header
        search={
          <input
            value={state.search}
            onChange={evt => setSearch(evt.target.value)}
          />
        }
      />
      <main>
        {state.loading ? (
          'Loading...'
        ) : (
          <>
            {state.data?.stats ? (
              <RedisStats stats={state.data.stats} />
            ) : (
              <>No stats to display </>
            )}

            {state.data?.queues
              .filter(queue => {
                return regex ? queue.name.match(regex) : true
              })
              .map(queue => (
                <QueueElement
                  queue={queue}
                  key={queue.name}
                  selectedStatus={selectedStatus}
                  selectStatus={setSelectedStatus}
                  promoteJob={promoteJob(queue.name)}
                  retryJob={retryJob(queue.name)}
                  retryAll={retryAll(queue.name)}
                  cleanAllDelayed={cleanAllDelayed(queue.name)}
                  cleanAllFailed={cleanAllFailed(queue.name)}
                  cleanAllCompleted={cleanAllCompleted(queue.name)}
                  cleanAllWaiting={cleanAllWaiting(queue.name)}
                />
              ))}
          </>
        )}
      </main>
    </>
  )
}
