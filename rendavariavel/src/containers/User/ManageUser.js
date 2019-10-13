import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

import authenticationService from '../../services/authenticationService'
import Review from '../../components/Register/Review'
import EditProfile from '../../components/Register/EditProfile'
import ProfileServices from '../../services/profileService'
import CancelPlanDialog from '../../components/Modal/CancelPlanModal'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  birthdate: '',
  gender: '',
  cellphone: '',
  zip_code: '',
  state: '',
  street: '',
  district: '',
  city: '',
  number: '',
  complement: '',
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    marginBottom: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
})

class ManageUser extends Component {
  state = {
    openModal: false,
    user: {},
    plan: {},
    loadingUserForm: true,
    loadingPlanForm: true,
  }

  componentDidMount() {
    this.getUser()
    this.getOrders()
  }

  getUser = async () => {
    try {
      const { data } = await authenticationService.getUsers()
      this.setState({ user: data.data })
      this.setInitialValues()
    } catch (error) {
      console.log('error', error)
    }
  }

  getOrders = async () => {
    try {
      const { data } = await ProfileServices.getOrders()
      this.setState({ plan: data.data, loadingPlanForm: false })
    } catch (error) {
      console.log('plan error', error)
    }
  }

  setInitialValues() {
    const { user } = this.state

    initialValues.name = user.name
    initialValues.birthdate = moment(user.birthdate).format('DD/MM/YYYY') || ''
    initialValues.cellphone = user.cellphone || ''
    initialValues.cpf = user.cpf
    initialValues.email = user.email
    initialValues.gender = user.gender || ''
    initialValues.phone = user.phone || ''
    initialValues.name = user.name

    if (user.address) {
      initialValues.city = user.address.city
      initialValues.complement = user.address.complement || ''
      initialValues.district = user.address.district
      initialValues.number = user.address.number
      initialValues.state = user.address.state
      initialValues.street = user.address.street
      initialValues.zip_code = user.address.zip_code
    }

    this.setState({ loadingUserForm: false })
  }

  handleCancelPlanOpen = () => {
    this.setState({ openModal: true })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleUpdate = (values) => {
    const requestData = {
      name: values.name,
      birthdate: moment(values.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      phone: values.phone,
      cellphone: values.cellphone,
      address: {
        zip_code: values.zip_code,
        district: values.district,
        city: values.city,
        number: values.number,
        street: values.street,
        complement: values.complement,
        state: values.state,
      },
    }

    if (values.password) {
      requestData.password = values.password
    }

    try {
      ProfileServices.updateUser(requestData)
    } catch (error) {
      console.log('update user error', error)
    }
  }

  render() {
    const { classes } = this.props
    const {
      openModal,
      loadingUserForm,
      loadingPlanForm,
      plan,
      user,
    } = this.state

    const userData = { ...user, ...plan }

    return (
      <div className={classes.root}>
        <CancelPlanDialog
          open={openModal}
          handleCloseModal={this.handleCloseModal}
          order={plan}
        />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2" align="center">
                Dados de usuário
              </Typography>
              { loadingUserForm
                ? (
                  <CircularProgress style={{ margin: '70px 0' }} />
                ) : (
                  <EditProfile
                    initialValues={initialValues}
                    handleSubmitForm={this.handleUpdate}
                  />
                )
              }
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom component="h2">
                Plano
              </Typography>
              { loadingPlanForm
                ? (
                  <CircularProgress style={{ margin: '70px 0' }} />
                ) : (
                  <div>
                    { plan === undefined
                      ? (
                        <Typography variant="h6" gutterBottom component="h2">
                          Você não possui um plano
                        </Typography>
                      ) : (
                        <Review
                          planInfo={userData}
                          handleCancelPlan={this.handleCancelPlanOpen}
                        />
                      )
                    }
                  </div>
                )
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ManageUser.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default withStyles(styles)(ManageUser)
