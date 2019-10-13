
import React from 'react'
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom'

import { AppLayoutRoute, DefaultLayoutRoute } from '../containers/HighOrderComponents'
import Login from '../containers/Login'
// import Register from '../containers/Register'
import { ManageUser } from '../containers/User'
import IR from '../containers/IR'
import Dashboard from '../containers/Dashboard'
import Plan from '../containers/Plan'
import PageNotFound from '../containers/PageNotFound'
import RegisterOne from '../containers/Register/stepper'
import Share from '../containers/Share'
import BrokerageFee from '../containers/BrokerageFee'
import { EmailForm, PasswordForm } from '../containers/RecoverPassword'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="dashboard" />
      </Route>
      <DefaultLayoutRoute path="/login" component={Login} />
      <DefaultLayoutRoute path="/cadastro" component={RegisterOne} />
      <DefaultLayoutRoute path="/recuperar-senha" component={EmailForm} />
      <DefaultLayoutRoute path="/atualizar-senha/:token?" component={PasswordForm} />
      <AppLayoutRoute path="/usuario/cadastro/:id?" component={ManageUser} />
      <AppLayoutRoute path="/dashboard" component={Dashboard} />
      <AppLayoutRoute path="/imposto-renda" component={IR} />
      <AppLayoutRoute path="/planos" component={Plan} />
      <AppLayoutRoute path="/acoes" component={Share} />
      <AppLayoutRoute path="/taxa-corretora" component={BrokerageFee} />
      <AppLayoutRoute path="*" component={PageNotFound} />
    </Switch>
  </BrowserRouter>
)
