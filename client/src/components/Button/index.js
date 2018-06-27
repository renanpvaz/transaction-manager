import React from 'react'
import cn from 'classnames'
// import { Link } from 'react-router-dom'

import './button.css'

const Button = ({
  children,
  to,
  href,
  fit,
  small,
  ghost,
  disabled,
  onClick,
  type = 'button',
  form,
}) => {
  const isSubmit = type === 'submit'
  const Tag = isSubmit ? 'input' : 'button'

  return (
    <Tag
      form={form}
      type={type}
      onClick={onClick}
      to={to}
      href={href}
      disabled={disabled}
      className={cn(
        'button',
        small && 'button--small',
        fit && 'button--fit',
        ghost && 'button--ghost',
      )}
      value={children}
      >
      {isSubmit ? null : children}
    </Tag>
  )
}

export default Button
