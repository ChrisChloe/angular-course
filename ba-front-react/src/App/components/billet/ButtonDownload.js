import React,{Component}   from 'react';
import {connect}           from 'react-redux';
import  fileDownload       from 'react-file-download';
import { downloadBillets } from '../../actions/emission_actions';


class BtnDownload extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonStyle: 'btn btn-sm btn-success',
            iconStyle: 'fa fa-file-pdf-o',
            buttonDisabled: false
        }
    }

    handleDownload(e, id){
        e.preventDefault();

        this.setState({
            ...this.state,
            buttonStyle: 'btn btn-sm btn-success',
            iconStyle:   'fa fa-spinner fa-spin',
            buttonDisabled: true
        });

        this.props.downloadBillets(id).then(response => {

            fileDownload(response.payload.data.data, `boleto-${id}.pdf`);
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
        const { id } = this.props.billet;
        const { status } = this.props.billet;

        let { buttonStyle, iconStyle, buttonDisabled} = this.state;
        return (
            <button className={buttonStyle} type="button" ref="button" onClick={(e) => this.handleDownload(e, id)} title={status === 5 ? 'Baixar Boleto' : 'Só é possível baixar boletos em remessa'} disabled={buttonDisabled || status !== 5}>
                <i  className={iconStyle}/> PDF
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps, { downloadBillets })(BtnDownload);