import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import VMasker from 'vanilla-masker'
import { validate as validateCPF } from 'gerador-validador-cpf'
import * as Yup from 'yup'
import moment from 'moment'

import PaymentServices from '../../services/paymentService'
import { getSessionId } from '../../redux/actions/paymentActions'

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .min(17, 'Deve ter no mínimo 14 dígitos')
    .required('Obrigatório'),
  expirationMonth: Yup.number()
    .typeError('Apenas números')
    .lessThan(13, 'Não pode ser maior que 12')
    .positive('Número inválido')
    .required('Obrigatório'),
  expirationYear: Yup.number()
    // .typeError('Apenas números')
    // .positive('Número inválido')
    .min(4, 'Deve ter 4 dígitos')
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
class HirePlanDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openSnack: false,
      openForm: false,
      loading: false,
      error: {},
      message: '',
      paymentInfo: {
        darf_id: '',
        type: 'extra',
        card: {
          brand: '',
          number: '',
          expiration_month: '',
          expiration_year: '',
          cvv: '',
          holder: {
            name: '',
            phone: '',
            cpf: '',
            birthdate: '',
          },
        },
        credit_card_token: '',
        sender_hash: '',
      },
    }
  }

  componentDidMount() {
    getSessionId()
    window.PagSeguroDirectPayment.setSessionId(window.localStorage.sessionId)
  }

  getSenderHash() {
    const { paymentInfo } = this.state
    const senderHash = window.PagSeguroDirectPayment.getSenderHash()
    this.setState({ paymentInfo: { ...paymentInfo, senderHash } })
    this.hirePlan()
  }

  createCardToken = (card) => {
    const { paymentInfo } = this.state

    this.setState({ paymentInfo: { ...paymentInfo, ...card } })
    debugger
    window.PagSeguroDirectPayment.createCardToken({
      cardNumber: card.number,
      brand: paymentInfo.card.brand,
      cvv: parseInt(card.cvv, 10),
      expirationMonth: card.expiration_month,
      expirationYear: card.expiration_year,
      success: (response) => {
        console.log(response.card.token)
        this.setState({
          paymentInfo: {
            ...paymentInfo,
            credit_card_token: response.card.token,
          },
        })
        this.getSenderHash()
      },
      error: (response) => {
        console.log(response)
        this.setState({ openSnack: true, message: 'Erro ao tentar cadastrar plano' })
      },
    })
  }

  handleClose = () => {
    this.setState({ openSnack: false })
  }

  hirePlan = async () => {
    const { handleCloseModal } = this.props
    const { paymentInfo } = this.state

    try {
      this.setState({ loading: true })
      const { data } = await PaymentServices.postCreditCard(paymentInfo)
      if (data.error) {
        this.setState({ openSnack: true, message: 'Erro ao tentar contratar plano' })
        handleCloseModal()
      } else {
        this.setState({ openSnack: true, loading: false, message: 'Plano contratado!' })
        handleCloseModal()
        window.location.reload()
      }
    } catch (error) {
      this.setState({ loading: false, openSnack: true, message: 'Erro ao tentar contratar plano' })
      handleCloseModal()
      console.log('Error getPlans: ', error)
    }
  }

  handleCardNumberChange(cardNumber) {
    // let value = e.target.value;
    const { paymentInfo } = this.state

    if (cardNumber.length >= 6) {
      window.PagSeguroDirectPayment.getBrand({
        cardBin: cardNumber,
        success: (response) => {
          this.setState({
            paymentInfo: {
              ...paymentInfo,
              card: {
                ...paymentInfo.card,
                brand: response.brand.name,
              },
            },
          })
        },
        error: (error) => {
          console.log(error)
          this.setState({ openSnack: true, message: 'Número de cartão inválido', paymentInfo: { card: { brand: '' } } })
        },
      })
    }
  }

  render() {
    const { open, handleCloseModal, darfID } = this.props
    const {
      openSnack, message, paymentInfo,
      loading,
    } = this.state

    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={handleCloseModal}
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Plano
            {' '}
          </DialogTitle>
          <DialogContent>
            Este plano contempla:
            {
              (
                <Fragment>
                  <Grid container spacing={16} hidden>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h6" gutterBottom>
                        Informações de Pagamento
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Formik
                        initialValues={
                          {
                            darf_id: '',
                            type: 'extra',
                            cardNumber: '',
                            cvv: '',
                            expirationMonth: '',
                            expirationYear: '',
                            owner: '',
                            cpf: '',
                            birthday: '',
                            phone: '',
                          }
                        }
                        validationSchema={PaymentSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          const payInfo = {
                            ...paymentInfo,
                            darf_id: darfID,
                            card: {
                              brand: paymentInfo.card.brand,
                              number: values.cardNumber.replace(/ /g, ''),
                              expiration_month: parseInt(values.expirationMonth, 10),
                              expiration_year: parseInt(values.expirationYear, 10),
                              cvv: values.cvv,
                              holder: {
                                name: values.owner,
                                phone: values.phone,
                                cpf: values.cpf.replace(/\./g, '').replace('-', ''),
                                birthdate: moment(values.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                              },
                            },
                            sender_hash: window.PagSeguroDirectPayment.getSenderHash(),
                          }
                          console.log(payInfo)
                          this.setState({ paymentInfo: payInfo })
                          console.log(paymentInfo)
                          this.createCardToken(payInfo.card)
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
                                      this.handleCardNumberChange(values.cardNumber.replace(/ /g, ''))
                                    }}
                                    onBlur={handleBlur}
                                    value={VMasker.toPattern(values.cardNumber, '9999 9999 9999 9999')}
                                  />
                                  {paymentInfo.card.brand && (
                                    <img
                                      src={`https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/${paymentInfo.card.brand}.png`}
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
                                <Button onClick={handleCloseModal} style={{ margin: '0 10px' }}>
                                  Cancelar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {loading ? 'Aguarde...' : 'Cadastrar'}
                                </Button>
                              </Grid>
                            </Grid>
                          </form>
                        )}
                      </Formik>
                    </Grid>
                    <Snackbar
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      open={openSnack}
                      autoHideDuration={2000}
                      onClose={this.handleClose}
                      ContentProps={{
                        'aria-describedby': 'message-id',
                      }}
                      message={<span id="message-id">{message}</span>}
                    />
                  </Grid>
                </Fragment>
              )
            }
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnack}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </Fragment>
    )
  }
}

export default HirePlanDialog
