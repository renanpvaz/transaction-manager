import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

import API from '../../api'
import toISODate from '../../utils/to-iso-date'

import { showAlert } from '../ui/actions'

const transactionsLoaded = createAction('TRANSACTIONS_LOADED')
const transactionLoaded = createAction('TRANSACTION_LOADED')
const dailyTotalUpdated = createAction('DAILY_TOTAL_UPDATED')
const thirtyDaysTotalUpdated = createAction('30_DAYS_TOTAL_UPDATED')

const loadTransactions = ({ page = 1, ...rest }) => dispatch => API
  .getTransactions({ _page: page, _limit: 8, ...rest })
  .then(async res =>
    transactionsLoaded({
      totalCount: parseInt(res.headers.get('x-total-count')),
      transactions: await res.json()
    })
  )
  .then(dispatch)

const loadTransaction = id => dispatch => API
  .getTransactions({ id: id })
  .then(res => res.json())
  .then(transactionLoaded)
  .then(dispatch)

const saveTransaction = transaction => dispatch => API
  .saveTransaction(transaction)
  .then(() => {
    dispatch(showAlert({ message: 'Transaction successfully added.' }))
    dispatch(push('/list'))
  })

const updateTransaction = transaction => dispatch => API
  .updateTransaction(transaction)
  .then(() => showAlert({ message: 'Transaction successfully updated.' }))
  .then(dispatch)

const deleteTransaction = id => dispatch => API
  .deleteTransaction(id)
  .then(() => dispatch(showAlert({ message: 'Transaction deleted.' })))

const sumTransactions = transactions =>
  transactions.reduce((acc, t) => acc + parseFloat(t.amount), 0)

const calculateDailyTotal = () => async dispatch => {
  const transactions = await API
    .getTransactions({ date: toISODate(new Date()) })
    .then(res => res.json())

  dispatch(dailyTotalUpdated(sumTransactions(transactions)))
}

const calculateLast30DaysTotal = () => async dispatch => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))

  const transactions = await API
    .getTransactions({ date_gte: toISODate(thirtyDaysAgo) })
    .then(res => res.json())

  dispatch(thirtyDaysTotalUpdated(sumTransactions(transactions)))
}

export {
  loadTransactions,
  loadTransaction,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  transactionsLoaded,
  transactionLoaded,
  dailyTotalUpdated,
  calculateDailyTotal,
  calculateLast30DaysTotal,
  thirtyDaysTotalUpdated,
}
