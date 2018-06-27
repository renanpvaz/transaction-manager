import sinon from 'sinon'
import { showAlert, alertAdded, alertRemoved } from '../../store/ui/actions'

jest.useFakeTimers()

describe('thunks', () => {
  describe('showAlert', () => {
    it('should hide after 5 seconds', () => {
      const getState = () => ({ ui: { alerts: [] } })

      showAlert({})(() => {}, getState)

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
    })

    it('should dispatch `alertAdded` with the given alert', () => {
      const alert = { message: 'test' }
      const getState = () => ({ ui: { alerts: [{}, alert] } })

      const dispatch = jest.fn()

      showAlert(alert)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(alertAdded(alert))
    })

    it('should dispatch `alertAdded` and `alertRemoved`', () => {
      const alert = { message: 'test' }
      const getState = () => ({ ui: { alerts: [{}, alert] } })

      const dispatch = jest.fn()

      showAlert(alert)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(alertAdded(alert))

      jest.runAllTimers()

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenLastCalledWith(alertRemoved(1))
    })
  })
})
