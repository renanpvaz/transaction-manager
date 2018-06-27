import React from 'react'

import toISODate from '../../utils/to-iso-date'

import Field from '../../components/Field'
import Button from '../../components/Button'
import PaymentTypeSelection from '../../components/PaymentTypeSelection'

class TransactionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: toISODate(new Date()),
      type: 'CARD',
      ...props.initialData,
    }
  }

  handleFormChange = ({ target }) =>
    this.setState({ [target.name]: target.value })

  handleSubmition = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <form id="form" onSubmit={this.handleSubmition}>
        <Field
          required
          label="A description to the transaction"
          value={this.state.description}
          onChange={this.handleFormChange}
          name="description"
          disabled={this.props.disabled.includes('description')}
          maxLength="100"
        />
        <Field
          required
          label="How much was transfered"
          value={this.state.amount}
          onChange={this.handleFormChange}
          name="amount"
          disabled={this.props.disabled.includes('amount')}
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
        />
        <Field
          required
          label="Date of the transaction"
          value={this.state.date}
          onChange={this.handleFormChange}
          name="date"
          disabled={this.props.disabled.includes('date')}
          type="date"
        />
        <Field
          label="Payment type"
          name="type"
          disabled={this.props.disabled.includes('type')}
          component={PaymentTypeSelection}
          value={this.state.type}
          onChange={this.handleFormChange}
        />
        <Button form="form" type="submit">
          {this.props.label}
        </Button>
      </form>
    )
  }
}

export default TransactionForm
