import { handleActions } from 'redux-actions'

import { sidebarToggled, alertAdded, alertRemoved, } from './actions'

const initialState = {
  sidebarOpen: true,
  alerts: [],
}

const reducer = handleActions({
  [sidebarToggled]: state => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  }),
  [alertAdded]: (state, action) => ({
    ...state,
    alerts: [
      ...state.alerts,
      action.payload,
    ],
  }),
  [alertRemoved]: (state, action) => ({
    ...state,
    alerts: state.alerts.map(
      (alert, i) => i === action.payload
        ? ({ ...alert, removed: true })
        : alert
    ),
  }),
}, initialState)

export const isSidebarOpen = state => state.ui.sidebarOpen
export const getAlerts = state => state.ui.alerts

export default reducer
