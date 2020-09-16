import { useState, useEffect } from 'react'
import qs from 'querystring'
import { Status } from '../constants'
import * as api from '../../../@types/api'
import { AppQueue, AppJob } from '../../../@types/app'
import { useParams } from 'react-router-dom'
import { useInterval } from './useInterval'

const interval = 2500

export type State = {
  data: null | api.GetQueues
  loading: boolean
  search: string | undefined
}

export type SelectedStatus = [AppQueue['name'], Status]

export interface Store {
  state: State
  params: api.RouteParams
  setSearch: (search: string) => void
  promoteJob: (queueName: string) => (job: AppJob) => () => Promise<void>
  retryJob: (queueName: string) => (job: AppJob) => () => Promise<void>
  cleanJob: (queueName: string) => (job: AppJob) => () => Promise<void>
  retryAll: (queueName: string) => () => Promise<void>
  cleanAllActive: (queueName: string) => () => Promise<void>
  cleanAllDelayed: (queueName: string) => () => Promise<void>
  cleanAllFailed: (queueName: string) => () => Promise<void>
  cleanAllCompleted: (queueName: string) => () => Promise<void>
  cleanAllWaiting: (queueName: string) => () => Promise<void>
  selectedStatus: SelectedStatus | undefined
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<SelectedStatus | undefined>
  >
}

export const useStore = (basePath: string): Store => {
  const params = useParams<api.RouteParams>()
  const [state, setState] = useState({
    data: null,
    loading: true,
    search: params.search,
  } as State)
  const [selectedStatus, setSelectedStatus] = useState([
    params.queue,
    params.status ?? 'latest',
  ] as SelectedStatus | undefined)

  // route params change -> update state
  useEffect(() => {
    if (params.queue && params.status) {
      setSelectedStatus([decodeURIComponent(params.queue), params.status])
    } else {
      setSelectedStatus(undefined)
    }
  }, [params])

  // selected status changed -> immediate refresh
  useEffect(() => {
    update().catch(console.error)
  }, [selectedStatus])

  useInterval(() => update().catch(console.error), interval)

  const update = () => {
    const urlParam =
      selectedStatus != null
        ? qs.encode({
            [selectedStatus[0]]: selectedStatus[1],
            page: params.page,
          })
        : ''
    return fetch(`${basePath}/queues/?${urlParam}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data =>
        setState(state => {
          const next = { ...state, loading: false }
          if (!next.data) {
            return { ...state, data }
          }
          // always merge the counts
          for (const key of Object.keys(data.queues)) {
            next.data.queues[key].counts = data.queues[key].counts
          }
          // only clobber job lists for the currently selected queue
          // (the api returns empty lists for whatever's not currently selected)
          if (selectedStatus) {
            const name = selectedStatus[0]
            next.data.queues[name] = data.queues[name]
          }
          return next
        }),
      )
  }

  const promoteJob = (queueName: string) => (job: AppJob) => () =>
    fetch(
      `${basePath}/queues/${encodeURIComponent(queueName)}/${job.id}/promote`,
      {
        method: 'put',
      },
    ).then(update)

  const retryJob = (queueName: string) => (job: AppJob) => () =>
    fetch(
      `${basePath}/queues/${encodeURIComponent(queueName)}/${job.id}/retry`,
      {
        method: 'put',
      },
    ).then(update)

  const cleanJob = (queueName: string) => (job: AppJob) => () =>
    fetch(
      `${basePath}/queues/${encodeURIComponent(queueName)}/${job.id}/clean`,
      {
        method: 'put',
      },
    ).then(update)

  const retryAll = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/retry`, {
      method: 'put',
    }).then(update)

  const cleanAllActive = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/active`, {
      method: 'put',
    }).then(update)

  const cleanAllDelayed = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/delayed`, {
      method: 'put',
    }).then(update)

  const cleanAllFailed = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/failed`, {
      method: 'put',
    }).then(update)

  const cleanAllCompleted = (queueName: string) => () =>
    fetch(
      `${basePath}/queues/${encodeURIComponent(queueName)}/clean/completed`,
      {
        method: 'put',
      },
    ).then(update)

  const cleanAllWaiting = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/wait`, {
      method: 'put',
    }).then(update)

  const setSearch = (search: string) =>
    setState({ data: state.data, loading: state.loading, search: search })

  return {
    state,
    params,
    setSearch,
    promoteJob,
    retryJob,
    retryAll,
    cleanJob,
    cleanAllActive,
    cleanAllDelayed,
    cleanAllFailed,
    cleanAllCompleted,
    cleanAllWaiting,
    selectedStatus,
    setSelectedStatus,
  }
}
