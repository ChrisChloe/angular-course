import React from 'react'
import { Route } from 'react-router-dom'
import DefaultLayout from '../layouts/Default'

const DefaultLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <DefaultLayout>
        <Component {...matchProps} />
      </DefaultLayout>
    )}
  />
)

export default DefaultLayoutRoute
