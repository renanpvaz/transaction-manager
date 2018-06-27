import React from 'react'
import { Link } from 'react-router-dom'

import './link.css'

export default ({
  to,
  href,
  children,
  className
}) => {
  const Tag = to ? Link : 'a'

  return (
    <Tag className={`link ${className}`} to={to} href={href}>
      {children}
    </Tag>
  )
}
