/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  primaryBox: {
    flex: '0 1 auto',
    padding: '0 0.3rem',
    marginBottom: '0.2rem',
    '&:first-child': {
      paddingLeft: '0.3em',
    },
  },
  primaryTitle: {
    textTransform: 'uppercase',
    fontWeight: 400,
    padding: 0,
  },
  listContainer: {
    padding: 0,
  },
})

const dense = false

const ListEvaluation = ({
  classes,
  title,
  data,
  varLabel,
  varValue,
}) => (
  <Paper className={classes.paperRoot} elevation={1}>
    <Typography variant="h6" align="center" gutterBottom component="h2">
      {title}
    </Typography>
    <List dense={dense} disablePadding>
      {
        !!data && data.map((item, index) => (
          <ListItem key={index} className={classes.listContainer}>
            <ListItemText
              primary={item[varLabel]}
            />
            <ListItemText
              style={{ textAlign: 'right' }}

              primary={(
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {item.income[varValue] === 0
                    ? ''
                    : item.income[varValue] > 0 ? <ArrowDropUp style={{ fontSize: '30px', color: '#48cc92' }} />
                      : <ArrowDropDown style={{ fontSize: '30px', color: '#cc554c' }} />
                    }
                  <div style={{ width: '60px', textAlign: 'right' }}>
                    {item.income[varValue] > 0 ? '+' : ''}
                    {`${item.income[varValue]}%`}
                  </div>
                </span>
)}
            />
          </ListItem>
        ))
      }
    </List>
  </Paper>
)

// const ListEvaluation = ({ classes, data = [], title = "" }) => (

//   <Paper className={classes.paperRoot} elevation={1}>
//     <Typography variant="h6" align="center" gutterBottom component="h2">
//       {title}
//     </Typography>
//     <List dense={dense} disablePadding>
//       {
//         !!data.length && data.map(item => (
//           <ListItem key={item.id} className={classes.listContainer}>
//             <ListItemText
//               primary={item.name}
//             />
//             <ListItemText style={{textAlign: 'right'}}

//               primary={
//                 <span style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
//                     {item.value > 0
//                     ? <ArrowDropUp style={{fontSize: '30px', color: '#48cc92'}}/>
//                     : <ArrowDropDown style={{fontSize: '30px', color: '#cc554c'}}/>}
//                   <div style={{width: '60px', textAlign: 'right'}}>
//                     {item.value > 0 ? '+' : ''}{item.value}%
//                   </div>
//                 </span>
//               }
//             />
//           </ListItem>
//         ))
//       }
//     </List>
//   </Paper>
// )

ListEvaluation.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(ListEvaluation)
