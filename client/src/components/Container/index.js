import React from 'react'

import './container.css'

const Container = ({ children, size = 'md', padding }) => (
  <div
    className={`container container--${size}`}
    style={{ padding }}
  >
    {children}
  </div>
)

export default Container
