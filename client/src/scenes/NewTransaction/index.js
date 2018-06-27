import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { saveTransaction } from '../../store/transaction/actions'

import toISODate from '../../utils/to-iso-date'

import Scene from '../../containers/Scene'
import TransactionForm from '../../components/TransactionForm'

class NewTransaction extends React.Component {
  handleSubmition = transaction =>
    this.props.saveTransaction({
      ...transaction,
      amount: parseFloat(transaction.amount),
    })

  render() {
    return (
      <Scene size={680}>
        <TransactionForm
          onSubmit={this.handleSubmition}
          label="Save new transaction"
          disabled={[]}
        />
      </Scene>
    )
  }
}

export default connect(null,
  dispatch => bindActionCreators({
    saveTransaction,
  }, dispatch)
)(NewTransaction)
