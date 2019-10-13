import React from 'react'
import { withFormik } from 'formik'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as Yup from 'yup'

const isInvalid = errorValue => Boolean(errorValue)

const RegisterOneForm = ({
  values,
  touched,
  errors,
  handleGetAddress,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={24} style={{ marginBottom: 20 }}>
      <Grid item xs={12}>
        <TextField
          id="name"
          name="name"
          label="Nome"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isInvalid(errors.name)}
          helperText={errors.name}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          type="email"
          error={isInvalid(errors.email)}
          helperText={errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="cpf"
          label="CPF"
          name="cpf"
          InputProps={{
            min: 0,
          }}
          value={values.cpf}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          error={isInvalid(errors.cpf)}
          helperText={errors.cpf}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="phone"
          name="phone"
          type="tel"
          label="Telefone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          error={isInvalid(errors.phone)}
          helperText={errors.phone}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="password"
          name="password"
          type="password"
          label="Sua Senha"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isInvalid(errors.password)}
          helperText={errors.password}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="cei_password"
          name="cei_password"
          type="password"
          label="Senha Portal CEI"
          value={values.cei_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isInvalid(errors.cei_password)}
          helperText={errors.cei_password}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" style={{ marginTop: 12 }}>
          Endereço
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          id="cep"
          name="zipcode"
          type="number"
          label="CEP"
          value={values.zipcode}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          error={isInvalid(errors.zipcode)}
          helperText={errors.zipcode}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          type="button"
          fullWidth
          onClick={() => handleGetAddress(values.zipcode, values)}
          variant="outlined"
          color="primary"
        >
            Pesquisar
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="state"
          value={values.state}
          name="state"
          onChange={handleChange}
          onBlur={handleBlur}
          label="Estado"
          error={isInvalid(errors.state)}
          helperText={errors.state}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="city"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Cidade"
          error={isInvalid(errors.city)}
          helperText={errors.city}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="street"
          name="street"
          label="Rua"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.street}
          error={isInvalid(errors.street)}
          helperText={errors.street}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="number"
          value={values.number}
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          label="Número"
          error={isInvalid(errors.number)}
          helperText={errors.number}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="complement"
          name="complement"
          label="Complemento"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.complement}
          error={isInvalid(errors.complement)}
          helperText={errors.complement}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="district"
          name="district"
          value={values.district}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Bairro"
          fullWidth
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      Cadastrar
    </Button>
  </form>
)

export default withFormik({
  mapPropsToValues: ({ addressResource, defaultValue }) => {
    return {
      name: defaultValue.name || '',
      email: defaultValue.email || '',
      password: defaultValue.password || '',
      cei_password: defaultValue.cei_password || '',
      phone: defaultValue.phone || '',
      cpf: defaultValue.cpf || '',
      zipcode: addressResource.postal_code || '',
      state: addressResource.state || '',
      street: addressResource.street || '',
      city: addressResource.city || '',
      district: addressResource.district || '',
      number: addressResource.number || '',
      complement: addressResource.complement || '',
    }
  },
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Obrigatório'),
    zipcode: Yup.string()
      .required('Obrigatório'),
    phone: Yup.string()
      .required('Obrigatório'),
    cpf: Yup.string()
      .required('Obrigatório'),
    state: Yup.string()
      .required('Obrigatório'),
    street: Yup.string()
      .required('Obrigatório'),
    city: Yup.string()
      .required('Obrigatório'),
    district: Yup.string()
      .required('Obrigatório'),
    number: Yup.string()
      .required('Obrigatório'),
    email: Yup.string()
      .email('E-mail invalido')
      .required('Obrigatório'),
    password: Yup.string()
      .min(6, 'Senha minima de 6 caracteres')
      .required('Obrigatório'),
    cei_password: Yup.string()
      .min(6, 'Senha minima de 6 caracteres')
      .required('Obrigatório'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { handleRegister } = props
    const registerFormat = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      password: values.password,
      cei_password: values.cei_password,
      phone: values.phone,
      address: {
        zip_code: values.zipcode,
        state: values.state,
        street: values.street,
        city: values.city,
        number: values.number,
        complement: values.complement,
        district: values.district,
      },
    }
    handleRegister(registerFormat)
    setSubmitting(false)
  },
})(RegisterOneForm)
