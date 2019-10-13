import React,{Component} from 'react';
import {connect}         from 'react-redux';
import  fileDownload     from 'react-file-download';
import {DownloadPDF}     from '../../actions/emission_actions';


class BtnDownload extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonStyle: 'btn btn-sm btn-success',
            iconStyle: 'fa fa-file-pdf-o',
            buttonDisabled: false
        }
    }

    _handleDownload(e, id){
        e.preventDefault();

        this.setState({
            ...this.state,
            buttonStyle: 'btn btn-sm btn-success',
            iconStyle:   'fa fa-spinner fa-spin',
            buttonDisabled: true
        });

        this.props.DownloadPDF(id).then(response => {

            fileDownload(response.payload.data.data, `BuscaAereo-OP-${id}.pdf`);
            this.setState({
                ...this.state,
                buttonStyle: 'btn btn-sm btn-success',
                iconStyle: 'fa fa-file-pdf-o',
                buttonDisabled: false
            })
        }).catch(error => {

            console.log('error:',JSON.stringify(error));
            this.props.show({
                title: 'Erro ao tentar baixar o documento.',
                message: error.message,
                autoDismiss: 15
            }, 'error');

            this.setState({
                ...this.state,
                buttonStyle: 'btn btn-sm btn-success',
                iconStyle: 'fa fa-file-pdf-o',
                buttonDisabled: false
            })
        } )

    }

    render(){
        const {id} = this.props;
        let { buttonStyle, iconStyle, buttonDisabled} = this.state;
        return (
            <button className={buttonStyle} type="button" ref="button" onClick={(e) => this._handleDownload(e, id)} title="Baixar cotação em Pdf" disabled={buttonDisabled}>
                <i  className={iconStyle}/> PDF
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps, {DownloadPDF})(BtnDownload);