/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LinkButton from '@material-ui/core/Link'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { loginAuth, isLoggedIn } from '../../redux/actions/authenticationActions'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email('E-mail inválido')
    .required('Obrigatório'),
  password: Yup.string()
    .min(6, 'Senha minima de 6 caracteres')
    .required('Obrigatório'),
})

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  recoverPassword: {
    marginTop: '0.8em',
    marginBottom: '1.2em',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: '#FFFFFF',
    fontWeight: 500,
  },
  paper: {
    marginTop: theme.spacing.unit,
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

class Login extends Component {
  state = {
    open: false,
    message: '',
    redirect: false,
    loading: false,
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.setState({ redirect: true })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      message, open, redirect, loading,
    } = this.state
    const { classes, history, loginApp } = this.props

    if (redirect) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={({ username, password }, actions) => {
              this.setState({ loading: true })
              loginApp(username, password)
                .then(() => {
                  this.setState({ loading: false })
                  history.push('/')
                }).catch((error) => {
                  console.log(error)
                  if (error.error === 'invalid_credentials') {
                    this.setState({ loading: false })
                    this.setState({ open: true, message: 'E-mail e/ou senha incorretos' })
                  } else {
                    this.setState({ loading: false })
                    this.setState({ open: true, message: error.message || 'Não foi possível fazer login, tente mais tarde.' })
                  }   
                })
              actions.setSubmitting(false)
            }}
            validationSchema={LoginSchema}
            render={props => (
              <form onSubmit={props.handleSubmit} className={classes.form}>
                <FormControl
                  margin="normal"
                  fullWidth
                  error={Boolean(props.errors.username)}
                >
                  <InputLabel htmlFor="username">E-mail</InputLabel>
                  <Input
                    id="username"
                    type="email"
                    name="username"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    autoComplete="email"
                  />
                  {props.errors.username
                    && <FormHelperText id="component-error-text">{props.errors.username}</FormHelperText>
                  }
                </FormControl>
                <FormControl
                  margin="normal"
                  fullWidth
                  error={Boolean(props.errors.password)}
                >
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    id="password"
                    autoComplete="current-password"
                  />
                  {props.errors.password
                    && <FormHelperText id="component-error-text">{props.errors.password}</FormHelperText>
                  }
                </FormControl>
                {/* <Typography variant="caption" component="p" color="inherit">
                  Esqueci a senha
                </Typography> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                >
                  {loading ? 'Aguarde...' : 'Entrar'}
                </Button>
              </form>
            )
            }
          />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={2200}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
          />
        </Paper>
        <LinkButton component={Link} className={classes.recoverPassword} to="recuperar-senha">
          Esqueceu a senha?
        </LinkButton>
      </div>
    )
  }
}

Login.propTypes = {
  loginApp: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  authentication: state.authentication.isAuthenticated,
  authError: state.authentication.error,
})

const mapPropToDispatch = dispatch => bindActionCreators({ loginApp: loginAuth }, dispatch)

const LoginStyle = withStyles(styles)(Login)

export default connect(mapStateToProps, mapPropToDispatch)(LoginStyle)
