import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getError } from '../../store/auth'
import { login } from '../../store/auth/actions'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Field from '../../components/Field'
import Button from '../../components/Button'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleFormChange = ({ target }) =>
    this.setState({ [target.name]: target.value })

  handleSubmition = e => {
    e.preventDefault()
    this.props.login(this.state)
  }


  render() {
    return (
      <div>
        <Header />
        <Container size="sm">
          <h1>Log In</h1>
          {this.props.error && (
            <p>{this.props.error}</p>
          )}
          <form id="login" onSubmit={this.handleSubmition}>
            <Field
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleFormChange}
              required
            />
            <Field
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleFormChange}
              required
            />
            <Button form="login" type="submit">Continue</Button>
          </form>
        </Container>
      </div>
    )
  }
}

export default connect(
  state => ({
    error: getError(state),
  }),
  dispatch => bindActionCreators({
    login,
  }, dispatch)
)(Login)
