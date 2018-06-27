import http from './utils/http'
import buildQueryString from './utils/build-query-string'

const BASE = `http://${location.hostname}:3005`
const TRANSACTIONS = `${BASE}/transactions`
const LOGIN = `${BASE}/login`

export default {
  getTransactions: query => fetch(`${TRANSACTIONS}${buildQueryString(query)}`),
  saveTransaction: data => http.post(TRANSACTIONS, { data }),
  updateTransaction: data => http.put(`${TRANSACTIONS}/${data.id}`, { data }),
  deleteTransaction: id => http.delete(`${TRANSACTIONS}/${id}`),
  login: data => http.post(LOGIN, { data }),
}
