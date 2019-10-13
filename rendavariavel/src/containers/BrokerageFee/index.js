import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import { formatMoney } from 'accounting'
import CircularProgress from '@material-ui/core/CircularProgress'

import stockService from '../../services/stockService'

import { BrokerageFeeModal } from '../../components/Modal'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  cartTitle: {
    fontSize: '0.97em',
  },
  cardContent: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  listContainer: {
    padding: 0,
  },
})

class BrokerageFee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockAgents: {},
      openModal: false,
      feeValue: '',
      percentValue: '',
      agent: '',
      application: 'transaction',
      message: '',
      taxes: [],
      loading: false,
      loadingButton: false,
      openToast: false,
    }
  }

  componentDidMount() {
    this.getStockAgents()
  }

  handleCloseBrokerageFeeModal = () => {
    this.setState({ openModal: false, feeValue: '', percentValue: '' })
  }

  handleChangeMoney = (event) => {
    const money = event.target.value
    this.setState({
      feeValue: money,
    })
  }

  handleChangePercent = (event) => {
    const percent = event.target.value.replace(',', '.')
    this.setState({
      percentValue: percent,
    })
  }

  handleBrokerageFeeSubmit = async () => {
    const {
      agent,
      feeValue,
      percentValue,
    } = this.state
    try {
      if (feeValue === '' || percentValue === '') {
        this.setState({
          openToast: true,
          message: 'Os dois campos devem ser preenchidos',
        })
      } else {
        this.setState({
          loadingButton: true,
        })
        await stockService.putAgent({
          agent,
          id: 1,
          value: feeValue,
          application: 'transaction',
        })

        await stockService.putAgent({
          agent,
          id: 2,
          value: parseFloat(percentValue),
          application: 'transaction',
        })

        this.getStockAgents()

        this.setState({
          openModal: false,
          openToast: true,
          loadingButton: false,
          message: 'Taxa atualizada com sucesso.',
        }, () => this.setState({ feeValue: '', percentValue: '' }))
      }
    } catch (error) {
      this.setState({
        openToast: true,
        message: 'Erro ao tentar atualizar taxa',
      })
      console.log(error)
    }
  }

  handleToastClose = () => {
    this.setState({ openToast: false })
  }

  handleOpenBrokerageFee = (agent) => {
    this.setState({
      openModal: true,
      agent: agent.code,
    })
    if (agent.taxes.length) {
      agent.taxes.forEach((tax) => {
        if (tax.type === 'money') {
          const num = Number(tax.value).toFixed(2)
          this.setState({
            feeValue: num,
          })
        } else {
          this.setState({
            percentValue: tax.value,
          })
        }
      })
    }
  }

  getStockAgents = async () => {
    try {
      this.setState({
        loading: true,
      })
      const { data } = await stockService.getAgents()
      this.setState({
        stockAgents: data.data.agents || [],
        loading: false,
      })
    } catch (error) {
      console.log('Error getStockAgents: ', error)
    }
  }

  render() {
    const {
      stockAgents, openModal, feeValue, percentValue,
      application, openToast, message, loading,
      loadingButton,
    } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <BrokerageFeeModal
          open={openModal}
          loading={loadingButton}
          handleCloseModal={this.handleCloseBrokerageFeeModal}
          handleAction={this.handleBrokerageFeeSubmit}
          feeValue={feeValue}
          percent={percentValue}
          application={application}
          handleChangeMoney={this.handleChangeMoney}
          handleChangePercent={this.handleChangePercent}
        />
        <Grid container spacing={16}>
          {
            loading ? (
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <CircularProgress style={{ width: 20, height: 20 }} />
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              !!stockAgents.length
            && stockAgents.map(agent => (
              <Grid item xs={12} sm={6} md={4} key={agent.code}>
                <Card>
                  <CardHeader
                    classes={{ title: classes.cartTitle }}
                    title={agent.name}
                    // subheader={`Taxa de corretagem: R$ ${VMasker.toMoney(agent.fee)} `}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="subtitle1">
                      Taxa de corretagem por valor e percentual:
                    </Typography>
                    {!!agent.taxes.length && agent.taxes.map(tax => (
                      <Fragment key={tax.id}>
                        {tax.type === 'money'
                          ? (
                            <Typography variant="subtitle2">
                              {`Valor: R$ ${formatMoney(tax.value, 'R$ ', 2, '.', ',')}`}
                            </Typography>
                          )
                          : (
                            <Typography variant="subtitle2">
                              {`Percentual: ${tax.value}%`}
                            </Typography>
                          )}
                      </Fragment>
                    ))}
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disabled={loading}
                      onClick={() => this.handleOpenBrokerageFee(agent)}
                    >
                      {loading ? 'Aguarde...' : 'Editar Taxa'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
            )
          }
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openToast}
          autoHideDuration={2200}
          onClose={this.handleToastClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    )
  }
}

BrokerageFee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

const DashboardStyle = withStyles(styles)(BrokerageFee)

export default DashboardStyle
