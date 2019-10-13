import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

// import { getPlans } from '../../redux/actions/paymentActions'
// import SelectPlans from './SelectPlans'
// import { getSessionId } from '../../redux/actions/paymentActions'


class UploadFiles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: {},
      errors: {},
    }
  }

  render() {
    const { handleSubmit } = this.props
    const { files, errors } = this.state

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Anexos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              proof_of_address: {},
              identification_document: {},
            }}
            onSubmit={(values, { setSubmitting }) => {
              const formDataIdentification = new FormData()
              const formDataAddress = new FormData()
              const error = {}

              if (files.identification_document && files.proof_of_address) {
                formDataIdentification.append('archive', files.identification_document)
                formDataAddress.append('archive', files.proof_of_address)
                const attachments = { formDataAddress, formDataIdentification }
                handleSubmit(attachments)           
              }
              if (!files.proof_of_address) {
                error.proof_of_address = true
              }
              if (!files.identification_document) {
                error.identification_document = true
              }
              this.setState({ errors: error })
              setSubmitting(false)
            }}
          >
            {({
              handleSubmit,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={6}>
                    <input
                      accept="image/*"
                      id="proof_of_address"
                      type="file"
                      name="proof_of_address"
                      onChange={(e) => {
                        const value = e.target.files[0]
                        this.setState({ files: { ...files, proof_of_address: value } })
                      }}
                      hidden
                    />
                    <label htmlFor="proof_of_address">
                      <Button variant="contained" fullWidth color="primary" component="span">
                            Comprovante de Residência
                        <CloudUploadIcon style={{ marginLeft: '10px' }} />
                      </Button>
                      <FormHelperText>
                        Anexe uma imagem nítida do seu comprovante de residência.
                      </FormHelperText>
                    </label>
                    {errors.proof_of_address && !files.proof_of_address && <FormHelperText id="component-error-text" error style={{ fontSize: '16px' }}>Selecione um Arquivo</FormHelperText>}
                    {files.proof_of_address && <FormHelperText id="component-error-text" style={{ fontSize: '16px', color: 'green' }}>Arquivo Selecionado</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input
                      accept="image/*"
                      id="identification_document"
                      type="file"
                      name="identification_document"
                      onChange={(e) => {
                        const value = e.target.files[0]
                        this.setState({ files: { ...files, identification_document: value } })
                      }}
                      hidden
                    />
                    <label htmlFor="identification_document">
                      <Button variant="contained" fullWidth color="primary" component="span">
                            Documento de Identificação
                        <CloudUploadIcon style={{ marginLeft: '10px' }} />
                      </Button>
                      <FormHelperText>
                        Anexe uma imagem nítida do seu documento de identificação.
                      </FormHelperText>
                    </label>
                    {errors.identification_document && !files.identification_document && <FormHelperText id="component-error-text" error style={{ fontSize: '16px' }}>Selecione um Arquivo</FormHelperText>}
                    {files.identification_document && <FormHelperText id="component-error-text" style={{ fontSize: '16px', color: 'green' }}>Arquivo Selecionado</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Avançar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    )
  }
}

UploadFiles.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
}

export default UploadFiles
