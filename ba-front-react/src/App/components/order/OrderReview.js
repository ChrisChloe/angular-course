import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { hashHistory }           from 'react-router';
import { validadePassengerAges } from '../../utils/OpUtils';
import FlightsTableResume        from './FlightsTableResume';
import { show, removeAll }       from 'react-notification-system-redux';
import { mask, format, scrollToTop } from '../../utils/utils';
import { buildObjectOP } from "../../utils/objectOp";
import { sendSearchHash, sendUuid } from '../../actions/busca_actions';
import { verifyPoints, setMethodPay, setDialogIndex, setOp, newSetOp, setReceiptsRules, createOp, setPlots, couponCalculate} from '../../actions/order_actions';
import {totalPrice, itsWorthConsiderCompanyPrice, calcAdditionalBaggage } from '../search/Financial';
import { getDataUser } from '../../actions/login_actions';
import AdultForm       from '../passenger/AdultForm';
import ChildForm       from '../passenger/ChildForm';
import BabyForm        from '../passenger/BabyForm';
import _ from 'lodash';

class OrderReview extends Component{

    constructor(props){
        super(props);

        this.state = {
            disableButton: false,
            adults: {}, children: {},
            opened: false,
            collapsed: false,
            loading: false,
            submit: false,
            error: false,
            coupon: false,
            errorMsg: '',
            couponCollapsed: true,
            couponCode: ''
        };
        this.totalOp = null;

    }

    calculateDiscount(price, coupon) {
        this.setState({loading: true});
        if(coupon) {

            this.props.couponCalculate(price, coupon)
                .then(($coupon) => {

                    if ($coupon.error) throw $coupon;

                    const _coupon = $coupon.payload.data.data;

                    this.setState({
                        loading: false,
                        submit: true,
                        error: false,
                        coupon: _coupon
                    });

                })
                .catch((err) => {
                    this.handlerError(err);
                    this.setState({coupon: false, loading: false, error: true, submit: false});

                });
        } else {
            this.calculatePrices();
            this.setState({ coupon: false, loading: false, error: false, submit: false, couponCode: ''});
        }
    }

    handlerError(err) {
        const response = err.payload.response;
        switch (response.status) {
            case 401:
                const message = "Sistema indísponível";
                this.props.show({
                    title:'Sistema indísponível',
                    message: message,
                    autoDismiss: 6
                }, 'error');
                this.setState({errorMsg: message});
                break;

            case 422:
                _.forEach(response.data.message, (message) => {
                    this.props.show({
                        title:'ops!',
                        message: message,
                        autoDismiss: 6
                    }, 'error');
                    this.setState({errorMsg: message});
                });
                break;
        }

    }

