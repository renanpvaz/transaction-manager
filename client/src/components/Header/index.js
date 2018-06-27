import React from 'react'

import Logo from '../Logo'

import './header.css'

const Header = () => (
  <header className="header">
    <Logo />
    <nav role="navigation">
      <a className="header__item" href="/login">Login</a>
    </nav>
  </header>
)

export default Header
