/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import RegisterOneForm from '../../components/Register/RegisterOneForm'
import coreService from '../../services/coreService'
import authenticationService from '../../services/authenticationService'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

class Register extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    password: '',
    cei_password: '',
    phone: '',
    defaultValue: {},
    addressData: {},
  }

  handleRegister = async (values) => {
    const { history } = this.props
    try {
      const { data } = await authenticationService.postRegister(values)
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  handleGetAddress = async (cep, values) => {
    try {
      const { data } = await coreService.getAddress(cep)
      this.setState({ addressData: data, defaultValue: values })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  render() {
    const { classes } = this.props
    const { addressData, defaultValue } = this.state
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <RegisterOneForm
            addressResource={addressData}
            defaultValue={defaultValue}
            handleRegister={this.handleRegister}
            handleGetAddress={this.handleGetAddress}
          />
        </Paper>
      </main>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(styles)(Register)
