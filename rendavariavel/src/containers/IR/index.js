/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import ReceiptIcon from '@material-ui/icons/Receipt'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'


import impostRendaService from '../../services/impostRendaService'
// import IrAttactchmentReceiptModal from '../../components/Modal/IrAttactchmentReceiptModal'
import { LoosePlanModal } from '../../components/Modal'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    overflow: 'auto',
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
  iconButton: {
    // backgroundColor: '#4dd0e1',
    // backgroundColor: '#26a69a',
    // color: '#fff',
    margin: theme.spacing.unit,
  },
  icon: {
    color: '#fff',
    marginRight: theme.spacing.unit,
  },
  action: {
    paddingRight: theme.spacing.unit * 2,
  },
  listItem: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: '1px solid #ddd',
  },
  input: {
    display: 'none',
  },
  mobileView: {
    display: 'block',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  desktopView: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
})

const ITEM_HEIGHT = 48
const irStatus = (status, amount) => {
  console.log('status: ', status, amount)
  switch (status) {
    case 'ativo':
      return `R$ ${amount}`
    case 'isento':
      return `R$ ${amount}`
    case 'calculando':
      return <CircularProgress style={{ width: 20, height: 20 }} />
    default:
      return ''
  }
}

class IR extends Component {
  state = {
    dense: false,
    loading: false,
    loadingMsn: false,
    openSnack: false,
    openMenu: null,
    openModal: false,
    darfID: '',
    message: '',
    irList: [],
    attachmentedReceipt: null,
    openAttechRereipt: false,
    attachmenteReceiptId: null,
  }

  async componentWillMount() {
    try {
      this.setState({ loading: true })
      const response = await impostRendaService.getDarfs()
      this.setState({ irList: response.data.data, loading: false })
    } catch (error) {
      const { response } = error
      const { history } = this.props
      console.log(error)
      this.setState({ loading: false })
      if (response.status === 402) {
        history.push('planos')
      }
    }
  }

