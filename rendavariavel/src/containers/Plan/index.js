import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { validate as validateCPF } from 'gerador-validador-cpf'
// import * as Yup from 'yup'

import PaymentServices from '../../services/paymentService'
import authenticationService from '../../services/authenticationService'
import ProfileServices from '../../services/profileService'
import HirePlanDialog from '../../components/Modal/HirePlanModal'


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardHeaderActive: {
    backgroundColor: '#4db6ac',
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
})

class Plan extends Component {
  state = {
    openModal: false,
    infoPlan: {
      features: [],
    },
    user: {},
    paymentInfo: {
      cardNumber: '',
      cvv: '',
      expirationMonth: '',
      expirationYear: '',
      owner: '',
      cpf: '',
      birthday: '',
      phone: '',
    },
    plans: [],
    card: {},
    loading: true,
  }

  componentWillMount() {
    let userInfo
    let planInfo

    this.getPlans().then((planData) => {
      planInfo = planData.data
      this.getUser().then((userData) => {
        userInfo = userData.data
        if (planInfo === undefined || userInfo === undefined) {
          console.log('Error getting plans or user info')
        } else {
          this.setState({ user: userInfo, plans: planInfo, loading: false })
        }
      })
      this.getCard()
    })
  }

  getUser = async () => {
    try {
      const { data } = await authenticationService.getUsers()
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  getCard = async () => {
    try {
      const { data } = await ProfileServices.getOrders()
      this.setState({ card: data.data.card })
    } catch (error) {
      console.log('plan error', error)
    }
  }


  getPlans = async () => {
    try {
      const { data } = await PaymentServices.getPlans()
      return data
    } catch (error) {
      console.log('Error getPlans: ', error)
    }
  }

  handleContractPlanOpen = (infoPlan) => {
    this.setState({ openModal: true, infoPlan })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { classes } = this.props
    const {
      openModal, infoPlan, paymentInfo, plans, user, loading, card,
    } = this.state
    return (
      <Fragment>
        <HirePlanDialog
          open={openModal}
          infoPlan={infoPlan}
          initialValues={paymentInfo}
          card={card}
          user={user}
          handleCloseModal={this.handleCloseModal}
        />
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Planos
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Escolha o plano de acordo com suas necessidades. Você pode trocar de plano sempre que
            precisar.
          </Typography>
        </div>
        { loading
          ? (
            <CircularProgress style={{ margin: '70px 48%' }} />
          ) : (
            <Grid container spacing={16} alignItems="flex-end">
              {(plans !== undefined && plans.length) && plans.map(plan => (
                <Grid item key={plan.name} xs={12} md={4}>
                  <Card style={{ height: '385px' }}>
                    <CardHeader
                      title={plan.name}
                      titleTypographyProps={{ align: 'center' }}
                      subheaderTypographyProps={{ align: 'center' }}
                      action={plan.name === 'Pro' ? <StarIcon /> : null}
                      className={
                    classNames(user.plan.id === plan.id ? classes.cardHeaderActive : classes.cardHeader)
                  }
                    />
                    <CardContent style={{ height: '265px' }}>
                      <div className={classes.cardPricing}>
                        <Typography component="h2" variant="h3" color="textPrimary">
                        R$
                          {plan.amount_per_payment}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          {plan.period === 'yearly' ? '/ano' : '/mês'}
                        </Typography>
                      </div>
                      {plan.features.map(feature => (
                        <Typography variant="subtitle1" align="center" key={feature}>
                      -
                          {' '}
                          {feature}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      { plan.default === false || user.plan.id === 1
                        ? (
                          <Button
                            type="button"
                            disabled={user.plan.id === plan.id}
                            hidden
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleContractPlanOpen(plan)}
                          >
                            {user.plan.id === plan.id ? 'Contratado' : 'Contratar'}
                          </Button>
                        )
                        : null }
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
      </Fragment>
    )
  }
}

export default withStyles(styles)(Plan)
