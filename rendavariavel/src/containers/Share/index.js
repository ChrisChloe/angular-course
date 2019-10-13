import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { formatMoney } from 'accounting'
import ShareListItem from '../../components/Share/ShareListItem'
import { getPosition, getStocks } from '../../redux/actions/stockActions'


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto',
  },
  cardMain: {
    padding: '2px',
    marginBottom: '15px',
    maxWidth: 'fit-content',
  },
  cardStep: {
    padding: '10px',
    margin: '5px',
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '0',
  },
  item: {
    textAlign: 'center',
  },
  dot: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonBlock: {
    width: '100%',
    margin: '10px 0',
  },
  listItem: {
    padding: '8px',
    overflowX: 'hidden',
    textAlign: 'center',
  },
})


class Share extends Component {
  state = {
    activeStep: 0,
  }

  componentDidMount() {
    this.props.getPosition()
    this.props.getStocks()
  }

  handleStepChange = (activeStep) => {
    this.setState({ activeStep })
  };

  render() {
    const { classes, stockPosition, stocks } = this.props
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
            Carteira de Ativos
          </Typography>
        </div>
        <Grid container justify="center" alignItems="center">
          <Card className={classes.cardMain}>
            { (!stockPosition || !stockPosition.income)
              ? (
                <CardContent>
                  <Grid container spacing={8}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography component="h5" variant="h6" align="center" color="textPrimary" gutterBottom>
                    Carregando...
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              )
              : (
                <CardContent>
                  <Grid container spacing={8}>
                    <Grid item xs={5} sm={6} md={6}>
                      <Typography component="h2" variant="h5" align="center" color="textPrimary" gutterBottom>
                    Atual
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={6} md={6}>
                      <Typography component="h2" variant="h5" align="center" color="textPrimary" gutterBottom>
                        {formatMoney(stockPosition.amount, 'R$ ', 2, '.', ',')}
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={6} md={6}>
                      <Typography component="h5" variant="subtitle1" align="center" color="textPrimary" gutterBottom>
                    Rendimentos
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={6} md={6}>
                      <Typography component="h5" variant="subtitle1" align="center" color="textPrimary" gutterBottom>
                        {formatMoney(stockPosition.income.price, 'R$ ', 2, '.', ',')}
                        {' '}
(
                        {stockPosition.income.percent}
%)
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={6} md={6}>
                      <Typography component="h5" variant="subtitle1" align="center" color="textPrimary" gutterBottom>
                    Imposto
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={6} md={6}>
                      <Typography component="h5" variant="subtitle1" align="center" color="textPrimary" gutterBottom>
                        {formatMoney(stockPosition.taxes, 'R$ ', 2, '.', ',')}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              )}
          </Card>
        </Grid>
        <Grid container spacing={8} justify="center" className={classes.item}>
          <Grid item xs={4} sm={4} md={4}>
            <Button type="button" style={{ width: '100%', height: '50px' }} color="primary" variant={activeStep === 0 ? 'contained' : 'outlined'} className={classes.button} onClick={() => this.setState({ activeStep: 0 })}>
              Total
            </Button>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button type="button" disabled style={{ width: '100%', height: '50px' }} color="primary" variant={activeStep === 1 ? 'contained' : 'outlined'} className={classes.button} onClick={() => this.setState({ activeStep: 2 })}>
              Mensal
            </Button>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button type="button" disabled style={{ width: '100%', height: '50px' }} color="primary" variant={activeStep === 2 ? 'contained' : 'outlined'} className={classes.button} onClick={() => this.setState({ activeStep: 3 })}>
              Anual
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} />
        </Grid>
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          <Grid
            container
            justify="center"
            spacing={8}
            style={{
              padding: '5px', overflow: 'hidden', maxWidth: '100%', margin: 0,
            }}
          >
            {
              stocks && stocks[0]
                ? stocks.map((stock, index) => {
                  const idx = index
                  return (<ShareListItem key={idx} stock={stock} />)
                })
                : (
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">Carregando...</Typography>
                  </Grid>
                )
            }
          </Grid>
        </SwipeableViews>
        {/* </Grid> */}
      </div>
    )
  }
}

const ShareStyle = withStyles(styles)(Share)

const mapStateToProps = (state) => {
  const { stockPosition, stocks } = state.stock
  return { stockPosition, stocks }
}

export default connect(mapStateToProps, { getPosition, getStocks })(ShareStyle)
