import API from '../../api'
import {
  login,
  userLogged,
  userLoggedOff,
  errorHappened,
} from '../../store/auth/actions'

jest.mock('../../api')

const getState = () => ({ router: { location: { state: { from: {} } } } })

describe('thunks', () => {
  beforeEach(() => jest.resetAllMocks())

  describe('login', () => {
    it('should dispatch user data once user logs in', async () => {
      const dispatch = jest.fn()
      const result = {}

      API.login.mockResolvedValue(Promise.resolve(result))

      await login({})(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith(userLogged(result))
    })

    it('should dispatch an error action if any error happens', async () => {
      const dispatch = jest.fn()
      const result = {}

      API.login.mockImplementation(() => {
        throw new Error()
      })

      await login({})(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: errorHappened().type })
      )
    })
  })
})
