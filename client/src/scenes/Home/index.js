import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser } from '../../store/auth'
import { getDailyTotal, getLast30DaysTotal } from '../../store/transaction'
import { calculateDailyTotal, calculateLast30DaysTotal } from '../../store/transaction/actions'

import Scene from '../../containers/Scene'

import Card from '../../components/Card'
import Flex from '../../components/Flex'
import Currency from '../../components/Currency'

class Home extends React.Component {
  state = {}

  componentDidMount() {
    this.props.calculateDailyTotal()
    this.props.calculateLast30DaysTotal()
  }

  render() {
    return (
      <Scene size={680}>
        <h3>Welcome back, {this.props.user.username}!</h3>
        <Card>
          <Flex justify="between">
            <span>Today's total</span>
            <strong>
              <Currency>{this.props.dailyTotal}</Currency>
            </strong>
          </Flex>
          <br />
          <Flex justify="between">
            <span>Last 30 days' total</span>
            <strong>
              <Currency>{this.props.last30DaysTotal}</Currency>
            </strong>
          </Flex>
        </Card>
      </Scene>
    )
  }
}

export default connect(
  state => ({
    user: getUser(state),
    dailyTotal: getDailyTotal(state),
    last30DaysTotal: getLast30DaysTotal(state),
  }),
  dispatch => bindActionCreators({
    calculateDailyTotal,
    calculateLast30DaysTotal
  }, dispatch)
)(Home)
