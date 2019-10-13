/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import withStyles from '@material-ui/core/styles/withStyles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'

import { loginAuth } from '../../redux/actions/authenticationActions'
import coreService from '../../services/coreService'

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Senha minima de 6 caracteres')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\W+)/, {
      message: 'A senha deve conter maiúsculas e minúsculas e caracteres especiais',
    })
    .required('Obrigatório'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Senha de confirmação é diferente',
  ).required('Obrigatório'),
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

class PasswordForm extends Component {
  state = {
    open: false,
    message: '',
    loading: false,
    showPassword: false,
    showPasswordConfirm: false,
  }

  timeControl = () => new Promise(resolve => setTimeout(() => resolve(true), 2300))

  handleResetPassword = async (password, password_confirmation) => {
    try {
      this.setState({ loading: true })
      const { match, history } = this.props
      const requestData = {
        password,
        password_confirmation,
        token: match.params.token,
      }
      const { data } = await coreService.postResetPassword(requestData)
      this.setState({
        open: true,
        message: data.message,
      })
      await this.timeControl()
      this.setState({ loading: false })
      history.push('/login')
    } catch (error) {
      this.setState({
        open: true,
        loading: false,
        message: error.message || 'Erro ao alterar senha, tente recuperar novamente.',
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  handleClickShowPasswordConfirm = () => {
    const { showPasswordConfirm } = this.state
    this.setState({ showPasswordConfirm: !showPasswordConfirm })
  }

  render() {
    const {
      message,
      open,
      loading,
      showPassword,
      showPasswordConfirm,
    } = this.state
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Atualizar Senha
          </Typography>
          <Formik
            initialValues={{ password: '', passwordConfirm: '' }}
            onSubmit={({ password, passwordConfirm }, actions) => {
              this.handleResetPassword(password, passwordConfirm)
              actions.setSubmitting(false)
            }}
            validationSchema={LoginSchema}
            render={props => (
              <form onSubmit={props.handleSubmit} className={classes.form}>
                <FormControl
                  margin="normal"
                  fullWidth
                  error={Boolean(props.errors.password)}
                >
                  <InputLabel htmlFor="password">Nova Senha</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    autoFocus
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Visualizar senha"
                          onClick={this.handleClickShowPassword}
                        >
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                  {props.errors.password
                    && <FormHelperText id="component-error-text">{props.errors.password}</FormHelperText>
                  }
                </FormControl>
                <FormControl
                  margin="normal"
                  fullWidth
                  error={Boolean(props.errors.passwordConfirm)}
                >
                  <InputLabel htmlFor="password">Confirmar Senha</InputLabel>
                  <Input
                    id="passwordConfirm"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    name="passwordConfirm"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.passwordConfirm}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Visualizar senha"
                          onClick={this.handleClickShowPasswordConfirm}
                        >
                          {!showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                  {props.errors.passwordConfirm
                    && <FormHelperText id="component-error-text">{props.errors.passwordConfirm}</FormHelperText>
                  }
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {loading ? 'Aguarde...' : 'Atualizar senha'}
                </Button>
              </form>
            )
            }
          />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
          />
        </Paper>
      </div>
    )
  }
}

PasswordForm.propTypes = {
  loginApp: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  authentication: state.authentication.isAuthenticated,
  authError: state.authentication.error,
})

const mapPropToDispatch = dispatch => bindActionCreators({ loginApp: loginAuth }, dispatch)

const LoginStyle = withStyles(styles)(PasswordForm)

export default connect(mapStateToProps, mapPropToDispatch)(LoginStyle)
