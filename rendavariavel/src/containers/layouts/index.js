/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import teal from '@material-ui/core/colors/teal'

import { logout } from '../../redux/actions/authenticationActions'
import { DrawerNavigation } from '../../components'
import PusherService from '../../services/pusherService'

const drawerWidth = 240

const themeApp = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    useNextVariants: true,
  },
})

const styles = theme => ({
  '@global': {
    body: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: '100%',
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class Dashboard extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    badgeValue: 0,
    messages: [],
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleCloseApp = () => {
    const { logoutApp } = this.props
    logoutApp()
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  renderMenu = (isMenuOpen) => {
    const { anchorEl } = this.state
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem
          component={Link}
          to="/usuario/cadastro"
          onClick={this.handleMenuClose}
        >
          Minha Conta
        </MenuItem>
        <MenuItem onClick={this.handleCloseApp}>Sair</MenuItem>
      </Menu>
    )
  }

  namePageSwitch = (type) => {
    switch (type) {
      case '/usuario/cadastro':
        return 'Perfil'
      case '/dashboard':
        return 'Dashboard'
      case '/imposto-renda':
        return 'Imposto de Renda'
      case '/planos':
        return 'Painel de Planos'
      case '/acoes':
        return 'Carteira de Ativos'
      case '/taxa-corretora':
        return 'Taxa das corretoras'
      default:
        return ''
    }
  }

  async testPusher() {
    const test = await PusherService.test()
    if (test) { this.setState({ badgeValue: this.state.badgeValue += 1 }) }
  }

  render() {
    const { classes, children, match } = this.props
    const { open, anchorEl, badgeValue } = this.state
    const isMenuOpen = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MuiThemeProvider theme={themeApp}>
          <AppBar
            elevation={0}
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                align="left"
                className={classes.title}
              >
                {this.namePageSwitch(match.url)}
              </Typography>
              <IconButton onClick={() => this.testPusher()} color="inherit">
                <Badge badgeContent={badgeValue} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          {this.renderMenu(isMenuOpen)}
          <DrawerNavigation
            open={open}
            match={match}
            handleDrawerClose={this.handleDrawerClose}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </MuiThemeProvider>
        <span style={{
          position: 'fixed', bottom: '5px', right: '5px', fontSize: '13px', color: '#9e9e9e',
        }}
        >
V 2019.3.7-18

        </span>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  logoutApp: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const DashboardStyle = withStyles(styles)(Dashboard)

const mapStateToProps = state => ({
  authentication: state.authentication.isAuthenticated,
  authError: state.authentication.error,
})

const mapPropToDispatch = dispatch => bindActionCreators({ logoutApp: logout }, dispatch)

export default connect(mapStateToProps, mapPropToDispatch)(DashboardStyle)
