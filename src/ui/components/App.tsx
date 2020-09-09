import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as api from '../../@types/api'

import { Header } from './Header'
import { useStore } from './hooks/useStore'
import { QueueList } from './routes/QueueList'
import { JobList } from './routes/JobList'
import { Provider } from 'react-redux'
import { reducer } from './store'
import { createStore } from 'redux'

export type State = {
  data: null | api.GetQueues
  loading: boolean
  search: string | undefined
}

const reduxStore = createStore(reducer)

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
    <Provider store={reduxStore}>
      <Header store={store} />
      {store.params.queue ? (
        <JobList store={store} />
      ) : (
        <QueueList store={store} />
      )}
    </Provider>
  )
}
