import React from 'react'

import './select'

const Select = ({ value, onChange, children }) => (
  <select className="select">
    {children}
  </select>
)

export default Select
