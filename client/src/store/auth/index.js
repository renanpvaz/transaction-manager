import { handleActions } from 'redux-actions'

import permissions from '../../permissions'

import { userLogged, userLoggedOff, errorHappened } from './actions'

const initialState = {
  logged: false,
  user: {},
  error: '',
}

const reducer = handleActions({
  [userLogged]: (state, action) => ({
    logged: true,
    user: action.payload,
    error: '',
  }),
  [userLoggedOff]: (state, action) => ({
    logged: false,
    user: {},
  }),
  [errorHappened]: (state, action) => ({
    logged: false,
    error: action.payload,
  }),
}, initialState)

export const isLogged = state => state.auth.logged
export const getUser = state => state.auth.user
export const getError = state => state.auth.error
export const getPermissions = state => {
  const { profiles } = getUser(state)

  return profiles
    ? profiles.reduce((acc, profile) => [...acc, ...permissions[profile]], [])
    : []
}

export default reducer
