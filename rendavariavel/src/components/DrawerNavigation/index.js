/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import teal from '@material-ui/core/colors/teal'

import { MainListItems } from './listItems'

const drawerWidth = 240

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
  imgFluid: {
    maxWidth: '100%',
    display: 'block',
    height: 'auto',
  },
})

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.primary.main,
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
    display: 'none',
    // width: theme.spacing.unit * 7,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing.unit * 9,
    // },
  },
  toolbarIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  logo: {
    textTransform: 'uppercase',
  },
  primary: {
    color: '#fff',
  },
  imageSize: {
    width: 160,
  },
})

const DrawerNavigation = ({
  open,
  handleDrawerClose,
  classes,
  match,
}) => (
  <MuiThemeProvider theme={theme}>
    <Drawer
      variant="temporary"
      onClose={handleDrawerClose}
      classes={{
        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      style={{ backgroundColor: teal }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <img
          src="/images/logo-thibnk-crop.png"
          alt="Renda Variável"
          className={classNames(classes.imgFluid, classes.imageSize)}
        />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </div>
      <Divider />
      <MainListItems
        match={match}
        handleDrawerClose={handleDrawerClose}
        classes={classes}
      />
    </Drawer>
  </MuiThemeProvider>
)
DrawerNavigation.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withStyles(styles)(DrawerNavigation)
