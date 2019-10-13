import React, { Component }     from 'react';
import { nextModal, prevModal } from '../../actions/order_actions';
import { connect }    from 'react-redux';
import ConditionTerms from './ConditionTerms';
import OrderReview    from './OrderReview';
import PayTransfer    from '../emission/PayTransfer';

class DialogOrderConclusion extends Component{

    constructor(props){
        super(props);
        this.state = {
            components:[
                <ConditionTerms />,
                <OrderReview />,
                <PayTransfer isTransfer={true}/>
            ]}
    }

    render (){

        const { components }          = this.state;
        const { index, isPay, flight} = this.props;

        return (
            <div className='modal right' tabIndex='-1' role='dialog' id='modal-op-step-1' aria-labelledby='Concluir Pedido' aria-hidden='true'>
            {isPay
                ? <section className='box-conclusao-pedido'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' data-dismiss='modal' aria-hidden='true'>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title' id='myModalLabel'>Anexar comprovantes de transferência
                                    bancária</h4>
                            </div>
                            <div className='modal-body content-modal'>
                                <div className='col-md-12'>
                                    {components[index]}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : flight && components[index]
            }
        </div>
        );
    }
}

const mapStateToProps = state => {

    return {flight: state.busca.flight
          , flightBack: state.busca.flightBack
          , index: state.order.index}

};

export default connect(mapStateToProps, { nextModal, prevModal })(DialogOrderConclusion);
