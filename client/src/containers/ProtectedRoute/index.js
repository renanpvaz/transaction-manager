import React from 'react'

import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

import { isLogged } from '../../store/auth'

import withPermission from '../withPermission'
import withCurrentRoute from '../withCurrentRoute'

const ProtectedRoute = ({
  isLogged,
  hasPermissionTo,
  currentRoute,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => isLogged && hasPermissionTo(currentRoute.permission)
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default compose(
  withPermission,
  withCurrentRoute,
  connect(
    state => ({
      location: state.router.location,
      isLogged: isLogged(state),
    })
  )
)(ProtectedRoute)
