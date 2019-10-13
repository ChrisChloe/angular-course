import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {
  SimplePierChart,
  SimpleLineChart,
  ListEvaluation,
} from '../../components'

import stockService from '../../services/stockService'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockDashboard: {},
      stockPosition: {},
    }
  }

  componentDidMount() {
    this.getDashboard()
    this.getPosition()
  }

  getPosition = async () => {
    try {
      const { data } = await stockService.getPosition()
      this.setState({ stockPosition: data.data })
    } catch (error) {
      console.log('Error getPosition: ', error)
    }
  }

  getDashboard = async () => {
    try {
      const { data } = await stockService.getDashboardData()
      if (!!data && !!data.data) {
        const stocks = data.data.stocks.filter(stock => stock.income.price > 0)
        const stockDashboard = { ...data.data, stocks }
        this.setState({ stockDashboard })
      }
    } catch (error) {
      console.log('Error getDashboard: ', error)
    }
  }

  render() {
    const { classes } = this.props
    const { stockDashboard, stockPosition } = this.state
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={6}>
            {!!stockDashboard.stocks && <SimplePierChart data={stockDashboard.stocks} />}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {/* usando esse stockDashboard.stocks apenas para mostrar todos os card de uma vez */}
            {!!stockDashboard.stocks && <SimpleLineChart data={stockDashboard.stocks} />}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {!!stockPosition.agents
            && (
            <ListEvaluation
              data={stockPosition.agents}
              title="RENDIMENTO POR INSTITUIÇÃO"
              varLabel="name"
              varValue="percent"
            />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {!!stockDashboard.stocks
            && (
            <ListEvaluation
              data={stockDashboard.stocks}
              title="RENDIMENTO POR ATIVOS"
              varLabel="code"
              varValue="percent"
            />
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

const DashboardStyle = withStyles(styles)(Dashboard)

export default DashboardStyle
