import React from 'react'
// import { Field } from 'redux-form'

import './field.css'

const Field = ({
  label,
  name,
  component: Component = 'input',
  ...rest
}) => (
  <div className="field">
    <label className="field__label" htmlFor={name}>
      {label}
    </label>
    <Component
      className="field__input"
      name={name}
      {...rest}
    />
  </div>
)

export default Field
