import React from 'react'

const TypeIcon = ({ type }) =>
  <i className="">
    {type === 'MONEY' ? '💵' : '💳'}
  </i>

export default TypeIcon
