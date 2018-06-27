import {
  sidebarToggled,
  alertAdded,
  alertRemoved,
} from '../../store/ui/actions'

import reducer from '../../store/ui'

describe('reducer', () => {
  describe('sidebarToggled', () => {
    it('should set the sidebar open when it\'s closed and vice versa', () => {
      expect(reducer({ sidebarOpen: true }, sidebarToggled()))
        .toHaveProperty('sidebarOpen', false)

      expect(reducer({ sidebarOpen: false }, sidebarToggled()))
        .toHaveProperty('sidebarOpen', true)
    })
  })

  describe('alertAdded', () => {
    it('should append the alert along with the others', () => {
      const newAlert = { message: 'testing' }
      const state = {
        alerts: [{}, {}]
      }
      const newState = reducer(state, alertAdded(newAlert))

      expect(newState).toHaveProperty('alerts.2', newAlert)
    })
  })

  describe('alertRemoved', () => {
    it('should set the alert at given index to `removed`', () => {
      const index = 1
      const state = {
        alerts: [{}, {}]
      }
      const newState = reducer(state, alertRemoved(index))

      expect(newState.alerts[index]).toHaveProperty('removed', true)
    })
  })
})
