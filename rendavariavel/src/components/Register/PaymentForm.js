import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { validate as validateCPF } from 'gerador-validador-cpf'
import * as Yup from 'yup'
import Snackbar from '@material-ui/core/Snackbar'
import VMasker from 'vanilla-masker'

import { getPlans, getSessionId } from '../../redux/actions/paymentActions'

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .min(17, 'Deve ter no mínimo 14 dígitos')
    .required('Obrigatório'),
  expirationMonth: Yup.number()
    .min(2, 'Deve ter 2 dígitos')
    .lessThan(13, 'Não pode ser maior que 12')
    .positive('Número inválido')
    .required('Obrigatório'),
  expirationYear: Yup.number()
    .min(4, 'Deve ter 4 dígitos')
    .positive('Número inválido')
    .required('Obrigatório'),
  cvv: Yup.string()
    .min(3, 'Deve ter no mínimo 3 dígitos')
    .required('Obrigatório'),
  owner: Yup.string()
    .required('Obrigatório'),
  cpf: Yup.string()
    .min(14, 'Deve ter 11 caracteres')
    .required('Obrigatório')
    .test('validate-cpf', 'CPF Inválido',
      value => validateCPF(value)),
  birthday: Yup.string()
    .min(10, 'Deve ter 8 dígitos')
    .required('Obrigatório'),
  phone: Yup.string()
    .min(15, 'Deve ter 11 dígitos')
    .required('Obrigatório'),
})

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentInfo: {},
      order: {
        amount: 500,
        maxInstallmentNoInterest: 3,
      },
      error: {},
      formValues: {},
      open: false,
      message: '',
      selectedPlan: '',
    }
  }

  componentWillMount() {
    getSessionId()
    window.PagSeguroDirectPayment.setSessionId(window.localStorage.sessionId)
    this.props.getPlans()
    this.getPaymentMethods()
  }

  getPaymentMethods() {
    window.PagSeguroDirectPayment.getPaymentMethods({
      amount: 500,
      success: (response) => {
        const brands = Object.values(response.paymentMethods.CREDIT_CARD.options)
        this.setState({ creditCardBrands: brands })
      },
      error: (error) => {
        window.PagSeguroDirectPayment.setSessionId(window.localStorage.sessionId)
        this.getPaymentMethods()
      },
    })
  }

  getInstallments() {
    const { order, paymentInfo } = this.state
    window.PagSeguroDirectPayment.getInstallments({
      amount: order.amount,
      maxInstallmentNoInterest: order.maxInstallmentNoInterest,
      brand: paymentInfo.brand,
      success: (response) => {
        this.setState({ installments: response.installments[paymentInfo.brand] })
      },
    })
  }

  getSenderHash() {
    const { paymentInfo } = this.state
    const senderHash = window.PagSeguroDirectPayment.getSenderHash()
    this.setState({ paymentInfo: { ...paymentInfo, senderHash } })
    this.submitForm()
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  submitForm = () => {
    const { paymentInfo, formValues } = this.state
    const { handleSubmit } = this.props
    // paymentInfo.cardNumber = `************${paymentInfo.cardNumber.substring(paymentInfo.cardNumber.length - 4)}`

    const requestData = {
      plan_id: paymentInfo.planId,
      card: {
        brand: paymentInfo.brand,
        number: formValues.cardNumber,
        expiration_month: parseInt(formValues.expirationMonth, 10),
        expiration_year: parseInt(formValues.expirationYear, 10),
        holder: {
          name: formValues.owner,
          phone: formValues.phone,
          cpf: formValues.cpf,
          birthdate: moment(formValues.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        },
      },
      credit_card_token: paymentInfo.cardToken,
      sender_hash: paymentInfo.senderHash,
    }
    handleSubmit(requestData, formValues)
  }

  handleCardNumberChange(cardNumber) {
    // let value = e.target.value;
    const value = cardNumber.replace(/ /g, '')

    if (value.length >= 6) {
      window.PagSeguroDirectPayment.getBrand({
        cardBin: value,
        success: (response) => {
          this.setState({ paymentInfo: { ...this.state.paymentInfo, brand: response.brand.name } })
        },
        error: (error) => {
          this.setState({ paymentInfo: { ...this.state.paymentInfo, brand: '' } })
        },
      })
    }
  }

  createCardToken(card) {
    const { paymentInfo } = this.state
    card.expirationMonth *= 1
    card.expirationYear *= 1
    card.cardNumber = card.cardNumber.replace(/\s+/g, '')

    console.log(card)

    this.setState({ paymentInfo: { ...paymentInfo, ...card } })

    window.PagSeguroDirectPayment.createCardToken({
      cardNumber: card.cardNumber,
      brand: card.brand,
      cvv: card.cvv,
      expirationMonth: card.expirationMonth,
      expirationYear: card.expirationYear,
      success: (response) => {
        console.log(response)
        this.setState({
          paymentInfo: { ...paymentInfo, cardToken: response.card.token },
        })
        this.getSenderHash()
      },
      error: (error) => {
        console.log(error)
        this.setState({
          open: true, message: 'Dados do cartão são inválidos',
        })
      },
    })
  }

  selectPlan(id) {
    this.setState({ paymentInfo: { ...this.state.paymentInfo, planId: id } })
    this.setState({ errors: { ...this.state.errors, plan: { notSelected: false } } })
  }

  renderPlan(plan) {
    const { error, paymentInfo } = this.state

    return (
      <Grid item key={plan.id} xs={12} sm={4} md={4}>
        <Card style={(error.plan && error.plan.notSelected) ? { border: '1px solid #f44336' } : { border: 'none' }}>
          <CardHeader
            title={plan.name}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
          />
          <CardContent style={{ height: '285px' }}>
            <div>
              <Typography component="h2" align="center" variant="h4" color="textPrimary">
                  R$
                {plan.amount_per_payment}
                <span style={{ fontSize: '18px' }}>
/
                mês
                </span>
              </Typography>

            </div>
            {plan.features && plan.features.map(line => (
              <Typography variant="subtitle2" align="center" key={line}>
                -
                {' '}
                {line}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button
              type="button"
              disabled={paymentInfo.planId === plan.id}
              fullWidth
              color="primary"
              onClick={() => this.selectPlan(plan.id)}
            >
              {paymentInfo.planId === plan.id ? 'Selecionado' : 'Selecionar'}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  render() {
    const { initialValues, plans } = this.props
    const {
      paymentInfo,
      error,
      open,
      message,
    } = this.state
    if (paymentInfo.planId === 2 || paymentInfo.planId === 3) {
      return (
        <Grid container spacing={16} hidden>

          {plans.map(plan => this.renderPlan(plan))}

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" gutterBottom>
            Informações de Pagamento
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={PaymentSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.setState({ formValues: values })
                if (paymentInfo.planId) {
                  const card = { ...values, ...paymentInfo }
                  this.createCardToken(card)
                } else {
                  this.setState({
                    errors: { ...error, plan: { notSelected: true } },
                    open: true,
                    message: 'Selecione um plano',
                  })
                }
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
              /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={7}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.cardNumber && touched.cardNumber)}
                      >
                        <InputLabel htmlFor="cardNumber">Número do Cartão</InputLabel>
                        <Input
                          type="text"
                          name="cardNumber"
                          onChange={(e) => {
                            handleChange(e)
                            this.handleCardNumberChange(values.cardNumber)
                          }}
                          value={VMasker.toPattern(values.cardNumber, '9999 9999 9999 9999')}
                        />
                        {paymentInfo.brand && (
                        <img
                          src={`https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/${paymentInfo.brand}.png`}
                          style={{
                            float: 'right', marginTop: '-30px', width: '50px', marginLeft: '150px',
                          }}
                          alt=""
                        />
                        )}
                        {errors.cardNumber && touched.cardNumber ? <FormHelperText id="component-error-text">{errors.cardNumber}</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3}>
                      <Grid container spacing={0} alignItems="flex-end">
                        <Grid item xs={4}>
                          <FormControl
                            margin="normal"
                            fullWidth
                            error={Boolean(errors.expirationMonth && touched.expirationMonth)}
                          >
                            <InputLabel htmlFor="expirationMonth">MM</InputLabel>
                            <Input
                              type="text"
                              name="expirationMonth"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={VMasker.toPattern(values.expirationMonth, '99')}
                            />
                            {errors.expirationMonth && touched.expirationMonth ? <FormHelperText id="component-error-text">{errors.expirationMonth}</FormHelperText> : null}
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}><p style={{ fontSize: '23px', textAlign: 'center', margin: '5px 0' }}>/</p></Grid>
                        <Grid item xs={6}>
                          <FormControl
                            margin="normal"
                            fullWidth
                            error={Boolean(errors.expirationYear && touched.expirationYear)}
                          >
                            <InputLabel htmlFor="expirationYear">AAAA</InputLabel>
                            <Input
                              type="text"
                              name="expirationYear"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={VMasker.toPattern(values.expirationYear, '9999')}
                            />
                            {errors.expirationYear && touched.expirationYear ? <FormHelperText id="component-error-text">{errors.expirationYear}</FormHelperText> : null}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sm={2} md={2}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.cvv && touched.cvv)}
                      >
                        <InputLabel htmlFor="cvv">CVV</InputLabel>
                        <Input
                          type="text"
                          name="cvv"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={VMasker.toPattern(values.cvv, '9999')}
                          autoComplete="cc-csc"
                        />
                        {errors.cvv && touched.cvv ? <FormHelperText id="component-error-text">{errors.cvv}</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.owner && touched.owner)}
                      >
                        <InputLabel htmlFor="owner">Nome do titular</InputLabel>
                        <Input
                          type="text"
                          name="owner"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.owner}
                        />
                        {errors.owner && touched.owner ? <FormHelperText id="component-error-text">{errors.owner}</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.cpf && touched.cpf)}
                      >
                        <InputLabel htmlFor="cpf">CPF do titular</InputLabel>
                        <Input
                          type="text"
                          name="cpf"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={VMasker.toPattern(values.cpf, '999.999.999-99')}
                        />
                        {errors.cpf && touched.cpf ? <FormHelperText id="component-error-text">{errors.cpf}</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.birthday && touched.birthday)}
                      >
                        <InputLabel htmlFor="birthday">Data de Nascimento do titular</InputLabel>
                        <Input
                          type="text"
                          name="birthday"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={VMasker.toPattern(values.birthday, '99/99/9999')}
                        />
                        {errors.birthday && touched.birthday ? <FormHelperText id="component-error-text">{errors.birthday}</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.phone && touched.phone)}
                      >
                        <InputLabel htmlFor="phone">Telefone do titular</InputLabel>
                        <Input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={VMasker.toPattern(values.phone, '(99) 99999-9999')}
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
                      Cadastrar
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
    return (
      <Grid container spacing={16}>
        {plans.map(plan => this.renderPlan(plan))}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={paymentInfo.planId !== 1}
            onClick={this.submitForm}
          >
          Confirmar
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { plans } = state.payment
  return { plans }
}

PaymentForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getPlans })(PaymentForm)