    saveOp(e){
        e.preventDefault();

        this.setState({disableButton:true});

        setTimeout(() => {
            const {flight, flightBack} = this.props;


            const passengerData = {
                adults:   {data: this.adults,   count: flight.adults},
                children: {data: this.children, count: flight.children},
                babies:   {data: this.babies,   count: flight.babies}
            };

            if (!this.isPassengerValid(flight, passengerData)) {
                this.setState({disableButton: false});
                return;
            }

            // DEPRECATED
            const tracker = {
                search_hash: this.props.hashTracker,
                status: 3
            };
            this.props.sendSearchHash(tracker);
            // DEPRECATED

            const uuidTracker = {
                search_group_uuid: this.props.uuid,
                status: 3
            };

            this.props.sendUuid(uuidTracker);

            const {observation} = this.refs;

            const op = {
                ...passengerData,
                price: this.totalOp,
                flight: flight,
                observation: observation.value,
                search_id: flight.search_id,
                flight_back: (flightBack) ? flightBack : null,
                search_back_id: (flightBack) ? flightBack.search_id : null,
                coupon: this.state.coupon ? this.state.coupon.code : null,
                send: 0
            };

            this.props.createOp(buildObjectOP(op))
                .then( (_op) => {

                    if(_op.error) throw _op;

                    const op  = _op.payload.data.data;
                    this.props.newSetOp(op);

                })
                .catch( (error) => {

                    this.setState({disableButton:false});

                    try{

                        // BAD REQUEST
                        if (error.payload.response.data.error && error.payload.response.data.message) {
                            const message = error.payload.response.data.message;
                            if (_.isObject(message)) {

                                Object.keys(message).forEach((key) => {
                                    this.props.show({
                                        title: 'Ops!',
                                        message: message[key],
                                        autoDismiss: 5
                                    }, 'error');
                                });

                                return;
                            }
                        }

                        // 200 WITH ERROR
                        if (error.error && error.message) {
                            const message = error.message;
                            if (_.isObject(message)) {

                                Object.keys(message).forEach((key) => {
                                    this.props.show({
                                        title: 'Ops!',
                                        message: message[key],
                                        autoDismiss: 5
                                    }, 'error');
                                });

                                return;
                            }
                        }

                    } catch(e) {

                       this.props.show({
                                title: 'Ops :(',
                            message: 'Estamos em manutenção nessa área do sistema.',
                            autoDismiss:15
                        }, 'error');

                    }
                });

            const dataUser = this.props.getDataUser().payload;
            const receiptsRulesData = {
                "agency_id": dataUser.agency_id,
                "flight_departure": flight.date_boarding,
                "price": this.state.coupon ? this.state.coupon.price : this.totalOp
            };

            this.props.setReceiptsRules(receiptsRulesData).then( (receiptsRule) => {

                const receiptsCielo = receiptsRule.payload.data.cielo;

                if (receiptsCielo.hasOwnProperty('plots')) {
                    const plots = receiptsCielo.plots;
                    this.props.setPlots(plots);
                }

                this.setState({collapsed: true});
                // this.props.setEndSearching(false);

            });


        }, 1000)

    }

    componentWillMount(){

        if(!this.props.flight) {
            hashHistory.push('/'); //CANCEL SEARCH
            window.location.reload()

        } else {

            const adults   = _.map(_.range(0, this.props.flight.adults),   index => ({id: index, baggage_departure: false, baggage_return: false}));
            const children = _.map(_.range(0, this.props.flight.children), index => ({id: index, baggage_departure: false, baggage_return: false}));

            this.setState(prevState => ({...prevState, adults, children, totalAdults: adults.length, totalChildren: children.length}));

            this.adults   = adults;
            this.children = children;
            this.babies   = _.map(_.range(0, this.props.flight.babies),index => ({id: index}));
    }

        if ( !this.state.opened ) {
            scrollToTop();
            this.setState({opened: true});
        }

    }

    componentDidMount(){

        $('html, body').removeClass('smooth');
        this.setState({collapsed: false});
        this.props.newSetOp(null);
        this.props.setOp(null);

        setTimeout(() => {
            try {
                document.querySelectorAll('.change')
                    .forEach(function (e) {
                        if (e.value.length > 0)
                            e.value = "";
                    });

            } catch(e) {
                $('.change')
                    .each(function () {
                        if($(this).val().length > 0)
                            $(this).val("");
                });
            }

        }, 500);

        mask()
    }

    isSameFareType (flight, flightBack) {
        if (flight && flightBack) {
            return flight.fare_type === flightBack.fare_type;
        }
    };

    isSameCompany (flight, flightBack) {
        if (flight && flightBack) {
            return  flight['company_id'] === flightBack['company_id'];
        }
    };

    handleChange(name, value, type, id){

        if(name == 'baggage_departure' || name == 'baggage_return' ) {
            this[type] = {...this[type], [id]: {...this[type][id], [name]: !this[type][id][name]}};
            this.setState(prevState => ({
                ...prevState,
                [type]: {
                    ...prevState[type],
                    [id]: {...prevState[type][id], [name]: !prevState[type][id][name]}}
            }));

            if(this.state.coupon) {
                this.calculatePrices();
                setTimeout(() => {
                    this.calculateDiscount(this.totalOp, this.state.coupon.code);
                }, 10);
            }
            return
        }

        this[type] = {...this[type], [id]: {...this[type][id], [name]: value.trim() ? value.trim() : null}};

        if (this[type][id].name !== '' || this[type][id].surname !== '') {
            this[type] = {
                ...this[type],
                [id]: {...this[type][id],
                    fullname: this[type][id].name + ' ' + this[type][id].surname}
            };
        }

        if ( (type === 'adults') && (!this[type][id].email)) {
            this[type] = {
                ...this[type],
                [id]: {...this[type][id],
                    email: null}
            };
        }

    }

    changeValue(e) {
        this.setState({ couponCode: e.target.value});
        this.state.couponCode.length >= 3 && this.setState({error: false});
    }

    collapse(e, type) {
        e.preventDefault();
        this.setState({[type]: !this.state[type]})
    }

    calculatePrices(){
        const { flight, flightBack } = this.props;
        const sameCompany     = this.isSameCompany(flight, flightBack);
        const sameFareType    = this.isSameFareType(flight, flightBack);

        const suffix         = itsWorthConsiderCompanyPrice(flight, flightBack) ? '_company' : '';
        this.totalFlight     = totalPrice(flight, suffix, calcAdditionalBaggage(this.state), sameFareType, sameCompany);
        this.totalFlightBack = totalPrice(flightBack, suffix, calcAdditionalBaggage(this.state, true), sameFareType, sameCompany);
        this.totalOp         = this.totalFlight + this.totalFlightBack;

    }

    renderReview (){

        const { flight, flightBack, newOp, receiptsRules } = this.props;
        const showBaggage     = this.isShowBaggageType(flight, flightBack);
        const sameCompany     = this.isSameCompany(flight, flightBack);
        const sameFareType    = this.isSameFareType(flight, flightBack);

        this.calculatePrices();

        const adultsForm      = _.map(_.range(0, flight.adults),index =>
            <AdultForm flight={flight} flightBack={flightBack} key={index} handleChange={(name, value, type, id) => this.handleChange(name, value, type, id)} showBaggage={showBaggage} id={index}  disableInputs={newOp}/>);

        const childrenForm    = _.map(_.range(0, flight.children),index =>
            <ChildForm key={index} handleChange={(name, value, type, id) => this.handleChange(name, value, type, id)} showBaggage={showBaggage} id={index} flightBack={flightBack} disableInputs={newOp} />);

        const babiesForm      = _.map(_.range(0, flight.babies),index =>
            <BabyForm key={index} handleChange={(name, value, type, id) => this.handleChange(name, value, type, id)} id={index} disableInputs={newOp}/>);

        return (

            <div className="container main-content">
                <div className="row form-voo fix-navbar-height fix-navbar-height-sm">
                    <div>

                        <div className="col-md-12 col-xs-12 form-fixed">
                            <div className="panel panel-border-color panel-border-color-success">
                                <div className="panel-heading panel-heading-divider form-title" id="reviwOpTitle">
                                    <span>Revisão do Pedido</span>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FlightsTableResume
                                                sameFareType={sameFareType}
                                                sameCompany={sameCompany}
                                                paymentPresentation={false}
                                                total={this.totalOp}
                                                totalFlight={this.totalFlight}
                                                totalBack={this.totalFlightBack}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{margin: '0px 5px'}}>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <div className={`form-group  ${this.state.error && 'has-error'}`} style={{minHeight: '45px'}}>
                                            <div className={`${!newOp ? 'col-md-7 col-sm-7' : 'col-md-12 col-sm-12'} col-xs-12`}>
                                                <label htmlFor='adult-name'>
                                                    <small>Cupom de desconto</small>
                                                    <input type='text'
                                                           id='coupon-input'
                                                           disabled={this.state.submit || newOp}
                                                           placeholder='Cupom de desconto'
                                                           maxLength='100'
                                                           onChange={(e) => this.changeValue(e)}
                                                           className='form-input form-input-default change'
                                                           name="name"
                                                           value={this.state.couponCode}
                                                           title="Preencha este campo com o cupom de desconto"
                                                           autoComplete="off" />
                                                    {this.state.error && <small className="text-danger m-t-n">{this.state.errorMsg}</small>}
                                                </label>
                                            </div>
                                            {!newOp
                                                ? !this.state.submit
                                                    ?   <div className="4 col-sm-4 col-xs-12">
                                                        <button className={`btn btn-lg btn-block btn-coupon ${ !(this.state.couponCode.length < 3) ? 'btn-success' : 'btn-warn'}`} style={{marginTop: '15px'}} onClick={() => this.calculateDiscount(this.totalOp, this.state.couponCode)}>
                                                            {this.state.loading
                                                                ? 'Aplicando'
                                                                : 'Aplicar'
                                                            }
                                                        </button>
                                                    </div>

                                                    :   <div className="col-md-4 col-sm-4 col-xs-12">
                                                        <button className='btn btn-lg btn-block btn-coupon btn-error' style={{marginTop: '15px'}} onClick={(e) => this.calculateDiscount(this.totalOp)}>
                                                            Remover
                                                        </button>
                                                    </div>
                                                : null
                                            }

                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <div className="panel-heading panel-heading m-r-xs m-b-sm form-title" style={{textAlign: 'right'}}>
                                            <span style={{textDecoration: this.state.coupon ? 'line-through' : 'none'}} className={!this.state.coupon && 'totalPriceOrderReview'}>Valor Total: {format(this.totalOp)}</span>
                                            {this.state.coupon &&
                                                <div>
                                                    <span style={{display: 'block'}} className="totalPriceOrderReview" >Valor com desconto: {format(this.state.coupon.price)}</span>
                                                    <span style={{display: 'block', fontSize: '15px'}}>Desconto: {format(this.state.coupon.discount)}</span>

                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="row">*/}
                        {/*<div className="row box-sum-price col-12 text-center">*/}
                            {/*<span style={{float:'right'}}></span>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    <div className='animated fadeInLeft'>
                        <div className="col-md-12 col-xs-12">
                            <div className="panel panel-border-color panel-border-color-primary">
                                <div className="panel-heading panel-heading-divider form-title" style={{cursor: "pointer"}} onClick={newOp && ((e) => this.collapse(e, 'collapsed'))}>
                                    <div>Dados dos Passageiros <span style={{marginTop: '5px'}}></span>
                                        {newOp
                                            ? this.state.collapsed
                                                ? <i className="fa fa-plus-circle"></i>
                                                : <i className="fa fa-minus-circle"></i>
                                            : null
                                        }
                                    </div>
                                </div>
                                <div className={`panel-body ${this.state.collapsed && 'collapse-element'}`}>
                                    <form id="form-op" name="formOp" onSubmit={(e) => this.saveOp(e)}>
                                        <div className='row'
                                             style={{borderBottom: '1px solid #d9d9d9', paddingBottom: 10}}>
                                            <div className="col-md-12">
                                                <h5>
                                                    Dados de Adultos <span
                                                    className='label label-primary'> {flight.adults} </span>
                                                </h5>
                                                {adultsForm}
                                            </div>
                                        </div>
                                        {flight.children > 0 &&
                                            <div className='row'
                                                style={{borderBottom: '1px solid #d9d9d9', paddingBottom: 10}}>
                                                <div className="col-md-12">
                                                    <h5>
                                                        Dados de Crianças <span
                                                        className='label label-primary'> {flight.children} </span>
                                                    </h5>
                                                    {childrenForm}
                                                </div>
                                            </div>
                                        }
                                        {flight.babies > 0 &&
                                            <div className='row'
                                                style={{borderBottom: '1px solid #d9d9d9', paddingBottom: 10}}>
                                                <div className="col-md-12">
                                                    <h5>
                                                        Dados de Bebês <span
                                                        className='label label-primary'> {flight.babies} </span>
                                                    </h5>
                                                    {babiesForm}
                                                </div>
                                            </div>
                                        }
                                        <div className='row'>
                                            <div className="col-md-12">

                                                <h4>Observações gerais (max: 2000 caracteres)</h4>

                                                <textarea id="observation"
                                                          className="form-control"
                                                          rows="5"
                                                          placeholder="Observação"
                                                          disabled={newOp}
                                                          style={{width: '100%', resize: 'none'}}
                                                          maxLength="2000"
                                                          ref="observation"/>
                                                <br/>
                                            </div>
                                        </div>
                                        {(!newOp || !receiptsRules) &&
                                            <div>
                                                <hr/>
                                                <div className="row">
                                                    {/*<div className="col-md-8 col-sm-12">*/}
                                                        {/*<div className="be-checkbox be-checkbox-color">*/}
                                                            {/*<input id="check-terms" type="checkbox"*/}
                                                                   {/*value={this.state.checkTerms}*/}
                                                                   {/*onClick={e => this.handleCheck(e)}/>*/}
                                                            {/*<label htmlFor="check-terms">*/}
                                                                {/*<small>Declaro que li as <a href="#/termos/condicoes">regras e condições</a> e*/}
                                                                    {/*estou de acordo com os termos das tarifas e serviços*/}
                                                                    {/*oferecidos.*/}
                                                                {/*</small>*/}
                                                            {/*</label>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                    <div className="col-md-offset-8 col-md-4 col-sm-12"
                                                         title="É necessário aceitar os termos para continuar.">
                                                        <button type="submit" className="btn btn-lg btn-block btn-success"
                                                                disabled={this.state.disableButton}>
                                                            {this.state.disableButton ? 'Enviando...' : 'Salvar e Continuar'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )

    }

    isShowBaggageType(flight, flightBack) {

        let baggage = {
            flight: false,
            flight_back: false
        };

        const ID_LATAM =  2;
        const ID_GOL = 3;
        const ID_AZUL  = 4;

        const NACIONAL_BAGGAGE = [ID_AZUL, ID_GOL, ID_LATAM];
        const INTERNACIONAL_BAGGAGE = [ID_GOL, ID_LATAM];

        const companyHasNacionalBaggage = (flight) => _.includes(NACIONAL_BAGGAGE, flight.company_id);
        const companyHasInternacionalBaggage = (flight) => _.includes(INTERNACIONAL_BAGGAGE, flight.company_id);

        if (flight && flight.is_national && companyHasNacionalBaggage(flight)) baggage.flight = true;
        if (flightBack && flightBack.is_national && companyHasNacionalBaggage(flightBack)) baggage.flight_back = true;

        if (flight && !flight.is_national && companyHasInternacionalBaggage(flight)) baggage.flight = true;
        if (flightBack && !flightBack.is_national && companyHasInternacionalBaggage(flightBack)) baggage.flight_back = true;

        return baggage;

    }

    verifyMandatoryInformation(passangers = [], message = ''){
    
        return _(passangers).map( a => {
            if(_.isNil(a.name) || _.isNil(a.surname) || _.isNil(a.birthday)){
                return {desc: message, title: 'Informações obrigatórias.'}
            }
        }).filter(f => !_.isNil(f)).value();
        
    }

    isPassengerValid(flight, op){

        this.props.removeAll();

        const messages           = validadePassengerAges(flight, op);
        const msgAdults          = this.verifyMandatoryInformation(op.adults.data,   'Preencha todos os dados dos adultos corretamente.');
        const msgChildren        = this.verifyMandatoryInformation(op.children.data, 'Preencha todos os dados das crianças corretamente.');
        const msgBabies          = this.verifyMandatoryInformation(op.babies.data,   'Preencha todos os dados dos bebês corretamente.');
        const validationMessages = [...messages, ...msgAdults, ...msgChildren, ...msgBabies];

        if(!_.isEmpty(validationMessages)){

            _.forEach(validationMessages, message => {
                this.props.show({
                    title:message.title,
                    message: message.desc,
                    autoDismiss:15
                }, 'error');
            });

            return false;
        }

        return true;
    }

    handleCheck(){
        this.setState({checkTerms: !this.state.checkTerms});
    }

    render (){

        return (
            <div>
                { this.props.flight && this.renderReview()}
            </div>
        )
    }

}

const mapStateToProps = state => {

    return {
        flight:        state.busca.flight,
        flightBack:    state.busca.flightBack,
        newOp:         state.order.newOp,
        receiptsRules: state.order.receiptsRules,
        hashTracker:   state.busca.hashTracker,
        uuid:          state.busca.uuid
    }

};

export default connect(mapStateToProps, {
    verifyPoints,
    setMethodPay,
    setDialogIndex,
    show,
    removeAll,
    newSetOp, setOp,
    getDataUser,
    setReceiptsRules,
    sendSearchHash,
    couponCalculate,
    sendUuid,
    setPlots,
    createOp })(OrderReview);