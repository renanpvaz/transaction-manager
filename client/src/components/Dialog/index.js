import React from 'react'

import Flex from '../Flex'
import Modal from '../Modal'

import './dialog.css'

const Dialog = ({ title, children, actions, ...rest }) => (
  <Modal
    className="dialog"
    {...rest}
  >
    <h6>{title}</h6>
    {children}
    <Flex
      tag="footer"
      className="dialog__footer"
      justify="end"
    >
      {actions}
    </Flex>
  </Modal>
)

export default Dialog
