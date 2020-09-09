import React from 'react'

import { useLocation } from 'react-router-dom'

export const Main = () => {
  const location = useLocation()
  console.log('location', location)
  return <div>hello</div>
}
