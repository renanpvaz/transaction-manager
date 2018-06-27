import React from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'

import './modal.css'

class Modal extends React.Component {
  render() {
    const { open, onClose } = this.props

    return ReactDOM.createPortal(
      <div className={cn('modal', open && 'modal--open')}>
        <div className="modal__backdrop" onClick={onClose} />
        <div className="modal__content">
          {this.props.children}
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  }
}

export default Modal
