import './main.css'

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch, Redirect } from 'react-router'

import App from './containers/App'
import ProtectedRoute from './containers/ProtectedRoute'
import Login from './scenes/Login'
import Home from './scenes/Home'
import NewTransaction from './scenes/NewTransaction'
import EditTransaction from './scenes/EditTransaction'
import TransactionList from './scenes/TransactionList'

import reducer from './store'

const history = createHistory()

const store = createStore(
  combineReducers({
    ...reducer,
    router: routerReducer,
  }),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    logger,
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App>
          <Redirect exact from="/" to="/home" component={Login} />
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute path="/new" component={NewTransaction} />
          <ProtectedRoute path="/edit/:id" component={EditTransaction} />
          <ProtectedRoute path="/list" component={TransactionList} />
        </App>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
