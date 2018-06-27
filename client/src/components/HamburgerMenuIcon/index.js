import React from 'react'

import './hamburger-menu-icon.css'

const HamburgerMenuIcon = ({ onClick }) => (
  <button className="hamburger-menu-icon" onClick={onClick}>
    <svg width="100%" height="100%" viewBox="0 0 14 14" style={{ fill: 'currentcolor', display: 'block', width: 18, height: 18, }}>
      <path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z" />
    </svg>
  </button>
)

export default HamburgerMenuIcon
