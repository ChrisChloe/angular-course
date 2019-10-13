import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import * as Yup from 'yup'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import VMasker from 'vanilla-masker'

import { variables } from '../../helpers/index'
import { RegisterServices } from '../../services/registerService'

const AddressSchema = Yup.object().shape({
  zip_code: Yup.string()
    .length(9, 'Deve ter 8 dígitos')
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
    .typeError('Deve ser um número')
    .positive('Número inválido')
    .required('Obrigatório'),
})

class AddressForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blockedEdit: true,
      blockedCep: false,
      loading: false,
      open: false,
      message: '',
    }
  }

  getAddressCep = async (cep) => {
    await cep.replace('-', '')
    const { data } = await RegisterServices.getAddressCep(cep)
    return data
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { initialValues, handleBack, handleSubmit } = this.props
    const {
      blockedEdit, blockedCep, loading, open, message,
    } = this.state

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Endereço
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={AddressSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit({ address: values })
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
              setFieldTouched,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={16}>
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
                            const data = await this.getAddressCep(values.zip_code)
                            if (data.message === undefined) {
                              await Object.keys(values).forEach((key) => {
                                if (key !== 'zip_code') {
                                  const value = values
                                  value[key] = data[key]
                                }
                                setFieldTouched(key, true)
                              })
                              this.setState({
                                blockedEdit: false,
                                blockedCep: false,
                                loading: false,
                              })
                              await setValues(values)
                            } else {
                              Object.keys(values).forEach((key) => {
                                if (key !== 'zip_code') {
                                  const value = values
                                  value[key] = ''
                                  setFieldTouched(key, false)
                                }
                              })
                              setValues(values)
                              this.setState({
                                blockedEdit: false,
                                blockedCep: false,
                                loading: false,
                                open: true,
                                message: data.message,
                              })
                            }
                          }
                        }}
                        // value={values.zip_code}
                        value={VMasker.toPattern(values.zip_code, '99999-999') || ''}
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
                        type="text"
                        name="street"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.street || ''}
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
                        type="text"
                        name="district"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.district || ''}
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
                        type="text"
                        name="city"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city || ''}
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
                        type="state"
                        name="state"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state || ''}
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
                        value={values.number || ''}
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
                        type="text"
                        name="complement"
                        disabled={blockedEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.complement || ''}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button onClick={handleBack} style={{ margin: '0 10px', float: 'left' }}>
                      Voltar
                    </Button>
                    {/* {!loading && !blockedEdit
                      && (
                      <Button
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                          Object.keys(values).forEach((key) => {
                            values[key] = ''
                            setFieldTouched(key, false)
                          })
                          setValues(values)
                          this.setState({ blockedEdit: true })
                        }}
                      >
                        Limpar
                      </Button>
                      )} */}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={blockedEdit}
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

AddressForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddressForm
