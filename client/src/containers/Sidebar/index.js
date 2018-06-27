import React from 'react'
import cn from 'classnames'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import { userLoggedOff } from '../../store/auth/actions'
import { isSidebarOpen } from '../../store/ui'

import routes from '../../routes'

import Logo from '../../components/Logo'
import Flex from '../../components/Flex'
import Button from '../../components/Button'
import Link from '../../components/Link'
import withCurrentRoute from '../withCurrentRoute'
import withPermission from '../withPermission'

import './sidebar.css'

const Sidebar = ({ currentRoute, open, logoff, hasPermissionTo }) => (
  <aside className={cn('sidebar', open && 'sidebar--open')}>
    <section className="sidebar__inner">
      <div className="sidebar__item">
        <Logo />
      </div>
      <nav className="sidebar__navigation">
        {routes
          .filter(route => route.menu && hasPermissionTo(route.permission))
          .map(route => (
            <Link
              key={route.title}
              to={route.path}
              className={cn(
                'sidebar__item',
                route === currentRoute && 'sidebar__item--active'
              )}
            >
              {route.icon} {route.title}
            </Link>
          )
        )}
      </nav>
      <div className="sidebar__item">
        <Button onClick={logoff}>Logoff</Button>
      </div>
    </section>
  </aside>
)

export default compose(
  withPermission,
  withCurrentRoute,
  connect(
    state => ({ open: isSidebarOpen(state) }),
    dispatch => bindActionCreators({ logoff: userLoggedOff }, dispatch)
  )
)(Sidebar)
