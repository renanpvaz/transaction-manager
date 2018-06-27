import React from 'react'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const Currency = ({ children }) =>
  formatter.format(parseFloat(children))

export default Currency
