import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect }   from 'react-redux';
import { openTerms } from '../../actions/order_actions';
import { sendSearchHash, sendUuid } from '../../actions/busca_actions';

class ConditionTerms extends Component{


    toOrderReview () {

        // DEPRECATED
        const tracker = {
            search_hash: this.props.hashTracker,
            status: 2
        };
        this.props.sendSearchHash(tracker);
        // DEPRECATED


        const uuidTracker = {
            search_group_uuid: this.props.uuid,
            status: 2
        };

        this.props.sendUuid(uuidTracker);

        hashHistory.push('/review');

    }

    renderConditionalTerms (terms) {
        return (
            <section className={`box-conclusao-pedido modal modal-time ${terms ? 'show' : 'fadeInDown' }`} style={{zIndex: '99999999', background: 'rgba(0,0,0,.4)'}} data-backdrop="static" role="dialog" id="modal-conditional" data-keyboard="false">
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content' style={{maxHeight: '80vh', overflow: 'auto'}}>
                        <div className='modal-header'>
                            <button type='button' className='close' onClick={() => this.props.openTerms(false)} aria-hidden='true'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title' id='myModalLabel'>Emissão de ordem de passagem</h4>
                        </div>

                        <div className='modal-body conditional-modal-body' style={{maxHeight: '80vh', marginBottom: '60px'}}>
                            <div id='step1'>

                                <div className='step'>
                                    <h6>Termos e condições <span>1</span></h6>
                                </div>

                                <section id='termo'>
                                    <h5>Leia os termos e condições para continuar o processo de confirmação.</h5>
                                    <p>
                                        Termos e condições que devem ser lidos antes da cotação e conclusão do pedido.
                                        O passageiro precisa ser informado que o bilhete está sendo emitido com milhas e
                                        estar ciente de todas as regras de cancelamento e alteração da emissão solicitada.
                                    </p>

                                    <p>
                                        A formalização da ordem de passagem (OP) não garante reserva nas companhias
                                        solicitadas, a emissão só será efetivada de acordo com a disponibilidade da vaga no
                                        momento da emissão.
                                        Solicitamos atenção no que se refere aos trechos promocionais que só são emitidos
                                        ida e volta no mesmo localizador para ter o desconto na tarifa, se forem solicitados
                                        em companhias diferentes geram um aumento na tarifa, caso essa situação ocorra
                                        passaremos o novo valor e aguardaremos nova autorização.
                                    </p>

                                    <p>
                                        Segue abaixo nosso horário de atendimento, informamos que as emissões enviadas fora
                                        desse horário de atendimento só serão emitidas no expediente seguinte.
                                    </p>

                                    <ul className='list-unstyled'>
                                        <li>
                                            <strong>Segunda a sexta:</strong> 06:00 às 00:00 horas.
                                        </li>
                                        <li>
                                            <strong>Sábado:</strong> 09:00 às 22:00 horas.
                                        </li>
                                        <li>
                                            <strong>Domingo:</strong> 09:00 às 21:00 horas.
                                        </li>
                                        <li>
                                            <em>Equipe Busca Aéreo.</em>
                                        </li>
                                    </ul>

                                    <p className=''>
                                        <strong>*</strong>
                                        <small>
                                            Emissões enviadas antes ou após estes horários, só serão emitidas no horário
                                            correto
                                            especificado acima.
                                        </small>
                                    </p>
                                </section>

                            </div>
                        </div>

                        
                    </div>
                    <div className='modal-footer' 
                            style={{
                                position: 'absolute', 
                                bottom:'0', zIndex: '99999999', 
                                background: '#FFF', width: '100%', 
                                marginTop: '30px', 
                                borderRadius: '6px',
                                borderTop: 'none'
                            }}>
                            <div className='term-accept'>
                                <button type='button' className='btn btn-danger'  onClick={() => this.props.openTerms(false)}>Desisto</button>
                                <button type='button' className='btn btn-success' onClick={() => this.toOrderReview()}>Li e aceito.</button>
                            </div>
                        </div>
                </div>
            </section>
        )
    }

    render() {

        const {terms} = this.props;

        return (
            <div>
                {terms &&
                    this.renderConditionalTerms(terms)
                }
            </div>

        )
    }
}

const mapStateToProps = state => {

    return {
        terms: state.order.terms,
        hashTracker: state.busca.hashTracker,
        uuid: state.busca.uuid
    };

};

export default connect(mapStateToProps, { openTerms, sendSearchHash, sendUuid })(ConditionTerms);
