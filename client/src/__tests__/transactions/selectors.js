import { getTransaction } from '../../store/transaction'

describe('selectors', () => {
  describe('getTransaction', () => {
    it('should get the transaction for the given id', () => {
      const transaction = { id: 10 }
      const state = {
        transaction: {
          transactions: [transaction]
        }
      }

      expect(getTransaction(state, 10)).toEqual(transaction)
    })
  })
})
