/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListAltIcon from '@material-ui/icons/ListAlt'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import TrendingUp from '@material-ui/icons/TrendingUp'
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS'
import teal from '@material-ui/core/colors/teal'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#ffffff',
      contrastText: teal,
    },
  },
  typography: {
    useNextVariants: true,
  },
})

const MainListItems = ({
  match,
  handleDrawerClose,
  classes,
}) => (
  <MuiThemeProvider theme={theme}>
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard"
        onClick={handleDrawerClose}
        selected={match.url === '/dashboard'}
      >
        <ListItemIcon>
          <DashboardIcon color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component={Link}
        onClick={handleDrawerClose}
        to="/usuario/cadastro"
        selected={match.url === '/usuario/cadastro'}
      >
        <ListItemIcon>
          <AccountCircleIcon color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Perfil" />
      </ListItem>
      <ListItem
        button
        component={Link}
        onClick={handleDrawerClose}
        to="/imposto-renda"
        selected={match.url === '/imposto-renda'}
      >
        <ListItemIcon>
          <ListAltIcon color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Imposto de Renda" />
      </ListItem>
      <ListItem
        button
        component={Link}
        onClick={handleDrawerClose}
        to="/acoes"
        selected={match.url === '/acoes'}
      >
        <ListItemIcon>
          <TrendingUp color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Ações" />
      </ListItem>
      <ListItem
        button
        component={Link}
        onClick={handleDrawerClose}
        to="/planos"
        style={{ color: '#fff' }}
        selected={match.url === 'planos'}
      >
        <ListItemIcon>
          <CreditCardIcon color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Painel de Planos" />
      </ListItem>
      <ListItem
        button
        component={Link}
        onClick={handleDrawerClose}
        to="/taxa-corretora"
        style={{ color: '#fff' }}
        selected={match.url === 'taxa-corretora'}
      >
        <ListItemIcon>
          <StrikethroughSIcon color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} primary="Taxa das corretoras" />
      </ListItem>
      {/* <ListItem button>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Notificação" />
        </ListItem> */}
    </List>
  </MuiThemeProvider>
)

MainListItems.propTypes = {
  match: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
}

export { MainListItems }
