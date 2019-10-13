/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react'
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
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'

import { loginAuth } from '../../redux/actions/authenticationActions'
import coreService from '../../services/coreService'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email('E-mail inválido')
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

class EmailForm extends Component {
  state = {
    open: false,
    message: '',
    loading: false,
    sendEmail: false,
  }

  handleEmailSubmit = async (username) => {
    try {
      this.setState({ loading: true })
      const { data } = await coreService.postRecoverPassword(username)
      this.setState({
        open: true,
        sendEmail: true,
        message: data.message,
      })
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      if (error.error) {
        this.setState({
          open: true,
          sendEmail: false,
          message: error.message,
        })
      } else {
        this.setState({
          open: true,
          sendEmail: false,
          message: 'Não foi possível enviar o e-mail.',
        })
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      message, open, loading, sendEmail,
    } = this.state
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          {!sendEmail ? (
            <Fragment>
              <Typography component="h1" variant="h5">
            Recuperar senha
              </Typography>
              <Formik
                initialValues={{ username: '' }}
                onSubmit={({ username }, actions) => {
                  this.handleEmailSubmit(username)
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
                        autoFocus
                      />
                      {props.errors.username
                    && <FormHelperText id="component-error-text">{props.errors.username}</FormHelperText>
                  }
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      className={classes.submit}
                    >
                      {loading ? 'Aguarde...' : 'Recuperar Senha'}
                    </Button>
                  </form>
                )
            }
              />
            </Fragment>
          ) : (
            <Fragment>
              <Typography component="h4" variant="h5">
              Foi enviado para seu e-mail um link para recuperação de senha.
              </Typography>
              <Typography variant="body1">
              Verifique seu e-mail.
              </Typography>
            </Fragment>
          )}
        </Paper>
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
      </div>
    )
  }
}

EmailForm.propTypes = {
  loginApp: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  authentication: state.authentication.isAuthenticated,
  authError: state.authentication.error,
})

const mapPropToDispatch = dispatch => bindActionCreators({ loginApp: loginAuth }, dispatch)

const LoginStyle = withStyles(styles)(EmailForm)

export default connect(mapStateToProps, mapPropToDispatch)(LoginStyle)
