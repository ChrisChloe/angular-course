import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

const IrAttactchmentReceiptModal = ({
  open,
  handleCloseModal,
  handleAction,
  loading,
}) => (
  <div>
    <Dialog
      style={{ minWidth: 400 }}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Anexo</DialogTitle>
      <DialogContent style={{ minWidth: 400 }}>
        <DialogContentText id="alert-dialog-description">
           Anexo selecionado.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
           Voltar
        </Button>
        <Button
          onClick={handleAction}
          variant="contained"
          color="primary"
          autoFocus
          disabled={loading}
        >
          {loading ? 'Anexando...' : 'Anexar'}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

IrAttactchmentReceiptModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
}

export default withStyles(styles)(IrAttactchmentReceiptModal)
