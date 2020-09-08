import { State } from './useStore'
import { useEffect } from 'react'

export const useSearch = (state: State) => {
  useEffect(() => {
    let dirty = false
    const params = new URLSearchParams(document.location.search)
    if (state.search) {
      if (params.get('search') !== state.search) {
        params.set('search', state.search)
        dirty = true
      }
    } else {
      // we force the search param to follow state, it's the responsibility
      // of the store to
      if (params.get('search') != null) {
        params.delete('search')
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
