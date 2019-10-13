import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'

import { RegisterServices } from '../../services/registerService'


const CeiSchema = Yup.object().shape({
  cei_password: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .required('Obrigatório'),
})

class CeiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisabled: true,
      loading: false,
      open: false,
      message: '',
      showPassword: false,
    }
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { initialValues, handleBack, handleSubmit } = this.props
    const {
      loading, open, message, isDisabled, showPassword,
    } = this.state

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Dados do Portal CEI
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={CeiSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit({ cei_password: values.cei_password })
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setValues,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                    >
                      <InputLabel htmlFor="cei_user">Usuário</InputLabel>
                      <Input
                        id="cei_user"
                        type="text"
                        name="cei_user"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cei_user}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.cei_password && touched.cei_password)}
                    >
                      <InputLabel htmlFor="cei_password">Senha Portal CEI</InputLabel>
                      <Input
                        id="cei_password"
                        type={!showPassword ? 'password' : 'text'}
                        name="cei_password"
                        onChange={handleChange}
                        onBlur={async (e) => {
                          handleChange(e)
                          handleBlur(e)
                          if (errors.cei_password === undefined && values.cei_password !== '') {
                            handleChange(e)
                            handleBlur(e)
                            this.setState({ loading: true })
                            try {
                              const cpf = values.cei_user.replace(/\./g, '').replace('-', '')
                              const { data } = await RegisterServices.checkUserCei(
                                cpf,
                                values.cei_password,
                              )
                              
                              if (!data.error) {
                                setValues(values)
                                this.setState({ isDisabled: false })
                              } else {
                                const value = values
                                value.cei_password = ''
                                this.setState({ open: true, message: 'Senha incorreta' })
                                setValues(values)
                              }
                            } catch (error) {
                              console.log('error email', error)
                              const value = values
                              value.cei_password = ''
                              this.setState({ open: true, message: 'Senha incorreta', loading: false })
                              setValues(values)
                            }
                          }
                        }}
                        value={values.cei_password}
                        endAdornment={(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Visualizar senha"
                              onClick={this.handleClickShowPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )}
                        autoFocus
                      />
                      {errors.cei_password && touched.cei_password ? <FormHelperText id="component-error-text">{errors.cei_password}</FormHelperText> : null}
                      {loading && (
                      <CircularProgress style={{
                        width: '20px', height: '20px', float: 'right', marginTop: '-27px', marginLeft: '82%',
                      }}
                      />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button onClick={handleBack} style={{ margin: '0 10px', float: 'left' }}>
                      Voltar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isDisabled}
                    >
                      Avançar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </Grid>
    )
  }
}

CeiForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default CeiForm
