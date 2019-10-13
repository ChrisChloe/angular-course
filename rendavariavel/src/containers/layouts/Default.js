/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import teal from '@material-ui/core/colors/teal'

const themeApp = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    useNextVariants: true,
  },
  imgFluid: {
    maxWidth: '100%',
    display: 'block',
    height: 'auto',
  },
})

const styles = theme => ({
  '@global': {
    body: {
      backgroundImage: 'url("/images/wallpaper-1.jpg")',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
    // backgroundImage: 'url("http://www.lollcpa.com/images/background/bg04.jpg")',
    // backgroundSize: 'cover',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  menu: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  footer: {
    display: 'flex',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  footerBrand: {
    color: '#333',
    fontWeight: 300,
    fontSize: 13,
  },
  registerBtn: {
    color: '#fff',
    textDecoration: 'underline',
  },
  imageSize: {
    width: 160,
  },
})

class DefaultLayout extends Component {
  state = {
    mobileMoreAnchorEl: null,
  }

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  render() {
    const { children, classes } = this.props
    const { mobileMoreAnchorEl } = this.state
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    return (
      <main className={classes.root}>
        <CssBaseline />
        <MuiThemeProvider theme={themeApp}>
          <AppBar
            position="static"
            elevation={0}
            color="primary"
          >
            <Toolbar>
              <div className={classes.grow}>
                <img
                  src="/images/logo-thibnk-crop.png"
                  alt="Renda Variável"
                  className={classNames(classes.imgFluid, classes.imageSize)}
                />
              </div>
              <div className={classes.menu}>
                <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/cadastro" color="inherit">Cadastro</Button>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
          >
            <MenuItem component={Link} onClick={this.handleMobileMenuClose} to="login">
              <p>Login</p>
            </MenuItem>
            <MenuItem component={Link} onClick={this.handleMobileMenuClose} to="cadastro">
              <p>Cadastro</p>
            </MenuItem>
          </Menu>
          {children}
          <footer className={classes.footer}>
            <Typography variant="h6" color="inherit" className={classes.footerBrand}>
              <Button
                component={Link}
                to="/cadastro"
                color="inherit"
                className={classes.registerBtn}
              >
                Não é cadastrado? Cadastre-se.
              </Button>
            </Typography>
            <span style={{
              position: 'fixed', bottom: '5px', right: '5px', fontSize: '13px', color: '#9e9e9e',
            }}
            >
V 2019.3.7-18

            </span>
            {/* <Typography variant="h6" color="inherit" className={classes.footerBrand}>
            Desenvolvido por Mangue3
          </Typography> */}
          </footer>
        </MuiThemeProvider>
      </main>
    )
  }
}

DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(DefaultLayout)
