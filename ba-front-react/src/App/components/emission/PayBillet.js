import React, {Component} from 'react';
import {connect}          from 'react-redux';
import {hashHistory}      from 'react-router';
import {sendSearchHash, sendUuid} from '../../actions/busca_actions';
import {setDialogIndex, gatewayBoleto, setMethodPay, sendOp} from '../../actions/order_actions';
import ModalProcessPay from '../payment/ModalProcessPay';

class PayBillet extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false, show: false};
    }

    toggleModalProcessPay (status) {
        this.setState({show: status});

        const event = status ? 'add' :  'remove';

        document.getElementsByTagName('body')[0].classList[event]('fixedOverlay')
    }

    payBillet (op) {

        this.props.gatewayBoleto(op.id)
        .then(response => {
            if(response.payload.data.error) throw response.payload.data;
            this.setState({loading: false});
            setTimeout(() => {
                /*$('#modal-process').modal('hide');*/
                this.toggleModalProcessPay(false);

                this.redirect();
            }, 6000)
        })
        .catch(e => {
            console.log(e);
        })

    }

    confirm(e) {

        const {newOp} = this.props;

        e.preventDefault();
        this.setState({loading: true});
        this.toggleModalProcessPay(true);

        /*$('#modal-process').modal();*/

        setTimeout(() => {
            const method         = this.props.method;
            const isModifyMethod = this.props.isModifyMethod;

            if (isModifyMethod) {

                const op = this.props.op;
                this.payBillet(op);

            } else {

                this.props.sendOp(newOp.id)
                .then(res => {

                    //DEPRECATED
                    const tracker = {
                        search_hash: this.props.hashTracker,
                        status: 4
                    };
                    this.props.sendSearchHash(tracker);
                    //DEPRECATED

                    const uuidTracker = {
                        search_group_uuid: this.props.uuid,
                        status: 4
                    };

                    this.props.sendUuid(uuidTracker);
                    this.payBillet(newOp);

                })

            }


        }, 3500)
    }

    redirect(){
        hashHistory.push('/emissoes');
        window.location.reload();
    }

    cancel(e) {
        e.preventDefault();
        this.props.setMethodPay('');
    }

    render() {

        return (
            <div>
                <div className="col-md-12 alert alert-msg">
                    <span>
                        <strong>Confirma o pagamento por Boleto?</strong>
                        <br className="vissible-xs"/><br className="visible-xs"/>
                    </span>
                    <div className="row row-btns">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 pull-right div-max-width">
                            <button className="btn btn-success btn-sm btn-block m-l-n-xs btn-max-width"
                                    onClick={(e) => this.confirm(e)}>Sim</button>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 pull-right div-max-width cancel-btn">
                            <button className="btn btn-default btn-sm btn-block btn-max-width"
                                    onClick={(e) => this.cancel(e)}>Cancelar</button>
                        </div>
                    </div>
                </div>

                <ModalProcessPay
                    type={'billet'}
                    loading={this.state.loading}
                    show={this.state.show}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        op: state.order.op,
        newOp:state.order.newOp,
        method:state.order.method,
        hashTracker: state.busca.hashTracker,
        uuid: state.busca.uuid
    }

};

export default connect(mapStateToProps, {setDialogIndex, gatewayBoleto, setMethodPay, sendOp, sendSearchHash, sendUuid})(PayBillet);