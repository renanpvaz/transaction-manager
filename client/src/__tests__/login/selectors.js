import { getPermissions } from '../../store/auth'
import permissions from '../../permissions'

describe('selectors', () => {
  describe('getPermissions', () => {
    it('should get the permissions of the manager profile', () => {
      const state = {
        auth: {
          user: {
            profiles: ['Manager']
          }
        }
      }

      expect(getPermissions(state)).toEqual(permissions.Manager)
    })

    it('should get the permissions of the employee profile', () => {
      const state = {
        auth: {
          user: {
            profiles: ['Employee']
          }
        }
      }

      expect(getPermissions(state)).toEqual(permissions.Employee)
    })

    it('should default to an empty list', () => {
      const state = {
        auth: {
          user: {}
        }
      }

      expect(getPermissions(state)).toEqual([])
    })
  })
})
