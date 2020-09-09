import React from 'react'

import { Queue as QueueElement } from './Queue'
import { Header } from './Header'
import { useStore } from './hooks/useStore'
import { useSearch } from './hooks/useSearch'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Main } from './Main'

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

  useSearch({
    search: state.search,
    status: selectedStatus ? selectedStatus[1] : undefined,
    job: selectedStatus ? selectedStatus[0] : undefined,
  })

  const regex = state.search
    ? new RegExp(escapeRegExp(state.search), 'i')
    : undefined

  return (
    <Router>
      <Main />
      <Switch>
        <Route path="/">
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
        </Route>
      </Switch>
    </Router>
  )
}
