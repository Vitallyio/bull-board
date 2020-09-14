import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    let id: number
    function tick() {
      let called = false
      requestAnimationFrame(() => {
        savedCallback.current?.()
        called = true
      })
      if (called === false) {
        clearInterval(id)
      }
    }
    if (delay != null) {
      id = (setInterval(tick, delay) as any) as number
      return () => clearInterval(id)
    }
  }, [callback, delay])
}
