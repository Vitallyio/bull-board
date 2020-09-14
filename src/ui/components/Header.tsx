import React from 'react'

import { useScrolled } from './hooks/useScrolled'
import { Store } from './hooks/useStore'
import { Link } from 'react-router-dom'

export const Header = ({ store }: { store: Store }) => {
  const scrolled = useScrolled()

  return (
    <nav
      id="header"
      style={{ boxShadow: scrolled ? '0 3px 3px rgba(0,0,0,0.1)' : 'none' }}
    >
      <Link to="/" className="headerLink">
        <span>🎯 Bull Dashboard</span>
      </Link>
      <div className="searchContainer">
        <input
          value={store.state.search}
          onChange={evt => store.setSearch(evt.target.value)}
        />
      </div>
    </nav>
  )
}
