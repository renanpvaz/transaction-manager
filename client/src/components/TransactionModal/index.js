import React from 'react'

import Button from '../Button'
import Link from '../Link'
import Flex from '../Flex'
import Modal from '../Modal'
import Currency from '../Currency'
import TypeIcon from '../TypeIcon'
import Dialog from '../Dialog'

const TransactionModal = ({ transaction, onDelete, ...rest }) => (
  <Dialog
    title={transaction.description}
    actions={(
      <React.Fragment>
        <Button ghost small onClick={onDelete}>
          🗑 Delete
        </Button>
        <Link to={`/edit/${transaction.id}`}>
          <Button ghost small>📝 Edit</Button>
        </Link>
      </React.Fragment>
    )}
    {...rest}
  >
    <Flex tag="header" items="center" justify="between">
      <Flex items="center">
        <Currency>{transaction.amount}</Currency>
        &nbsp;&nbsp;
        <TypeIcon type={transaction.type} />
      </Flex>
      <span>{transaction.date}</span>
    </Flex>
  </Dialog>
)

export default TransactionModal
