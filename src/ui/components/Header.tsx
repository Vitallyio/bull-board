import React from 'react'

import { useScrolled } from './hooks/useScrolled'

export const Header = ({ search }: { search: React.ReactChild }) => {
  const scrolled = useScrolled()

  return (
    <nav
      id="header"
      style={{ boxShadow: scrolled ? '0 3px 3px rgba(0,0,0,0.1)' : 'none' }}
    >
      <span>🎯 Bull Dashboardzzzzzzz</span>
      <div className="searchContainer">{search}</div>
    </nav>
  )
}
