import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as Yup from 'yup'
import Snackbar from '@material-ui/core/Snackbar'
import PropTypes from 'prop-types'
import VMasker from 'vanilla-masker'
import moment from 'moment'

import { variables } from '../../helpers/index'
import RegisterServices from '../../services/registerService'

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z][a-zA-Z]+(\s[a-zA-Z]+)+$/, {
      message: 'Nome inválido',
    })
    .required('Obrigatório'),
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
  gender: Yup.string()
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
    .length(14, 'Deve ter 11 dígitos')
    .required('Obrigatório'),
  phone: Yup.string()
    .length(13, 'Deve ter 10 dígitos')
    .required('Obrigatório'),
  zip_code: Yup.string()
    .min(8, 'Deve ter 8 dígitos')
    .required('Obrigatório'),
  state: Yup.string()
    .required('Obrigatório'),
  district: Yup.string()
    .required('Obrigatório'),
  city: Yup.string()
    .required('Obrigatório'),
  street: Yup.string()
    .required('Obrigatório'),
  number: Yup.number()
    .positive('Número inválido')
    .typeError('Esse campo só aceita números')
    .required('Obrigatório'),
})

class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cpfLoading: false,
      emailLoading: false,
      open: false,
      message: '',
      blockedEdit: false,
      blockedCep: false,
      loading: false,
      showPassword: false,
    }
  }

  componentDidMount() {
    variables.mask()
  }

  getAddressCep = async (cep) => {
    if (cep && cep.length >= 8) {
      await cep.replace('-', '')
      const { data } = await RegisterServices.getAddressCep(cep)
      return data
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
    const { initialValues, handleSubmitForm } = this.props
    const {
      message, open, cpfLoading, emailLoading, blockedEdit, blockedCep, loading, showPassword,
    } = this.state
    return (
      <Grid container spacing={16}>
        {/* <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Dados do Usuário
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              handleSubmitForm(values)
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
              setFieldTouched,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.name && touched.name)}
                    >
                      <InputLabel htmlFor="name">Nome</InputLabel>
                      <Input
                        id="name"
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
                      <InputLabel htmlFor="cpf">CPF</InputLabel>
                      <Input
                        type="text"
                        name="cpf"
                        disabled
                        onChange={handleChange}
                        onBlur={async (e) => {
                          if (errors.cpf === undefined && values.cpf != null) {
                            handleChange(e)
                            handleBlur(e)
                            this.setState({ cpfLoading: true })
                            const cpf = values.cpf.replace(/\./g, '').replace('-', '')
                            try {
                              const { data } = await RegisterServices.checkCPF(cpf)
                              this.setState({ cpfLoading: false })
                              console.log(data.error)
                              if (!data.error) {
                                setValues(values)
                              } else {
                                values.cpf = ''
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
                        id="gender"
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
                      <InputLabel htmlFor="email">E-mail</InputLabel>
                      <Input
                        id="email"
                        disabled
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={async (e) => {
                          if (errors.email === undefined) {
                            handleChange(e)
                            handleBlur(e)
                            this.setState({ emailLoading: true })
                            const { data } = await RegisterServices.checkEmail(values.email)
                            this.setState({ emailLoading: false })
                            console.log(data.error)
                            if (!data.error) {
                              setValues(values)
                            } else {
                              values.email = ''
                              this.setState({ open: true, message: 'Email já cadastrado' })
                              setValues(values)
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
                      <InputLabel htmlFor="password">Senha</InputLabel>
                      <Input
                        id="password"
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
                        value={VMasker.toPattern(values.cellphone, '(99)99999-9999')}
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
                        value={VMasker.toPattern(values.phone, '(99)9999-9999')}
                      />
                      {errors.phone && touched.phone ? <FormHelperText id="component-error-text">{errors.phone}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.zip_code && touched.zip_code)}
                    >
                      <InputLabel htmlFor="zip_code">CEP</InputLabel>
                      <Input
                        type="zip_code"
                        name="zip_code"
                        disabled={blockedCep}
                        onChange={handleChange}
                        onBlur={async (e) => {
                          handleChange(e)
                          handleBlur(e)
                          if (values.zip_code.length === 9) {
                            this.setState({ blockedEdit: true, blockedCep: true, loading: true })

                            try {
                              const fields = ['street', 'state', 'district', 'city']
                              const data = await this.getAddressCep(values.zip_code)
                              if (data.message === undefined) {
                                await Object.values(fields).forEach((key) => {
                                  values[key] = data[key]
                                  setFieldTouched(key, true)
                                })
                                await Object.values(['number', 'complement']).forEach((key) => {
                                  values[key] = ''
                                  setFieldTouched(key, false)
                                })
                                this.setState({ blockedEdit: false, blockedCep: false, loading: false })
                                await setValues(values)
                              } else {
                                const fields = ['street', 'state', 'district', 'city', 'number', 'complement']
                                Object.values(fields).forEach((key) => {
                                  values[key] = ''
                                  setFieldTouched(key, false)
                                })
                                setValues(values)
                                this.setState({
                                  blockedEdit: false, blockedCep: false, loading: false, open: true, message: data.message,
                                })
                              }
                            } catch (error) {
                              console.log('error cep', error)
                            }
                          }
                        }}
                        value={VMasker.toPattern(values.zip_code, '99999-999')}
                        autoComplete="zip_code"
                      />
                      {errors.zip_code && touched.zip_code ? <FormHelperText id="component-error-text">{errors.zip_code}</FormHelperText> : null}
                      {loading && (
                      <CircularProgress style={{
                        width: '20px', height: '20px', float: 'right', marginTop: '-27px', marginLeft: '92%',
                      }}
                      />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.street && touched.street)}
                    >
                      <InputLabel htmlFor="street">Endereço</InputLabel>
                      <Input
                        id="street"
                        type="text"
                        name="street"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.street}
                      />
                      {errors.street && touched.street ? <FormHelperText id="component-error-text">{errors.street}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.district && touched.district)}
                    >
                      <InputLabel htmlFor="district">Bairro</InputLabel>
                      <Input
                        id="district"
                        type="text"
                        name="district"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.district}
                      />
                      {errors.district && touched.district ? <FormHelperText id="component-error-text">{errors.district}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.city && touched.city)}
                    >
                      <InputLabel htmlFor="city">Cidade</InputLabel>
                      <Input
                        id="city"
                        type="text"
                        name="city"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                      {errors.city && touched.city ? <FormHelperText id="component-error-text">{errors.city}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.state && touched.state)}
                    >
                      <InputLabel htmlFor="state">Estado</InputLabel>
                      <Select
                        id="state"
                        type="state"
                        name="state"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      >
                        {variables.UFS.map(uf => (
                          <MenuItem key={uf.value} value={uf.value}>
                            {uf.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.state && touched.state ? <FormHelperText id="component-error-text">{errors.state}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.number && touched.number)}
                    >
                      <InputLabel htmlFor="number">Número</InputLabel>
                      <Input
                        type="text"
                        name="number"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number}
                      />
                      {errors.number && touched.number ? <FormHelperText id="component-error-text">{errors.number}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      margin="normal"
                      fullWidth
                    >
                      <InputLabel htmlFor="complement">Complemento</InputLabel>
                      <Input
                        id="complement"
                        type="text"
                        name="complement"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.complement}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Atualizar
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

EditProfile.propTypes = {
  handleSubmitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
}

export default EditProfile
