import React, {Component} from 'react';
import {connect}     from 'react-redux';
import {hashHistory} from 'react-router';
import PropTypes     from 'prop-types';
import { show }      from 'react-notification-system-redux';
import {mask, isValidCpf} from "../../utils/utils";
import {searchCep}        from "../../actions/emission_actions";
import ModalProcessPay    from "../payment/ModalProcessPay";
import {sendSearchHash, sendUuid} from "../../actions/busca_actions";
import {sendPaymentData, sendCieloPaymentData, setDialogIndex, sendOp} from "../../actions/order_actions";
import moment from 'moment';
import _ from 'lodash';
import {buildObjectOP} from "../../utils/objectOp";

class PayGatewayForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            code: null, disableButton: false, disableInputs: true, validCpf: true, isAmex: false, showPlots: false,
            msg: (<h2><strong>FIQUE DE OLHO NO SEU E-MAIL. </strong> ASSIM QUE SEU PAGAMENTO
                FOR CONFIRMADO, TE ENVIAREMOS UMA MENSAGEM.</h2>),
            msgSeq: 1, status: 0, show:false

        }
    }

    sendGatewayPay(e) {

        e.preventDefault();

        const method  = this.props.method;
        const {name, email, cpf_cnpj} = this.refs;
        this.setState({isError: false, msgSeq: 1, status: 0});

        if (!isValidCpf(cpf_cnpj.value)) {
            this.props.show({
                title: 'Ops!',
                message: 'O campo cpf/cnpj não é válido.',
                autoDismiss: 15
            }, 'error');
            return;
        }

        const {gateway} = this.props;
        const payer = {
            name: name.value
            , email: email.value
            , cpf_cnpj: cpf_cnpj.value.replace(/[\.\-\/]/g, "")
            , gateway
        };

        if (gateway === "cielo") {
            this.handlePayCielo(payer);
            return;
        }

        if (gateway === "debit") {
            this.handlePayCielo(payer, true);
            return;
        }

        this.sendPaymentData(payer, method)
    }

    handleCpf(e) {
        this.setState({validCpf: isValidCpf(e.target.value)});
    }

    paymentData (payer, op) {

        this.props.sendPaymentData(payer, op)
            .then(response => {

                const {payment, gateway} = this.props;

                if (response.error || response.payload.data.error) throw response;

                if (gateway == 'pagseguro')
                    this.handlePayPagSeguro(payment);

            })
            .catch(error => {

                console.log('error', error);

                try {

                    if (error.payload.data.error) {
                        this.props.show({
                            title: 'Ops :(',
                            message: error.payload.data.message,
                            autoDismiss: 15
                        }, 'error');
                    }

                } catch (e) {

                    this.props.show({
                        title: 'Ops :(',
                        message: 'Estamos em manutenção nessa área do sistema.',
                        autoDismiss: 15
                    }, 'error');
                }


                this.setState({disableButton: false})

            })
    }

    browserToEmissao() {
        hashHistory.push(`/emissoes`);
    }

    sendPaymentData(payer = {}, method) {
        const {newOp} = this.props;
        const isModifyMethod = this.props.isModifyMethod;

        this.setState({disableButton: true});

        if (isModifyMethod) {

            const op = this.props.op;
            this.paymentData(payer, op);

        } else {

            this.props.sendOp(newOp.id)
            .then(res => {

                // DEPRECATED
                const tracker = {
                    search_hash: this.props.hashTracker,
                    status: 4
                };
                this.props.sendSearchHash(tracker);
                // DEPRECATED

                const uuidTracker = {
                    search_group_uuid: this.props.uuid,
                    status: 4
                };

                this.props.sendUuid(uuidTracker);
                this.paymentData(payer, newOp);

            })

        }

    }

    handlePayPagSeguro(payment) {

        this.setState({code: payment.transaction_id});
        this.redirect(payment.redirect_url);

    }

    startProcessPayment() {
        this.setState({disableButton: true});
        this.toggleModalProcessPay(true);

        /*$('#modal-process').modal();*/
    }

    endProcessPayment(err = false) {
        this.setState({disableButton: false, status: 1, isError: err});
        setTimeout(() => {
            if (err) {
               /* $('#modal-process').modal('hide');*/
                this.toggleModalProcessPay(false);
            } else {
                /*$('#modal-process').modal('hide');*/
                this.toggleModalProcessPay(false);
                this.browserToEmissao();
            }
        }, err ? 3500 : 10000)
    }

    cieloData (data, opCielo, isDebit) {

        this.props.sendCieloPaymentData(data, opCielo)
            .then(response => {
                if (response.error || response.payload.data.error) throw response;

                const {data} = response.payload;

                if (data.status) {
                    if (isDebit) {
                        this.setState({msg: (
                                <h2><strong>SEUS DADOS FORAM CONFIRMADOS,</strong> INICIANDO O PROCESSO DO SEU PAGAMENTO.
                                </h2>), msgSeq: 1, status: 1
                        });
                        this.endProcessPayment();
                        setTimeout(() => {
                            this.setState({msg: (
                                    <h2><strong>PRONTO!</strong> <br/>VOCÊ SERÁ REDIRECIONADO AO PORTAL DO SEU BANCO PARA
                                        CONCLUIR O PAGAMENTO.</h2>),
                                msgSeq: 2
                            });
                        }, 4000);
                        setTimeout(() => {
                            this.redirect(data.authentication_url);
                        }, 8000);
                    } else {
                        this.setState({isCredit: true});
                        this.endProcessPayment();
                    }
                } else {
                    this.setState({msg: (
                        <h2><strong>HÁ ALGO DE ERRADO! :(</strong> {data.message}</h2>
                            ), msgSeq: 1, status: 1
                    });
                    this.endProcessPayment(true)
                }

            })
            .catch(error => {
                console.log('error: ', error);
                this.endProcessPayment(true);
            })

    }

    handlePayCielo(payer, isDebit = false) {
        const {
            brand, cardNumber,
            securityCode, sessionId,
            cep, street, number, neighborhood,
            expirationMonth, expirationYear,
            city, uf, contact, contact_type, ddd
        } = this.refs;

        const card = cardNumber.value.replace(/[\s]/g, "");

        let  CEP, contactNumber, DDD, credit;

        if(!isDebit) {
            CEP = cep.value.replace(/[\.\-\s]/g, "");
            contactNumber = contact.value.replace(/[\-\s]/g, "");
            DDD = ddd.value.replace(/[\(\)\s]/g, "");

            credit = {
                ...payer
                , brand: brand.value
                , cardNumber: card
                , expirationDate: `${expirationMonth.value}/${expirationYear.value}`
                , gateway: 'cielo'
                , securityCode: securityCode.value
                , type_payment: 'CreditCard'
                , instalments: this.state.plot
                , address: {
                    cep: CEP,
                    street: street.value,
                    number: number.value,
                    neighborhood: neighborhood.value,
                    city: city.value,
                    uf: uf.value
                },
                ddd: DDD,
                contact: contactNumber,
                contact_type: contact_type.value,
                session_id: sessionId.value
            };

        }

        const debit = {
            ...payer
            , brand: brand.value
            , cardNumber: card
            , expirationDate: `${expirationMonth.value}/${expirationYear.value}`
            , gateway: 'cielo'
            , securityCode: securityCode.value
            , type_payment: 'DebitCard'
            , instalments: this.state.plot
        };

        const data = !isDebit ? credit : debit;

        this.startProcessPayment();

        setTimeout(() => {
            const {newOp} = this.props;
            const method  = this.props.method;
            const isModifyMethod = this.props.isModifyMethod;

            if (isModifyMethod) {

                const op = this.props.op;
                const opCielo = {price: op.price, id: op.id};
                this.cieloData(data, opCielo, isDebit);

            } else {

                this.props.sendOp(newOp.id)
                .then(res => {

                    // DEPRECATED
                    const tracker = {
                        search_hash: this.props.hashTracker,
                        status: 4
                    };
                    this.props.sendSearchHash(tracker);
                    // DEPRECATED

                    const uuidTracker = {
                        search_group_uuid: this.props.uuid,
                        status: 4
                    };

                    const opCielo = {price: newOp.price, id: newOp.id};
                    this.cieloData(data, opCielo, isDebit);

                })

            }

        }, 2500);

    }

    redirect(url) {
        document.location = url;
    }

    renderBrands() {
        const {plots} = this.props;

        return _(plots)
            .map((plot, key) => <option key={_.uniqueId()} value={key}>{key}</option>)
            .value();
    }

    renderPlots(type = null) {
        const {plots} = this.props;
        return _(plots[this.state.brand])
            .filter((plot, key) => { if (type ? key === 'debit' : key !== 'debit') { return plot } })
            .map( plot => <option key={_.uniqueId()} value={plot.value}>{plot.title}</option>)
            .value();
    }

    toggleModalProcessPay (status) {
        this.setState({show: status});

        const event = status ? 'add' :  'remove';

        document.getElementsByTagName('body')[0].classList[event]('fixedOverlay')

    }

    searchCep(e) {
        e.preventDefault();
        const {cep} = this.refs;
        this.setState({disableInputs: true});
        if (cep.value.length > 7) {

            this.props.searchCep(cep.value).then(response => {
                const {data} = response.payload;

                if(data.erro) throw data.erro;

                const {logradouro, bairro, localidade, uf} = data;
                if(this.validAddress(data)) {
                    this.setState({street: logradouro, neighborhood: bairro, uf: uf, city: localidade})
                } else {
                    this.setState({street: logradouro, neighborhood: bairro, uf: uf, city: localidade});
                    this.setState({disableInputs: false});
                }

            }).catch(error => {
                this.setState({disableInputs: false});
                this.props.show({
                    title: 'Ops :(',
                    message: 'CEP Inválido!',
                    autoDismiss: 10
                }, 'error');
            })

        }
    }

    validAddress(address){

        let array = ['logradouro', 'bairro', 'localidade', 'uf'];
        for (let i = 0; i < array.length; i++) {
            if (_.isEmpty(address[array[i]])) {
                return false;
            }
        }
        return true;
    }

    handleBrand(e) {
        this.setState({brand: e.target.value});
        this.renderPlots();

        if (e.target.value === 'Amex') {
            // $('#gateway-securityCode').mask("0000");
            this.setState({isAmex: true});
        } else {
            // $('#gateway-securityCode').mask("000");
            this.setState({isAmex: false});
        }
    }

    alterMaskCardNumber() {
        const {cardNumber} = this.refs;
        (cardNumber.value === '../-') ? cardNumber.value = '' : '';
        const noMask = cardNumber.value.replace(/[\.\-\/\s]/g, "").length;

        return (noMask > 0 && noMask <= 16)
            ? $('#gateway-cardNumber').mask("0000 0000 0000 0000 0")
            : $('#gateway-cardNumber').mask("000000 0000 00000 0000");
    }

    alterMaskCpf() {
        const {cpf_cnpj} = this.refs;
        (cpf_cnpj.value === '../') ? cpf_cnpj.value = '' : '';
        const noMask = cpf_cnpj.value.replace(/[\.\-\/]/g, "").length;
        return (noMask > 0 && noMask < 12)
            ? $('#cielo-cpf_cnpj').mask("000.000.000-000")
            : $('#cielo-cpf_cnpj').mask("00.000.000/0000-00");
    }

    alterMaskPhone() {
        const {contact_type} = this.refs;
        const noMask = (contact_type.value === 'cellphone' || contact_type.value === 'temporary' || contact_type.value === 'message');

        return noMask
            ? $('#gateway-contact').mask("0 0000-0000")
            : $('#gateway-contact').mask("0000-0000");
    }

    componentDidMount() {
        mask();

        const optionsYear  = _(_.range(moment().year(), moment().year()+10)).map(n => <option key={_.uniqueId()} value={n}>{n}</option>).valueOf();
        const optionsMonth = _(_.range(1, 13)).map(n => <option key={_.uniqueId()} value={n.toString().length === 1 ? `0${n}` : n  }>{n.toString().length === 1 ? `0${n}` : n  }</option>).valueOf();

        this.setState({optionsMonth: optionsMonth, optionsYear: optionsYear});
    }

    render() {

        return (
            <div className="col-md-12">
                {this.props.gateway === "debit" &&
                    <div className="col-md-12 row-debit" style={{background: '#e59124', opacity: '.8', color: '#ffffff'}}>
                        <p>
                            <i className='fa fa-warning'/>  Antes de processar o pagamento, certifique-se que o mólo de segurança
                            do seu internet banking está instalado em seu computador.
                        </p>
                    </div>
                }
                <form id="form-op" name="formOp" onSubmit={(e) => this.sendGatewayPay(e)}>

                    <ModalProcessPay
                        status={this.state.status}
                        error={this.state.isError}
                        isCredit={this.state.isCredit}
                        msg={this.state.msg}
                        msgSeq={this.state.msgSeq}
                        type={'cielo'}
                        show={this.state.show}/>

                    <div className="col-md-12">
                        <div className="row">
                            <div className='col-12 pay-header'>
                                <h3>Informações de Pagamento</h3>
                            </div>
                        </div>

                        <div className="row">

                            <div className='form-group col-lg-4 col-xs-6'>

                                <span>Titular</span>
                                <input type='text'
                                       id={`cielo-name`}
                                       required="true"
                                       ref="name"
                                       placeholder='Exatamente como está gravado no cartão'
                                       className='form-input form-input-default'
                                       autoComplete={'off'}/>

                            </div>

                            <div className='form-group col-lg-4 col-xs-6'>

                                <span>CPF / CNPJ</span>
                                <input type='text'
                                       id={`cielo-cpf_cnpj`}
                                       placeholder='_____._____._____-___'
                                       required="true"
                                       ref="cpf_cnpj"
                                       className={`form-control form-input form-input-default cpf_cnpj ${!this.state.validCpf && 'form-input-danger'}`}
                                       onBlur={(e) => this.handleCpf(e)}
                                       onChange={() => this.alterMaskCpf()}
                                       autoComplete={'off'}/>

                            </div>

                            <div className='form-group col-lg-4 col-xs-12'>

                                <span>Email</span>
                                <input type='email'
                                       id={`cielo-email`}
                                       required="true"
                                       ref="email"
                                       placeholder='Informe seu email'
                                       className='form-control form-input form-input-default'
                                       autoComplete={'off'}/>

                            </div>
                        </div>

                        {(this.props.gateway === "cielo" || this.props.gateway === "debit") &&
                            <div>
                                <div className="row">
                                    <div className='form-group col-xs-8 col-lg-3'>
                                        <span className="hidden-xs hidden-sm">Numero do cartão:</span>
                                        <span className="hidden-lg hidden-md">Cartão:</span>
                                        <input type="text"
                                            id="gateway-cardNumber"
                                            maxLength={`${this.props.gateway === 'debit' ? '22' : '16'}`}
                                            placeholder="Número do Cartão"
                                            className="form-control form-input form-input-default"
                                            required="required"
                                            ref="cardNumber"
                                            onInputCapture={() => this.alterMaskCardNumber()}
                                            autoComplete={'off'}/>

                                    </div>
                                    <div className={`form-group col-xs-4 ${this.props.gateway === 'cielo' ? 'col-lg-2' : 'col-lg-2'}`}>
                                        <span>Bandeira</span>
                                        <select name="type" id="gateway-brand"
                                                className="form-control form-input form-input-default"
                                                onChange={(e) => this.handleBrand(e)}
                                                required="required"
                                                value={this.state.brand}
                                                ref="brand">
                                            <option value="">Selecione</option>
                                            {this.renderBrands()}
                                        </select>
                                    </div>
                                    <div className={`form-group col-xs-6 ${this.props.gateway === 'cielo' ? 'col-lg-2' : 'col-lg-2'}`}>
                                        <div className={'col-12 m-l-n-xs'} id="maturity">
                                            <span>Vencimento:</span>
                                            <div className="col-lg-6 col-xs-6 m-l-n-xs" id="maturityMonth">
                                                <select
                                                    className="form-control form-input form-input-default"
                                                    required={true}
                                                    ref="expirationMonth"
                                                    autoComplete={'off'}>
                                                    <option value="">Mês</option>
                                                    {this.state.optionsMonth}
                                                </select>
                                            </div>
                                            <div className="col-lg-6 col-xs-6 m-r-n" id="maturityYear">
                                                <select
                                                    className="form-control form-input form-input-default"
                                                    required={true}
                                                    ref="expirationYear"
                                                    autoComplete={'off'}>
                                                    <option value="">Ano</option>
                                                    {this.state.optionsYear}
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={`form-group col-xs-6 ${this.props.gateway === 'cielo' ? 'col-lg-2' : 'col-lg-1'}`}>
                                        <span>Código:</span>
                                        <input type="text"
                                            id="gateway-securityCode"
                                            // maxLength={this.state.isAmex ? '4' : '3'}
                                            // minLength={this.state.isAmex ? '4' : '3'}
                                            title="Código de segurança"
                                            placeholder="CVC"
                                            className="form-control form-input form-input-default"
                                            required="required"
                                            ref="securityCode"
                                            autoComplete={'off'}/>

                                    </div>
                                    {(this.props.gateway === 'cielo' || this.props.gateway === 'debit') &&
                                        <div className={`form-group ${this.props.gateway === "debit" ? "col-lg-4" : "col-lg-3"} col-xs-12`}>
                                            <span>Parcelas:</span>
                                            <select id="gateway-plot"
                                                    className="form-control form-input form-input-default"
                                                    required="required"
                                                    value={this.state.plot}
                                                    onChange={(e) => this.setState({plot: e.target.value})}>
                                                <option value="">Selecione</option>
                                                {this.renderPlots(this.props.gateway === 'debit' ? 'debit' : null)}
                                            </select>
                                        </div>
                                    }
    
                                </div>
                                {this.props.gateway === 'cielo' &&
                                    <div>
                                        <div className="row">
                                            <div className='col-12 pay-header'>
                                                <h3>Endereço</h3>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-lg-3 col-xs-4">

                                                <span>CEP*</span>
                                                <input type="text"
                                                    id="gateway-cep"
                                                    className="form-control form-input form-input-default"
                                                    required="required"
                                                    placeholder="00000-000"
                                                    onBlur={(e) => this.searchCep(e)}
                                                    ref="cep"
                                                    onFocus={() => $('#gateway-cep').mask("00.000-000")}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-4 col-xs-8">

                                                <span>Logradouro</span>
                                                <input type="text"
                                                    id="gateway-street"
                                                    className="form-control form-input form-input-default"
                                                    required="required"
                                                    value={this.state.street}
                                                    onChange={(e) => this.setState({street: e.target.value})}
                                                    ref="street" disabled={this.state.disableInputs}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-2 col-xs-3">

                                                <span>Nº</span>
                                                <input type="text"
                                                    id="gateway-number"
                                                    className="form-control form-input form-input-default"
                                                    required="required"
                                                    ref="number"
                                                    onFocus={() => $('#gateway-number').mask('00000000')}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-3 col-xs-9">

                                                <span>Bairro</span>
                                                <input type="text"
                                                    id="gateway-neighborhood"
                                                    required="required"
                                                    className="form-control form-input form-input-default"
                                                    onChange={(e) => this.setState({neighborhood: e.target.value})}
                                                    value={this.state.neighborhood}
                                                    ref="neighborhood" disabled={this.state.disableInputs}
                                                    autoComplete={'off'}/>

                                            </div>

                                        </div>
                                        <div className="row">

                                            <div className="form-group col-lg-3 col-xs-9">

                                                <span>Cidade</span>
                                                <input type="text"
                                                    id="gateway-city"
                                                    required="required"
                                                    className="form-control form-input form-input-default"
                                                    value={this.state.city}
                                                    onChange={(e) => this.setState({city: e.target.value})}
                                                    ref="city" disabled={this.state.disableInputs}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-1 col-xs-3">

                                                <span>UF</span>
                                                <input type="text"
                                                    id="gateway-state"
                                                    className="form-control form-input form-input-default"
                                                    value={this.state.uf}
                                                    onChange={(e) => this.setState({uf: e.target.value})}
                                                    ref="uf" disabled={this.state.disableInputs}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-4 col-xs-12">

                                                <span>Tipo de Contato</span>

                                                <select name="type"
                                                        id="gateway-contact_type"
                                                        className="form-control form-input form-input-default"
                                                        required="required"
                                                        ref="contact_type">
                                                    <option value="">Selecione</option>
                                                    <option value="cellphone">Celular</option>
                                                    <option value="phone">Residencial</option>
                                                    <option value="company_phone">Comercial</option>
                                                    <option value="message">Recado</option>
                                                    <option value="collection">Cobrança</option>
                                                    <option value="temporary">Temporário</option>
                                                </select>

                                            </div>
                                            <div className="form-group col-lg-1 col-xs-4">

                                                <span>DDD</span>
                                                <input type="text"
                                                    maxLength="3"
                                                    id="gateway-contact-ddd"
                                                    placeholder="(__)"
                                                    required="required"
                                                    className="form-control form-input form-input-default"
                                                    ref="ddd"
                                                    onFocus={() => $('#gateway-contact-ddd').mask("(00)")}
                                                    autoComplete={'off'}/>

                                            </div>
                                            <div className="form-group col-lg-3 col-xs-8">

                                                <span>Número</span>
                                                <input type="text"
                                                    id="gateway-contact"
                                                    placeholder="______-____"
                                                    maxLength={15}
                                                    required="required"
                                                    className="form-control form-input form-input-default"
                                                    ref="contact"
                                                    onFocus={() => this.alterMaskPhone()}
                                                    autoComplete={'off'}/>

                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                    </div>

                    <div style={{"height": "40px"}}>
                                    <span id="wrap-redepay-btn" style={{opacity: 0}}>
                                        <script src="https://checkout.useredepay.com.br/checkout.js"
                                                data-publishable-key="95b33dcd-5668-4fc2-aabc-0d7be21070ea"
                                                data-image="cen1_hor_op1_pc_225x45"
                                                data-order-id={this.state.code}>
                                        </script>
                                    </span>
                    </div>

                    <div className="modal-footer">
                        <div className="term-accept col-xs-12 col-lg-2 pull-right div-max-width">
                            <button type="submit" className="btn btn-success btn-block btn-md btn-max-width"
                                    disabled={this.state.disableButton}>
                                {this.state.disableButton ? 'Aguarde...' : 'Pagar'}
                            </button>

                        </div>
                    </div>
                    {/*<!--ClearSale script fingerPrint-->*/}
                    
                    <input type="hidden" name="sessionClearSale" id="sessionClearSale" ref='sessionId'/>
                </form>
            </div>

        )
    }
}

PayGatewayForm.propTypes = {
    gateway: PropTypes.string.isRequired
};


const mapStateToProps = state => {

    const {newOp, payment, plots, method, op} = state.order;
    const {hashTracker, uuid} = state.busca;
    return {newOp, payment, plots, method, op, hashTracker, uuid};
};

export default connect(mapStateToProps, {
    sendPaymentData,
    sendCieloPaymentData,
    searchCep,
    setDialogIndex,
    show,
    sendOp,
    sendSearchHash,
    sendUuid
})(PayGatewayForm);