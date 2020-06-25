import React from 'react'

import { Queue as QueueElement } from './Queue'
import { RedisStats } from './RedisStats'
import { Header } from './Header'
import { useStore } from './hooks/useStore'

export const App = ({ basePath }: { basePath: string }) => {
  const {
    state,
    selectedStatus,
    setSelectedStatus,
    promoteJob,
    retryJob,
    retryAll,
    cleanAllDelayed,
    cleanAllFailed,
    cleanAllCompleted,
    cleanAllWaiting,
  } = useStore(basePath)

  return (
    <>
      <Header />
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

            {state.data?.queues.map(queue => (
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
