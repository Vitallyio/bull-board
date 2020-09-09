import React from 'react'
import { Store } from '../hooks/useStore'

interface JobListProps {
  store: Store
}

export const JobList = (props: JobListProps) => {
  return <div>{JSON.stringify(props.store.state)}</div>
}
