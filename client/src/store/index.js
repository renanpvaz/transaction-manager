import uiReducer from './ui'
import authReducer from './auth'
import transactionReducer from './transaction'

export default {
  ui: uiReducer,
  auth: authReducer,
  transaction: transactionReducer,
}
