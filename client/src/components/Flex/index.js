import React from 'react'
import cn from 'classnames'

import './flex.css'

const Flex = ({
  tag: Tag = 'div',
  className,
  children,
  direction,
  items,
  self,
  justify,
  wrap,
  auto,
  style,
}) => (
  <Tag
    className={cn(
      className,
      'flex',
      direction && `flex-${direction}`,
      items && `items-${items}`,
      self && `self-${self}`,
      justify && `justify-${justify}`,
      wrap && 'flex-wrap',
      auto && 'flex-auto',
    )}
    style={style}
  >
    {children}
  </Tag>
)

export default Flex
