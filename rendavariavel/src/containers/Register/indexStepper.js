/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AddressForm from '../../components/Register/AddressForm'
import PaymentForm from '../../components/Register/PaymentForm'
// import Review from '../../components/Register/Review'
import CeiForm from '../../components/Register/CeiForm'
import RegisterForm from '../../components/Register/RegisterForm'
import SelectPlans from '../../components/Register/SelectPlans'

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

const steps = ['Dados pessoais', 'Dados usuário CEI', 'Dados residenciais', 'Dados bancários']

const shareData = {
  errors: {},
}

const getPaymentData = (data) => {
  Checkout.handleNext()
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RegisterForm />
    case 1:
      return <CeiForm />
    case 2:
      return <AddressForm />
    case 3:
      return (
        <PaymentForm
          handleChange={getPaymentData}
          shareData={shareData}
          action={{
            component: Button,
            props: {
              type: 'submit',
              variant: 'contained',
              color: 'primary',
              style: { margin: '10px 0' },
            },
            text: 'Avançar',
            position: 'right',
          }}
        />
      )

    // case 4:
    //   return <Review />
    default:
      throw new Error('Unknown step')
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
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

  render() {
    const { classes } = this.props
    const { activeStep } = this.state

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
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Voltar
                      </Button>
                    )}
                    {(activeStep !== 3) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Cadastrar' : 'Avançar'}
                      </Button>
                    ) : false}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Checkout)
