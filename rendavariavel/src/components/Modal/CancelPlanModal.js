import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'

import PaymentServices from '../../services/paymentService'

class CancelPlanDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openSnack: false,
      message: '',
    }
  }

  cancelPlan = async () => {
    const { order, handleCloseModal } = this.props

    try {
      const { data } = await PaymentServices.cancelPlan(order.id)
      if (data.error) {
        this.setState({ openSnack: true, message: 'Erro ao tentar cancelar plano' })
        handleCloseModal()
      } else {
        window.location.reload()
      }
    } catch (error) {
      this.setState({ openSnack: true, message: 'Erro ao tentar cancelar plano' })
      handleCloseModal()
      console.log('Error getPlans: ', error)
    }
  }

  handleClose = () => {
    this.setState({ openSnack: false })
  }

  render() {
    const { open, handleCloseModal } = this.props
    const { openSnack, message } = this.state

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Cancelamento de Plano</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
          Ao cancelar seu plano você continuará com sua conta, porém não visualizará mais seus dados
          como: Cotação de ações, emitir darf e tudo que contempla seu plano.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
          Voltar
            </Button>
            <Button onClick={this.cancelPlan} color="primary" autoFocus>
          Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnack}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    )
  }
}

export default CancelPlanDialog
