import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import MenuItem from '@material-ui/core/MenuItem'
import moment from 'moment'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { validate as validateCPF } from 'gerador-validador-cpf'
import * as Yup from 'yup'
import Snackbar from '@material-ui/core/Snackbar'
import VMasker from 'vanilla-masker'

import { RegisterServices } from '../../services/registerService'

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z][a-zA-Z]+(\s[a-zA-Z]+)+$/, {
      message: 'Nome inválido',
    })
    .required('Obrigatório'),
  cpf: Yup.string()
    .min(14, 'Deve ter 11 caracteres')
    .required('Obrigatório')
    .test('validate-cpf', 'CPF Inválido',
      value => validateCPF(value)),
  birthdate: Yup.string()
    .test(
      'testDate',
      'Deve ser uma data válida',
      (date) => {
        let result
        if (moment(date, 'DD/MM/YYYY', true).isValid()
            && moment(date, 'DD/MM/YYYY').isBefore(moment().subtract(16, 'years').format('DD/MM/YYYY'))
            && moment(date, 'DD/MM/YYYY').isAfter(moment().subtract(100, 'years').format('DD/MM/YYYY'))
        ) {
          result = true
        }
        return result
      },
    )
    .required('Obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  password: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\W+)/, {
      message: 'A senha deve conter maiúsculas e minúsculas e caracteres especiais',
    })
    .required('Obrigatório'),
  cellphone: Yup.string()
    .min(15, 'Deve ter 11 dígitos'),
  phone: Yup.string()
    .min(14, 'Deve ter 10 dígitos'),
})

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailLoading: false,
      open: false,
      message: '',
      showPassword: false,
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  render() {
    const { initialValues, handleSubmit } = this.props
    const {
      message, open, cpfLoading, emailLoading,
      showPassword,
    } = this.state

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Dados do Usuário
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting }) => {
              const requestData = values
              requestData.birthdate = moment(requestData.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setValues,
              touched,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.name && touched.name)}
                    >
                      <InputLabel htmlFor="name">Nome *</InputLabel>
                      <Input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        autoFocus
                      />
                      {errors.name && touched.name ? <FormHelperText id="component-error-text">{errors.name}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.cpf && touched.cpf)}
                    >
                      <InputLabel htmlFor="cpf">CPF *</InputLabel>
                      <Input
                        type="text"
                        name="cpf"
                        onChange={handleChange}
                        onBlur={async (e) => {
                          handleChange(e)
                          handleBlur(e)
                          if (errors.cpf === undefined && values.cpf != null) {
                            this.setState({ cpfLoading: true })
                            const cpf = values.cpf.replace(/\./g, '').replace('-', '')
                            try {
                              const { data } = await RegisterServices.checkCPF(cpf)
                              this.setState({ cpfLoading: false })
                              if (!data.error) {
                                setValues(values)
                              } else {
                                const value = values
                                value.cpf = ''
                                this.setState({ open: true, message: 'CPF já cadastrado' })
                                setValues(values)
                              }
                            } catch (error) {
                              console.log('error cpf', error)
                            }
                          }
                        }}
                        value={VMasker.toPattern(values.cpf, '999.999.999-99')}
                      />
                      {errors.cpf && touched.cpf ? <FormHelperText id="component-error-text">{errors.cpf}</FormHelperText> : null}
                      {cpfLoading && (
                        <CircularProgress style={{
                          width: '20px', height: '20px', float: 'right', marginTop: '-27px', marginLeft: '92%',
                        }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.birthdate && touched.birthdate)}
                    >
                      <InputLabel htmlFor="birthdate">Data de Nascimento</InputLabel>
                      <Input
                        type="text"
                        name="birthdate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={VMasker.toPattern(values.birthdate, '99/99/9999')}
                      />
                      {errors.birthdate && touched.birthdate ? <FormHelperText id="component-error-text">{errors.birthdate}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.gender && touched.gender)}
                    >
                      <InputLabel htmlFor="gender">Gênero</InputLabel>
                      <Select
                        type="gender"
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                      >
                        <MenuItem value="male">Masculino</MenuItem>
                        <MenuItem value="female">Feminino</MenuItem>
                        <MenuItem value="other">Outros</MenuItem>
                      </Select>
                      {errors.gender && touched.gender ? <FormHelperText id="component-error-text">{errors.gender}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.email && touched.email)}
                    >
                      <InputLabel htmlFor="email">E-mail *</InputLabel>
                      <Input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={async (e) => {
                          handleChange(e)
                          handleBlur(e)
                          if (errors.email === undefined) {
                            this.setState({ emailLoading: true })
                            try {
                              const { data } = await RegisterServices.checkEmail(values.email)
                              this.setState({ emailLoading: false })
                              if (!data.error) {
                                setValues(values)
                              } else {
                                const value = values
                                value.email = ''
                                this.setState({ open: true, message: 'Email já cadastrado' })
                                setValues(values)
                              }
                            } catch (error) {
                              console.log('error email', error)
                            }
                          }
                        }}
                        value={values.email}
                        autoComplete="email"
                      />
                      {errors.email && touched.email ? <FormHelperText id="component-error-text">{errors.email}</FormHelperText> : null}
                      {emailLoading && (
                        <CircularProgress style={{
                          width: '20px', height: '20px', float: 'right', marginTop: '-27px', marginLeft: '92%',
                        }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.password && touched.password)}
                    >
                      <InputLabel htmlFor="password">Senha *</InputLabel>
                      <Input
                        type={!showPassword ? 'password' : 'text'}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
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
                      />
                      {errors.password && touched.password ? <FormHelperText id="component-error-text">{errors.password}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.cellphone && touched.cellphone)}
                    >
                      <InputLabel htmlFor="cellphone">Telefone</InputLabel>
                      <Input
                        type="text"
                        name="cellphone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={VMasker.toPattern(values.cellphone, '(99) 99999-9999')}
                      />
                      {errors.cellphone && touched.cellphone ? <FormHelperText id="component-error-text">{errors.cellphone}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.phone && touched.phone)}
                    >
                      <InputLabel htmlFor="phone">Telefone Fixo</InputLabel>
                      <Input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={VMasker.toPattern(values.phone, '(99) 9999-9999')}
                      />
                      {errors.phone && touched.phone ? <FormHelperText id="component-error-text">{errors.phone}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    {/* <Button onClick={this.props.handleBack} style={{margin: '0 10px'}}>
                      Voltar
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
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

RegisterForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default RegisterForm
