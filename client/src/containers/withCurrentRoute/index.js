import React from 'react'
import { connect } from 'react-redux'

import routes from '../../routes'

const withCurrentRoute = Component => connect(
  state => ({ location: state.router.location })
)(
  ({ location, ...props}) => (
    <Component
      currentRoute={routes.find(route => location.pathname.startsWith(route.path))}
      {...props}
    />
  )
)

export default withCurrentRoute
