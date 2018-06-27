import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getTransaction } from '../../store/transaction'
import { loadTransaction, updateTransaction } from '../../store/transaction/actions'

import Scene from '../../containers/Scene'
import TransactionForm from '../../components/TransactionForm'

class EditTransaction extends React.Component {
  componentDidMount() {
    this.props.loadTransaction(this.props.match.params.id)
  }

  render() {
    return (
      <Scene size={680}>
        {this.props.transaction && (
          <TransactionForm
            initialData={this.props.transaction}
            onSubmit={this.props.updateTransaction}
            label="Update transaction"
            disabled={['date']}
          />
        )}
      </Scene>
    )
  }
}

export default compose(
  withRouter,
  connect(
    (state, ownProps) => ({
      transaction: getTransaction(state, ownProps.match.params.id)
    }),
    dispatch => bindActionCreators({
      loadTransaction,
      updateTransaction,
    }, dispatch)
  )
)(EditTransaction)
