import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

const BrokerageFeeModal = ({
  open,
  handleCloseModal,
  feeValue,
  percent,
  handleChangeMoney,
  handleChangePercent,
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
      <DialogTitle id="alert-dialog-title">Editar Taxa</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           Atualize o valor ou percentagem da corretagem e tipo de aplicação
          {' '}
           dessas taxas:
          {' '}
        </DialogContentText>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="fee"
              label="Valor"
              name="feeValue"
              fullWidth
              type="text"
              value={feeValue}
              onChange={handleChangeMoney}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="percent"
              label="Percentual"
              name="percent"
              fullWidth
              type="text"
              value={percent}
              onChange={handleChangePercent}
              margin="normal"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary" disabled={loading}>
           Voltar
        </Button>
        <Button
          onClick={handleAction}
          variant="contained"
          color="primary"
          autoFocus
          disabled={loading}
        >
          {loading ? 'Aguarde...' : 'Alterar'}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default withStyles(styles)(BrokerageFeeModal)
