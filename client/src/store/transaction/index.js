import { handleActions } from 'redux-actions'

import {
  transactionsLoaded,
  transactionLoaded,
  dailyTotalUpdated,
  thirtyDaysTotalUpdated,
} from './actions'

const initialState = {
  transactions: [],
  totalCount: 0,
  dailyTotal: 0,
  last30DaysTotal: 0,
}

const reducer = handleActions({
  [transactionsLoaded]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [transactionLoaded]: (state, action) => ({
    ...state,
    transactions: [
      ...state.transactions,
      action.payload[0]
    ]
  }),
  [dailyTotalUpdated]: (state, action) => ({
    ...state,
    dailyTotal: action.payload
  }),
  [thirtyDaysTotalUpdated]: (state, action) => ({
    ...state,
    last30DaysTotal: action.payload
  }),
}, initialState)

export const getTransactions = state => state.transaction.transactions
export const getTransaction = (state, id) => getTransactions(state).find(t => t.id == id)
export const getTotalCount = state => state.transaction.totalCount
export const getDailyTotal = state => state.transaction.dailyTotal
export const getLast30DaysTotal = state => state.transaction.last30DaysTotal

export default reducer
