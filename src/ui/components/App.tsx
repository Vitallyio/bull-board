import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from './Header'
import { useStore } from './hooks/useStore'
import { QueueList } from './routes/QueueList'
import { JobList } from './routes/JobList'
// import { JobList } from './routes/JobList'

export const App = ({ basePath }: { basePath: string }) => {
  return (
    <Router basename={basePath}>
      <Switch>
        <Route
          path="/:queue/:status"
          render={() => <AppInner basePath={basePath} />}
        />
        <Route path="/" render={() => <AppInner basePath={basePath} />} />
      </Switch>
    </Router>
  )
}

export const AppInner = ({ basePath }: { basePath: string }) => {
  const store = useStore(basePath)

  return (
    <>
      <Header store={store} />
      {store.params.queue ? (
        <JobList store={store} />
      ) : (
        <QueueList store={store} />
      )}
    </>
  )
}
