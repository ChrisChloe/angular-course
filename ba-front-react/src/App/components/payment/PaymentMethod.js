import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { format }           from '../../utils/utils';
import { getTooltip, getRow }      from '../../utils/rulesMessages';
import { show }             from 'react-notification-system-redux';
import ReactTooltip         from 'react-tooltip'
import SelectedMethodPay    from './SelectedMethodPay';
import FlightsTableResume   from '../order/FlightsTableResume';
import { setDialogIndex, gatewaybillet, gatewayCash, notified, setMethodPay} from "../../actions/order_actions";

class PaymentMethod extends Component{

    constructor (props) {
        super(props);
        this.state = {disablePayments: false};
        this.cielo     = null;
        this.pagseguro = null;
        this.billet    = null;

    }

    componentWillMount () {

        const {receiptsRules} = this.props;
        const rules = receiptsRules.data;
        this.props.setMethodPay(null);

        this.cielo     = rules.cielo;
        this.pagseguro = rules.pagseguro;
        this.billet    = rules.billet;

    }

    componentDidMount () {

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = "$('html, body').removeClass('smooth');$('.box-pagamento').click(function() { $('html,body').animate({  scrollTop: $('.box-pagamento').offset().top}, 'slow');});";
        this.instance.appendChild(s);

    }

    browser (method) {
        this.props.setMethodPay(method);
    }


    isSelected (pay) {
        return (this.props.method === pay)
    }


    disablePayments (value) {
        this.setState({disablePayments: value});
    }


    isDisableRule (rule) {
        return (this[rule] && (!this[rule].enabled || ( this[rule] && this[rule].cause === 'DATE' )));
    }


    showAlertRow (rule) {
        if(this[rule] && ((!this[rule].enabled || !this[rule].can_pay ) && this[rule].cause)) {
            return getRow(this[rule].cause);
        }
    }


    showTooltip (rule) {
        if(this[rule] && ((!this[rule].enabled || !this[rule].can_pay) && (this[rule].cause !== 'LIMIT'))) {
            const type = (this[rule].cause === 'DISABLED' || this[rule].cause === 'DATE') ? 'error' : 'warning';

            return (<ReactTooltip className='extraClass' id={`${rule}_cause`} effect='solid' type={`${type}`} aria-haspopup='true' role='example'>
                        {getTooltip(this[rule].cause)}
                    </ReactTooltip>)
        }
    }

