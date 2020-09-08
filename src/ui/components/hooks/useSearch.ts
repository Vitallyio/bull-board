import { useEffect } from 'react'
import { Status } from '../constants'

interface StateSlice {
  search: string | undefined
  status: Status | undefined
  job: string | undefined
}

const PARAMS: Array<keyof StateSlice> = ['job', 'status', 'search']

export const useSearch = (state: StateSlice) => {
  useEffect(() => {
    let dirty = false
    const params = new URLSearchParams(document.location.search)

    for (const param of PARAMS) {
      const urlValue = params.get(param)
      const stateValue = state[param]
      if (stateValue) {
        if (urlValue !== stateValue) {
          params.set(param, stateValue.toString())
          dirty = true
        }
      } else if (urlValue) {
        // we force the search param to follow state, it's the responsibility
        // of the store to initialize from the URL
        params.delete(param)
        dirty = true
      }
    }

    if (dirty) {
      const next = new URL(document.location.toString())
      next.search = params.toString()
      const nexturl = next.toString()
      window.history.pushState({ path: nexturl }, '', nexturl)
    }
  })
}

export const getSearchState = (): StateSlice => {
  const returnValue: StateSlice = {
    search: undefined,
    status: undefined,
    job: undefined,
  }
  const params = new URLSearchParams(document.location.search)
  for (const param of PARAMS) {
    ;(returnValue[param] as any) = params.get(param) ?? undefined
  }
  return returnValue
}
