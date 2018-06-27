import API from '../../api'
import { showAlert } from '../../store/ui/actions'
import {
  loadTransactions,
  loadTransaction,
  transactionsLoaded,
  saveTransaction,
  updateTransaction,
  calculateDailyTotal,
  calculateLast30DaysTotal,
  thirtyDaysTotalUpdated,
  dailyTotalUpdated,
} from '../../store/transaction/actions'

import toISODate from '../../utils/to-iso-date'

jest.mock('../../api')

const makeFakeResponse = (data, headers) => Promise.resolve({
  headers,
  json: () => Promise.resolve(data)
})

const makeFakeAPIMethod = data => () =>
  makeFakeResponse(data).catch(e => { throw e })

describe('thunks', () => {
  beforeEach(() => jest.resetAllMocks())

  describe('loadTransactions', () => {
    it('should dispatch the action with the correct payload', () => {
      API.getTransactions.mockImplementation(() =>
        makeFakeResponse([], { get: () => 0 })
      )

      const dispatch = action => {
        expect(action.payload).toEqual({
          totalCount: 0,
          transactions: []
        })
      }

      loadTransactions({ page: 1 })(dispatch)
    })

    it('should use the x-total-count header', () => {
      API.getTransactions.mockImplementation(() =>
        makeFakeResponse([], {
          get: name => expect(name).toBe('x-total-count')
        })
      )

      loadTransactions({ page: 1 })(() => {})
    })

    it('should default to page 1 and limit 8', () => {
      API.getTransactions.mockImplementation(query => {
        expect(query).toEqual({ _page: 1, _limit: 8 })

        return makeFakeResponse([], { get: () => {} })
      })

      loadTransactions({})(() => {})
    })

    it('should send any other query params along with page and limit', () => {
      API.getTransactions.mockImplementation(query => {
        expect(query).toHaveProperty('testProperty', 30)

        return makeFakeResponse([], { get: () => {} })
      })

      loadTransactions({ testProperty: 30 })(() => {})
    })
  })

  describe('loadTransaction', () => {
    it('should call `getTransaction` with the given id', () => {
      const id = 1

      API.getTransactions.mockImplementation(params => {
        expect(params).toHaveProperty('id', id)

        return makeFakeResponse({})
      })

      loadTransaction(id)(() => {})
    })
  })

  describe('saveTransaction', () => {
    it('should call `saveTransaction` with the given transaction', async () => {
      const transaction = {}

      API.saveTransaction.mockImplementation(makeFakeResponse)

      await saveTransaction(transaction)(() => {})

      expect(API.saveTransaction).toHaveBeenCalledTimes(1)
      expect(API.saveTransaction).toHaveBeenCalledWith(transaction)
    })

    it('should dispatch two actions', async () => {
      const dispatch = jest.fn()

      API.saveTransaction.mockImplementation(makeFakeResponse)

      await saveTransaction()(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
    })
  })

  describe('updateTransaction', () => {
    it('should call `saveTransaction` with the given transaction', async () => {
      const transaction = { id: 1 }

      API.updateTransaction.mockImplementation(makeFakeResponse)

      await updateTransaction(transaction)(() => {})

      expect(API.updateTransaction).toHaveBeenCalledTimes(1)
      expect(API.updateTransaction).toHaveBeenCalledWith(transaction)
    })
  })

  describe('calculateDailyTotal', () => {
    it('should sum all of the transactions', () => {
      const transactions = [
        { amount: 100 },
        { amount: 200 },
      ]

      API.getTransactions.mockImplementation(
        makeFakeAPIMethod(transactions)
      )

      const dispatch = action => {
        expect(action).toEqual(dailyTotalUpdated(300))
      }

      calculateDailyTotal()(dispatch)
    })

    it('should default to zero', () => {
      API.getTransactions.mockImplementation(
        makeFakeAPIMethod([])
      )

      const dispatch = action => {
        expect(action).toEqual(dailyTotalUpdated(0))
      }

      calculateDailyTotal()(dispatch)
    })

    it('should call `getTransactions` with the current date', async () => {
      API.getTransactions.mockImplementation(({ date }) => {
        expect(date).toBe(toISODate(new Date()))

        return makeFakeResponse([])
      })

      await calculateDailyTotal()(() => {})
    })
  })

  describe('calculateLast30DaysTotal', () => {
    it('should call `getTransactions` with the date from 30 days ago', () => {
      const today = new Date()
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))

      API.getTransactions.mockImplementation(({ date_gte }) => {
        expect(date_gte).toBe(toISODate(thirtyDaysAgo))

        return makeFakeResponse([])
      })

      calculateLast30DaysTotal()(() => {})
    })

    it('should sum all of the transactions', () => {
      const transactions = [
        { amount: 2 },
        { amount: 2 },
      ]

      API.getTransactions.mockImplementation(
        makeFakeAPIMethod(transactions)
      )

      const dispatch = action => {
        expect(action).toEqual(thirtyDaysTotalUpdated(4))
      }

      calculateLast30DaysTotal()(dispatch)
    })

    it('should default to zero', () => {
      API.getTransactions.mockImplementation(
        makeFakeAPIMethod([])
      )

      const dispatch = action => {
        expect(action).toEqual(thirtyDaysTotalUpdated(0))
      }

      calculateLast30DaysTotal()(dispatch)
    })
  })
})
