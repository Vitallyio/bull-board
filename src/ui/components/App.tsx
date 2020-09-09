import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from './Header'
import { useStore } from './hooks/useStore'
import { useSearch } from './hooks/useSearch'
import { QueueList } from './routes/QueueList'
import { JobList } from './routes/JobList'

export const App = ({ basePath }: { basePath: string }) => {
  const store = useStore(basePath)

  useSearch({
    search: store.state.search,
    status: store.selectedStatus ? store.selectedStatus[1] : undefined,
    job: store.selectedStatus ? store.selectedStatus[0] : undefined,
  })

  return (
    <Router basename={basePath}>
      <Header store={store} />
      <Switch>
        <Route
          path="/:queue/:status"
          render={() => <JobList store={store} />}
        />
        <Route path="/" render={() => <QueueList store={store} />} />
      </Switch>
    </Router>
  )
}
