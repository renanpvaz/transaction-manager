import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

import API from '../../api'

const userLogged = createAction('USER_LOGGED')
const userLoggedOff = createAction('USER_LOGGED_OFF')
const errorHappened = createAction('ERROR_HAPPENED')

const login = credentials =>  async (dispatch, getState) => {
  try {
    const result = await API.login(credentials)

    dispatch(userLogged(result))
    dispatch(push(getState().router.location.state.from.pathname))
  } catch (e) {
    dispatch(errorHappened('Invalid username or password'))
  }
}

export {
  userLogged,
  userLoggedOff,
  login,
  errorHappened,
}
