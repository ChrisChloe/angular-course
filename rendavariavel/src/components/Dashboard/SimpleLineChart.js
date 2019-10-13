/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Paper from '@material-ui/core/Paper'
import Legend from 'recharts/lib/component/Legend'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
})

function getTotal(total, num) {
  return total + num
}

const formatData = (data) => {
  let count
  const dataFormatted = []
  const prices = []
  let totalPrice = 0
  let limitedData

  (data && data.length > 10)
    ? limitedData = data.slice(0, 10) || []
    : limitedData = data || []
  count = 1

  limitedData.forEach((item) => {
    const today = moment()
    const obj = {
      date: today.subtract(count, 'days').format('DD/MM'),
      CDI: 6.40,
      Carteira: totalPrice + 3,
    }

    // eslint-disable-next-line no-restricted-syntax
    for (item of limitedData) {
      prices.push(item.income.percent)
    }
    totalPrice = prices.reduce(getTotal)
    dataFormatted.unshift(obj)
    count += 2
  })


  return dataFormatted
}

class SimpleLineChart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes, data } = this.props
    const shares = []

    // eslint-disable-next-line no-restricted-syntax
    for (const share of data) {
      shares.push(<Line type="monotone" dataKey={share.code} stroke="#004d39" />)
    }

    return (
      <Paper className={classes.paperRoot} elevation={1}>
        <Typography variant="h6" align="center" gutterBottom component="h2">
        CDI vs CARTEIRA
        </Typography>
        <ResponsiveContainer width="99%" height={520}>
          <LineChart data={formatData(data)}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip
              label="name"
              formatter={value => `${value}%`}
            />
            <Legend />
            <Line type="monotone" dataKey="CDI" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Carteira" stroke="#004d39" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    )
  }
}

SimpleLineChart.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleLineChart)
