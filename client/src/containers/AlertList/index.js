import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import { getAlerts } from '../../store/ui'
import Alert from '../../components/Alert'

import './alert-list.css'

class AlertList extends React.Component {
  render() {
    return (
      <ul className="alert-list">
        {this.props.alerts.map(Alert)}
      </ul>
    )
  }
}

export default connect(
  state => ({ alerts: getAlerts(state) }),
)(AlertList)
