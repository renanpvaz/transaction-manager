import { createAction } from 'redux-actions'

const sidebarToggled = createAction('SIDEBAR_TOGGLED')
const alertAdded = createAction('ALERT_ADDED')
const alertRemoved = createAction('ALERT_REMOVED')

const showAlert = alert => (dispatch, getState) => {
  dispatch(alertAdded(alert))
  setTimeout(
    () => dispatch(
      alertRemoved(getState().ui.alerts.indexOf(alert))
    ), 1000 * 5
  )
}

export {
  sidebarToggled,
  alertAdded,
  alertRemoved,
  showAlert,
}
