import { useEffect, useRef, useState } from 'react'
import qs from 'querystring'
import { Status } from '../constants'
import * as api from '../../../@types/api'
import { AppQueue, AppJob } from '../../../@types/app'

const interval = 2500

type State = {
  data: null | api.GetQueues
  loading: boolean
  search: string | undefined
}

export type SelectedStatus = [AppQueue['name'], Status]

export interface Store {
  state: State
  setSearch: (search: string) => void
  promoteJob: (queueName: string) => (job: AppJob) => () => Promise<void>
  retryJob: (queueName: string) => (job: AppJob) => () => Promise<void>
  retryAll: (queueName: string) => () => Promise<void>
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
  const [state, setState] = useState({
    data: null,
    loading: true,
    search: undefined,
  } as State)
  const [selectedStatus, setSelectedStatus] = useState(
    undefined as SelectedStatus | undefined,
  )

  const poll = useRef(undefined as undefined | NodeJS.Timeout)
  const stopPolling = () => {
    if (poll.current) {
      clearTimeout(poll.current)
      poll.current = undefined
    }
  }

  useEffect(() => {
    stopPolling()
    runPolling()

    return stopPolling
  }, [selectedStatus])

  const runPolling = () => {
    update()
      // eslint-disable-next-line no-console
      .catch(error => console.error('Failed to poll', error))
      .then(() => {
        const timeoutId = setTimeout(runPolling, interval)
        poll.current = timeoutId
      })
  }

  const update = () => {
    const urlParam =
      selectedStatus != null
        ? qs.encode({ [selectedStatus[0]]: selectedStatus[1] })
        : ''
    return fetch(`${basePath}/queues/?${urlParam}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => setState({ data, loading: false, search: state.search }))
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

  const retryAll = (queueName: string) => () =>
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/retry`, {
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
    fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/waiting`, {
      method: 'put',
    }).then(update)

  const setSearch = (search: string) =>
    setState({ data: state.data, loading: state.loading, search: search })

  return {
    state,
    setSearch,
    promoteJob,
    retryJob,
    retryAll,
    cleanAllDelayed,
    cleanAllFailed,
    cleanAllCompleted,
    cleanAllWaiting,
    selectedStatus,
    setSelectedStatus,
  }
}
