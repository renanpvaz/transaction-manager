import {
  userLogged,
  userLoggedOff,
  errorHappened,
} from '../../store/auth/actions'

import reducer from '../../store/auth'

describe('reducer', () => {
  it('should set the user and toggle the logged flag on login', () => {
    const state = {
      logged: false,
      user: {},
      error: '',
    }
    const user = { username: 'test' }

    const newState = reducer(state, userLogged(user))

    expect(newState).toEqual(
      expect.objectContaining({
        user,
        logged: true
      })
    )
  })

  it('should set the user to an empty object and `logged` to false on logoff', () => {
    const state = {
      logged: true,
      user: { username: 'test' },
      error: '',
    }
    const newState = reducer(state, userLoggedOff())

    expect(newState).toEqual(
      expect.objectContaining({
        user: {},
        logged: false
      })
    )
  })

  it('should logoff the user and set the error on error', () => {
    const state = {
      logged: false,
      user: {},
      error: '',
    }
    const error = 'test error'
    const newState = reducer(state, errorHappened(error))

    expect(newState).toEqual(
      expect.objectContaining({
        error: error,
        logged: false
      })
    )
  })
})
