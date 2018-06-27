import React from 'react'
import cn from 'classnames'

import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import { sidebarToggled } from '../../store/ui/actions'
import { getUser } from '../../store/auth'
import { isSidebarOpen } from '../../store/ui'

import Flex from '../../components/Flex'
import HamburgerMenuIcon from '../../components/HamburgerMenuIcon'
import Sidebar from '../Sidebar'
import AlertList from '../AlertList'
import withCurrentRoute from '../withCurrentRoute'

import './scene.css'

const Scene = ({
  children,
  title,
  size,
  currentRoute,
  toggleSidebar,
  user,
  sidebarOpen
}) => (
  <div className={cn('scene', sidebarOpen && 'scene--with-sidebar-open')}>
    <AlertList />
    <Sidebar />
    <Flex className="scene__container" direction="column" auto>
      <header className="scene__header">
        <Flex items="center" justify="between">
          <Flex items="center">
            <HamburgerMenuIcon onClick={toggleSidebar} />
            <small>{currentRoute.title}</small>
          </Flex>
          <small>Logged as {user.username}</small>
        </Flex>
      </header>
      <div>
        <section className="scene__content" style={{ maxWidth: size }}>
          <span className="scene__icon">{currentRoute.icon}</span>
          <h1>
            {currentRoute.title}
          </h1>
          {children}
        </section>
      </div>
    </Flex>
  </div>
)

export default compose(
  withCurrentRoute,
  connect(
    state => ({ user: getUser(state), sidebarOpen: isSidebarOpen(state) }),
    dispatch => bindActionCreators(
      { toggleSidebar: sidebarToggled },
      dispatch
    )
  )
)(Scene)
