import React from 'react'

import { useScrolled } from './hooks/useScrolled'
import { Store } from './hooks/useStore'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

interface PassedProps {
  store: Store
}

interface ConnectProps {}

interface DispatchProps {
  doThing: () => void
}

type Props = PassedProps & ConnectProps & DispatchProps

const HeaderComponent = ({ store, doThing }: Props) => {
  const scrolled = useScrolled()

  return (
    <nav
      id="header"
      style={{ boxShadow: scrolled ? '0 3px 3px rgba(0,0,0,0.1)' : 'none' }}
    >
      <Link to="/" className="headerLink">
        <span>🎯 Bull Dashboard</span>
      </Link>
      <button onClick={doThing}>wat</button>
      <div className="searchContainer">
        <input
          value={store.state.search}
          onChange={evt => store.setSearch(evt.target.value)}
        />
      </div>
    </nav>
  )
}

export const Header = connect<ConnectProps, DispatchProps, PassedProps>(
  state => {
    console.log('header', state)
    return {}
  },
  {
    doThing: () => ({ type: 'my-action' }),
  },
)(HeaderComponent)
