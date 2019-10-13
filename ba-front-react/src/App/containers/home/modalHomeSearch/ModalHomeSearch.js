import React, { Component } from 'react';
import {getShowModal} from '../../../actions/busca_actions';
import {connect} from 'react-redux';
import './style.css';

class ModalHomeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false, searching: false };
    }

    componentDidUpdate() {
        if ((!this.state.searching) && this.props.searching) {
            this.setState({searching: true});

            this.props.getShowModal()
            .then((banner) => {
                const show = banner.payload.data.data.show;
                this.setState({show: show})
            })
            .catch((error) => { });

        }
    }

    close (){
        this.setState({ show: false });
    }

    render () {

        return (
            <div onClick={() => this.close()} className={`modal right animated  ${this.state.show ? 'show' : ' fadeOut'}`} tabIndex="-1" role="dialog" id="modal" aria-labelledby="Buscar pasasgens">
                <div className={`modal-dialog animated ${this.state.show ? 'pulse' : ' fadeOut'}`} id="modal-dialog">
                    <div className="modal-content"  id="modal-content">
                        <div className="modal-header text-right" id="modal-header">
                            <a onClick={() => this.close()} id="close-modal-azul"> X </a>
                        </div>
                        <div  className="modal-body content-modal" id="content-modal">
                            <div className="col-md-12" style={{position: 'relative'}}>
                                <img className="img-rounded im-responsive" src="assets/img/background_modal_home.png" alt=""/>

                                <div className="centered box-card-custom animated tada message-top" style={{textAlign: 'center'}}>
                                    <div className="row"  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <div className="text-modal ">
                                            <h3 style={{fontWeight: 'bold'}}>Percebemos que você ainda não emitiu nenhuma passagem! <br/>
                                                Não corra o risco de ter o usuário bloqueado :(
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="centered-under message-bottom" style={{textAlign: 'center'}}>
                                    <div className="row" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <div className="text-modal text-under col-md-10 animated bounceInUp">
                                            <h3>Está Com dificuldades?</h3>
                                        </div>
                                        <div className="text-modal col-md-10 animated bounceInUp">
                                            <h2>Fale conosco!</h2>
                                        </div>
                                        <div className="text-modal col-md-10 animated bounceInUp">
                                            <h3>(81) 4042.9770 | contato@buscaaereo.com.br</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        searching:   state.busca.searching
    }
};


export default  connect( mapStateToProps , {getShowModal})(ModalHomeSearch);
