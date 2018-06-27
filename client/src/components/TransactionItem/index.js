import React from 'react'

import Currency from '../Currency'
import TypeIcon from '../TypeIcon'

const TransactionItem = ({ description, amount, date, type }) => (
  <React.Fragment>
    <td>{description}</td>
    <td>
      <Currency>{amount}</Currency>
    </td>
    <td>{new Date(date).toLocaleDateString()}</td>
    <td>
      <TypeIcon type={type} />
    </td>
  </React.Fragment>
)

export default TransactionItem
