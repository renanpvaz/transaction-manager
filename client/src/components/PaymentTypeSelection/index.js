import React from 'react'
import cn from 'classnames'

import './payment-type-selection.css'

const makeClickHandler = (name, value, f) =>
  () => f({ target: { name, value } })

const PaymentTypeSelection = ({
  name,
  value,
  onChange
}) => (
  <menu className="payment-type-selection">
    <button
      type="button"
      title="credit card"
      onClick={makeClickHandler(name, 'CARD', onChange)}
      className={cn(
        'payment-type-selection-option',
        'payment-type-selection-option--card',
        value === 'CARD' && 'payment-type-selection-option--selected',
      )}
    >
      <i>💳</i>
    </button>
    <button
      type="button"
      title="money"
      onClick={makeClickHandler(name, 'MONEY', onChange)}
      className={cn(
        'payment-type-selection-option',
        'payment-type-selection-option--money',
        value === 'MONEY' && 'payment-type-selection-option--selected',
      )}
    >
      <i>💵</i>
    </button>
  </menu>
)

export default PaymentTypeSelection
