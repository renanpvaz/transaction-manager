import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getPermissions } from '../../store/auth'

const withPermission = Component => connect(
  state => ({ permissions: getPermissions(state) })
)(
  ({ permissions, ...props }) => (
    <Component
      hasPermissionTo={functionality =>
        functionality ? permissions.includes(functionality) : true
      }
      {...props}
    />
  )
)

export default withPermission
