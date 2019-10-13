/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
  btn: {
    width: '100%',
  },
})

function Review(props) {
  const { classes, handleCancelPlan, planInfo } = props
  return (
    <React.Fragment>
      <Typography className={classes.alignSelfStart} variant="h6" gutterBottom>
        Resumo das Informações
      </Typography>
      <Grid container spacing={16}>
        <Grid item container direction="column" xs={12} sm={8}>
          <Grid container>
            {planInfo.plan
              ? (
                <React.Fragment>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Tipo: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{planInfo.plan.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Descrição: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      {planInfo.plan.description ? planInfo.plan.description : 'Sem descrição'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Plano expira em: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{moment(planInfo.plan_expires_at).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                </React.Fragment>
              ) : (
                <Typography variant="subtitle1" gutterBottom>Você não possui um plano</Typography>
              )
            }
          </Grid>
        </Grid>
      </Grid>
      <div style={{
        flex: 1,
        alignSelf: 'stretch',
        justifySelf: 'stretch',
        marginTop: 8,
        marginBottom: 8,
      }}
      >
        <Divider light />
      </div>
      <Typography className={classes.alignSelfStart} variant="h6" gutterBottom>
        Informações de pagamento
      </Typography>
      <Grid container spacing={16}>
        <Grid item container direction="column" xs={12} sm={8}>
          <Grid container>
            {planInfo.card
              ? (
                <React.Fragment>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Cartão: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{planInfo.card.brand}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Nome do Titular: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{planInfo.card.holder.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Número do cartão: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      {'**** **** **** '}
                      {planInfo.card.number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Data de expiração: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      {planInfo.card.expiration_month}
                      /
                      {planInfo.card.expiration_year}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ) : (
                <Typography variant="subtitle1" gutterBottom>Você não possui um plano</Typography>
              )
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          marginTop: 10,
        }}
        spacing={16}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Button
            type="button"
            variant="outlined"
            className={classes.btn}
            onClick={handleCancelPlan}
          >
            Cancelar Plano
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            component={Link}
            to="/planos"
          >
            Atualizar Plano
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCancelPlan: PropTypes.func.isRequired,
  planInfo: PropTypes.object.isRequired,
}

export default withStyles(styles)(Review)
