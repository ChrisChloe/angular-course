import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames'
import { getPlans } from '../../redux/actions/paymentActions'

class SelectPlans extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plan: null,

      classes: {
        appBar: {
          position: 'relative',
        },
        toolbarTitle: {
          flex: 1,
        },
        layout: {
          width: 'auto',
          marginLeft: '10px' * 3,
          marginRight: '10px' * 3,

        },
        heroContent: {
          maxWidth: 600,
          margin: '0 auto',
          padding: `${'10px' * 4}px 0 ${'10px' * 6}px`,
        },
        cardHeader: {
          backgroundColor: '#363636',
        },
        cardHeaderActive: {
          backgroundColor: '#4db6ac',
        },
        cardPricing: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          marginBottom: '10px' * 2,
        },
        footer: {
          marginTop: '10px' * 8,
          borderTop: '1px solid #363636',
          padding: `${'10px' * 6}px 0`,
        },
      },
    }
  }

  componentDidMount() {
    this.props.getPlans()
  }

  selectPlan(id) {
    this.setState({ plan: id })
    this.props.handleChange(id)
  }

  renderPlan(plan) {
    const { classes } = this.state
    const { errors } = this.props

    return (
      <Grid item key={plan.id} xs={12} sm={6} md={6}>
        <Card style={errors.plan && errors.plan.notSelected && { border: '1px solid #f44336' }}>
          <CardHeader
            title={plan.name}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={
              classNames(this.state.plan === plan.id ? classes.cardHeaderActive : classes.cardHeader)
            }
          />
          <CardContent>
            <div className={classes.cardPricing}>
              <Typography component="h2" align="center" variant="h3" color="textPrimary">
                  R$
                {plan.amount_per_payment}
                <span style={{ fontSize: '18px' }}>
/
                  {plan.period === 'monthly' ? 'mês' : 'ano'}
                </span>
              </Typography>

            </div>
            {plan.description && plan.description.map(line => (
              <Typography variant="subtitle1" align="center" key={line}>
                {line}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button
              type="button"
              disabled={this.state.plan === plan.id}
              fullWidth
              color="primary"
              onClick={() => this.selectPlan(plan.id)}
            >
              {this.state.plan === plan.id ? 'Selecionado' : 'Selecionar'}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  render() {
    const { plans } = this.props
    return (
      <Grid container spacing={8} alignItems="flex-end">
        {plans.map(plan => this.renderPlan(plan))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { plans } = state.payment
  return { plans }
}

export default connect(mapStateToProps, { getPlans })(SelectPlans)