    render () {

        const {newOp} = this.props;
        const disableClass = 'noclick';

        return (
            <div className='animated fadeInLeft container'>
                <div className='row'>
                    <div className="panel">
                        <div className="panel-body">
                            <div className={'row'} ref={el => (this.instance = el)}>
                                <div className="col-md-12">
                                    <div className={'step '}>
                                        <h3>Pagamento de Ordem de Passagem </h3>
                                    </div>
                                </div>

                                {this.props.isModifyMethod &&

                                <div className='col-12'>
                                    <FlightsTableResume opFlight={newOp.flight} opFlightBack={newOp.flightBack}
                                                        paymentPresentation={true}/>
                                </div>

                                }
                                {this.props.isModifyMethod &&
                                <div className="col-md-12">
                                    <div className="box-sum-price col-xs-12 col-lg-12 col-md-12" style={{borderTop: '1px solid #ddd', marginTop: '5px', borderBottom: '1px solid #ddd'}}>
                                        <span className="col-md-12 col-xs-12 col-lg-12 text-right">Valor Total: {format(newOp.price)}</span>
                                    </div>
                                </div>
                                }

                                <div className="col-md-12" style={{marginTop: '7px'}}>
                                    <div className="step">
                                        <h6>Selecione a forma de Pagamento</h6>
                                    </div>

                                    <div style={{width: '20%', float: 'left'}}>
                                        <div className={this.isSelected('transfer') ? 'box-pagamento selected' : 'box-pagamento'}
                                             onClick={(!this.state.disablePayments) && (() => this.browser('transfer'))}>
                                            <img className="img-responsive"
                                                 src="assets/img/payment/transferencia.png"
                                                 style={{margin:"-1px 0 5px 0"}}/>
                                            <p className="hidden-xs"
                                               style={{fontSize: 11,padding: 9}}><span className="hidden-lg">Transferência</span> <span className="visible-lg">Transferência Bancária</span></p>
                                        </div>
                                    </div>

                                    <div className={(this.isDisableRule('billet') || this.state.disablePayments ) && disableClass}
                                         style={{width: '20%', float: 'left'}}>
                                        <div data-tip data-for='billet_cause' className={this.isSelected('billet') ? 'box-pagamento selected' : 'box-pagamento'}
                                             onClick={(!this.isDisableRule('billet') && !this.state.disablePayments) &&  (() => this.browser('billet'))} >
                                            <img className="img-responsive"
                                                 src="/assets/img/payment/boleto.png"
                                                 style={{margin:"6px 0 10px 0"}}/>
                                            <p className="hidden-xs">boleto</p>
                                        </div>
                                    </div>

                                    {this.showTooltip('billet')}

                                    <div className={(this.isDisableRule('pagseguro') || this.state.disablePayments ) && disableClass}
                                        style={{width: '20%', float: 'left'}}>
                                        <div data-tip data-for='pagseguro_cause'  className={this.isSelected('pagseguro') ? 'box-pagamento selected' : 'box-pagamento' }
                                            onClick={(!this.isDisableRule('pagseguro') && !this.state.disablePayments) && (() => this.browser('pagseguro'))}>
                                            <img width="126" className="img-responsive logo-pagseguro"
                                                src="/assets/img/payment/logo-pagseguro.png"
                                                style={{margin:"-3px 0 10px 0"}}/>
                                            <p className="hidden-xs">Pagseguro</p>
                                        </div>
                                    </div>

                                    {this.showTooltip('pagseguro')}

                                    {/*<div className={this.state.disablePayments && disableClass}*/}
                                         {/*style={{width: '20%', float: 'left'}}>*/}
                                        {/*<div data-tip data-for='pagseguro_cause' className={this.isSelected('pagseguro') ? 'box-pagamento selected' : 'box-pagamento' }*/}
                                             {/*onClick={!this.state.disablePayments && (() => this.browser('pagseguro'))}>*/}
                                            {/*<img width="126" className="img-responsive logo-pagseguro"*/}
                                                 {/*src="/assets/img/payment/logo-pagseguro.png"*/}
                                                 {/*style={{margin:"-3px 0 10px 0"}}/>*/}
                                            {/*<p className="hidden-xs">Pagseguro</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*{this.showTooltip('pagseguro')}*/}


                                    <div className={this.state.disablePayments && disableClass}
                                         style={{width: '20%', float: 'left'}} >
                                        <div className={this.isSelected('debit') ? 'box-pagamento selected' : 'box-pagamento'}
                                             onClick={!this.state.disablePayments && (() => this.browser('debit'))}>
                                            <img className="img-responsive"
                                                 src="/assets/img/payment/debit.png"
                                                 style={{margin:"-1px 0 5px 0"}}/>
                                            <p className="hidden-xs">Débito</p>
                                        </div>
                                    </div>

                                    <div className={(this.isDisableRule('cielo') || this.state.disablePayments ) && disableClass}
                                         style={{width: '20%', float: 'left'}}>
                                        <div data-tip data-for='cielo_cause' className={this.isSelected('cielo') ? 'box-pagamento selected' : 'box-pagamento'} id="credit"
                                             onClick={(!this.isDisableRule('cielo') &&  !this.state.disablePayments) && (() => this.browser('cielo'))  }>
                                            <img className="img-responsive"
                                                 src="/assets/img/payment/credit.png"
                                                 style={{margin:"-1px 0 5px 0"}}/>
                                            <p className="hidden-xs">Crédito</p>
                                        </div>
                                    </div>

                                    {this.showTooltip('cielo')}

                                </div>


                                {this.props.method &&
                                    <div className="col-md-12 rowAlertPayment">
                                        {/* {this.showAlertRow(this.props.method)} */}
                                        <SelectedMethodPay isModifyMethod={false} method={this.props.method} disablePayments={(value) => this.disablePayments(value)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>);
    }

}

const mapStateToProps = state => {

    return {
        receiptsRules: state.order.receiptsRules,
        method:        state.order.method,
        isNotified:    state.order.notified,
        newOp:         state.order.newOp,
        flight:        state.busca.flight
    };
};

export default connect(mapStateToProps, { setDialogIndex, gatewaybillet, gatewayCash, notified, setMethodPay, show })(PaymentMethod);
