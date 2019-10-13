import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import _default from 'material-ui-pickers/DatePicker/components/SlideTransition'

import AddressForm from '../../components/Register/AddressForm'
import PaymentForm from '../../components/Register/PaymentForm'
// import Review from '../../components/Register/Review'
import CeiForm from '../../components/Register/CeiForm'
import RegisterForm from '../../components/Register/RegisterForm'
// import SelectPlans from '../../components/Register/SelectPlans';
import { createUser } from '../../redux/actions/registerActions'
import { loginAuth } from '../../redux/actions/authenticationActions'
import { postCreditCard } from '../../redux/actions/paymentActions'
import UploadFiles from '../../components/Register/UploadFiles'
import { RegisterServices } from '../../services/registerService'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
})

const steps = ['Dados pessoais', 'Acesso CEI', 'Endereço', 'Planos']

const initialValues = {
  register: {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    birthdate: '',
    gender: '',
    cellphone: '',
  },
  cei: {
    cei_password: '',
  },
  address: {
    zip_code: '',
    state: '',
    street: '',
    district: '',
    city: '',
    number: '',
    complement: '',
  },
  creditCard: {
    cardNumber: '',
    cvv: '',
    expirationMonth: '',
    expirationYear: '',
    owner: '',
    cpf: '',
    birthday: '',
    phone: '',
  },
}
class RegisterOne extends Component {
  state = {
    activeStep: 0,
    registerRequestData: {},
    redirect: false,
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  getFormValues = async (values) => {
    const { registerRequestData, activeStep } = this.state

    if (activeStep === 2) {
      const requestData = { ...registerRequestData, ...values }
      requestData.cpf = requestData.cpf.replace(/\./g, '').replace('-', '')
      requestData.address.zip_code = requestData.address.zip_code.replace('-', '')
      requestData.cellphone = requestData.cellphone.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
      requestData.phone = requestData.phone.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
      requestData.cellphone = requestData.cellphone || null
      requestData.phone = requestData.phone || null
      requestData.gender = requestData.gender || null
      if (requestData.birthdate === 'Invalid date') {
        requestData.birthdate = null
      }
      await this.props.createUser(requestData)
      await this.props.loginAuth(requestData.email, requestData.password)
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        registerRequestData: { ...state.registerRequestData, ...values },
      }))
    // } else if (activeStep === 3) {
    //   await RegisterServices.sendIdentification(values.formDataIdentification)
    //   await RegisterServices.sendAddressProof(values.formDataAddress)
    //   this.setState(state => ({
    //     activeStep: state.activeStep + 1,
    //     registerRequestData: { ...state.registerRequestData, ...values },
    //   }))
    } else if (activeStep === 3) {
      console.log(values)
      if (values.plan_id === 1) {
        this.setState(state => ({
          redirect: true,
        }))
      } else {
        try {
          await this.props.postCreditCard(values)
          this.setState(state => ({
            redirect: true,
          }))
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      await (initialValues.register.cpf !== '')
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        registerRequestData: { ...state.registerRequestData, ...values },
      }))
    }
  }

  render() {
    const { classes } = this.props
    const { activeStep, redirect } = this.state

    if (redirect) {
      return <Redirect to="/dashboard" />
    }

    return (
      <React.Fragment>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Cadastro
            </Typography>
            <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Obrigado pelo cadastro.
                  </Typography>
                  <Typography variant="subtitle1">
                    Cadastro finalizado com sucesso, você será redirecionado para o login.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && <RegisterForm initialValues={initialValues.register} handleSubmit={(values) => { this.getFormValues(values); initialValues.register = values }} handleBack={this.handleBack} />}
                  {activeStep === 1 && <CeiForm initialValues={{ ...initialValues.cei, cei_user: initialValues.register.cpf }} handleSubmit={(values) => { this.getFormValues(values); initialValues.cei = values }} handleBack={this.handleBack} />}
                  {activeStep === 2 && <AddressForm initialValues={initialValues.address} handleSubmit={(values) => { this.getFormValues(values); initialValues.address = values }} handleBack={this.handleBack} />}
                  {/* {activeStep === 3 && <UploadFiles initialValues={initialValues.address} handleSubmit={(values) => { this.getFormValues(values); initialValues.address = values }} handleBack={this.handleBack} />} */}
                  {activeStep === 3 && <PaymentForm initialValues={initialValues.creditCard} handleSubmit={(requestData, values) => { this.getFormValues(requestData); initialValues.creditCard = values }} handleBack={this.handleBack} />}
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

RegisterOne.propTypes = {
  classes: PropTypes.object.isRequired,
}

const RegisterOneStyle = withStyles(styles)(RegisterOne)

const mapStateToProps = state => state

export default connect(mapStateToProps, { createUser, loginAuth, postCreditCard })(RegisterOneStyle)
