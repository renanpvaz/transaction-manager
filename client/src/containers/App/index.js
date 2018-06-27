import React from 'react'
import { connect } from 'react-redux'

const App = ({ children }) => (
  <main>
    {children}
  </main>
)

export default connect(
  state => ({ router: state.router })
)(App)
