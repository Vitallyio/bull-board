import React from 'react'
import { STATUSES, Status } from './constants'
import { AppQueue } from '../../@types/app'
import { NavLink } from 'react-router-dom'

type MenuItemProps = {
  status: Status
  name: string
  count: number
}

const MenuItem = ({ status, count, name }: MenuItemProps) => (
  <NavLink
    className={`menu-item ${status} ${count === 0 ? 'off' : 'on'}`}
    activeClassName={`selected`}
    to={{
      pathname: `/${encodeURIComponent(name)}/${status}`,
    }}
  >
    <b className="count">{status !== 'latest' ? count : '*'}</b>
  </NavLink>
)

interface QueueNavProps {
  queue: AppQueue
}

// We need to extend so babel doesn't think it's JSX
const keysOf = <Target extends {}>(target: Target) =>
  Object.keys(target) as (keyof Target)[]

export const QueueNav = ({ queue }: QueueNavProps) => {
  return (
    <tr>
      <td>{queue.name}</td>
      {keysOf(STATUSES).map(status => (
        <td key={`${queue.name}-${status}`}>
          <MenuItem
            name={queue.name}
            status={status}
            count={queue.counts[status]}
          />
        </td>
      ))}
    </tr>
  )
}
