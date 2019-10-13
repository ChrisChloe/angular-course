/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Paper from '@material-ui/core/Paper'
import {
  PieChart, Pie, Cell,
} from 'recharts'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import Typography from '@material-ui/core/Typography'

import variables from '../../helpers/variables'

const styles = theme => ({
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
})

const fillColors = ['#004d39', '#00664d', '#008060', '#009973', '#00b386', '#00cc99', '#008080', '#009999', '#00b3b3', '#006666', '#008080', '#009999', '#00b3b3', '#660000', '#800000']

// const CustomizedLabel = ({
//   x,
//   y,
//   cx,
//   cy,
//   dy,
//   dx,
//   fill,
//   total,
//   code,
//   income,
// }) => (
//   <text
//     x={x}
//     y={y}
//     fontSize="12"
//     fill="black"
//     textAnchor={x > cx ? 'start' : 'end'}
//     dominantBaseline="bottom"
//   >
//     {`${code}: R$ ${variables.formatNumberToCurrency(income.price, '', '')}`}
//   </text>
// )

const renderLegend = ({ payload }) => {
  const data = payload.map(item => ({ ...item.payload, color: item.color }))
  console.log(data)
  return (
    <ul style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 15,
      listStyle: 'none',
      justifyContent: 'space-between',
    }}
    >
      {
        data.map((entry, index) => (
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 5,
            }}
            key={`item-${index}`}
          >
            <span style={{
              backgroundColor: entry.color,
              width: 10,
              height: 10,
              marginLeft: 5,
              marginRight: 5,
            }}
            />
            <span>
              {`${entry.code}: R$ ${variables.formatNumberToCurrency(entry.income.price, '', '')}`}
            </span>
          </li>
        ))
      }
    </ul>
  )
}

class SimplePierChart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes, data } = this.props
    let limitedData;

    (data && data.length > 10)
      ? limitedData = [...data.filter(item => item.income.price > 0).slice(0, 10)]
      : limitedData = data.filter(item => item.income.price > 0)

    return (
      <Paper className={classes.paperRoot} elevation={1}>
        <Typography variant="h6" align="center" gutterBottom component="h2">
        INVESTIMENTOS
        </Typography>
        <ResponsiveContainer width="99%" height={520}>
          { data
            ? (
              <PieChart>
                {/* <XAxis dataKey="name" />
              <YAxis /> */}
                {/* <CartesianGrid vertical={false} strokeDasharray="3 3" /> */}
                <Tooltip
                  label="name"
                  formatter={value => `R$ ${variables.formatNumberToCurrency(value, '', '')}`}
                />
                <Legend
                  content={renderLegend}
                  verticalAlign="bottom"
                />
                <Pie
                  data={limitedData}
                  dataKey="income.price"
                  // label={<CustomizedLabel />}
                  nameKey="code"
                  cy="50%"
                  cx="50%"
                  innerRadius={90}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={3}
                >
                  {data.map((item, index) => <Cell key={`cell-${index}`} fill={fillColors[index % fillColors.length]} />)}
                </Pie>
              </PieChart>
            )
            : (
              <Typography variant="h6" align="center" gutterBottom component="h2">
              Carregando...
              </Typography>
            )
        }
        </ResponsiveContainer>
      </Paper>
    )
  }
}

SimplePierChart.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimplePierChart)
