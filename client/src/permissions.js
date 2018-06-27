const VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS'
const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS'
const EDIT_TRANSACTIONS = 'EDIT_TRANSACTIONS'
const DELETE_TRANSACTIONS = 'EDIT_TRANSACTIONS'

export {
  VIEW_TRANSACTIONS,
  ADD_TRANSACTIONS,
  EDIT_TRANSACTIONS,
  DELETE_TRANSACTIONS,
}
export default {
  Employee: [
    VIEW_TRANSACTIONS,
    ADD_TRANSACTIONS,
  ],
  Manager: [
    VIEW_TRANSACTIONS,
    ADD_TRANSACTIONS,
    EDIT_TRANSACTIONS,
    DELETE_TRANSACTIONS,
  ]
}