  printDarf = async (ir) => {
    try {
      const { data } = await impostRendaService.getDarfsDownload(ir.id)
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${ir.id}-${ir.name}-darf.pdf`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.log(error)
      const { response } = error
      if (response && response.status === 402) {
        this.setState({
          openSnack: true,
          message: 'Você comprar esse mês.',
        })
      }
    }
  }

  handleBuy = (ir) => {
    if (ir.purchasable_all_year) {
      alert('Para meses do ano anterior precisa comprar o plano anual.')
    } else {
      this.setState({ openModal: true, darfID: ir.id })
    }
  }

  printCalc = async (ir) => {
    try {
      const { data } = await impostRendaService.getMemoryCalcDownload(ir.id)
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${ir.id}-${ir.name}-documento-de-calculo.pdf`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  changeFile = (event) => {
    this.setState({
      attachmentedReceipt: event.target.files[0],
    }, () => {
      this.attachmenteReceiptOpen()
    })
  }

  handleMenu = (attachmenteReceiptId, event) => {
    this.setState({ attachmenteReceiptId, openMenu: event.currentTarget })
  }

  attachmenteReceiptSubmit = async () => {
    try {
      this.setState({ loadingMsn: true })
      const { attachmentedReceipt, attachmenteReceiptId } = this.state
      const attachmentData = new FormData()
      attachmentData.append('archive', attachmentedReceipt)
      attachmentData.append('type', 'darf')
      attachmentData.append('darf_id', attachmenteReceiptId)
      const { data } = await impostRendaService.postAttachmentReceipt(attachmentData)
      console.log('RESPOSTA: ', data)
      this.setState({
        openAttechRereipt: false,
        loadingMsn: false,
        openSnack: true,
        message: data.message || 'Documento anexado com sucesso.',
      })
    } catch (error) {
      console.log(error.response)
      const { data } = error
      this.setState({
        openAttechRereipt: false,
        loadingMsn: false,
        openSnack: true,
        message: data.message || 'Não foi possível anexar. Tente Mais tarde.',
      })
    }
  }

  attachmenteReceiptOpen = () => {
    this.setState({ openAttechRereipt: true })
  }

  handleMenuClose = () => {
    this.setState({ openMenu: null })
  }

  handleClose = () => {
    this.setState({ openSnack: false })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleAttachementModalClose = () => {
    this.setState({ openAttechRereipt: false })
  }

  render() {
    const {
      dense,
      openSnack,
      irList,
      loading,
      openMenu,
      openAttechRereipt,
      message,
      loadingMsn,
      openModal,
      darfID,
    } = this.state
    const { classes } = this.props
    const open = Boolean(openMenu)
    return (
      <div className={classes.root}>
        <div className={classes.mobileView}>
          <Menu
            anchorEl={openMenu}
            open={open}
            onClose={this.handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            <MenuItem>
              <input
                className={classes.input}
                id="contained-button-file2"
                type="file"
                onChange={(event) => {
                  this.changeFile(event)
                  this.handleMenuClose()
                }}
              />
              <label htmlFor="contained-button-file2">
                Anexar comprovante
              </label>
            </MenuItem>
          </Menu>
          <Grid container spacing={16}>
            {!!irList.length && irList.map(ir => (
              <Grid item xs={12} sm={6} md={4} key={ir.id}>
                <Card>
                  <CardHeader
                    // action={(
                    //   <IconButton
                    //     aria-label="More"
                    //     aria-haspopup="true"
                    //     color="inherit"
                    //     disabled={ir.is_calculating}
                    //     onClick={event => this.handleMenu(ir.id, event)}
                    //   >
                    //     <MoreVertIcon />
                    //   </IconButton>
                    //   )}
                    title={irStatus(ir.status, ir.amount)}
                    subheader={`Status: ${ir.status_title} \n Data: ${ir.name}`}
                  />
                  <CardActions>
                    {
                      ir.status === 'desabilitado' ? (
                        <Button
                          className={classes.iconButton}
                          onClick={() => this.handleBuy(ir)}
                          aria-label="Receipt"
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={ir.is_calculating}
                        >
                          Comprar
                        </Button>
                      ) : (
                        <Fragment>
                          <Button
                            className={classes.iconButton}
                            onClick={() => this.printDarf(ir)}
                            aria-label="Receipt"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={ir.is_calculating}
                          >
                          Gerar Darf -
                          </Button>
                          <Button
                            className={classes.iconButton}
                            onClick={() => this.printCalc(ir)}
                            aria-label="Calc"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={ir.is_calculating}
                          >
                            Documento de cálculo
                          </Button>
                        </Fragment>
                      )
                    }
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.desktopView}>
          <Paper elevation={2}>
            <List dense={dense} disablePadding>
              {
                loading && (
                  <ListItem className={classes.listItem} button>
                    <ListItemText
                      primary={(
                        <Typography variant="inherit">Aguarde...</Typography>
                      )}
                    />
                  </ListItem>
                )
              }
              {
                !!irList.length && irList.map(ir => (
                  <ListItem key={ir.id} className={classes.listItem} button>
                    <ListItemText
                      style={{ maxWidth: '300px' }}
                      primary={(
                        <Typography variant="h6">
                          {irStatus(ir.status, ir.amount)}
                        </Typography>
                      )}
                    />
                    <ListItemText
                      style={{ maxWidth: '200px' }}
                      primary={ir.name}
                    />
                    <ListItemText
                      primary={ir.status_title}
                    />
                    <ListItemSecondaryAction className={classes.action}>
                      {
                          ir.status === 'desabilitado' ? (
                            <Button
                              className={classes.iconButton}
                              onClick={() => this.handleBuy(ir)}
                              aria-label="Receipt"
                              variant="contained"
                              color="primary"
                              size="small"
                              disabled={ir.is_calculating}
                            >
                              Comprar
                            </Button>
                          ) : (
                            <Fragment>
                              <Button
                                className={classes.iconButton}
                                onClick={() => this.printDarf(ir)}
                                aria-label="Receipt"
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={ir.is_calculating}
                              >
                                <CloudDownloadIcon className={classes.icon} />
                                Gerar Darf
                              </Button>
                              <Button
                                className={classes.iconButton}
                                onClick={() => this.printCalc(ir)}
                                aria-label="Calc"
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={ir.is_calculating}
                              >
                                <ReceiptIcon className={classes.icon} />
                                Documento de cálculo
                              </Button>
                            </Fragment>
                          )
                        }
                      {/* <input
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={event => this.changeFile(event)}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          className={classes.iconButton}
                          aria-label="Anexo de pagamento"
                          variant={!!ir.archives.length ? 'contained' : 'outlined'}
                          color="primary"
                          size="small"
                          component="span"
                          disabled={ir.is_calculating}
                          onClick={() => this.setState({ attachmenteReceiptId: ir.id })}
                        >
                          { !!ir.archives.length ? 'Comprovante Anexado' : 'Anexar comprovante' }
                        </Button>
                      </label> */}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </div>
        {/* <IrAttactchmentReceiptModal
          open={openAttechRereipt}
          loading={loadingMsn}
          handleAction={this.attachmenteReceiptSubmit}
          handleCloseModal={this.handleAttachementModalClose}
        /> */}
        <LoosePlanModal
          open={openModal}
          darfID={darfID}
          handleCloseModal={this.handleCloseModal}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openSnack}
          autoHideDuration={1500}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={(
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          )}
        />
      </div>
    )
  }
}

IR.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(styles)(IR)
