import {
  transactionsLoaded,
  transactionLoaded,
  dailyTotalUpdated,
  thirtyDaysTotalUpdated,
} from '../../store/transaction/actions'

import reducer from '../../store/transaction'

describe('reducer', () => {
  describe('transactionsLoaded', () => {
    it('should add the transactions and the total to the state', () => {
      const state = {
        transactions: [],
        totalCount: 0,
      }
      const payload = {
        transactions: [{}],
        totalCount: 1,
      }
      const newState = reducer(state, transactionsLoaded(payload))

      expect(newState).toEqual(expect.objectContaining(payload))
    })
  })

  describe('transactionLoaded', () => {
    it('should append the new transaction', () => {
      const state = {
        transactions: [{}],
        totalCount: 0,
      }
      const payload = { description: 'new transaction' }
      const newState = reducer(state, transactionLoaded([payload]))

      expect(newState).toHaveProperty('transactions.1', payload)
    })
  })

  describe('dailyTotalUpdated', () => {
    it('should set the daily total', () => {
      const state = {}
      const total = 10
      const newState = reducer(state, dailyTotalUpdated(total))

      expect(newState).toHaveProperty('dailyTotal', total)
    })
  })

  describe('thirtyDaysTotalUpdated', () => {
    it('should set the total from the past 30 days', () => {
      const state = {}
      const total = 50
      const newState = reducer(state, thirtyDaysTotalUpdated(total))

      expect(newState).toHaveProperty('last30DaysTotal', total)
    })
  })
})
