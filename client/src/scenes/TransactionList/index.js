import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import omit from '../../utils/omit'

import { getTransactions, getTotalCount } from '../../store/transaction'
import { loadTransactions, deleteTransaction } from '../../store/transaction/actions'

import { EDIT_TRANSACTIONS, DELETE_TRANSACTIONS } from '../../permissions'

import Scene from '../../containers/Scene'
import withPermission from '../../containers/withPermission'

import DataTable from '../../components/DataTable'
import Pagination from '../../components/Pagination'
import TransactionItem from '../../components/TransactionItem'
import Select from '../../components/Select'
import Dialog from '../../components/Dialog'
import Button from '../../components/Button'
import Link from '../../components/Link'
import Flex from '../../components/Flex'
import Modal from '../../components/Modal'
import Currency from '../../components/Currency'
import TypeIcon from '../../components/TypeIcon'

const columns = [
  { name: 'description', width: '30%' },
  { name: 'amount', width: '25%' },
  { name: 'date', width: '25%' },
  { name: 'type', width: '20%' },
]

class TransactionList extends React.Component {
  state = {
    page: 1,
    sortBy: {},
    detailsOpen: false,
    confirmationOpen: false,
    selectedTransaction: {},
  }

  componentDidMount() {
    this.loadTransactions()
  }

  loadTransactions = () =>
    this.props.loadTransactions({
      page: this.state.page,
      _sort: Object.keys(this.state.sortBy),
      _order: Object.values(this.state.sortBy)
    })

  handlePageChange = page => {
    this.setState({ page })
    this.props.loadTransactions({ page })
  }

  handleDeletion = page => {
    this.setState({ confirmationOpen: false, selectedTransaction: {} })

    this.props
      .deleteTransaction(this.state.selectedTransaction.id)
      .then(this.loadTransactions)
  }

  handleSort = (column, order) => {
    const { sortBy } = this.state

    this.setState({
      ...this.state,
      sortBy: order
        ? { ...sortBy, [column]: order }
        : omit(column, sortBy)
    }, this.loadTransactions)
  }

  confirmDeletion = () =>
    this.setState({ confirmationOpen: true, detailsOpen: false })

  cancelDeletion = () =>
    this.setState({ confirmationOpen: false, detailsOpen: true })

  openDetails = transaction =>
    this.setState({ detailsOpen: true, selectedTransaction: transaction })

  closeDetails = () =>
    this.setState({ detailsOpen: false, selectedTransaction: {} })

  renderDetailsModal() {
    const { selectedTransaction } = this.state

    return (
      <Dialog
        open={this.state.detailsOpen}
        onClose={this.closeDetails}
        title={selectedTransaction.description}
        actions={(
          <React.Fragment>
            {this.props.hasPermissionTo(DELETE_TRANSACTIONS) && (
              <Button ghost small onClick={this.confirmDeletion}>
                🗑 Delete
              </Button>
            )}
            {this.props.hasPermissionTo(EDIT_TRANSACTIONS) && (
              <Link to={`/edit/${selectedTransaction.id}`}>
                <Button ghost small>📝 Edit</Button>
              </Link>
            )}
          </React.Fragment>
        )}
      >
        <Flex tag="header" items="center" justify="between">
          <Flex items="center">
            <Currency>{selectedTransaction.amount}</Currency>
            &nbsp;&nbsp;
            <TypeIcon type={selectedTransaction.type} />
          </Flex>
          <span>{selectedTransaction.date}</span>
        </Flex>
      </Dialog>
    )
  }

  renderConfirmationModal() {
    return (
      <Dialog
        title="Are you sure you want to delete the transaction?"
        open={this.state.confirmationOpen}
        onClose={this.closeDetails}
        actions={(
          <React.Fragment>
            <Button ghost small onClick={this.cancelDeletion}>
              Cancel
            </Button>
            <Button small onClick={this.handleDeletion}>
              Yes, I want to delete it
            </Button>
          </React.Fragment>
        )}
      >
        <p>This cannot be undone.</p>
      </Dialog>
    )
  }

  render() {
    const { total, transactions } = this.props

    return (
      <Scene size={1040}>
        {this.renderConfirmationModal()}
        {this.renderDetailsModal()}
        {transactions.length ? (
          <DataTable
            columns={columns}
            data={transactions}
            onClickRow={this.openDetails}
            onSort={this.handleSort}
          >
            {TransactionItem}
          </DataTable>
        ) : (
          <div>
            <p>
              There are no transactions to show.
            </p>
            <Link to="/new">
              <Button small>Try adding one</Button>
            </Link>
          </div>
        )}
        <Pagination
          active={this.state.page}
          total={Math.ceil(total / 8)}
          onChange={this.handlePageChange}
        />
      </Scene>
    )
  }
}

export default compose(
  withPermission,
  connect(
    state => ({
      transactions: getTransactions(state),
      total: getTotalCount(state),
    }),
    dispatch => bindActionCreators({
      loadTransactions,
      deleteTransaction,
    }, dispatch)
  )
)(TransactionList)
