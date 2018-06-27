import React from 'react'
import cn from 'classnames'

import './alert.css'

const Alert = ({ message, error, removed }) => (
  <li className={cn(
      'alert',
      error && 'alert--error',
      removed && 'alert--removed'
    )}
  >
    {message}
  </li>
)

export default Alert
