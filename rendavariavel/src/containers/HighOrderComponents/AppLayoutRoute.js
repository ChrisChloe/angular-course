import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from '../layouts'

const AppLayoutRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      auth.isAuthenticated === true
        ? (
          <AppLayout {...matchProps}>
            <Component {...matchProps} />
          </AppLayout>
        )
        : (
          <Redirect
            to="/login"
          />
        )
    )}
  />
)

const mapStateToProps = state => ({
  auth: state.authentication,
})

export default connect(mapStateToProps)(AppLayoutRoute)
