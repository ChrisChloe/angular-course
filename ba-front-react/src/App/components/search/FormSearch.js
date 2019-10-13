import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { eraseCookie, getDataUser }  from '../../actions/login_actions';
import { openTerms }    from '../../actions/order_actions';
import CompanyButton    from './CompanyButton';
import AirportInput     from './AirportInput';
import { generateHash } from '../../utils/cryptography';

import {
    getAirports,
    shareAirports,
    findFlights,
    startSearchingInCompany,
    endSearchingInCompany,
    errorSearchingInCompany,
    clearSearchingData,
    shareRequestFlightData,
    setSearching,
    setSelectedCompanies,
    selectAirport,
    clearSearchingResultSet,
    setPreventSearch,
    setResearch,
    getBestPrices,
    setHashTracker,
    getUuid,
    sendNotification,
    clearBestPrices,
    getCompanies
} from '../../actions/busca_actions';

import { getObjectCookie  }      from '../../utils/utils';
import { createDates, validate } from '../../utils/dates';
import { show }  from 'react-notification-system-redux';
import PaxSelect from './PaxSelect';
import moment    from 'moment';
import _ from 'lodash';
import CompanySkeleton from "./CompanySkeleton";

class FormSearch extends Component{

    constructor (props) {
        super(props);
        this.state = {
            companies:[],
            roundTrip:     true,
            disableSubmit: false,
            searching:     false,
            airports: [],
            user:     {},

            departureDate: '',
            backDate:      '',

            babies:   0,
            adults:   1,
            children: 0,

            isResearch: false,

            validOrigin: true,
            validDestination: true

        };

        this.showModalityButton = false;

    }

    componentDidMount (){
        const user = getObjectCookie('auth_user_data');

        // this.props.setEndSearching(false);
        this.props.openTerms(false);
        this.props.setSearching(false);
        this.props.getCompanies()
            .then(response => {
                if(this.props.companiesToSearch) {
                    const companies = this.props.companiesToSearch.map( c => {return {...c, handleCheck: (e, c) => this.handleCheckCompany(e, c), checked :c.id !== 5}});
                    this.setState({companies});

                    const comp = this.state.companies.filter(c => c.checked);
                    this.setState({...this.state, selectedCompanies: comp, user: user });
                }
            })
            .catch();
        this.props.getAirports()
            .then(response=> {
                if(response.error) throw response;

                const airports = this.props.airports.filter(airport => airport.status === 1);
                this.props.shareAirports(airports)

            })
            .catch(error => {
                console.log(error)
            });

        createDates(this.state.roundTrip,
            value => {
                this.setState({
                    ...this.state,
                    departureDate: validate(value)
                })
            },
            value => {
                this.setState({
                    ...this.state,
                    backDate: validate(value)
                })
            }
        );

        if(!_.isEmpty(user)){
            this.showModalityButton = user.allow_executive === 1;
        }

        this.props.clearSearchingResultSet();

    }

    componentDidUpdate () {

        $('html, body').removeClass('smooth');

        const {research} = this.props;

        if (research) {this.research()}

        createDates(this.state.roundTrip,
            value => {
                this.setState({
                    ...this.state,
                    departureDate: validate(value)
                })
            },
            value => {
                this.setState({
                    ...this.state,
                    backDate: validate(value)
                })
            }
        )
    }

    handleCheckCompany (event, company){

        const companies = (!event.target.checked)
            ? _.uniq(this.state.selectedCompanies.filter(c => c.id !== company.id))
            : [...this.state.selectedCompanies, company];

        this.setState({ companies: this.state.companies.map(c =>
            {
                return { ...c,
                    checked: c.id === company.id ? !c.checked : c.checked }}) ,
                    selectedCompanies: _.uniq(companies),
                    disableSubmit: companies.length === 0 || this.state.searching });

    }

    handleSubmit (e) {

        e.preventDefault();

        document.querySelector('#tabs > li > a') ? document.querySelector('#tabs > li > a').click() : false;

        // this.props.setEndSearching(false);

        const typeTrip = (this.state.backDate) ? '1' : '0';
        const { adults, children, babies, dateBack, dateStart, modality } = this.refs;
        const { airportDestination, airportOrigin } = this.props;

        if(!this.isValidPassenges(adults.value, children.value, babies.value)) return;
        if(!this.isValidAirports(airportDestination, airportOrigin)) return;
        if (!this.isValidDates()) return;

        const mod = (modality && modality.checked) ? 1 : 0;

        const requestData =
             {
                 adults:    adults.value,
                 children:  children.value,
                 babies:    babies.value,

                 date_back:     dateBack && dateBack.value,
                 date_starting: dateStart.value,

                 origin_id:      airportOrigin.airport.id,
                 destination_id: airportDestination.airport.id,

                 baggage_type: 1,
                 type_trip:    typeTrip,
                 modality:     mod
             };

        this.props.setPreventSearch(requestData);

        this.performSearch(requestData);

    }

    isValidAirport (airport, type) {
        const teste = type === 'origin' ?  'ida' : 'volta';
        let result = true;

        if (!_.isObject(airport)) {
            this.props.show({
                position:'tr',
                title:`Voo de ${teste}`,
                message: 'O aeroporto selecionado é inválido',
                autoDismiss:5
            }, 'warning');

            result = false;

        }


        return result;
    }

    isValidAirports(airportDestination, airportOrigin){

        if (!this.isValidAirport(airportOrigin, 'origin')) {

            this.setState({validOrigin: false});
            return false;

        } else {

            this.setState({validOrigin: true});

        }

        if (!this.isValidAirport(airportDestination, 'destination')) {

            this.setState({validDestination: false});
            return false;

        } else {

            this.setState({validDestination: true});

        }

        if (airportDestination.airport.id === airportOrigin.airport.id){
            this.props.show({
                position:'tr',
                title:'Mesmo aeroporto.',
                message: 'Não é possível pesquisar voos com origem e destino iguais.',
                autoDismiss:5
            }, 'warning');
            return false;
        }

        return true;

    }

    isValidPassenges (adults, children, babies) {

        //tam, avianca
        const companiesWithoutBabies = _.filter(this.state.companies, (companie) => ((companie.id == 1 && companie.checked ) || (companie.id == 2 && companie.checked )));
        const qtd = parseInt(adults) + parseInt(children) + parseInt(babies);
      
        if (qtd > 9){
            this.props.show({
                position:'tr',
                title:'Quantidade de passageiros excedida.',
                message: 'Quantidade total de passageiros não deve ser superior a 9.',
                autoDismiss:5
            }, 'warning');
            return false;
        }

        if (parseInt(adults) < parseInt(babies)){
            this.props.show({
                position:'tr',
                title:'Quantidade de passageiros inválida.',
                message: 'Quantidade de bebês não pode ser superior a quantidade de adultos',
                autoDismiss:6
            }, 'warning');
            return false;
        }

        if ((parseInt(babies) > 0) && (companiesWithoutBabies.length > 0)) {
            this.props.show({
                position:'tr',
                title:'Atenção.',
                message: 'Inclusão de bebê não está disponível nas companhias Latam e Avianca',
                autoDismiss:6
            }, 'warning');
            return false;
        }

        return true;
    }

    isValidFormatDate(type){
        let result = true;

        const date = moment(this.state[type], 'DD/MM/YYYY');
        const dateValid = moment(date, 'DD/MM/YYYY', true).isValid();
        const translated = type === 'departureDate' ? 'ida' : 'volta';

        if(!dateValid) {
            this.props.show({
                position:'tr',
                title:'Data inválida',
                message: `Data de ${translated} inválida`,
                autoDismiss:5
            }, 'warning');

            if(type === 'departureDate'){
                this.setState({departureDate: ''});
            }
            this.setState({backDate: ''});

            result = false;
        }

        return result;
    }

    isValidDates () {
        let validArrival = true;

        const validDeparture = this.isValidFormatDate('departureDate');

        if (this.state.backDate) {

            const departure = moment(this.state.departureDate, 'DD/MM/YYYY');
            const back      = moment(this.state.backDate, 'DD/MM/YYYY');

            if (departure > back ) {

                this.props.show({
                    position:'tr',
                    title:'Data de volta',
                    message: 'Data de volta deve ser igual ou superior a data de ida',
                    autoDismiss:5
                }, 'warning');

                this.setState({backDate: ''});

                return false;
            }

            validArrival = this.isValidFormatDate('backDate');
        }

        return (validDeparture && validArrival);
    }

    endSearching (counter) {

        if (counter !== 0) return;

        // this.setState({...this.state, disableSubmit: this.state.selectedCompanies.length === 0 });
        // this.props.setSearching(false);
        // this.props.clearSearchingData();

        const {flightsData} = this.props;
        const anyData = _(flightsData)
            .flatMap(fd => fd.flights).value();

        if (_.isEmpty(anyData)) {
            setTimeout(() => {

                const message =  `Nenhum voo encontrado para os filtros informados.`;
                const error   =  'Pesquisa de voos retornou vazia';
                this.props.show({
                    position: 'tr',
                    title:    'Informação.',
                    message:  message,
                    autoDismiss: 15
                }, 'warning');

                this.sendNotification(error , message, 'Pesquisa de voos')
            }, 250)
        }

    }

    performSearch (requestData) {

        const {selectedCompanies} = this.state;

        this.props.shareRequestFlightData({...requestData, selectedCompanies});
        this.props.clearBestPrices();

        let counter    = selectedCompanies.length;
        let searchHash = generateHash( JSON.stringify({ ...requestData, hashDate: moment().locale('pt-BR').format() }));

        this.props.setHashTracker(searchHash);

        const uuidRequestData = {
            "origin_id": requestData.origin_id,
            "destination_id": requestData.destination_id,
            "date_starting": requestData.date_starting,
            "date_back": requestData.date_back,
            "status": 0
        };

        this.props.getUuid(uuidRequestData)
        .then((_uuid) => {

            const uuid = _uuid.payload.data.data.uuid;

             selectedCompanies.forEach(company => {

                this.props.startSearchingInCompany(company);
                const companyId = company['id'];
                let formData = { ...requestData, 'search_hash': searchHash, 'search_group_uuid': uuid};
                let flightForm = {company_id: companyId, ...formData};

                this.props.findFlights(flightForm)
                .then(response => {

                    if(response.error) throw response;

                    this.props.endSearchingInCompany(company);

                    const opstionsBestPrices = {
                        company_id: company.id,
                        start_date: moment(requestData.date_starting, 'DD/MM/YYYY').subtract(3, 'days').format('YYYY-MM-DD'),
                        end_date: moment(requestData.date_starting, 'DD/MM/YYYY').add(3, 'days').format('YYYY-MM-DD'),
                        origin_id:  requestData.origin_id,
                        destination_id: requestData.destination_id
                    };


                    this.endSearching(--counter);
                    this.props.getBestPrices(opstionsBestPrices)
                    .then((bestPrices) => {

                        if(bestPrices.error) throw bestPrices;

                    });
                    // .catch((error) => {
                    //     const bestiPriceError = error.payload.response.data;
                    //
                    //     if (bestiPriceError.error) {
                    //         this.props.show({
                    //         position: 'tr',
                    //         title:    'Error',
                    //         message:  bestiPriceError.message,
                    //         autoDismiss: 15
                    //         }, 'error');
                    //     }
                    //
                    //     console.log(error);
                    //
                    // });


                }).catch(response => {

                    this.props.errorSearchingInCompany(company);
                    this.endSearching(--counter);
                    this.showNotifications(response, company);

                });

            })

        })
        .catch((error) => {

            console.log(error);
            this.endSearching(0);

        });

        this.props.setSearching(true);

    }

    sendNotification (error, message, title) {
        const { airportDestination, airportOrigin } = this.props;

        const userData = getDataUser().payload;
        const _error = JSON.stringify(error);
        const origin = airportOrigin.airport.initials;
        const destination = airportDestination.airport.initials;
        const user_id = userData.userId;
        const user_name = userData.name;
        const user_email = userData.email;
        const agency = userData.agency_id;

        const data = {"error": _error, origin, destination, message, user_email, user_id, user_name, agency, title};
        this.props.sendNotification(data);

    }

    showNotifications (error, company){

        try {

            if (!error.payload) {
                const message =  `Não foi possível processar essa requisição.`;

                this.props.show({
                    title: 'Ops!',
                    message: message,
                    autoDismiss: 15
                }, 'error');


                this.sendNotification(error, message, 'Pesquisa de voos');

                return;
            }

            if (error.payload && !error.payload.response) {
                const message =  `Voos indisponíveis para a cia ${company.name}.`;

                this.props.show({
                    title: 'Ops!',
                    message: message,
                    autoDismiss: 15
                }, 'error');

                this.sendNotification(error, message, 'Pesquisa de voos');

                return;
            }

            const {data = {}, status} = error.payload.response;

            if (status >= 500) {

                const message =  `Voos indisponíveis para a cia ${company.name}.`;

                this.props.show({
                    title: 'Ops!',
                    message: message,
                    autoDismiss: 15
                }, 'error');

                this.sendNotification(error, message, 'Pesquisa de voos');

                return;
            }

            if (data.error) {

                if (_.isObject(data.message)) {

                    const {message} = data;

                    Object.keys(message).forEach((key) => {

                        const _message = message[key];

                        this.props.show({
                            title: 'Ops!',
                            message: _message,
                            autoDismiss: 5
                        }, 'error');

                        this.sendNotification(error, _message[0], 'Pesquisa de voos');

                    });

                    return;
                }

                this.props.show({
                    title: 'Ops!',
                    message: data.message,
                    autoDismiss: 15
                }, 'error');

                this.sendNotification(data.error, data.message, 'Pesquisa de voos');

            }

        }catch(e){
            console.log(e)
        }

    }

    research() {

        const {preventSearch} = this.props;

        // this.props.setEndSearching(false);
        this.props.setResearch(false);

        if (preventSearch) {this.performSearch(preventSearch)}

    }

    renderCompanies() {
        let result;

        if (this.state.companies.length > 0) {
            result = this.state.companies

                .map( c => <CompanyButton key={c.id} company={c}/>);

        } else {
            result = this.renderSkeletonCompanies();

        }

        return result;
    }

    renderSkeletonCompanies() {
        let companies = [];

        for (let i = 0; i < 4; i++) {
            companies.push(<CompanySkeleton key={i} />)
        }

        return companies;
    }

    render() {

        const companies  = this.renderCompanies();
        const disableSearchButton = this.state.disableSubmit || this.props.searching;

        return (
            <div>
                <div className='box-search'>
                    <div className='container-boots'>
                        <div className='row'>

                            <form method='post' role='buscar-passagens' name='form' onSubmit={(e) => this.handleSubmit(e)} >
                                <div className='col-md-9 col-xs-12'>
                                    <section className='form-search'>
                                        <div className='flight-options'>

                                            {/*<div className='type-trip'>*/}

                                                {/*<input*/}
                                                    {/*id='ida'*/}
                                                    {/*name='type_trip'*/}
                                                    {/*type='radio'*/}
                                                    {/*checked={!this.state.roundTrip}*/}
                                                    {/*onChange={() => this.setState({roundTrip:!this.state.roundTrip})}*/}
                                                {/*/>*/}

                                                {/*<label htmlFor='ida'>Ida</label>*/}
                                            {/*</div>*/}

                                            {/*<div className='type-trip'>*/}
                                                {/*<input*/}
                                                    {/*id='ida_volta'*/}
                                                    {/*name='type_trip'*/}
                                                    {/*type='radio'*/}
                                                    {/*checked={this.state.roundTrip}*/}
                                                    {/*onChange={() => this.setState({roundTrip:!this.state.roundTrip})}*/}
                                                {/*/>*/}

                                                {/*<label htmlFor='ida_volta'>Ida e volta</label>*/}
                                            {/*</div>*/}

                                        </div>

                                        <div className='flight-row'>


                                            <fieldset className='origin-destination col-xs-12'>

                                                <label htmlFor='destino_de' className='col-xs-12 col-sm-6 col-md-6'>

                                                    <span>De:</span>
                                                    <AirportInput validation={this.state.validOrigin} origin={true} placeholder='Aeroporto de Origem' />

                                                </label>


                                                <label htmlFor='destino_para' className='col-xs-12 col-sm-6 col-md-6'>

                                                    <span>Para:</span>
                                                    <AirportInput validation={this.state.validDestination} placeholder='Aeroporto de Destino'/>

                                                </label>

                                            </fieldset>

                                            <fieldset className='date-passengers col-xs-12'>

                                                <div className='form-date col-xs-12 col-sm-6 col-md-6'>
                                                    <label htmlFor='date_starting' className='col-xs-6 col-sm-6 col-md-6'>
                                                        <span className='eu'>Ida:</span>
                                                        <input type='text'
                                                               id='date_starting'
                                                               ref='dateStart'
                                                               name='date_starting'
                                                               autoComplete='off'
                                                               className='form-input date'
                                                               placeholder='Data de Ida'
                                                               onPaste={() => false}
                                                               required='true'
                                                               autoComplete="off"
                                                               value={this.state.departureDate}
                                                               onChange={event => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       departureDate: event.target.value.length >= 10
                                                                           ? validate(event.target.value)
                                                                           : event.target.value
                                                                   })
                                                               }}
                                                               onBlur={event => {
                                                                   let selectedValue = event.target.value;
                                                                   this.setState({
                                                                       ...this.state,
                                                                       departureDate: selectedValue.length >= 10
                                                                           ? validate(selectedValue)
                                                                           : ''
                                                                   })
                                                               }}
                                                               />
                                                        <button type='button' className='btn-dp'>
                                                            <i className='fa fa-calendar'/>
                                                        </button>
                                                        <div className='msg-validate'/>
                                                    </label>

                                                    <label htmlFor='date_back' className='col-xs-6 col-sm-6 col-md-6'>
                                                        <span>Volta:</span>
                                                        <input type='text'
                                                               id='date_back'
                                                               ref='dateBack'
                                                               name='date_back'
                                                               className='form-input date'
                                                               placeholder='Data de Volta'
                                                               autoComplete="off"
                                                               title={_.isEmpty(this.state.departureDate)
                                                                    ? 'Selecione a data de ida'
                                                                    : 'Selecione a data de volta'}
                                                               onPaste={() => false}
                                                               disabled={_.isEmpty(this.state.departureDate)}
                                                               value={this.state.backDate}
                                                               onChange={event => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        backDate: event.target.value.length >= 10
                                                                            ? validate(event.target.value)
                                                                            : event.target.value
                                                                    })
                                                               }}
                                                               onBlur={event => {
                                                                    let selectedValue = event.target.value;
                                                                    this.setState({
                                                                        ...this.state,
                                                                        backDate: selectedValue.length >= 10
                                                                            ? validate(selectedValue)
                                                                            : ''
                                                                    })
                                                               }}
                                                        />
                                                        <button type='button' className='btn-dp'>
                                                            <i className='fa fa-calendar'/>
                                                        </button>
                                                        <div className='msg-validate'/>
                                                    </label>
                                                </div>

                                                <div className='passengers col-xs-12 col-sm-6 col-md-6'>
                                                    <div className='col-xs-12'>
                                                        <label htmlFor='adults' className='col-xs-4'>
                                                            <span>Passageiros :</span>
                                                            <PaxSelect
                                                                defaultValue={this.state.adults}
                                                                type='adults' getRef={(ref) => {
                                                                    this.refs.adults = ref
                                                            }} />
                                                            <div className='msg-validate'/>
                                                        </label>
                                                        <label htmlFor='children' className='col-xs-4'>
                                                            <small className='info-search' > 2 a 11 anos </small>
                                                            <PaxSelect
                                                                defaultValue={this.state.children}
                                                                type='children'
                                                                getRef={(ref) => {
                                                                    this.refs.children = ref
                                                            }} />
                                                        </label>
                                                        <label htmlFor='babies' className='col-xs-4'>
                                                            <small className='info-search'> 0 a 23 meses </small>
                                                            <PaxSelect
                                                                defaultValue={this.state.babies}
                                                                type='babies'
                                                                getRef={(ref) => {
                                                                    this.refs.babies = ref
                                                            }} />
                                                        </label>
                                                        </div>
                                                </div>
                                            </fieldset>

                                        </div>
                                    </section>
                                </div>

                                <div className='col-xs-12 col-md-3'>
                                    <section className='airline'>
                                        <h1>
                                            <i className='fa fa-plane'/>
                                            &nbsp; Escolha a companhia aérea
                                        </h1>
                                        <div className='companies xs-mt-0 md-mt-35'>

                                            {companies}

                                        </div>
                                    </section>
                                </div>
                                <div className='send-form col-xs-12 col-md-12'>

                                    <div className='col-xs-6 col-md-3 col-md-offset-6'>

                                        {this.showModalityButton &&
                                            <div className='box-baggage xs-mt-15 sm-mt-1 md-mt-15'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 text-right' title='Apenas voo executivo'>
                                                    <input id='modality' name='modality'
                                                           ref='modality'
                                                           type='checkbox'/>
                                                    <label htmlFor='modality'>Voo Executivo</label>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='col-xs-6  col-md-3 container-btn'>
                                        <input className={`b-btn ${disableSearchButton && 'btnDisable'}`}
                                               id='btn-buscar-voos' type='submit'
                                               value={!this.props.searching?'BUSCAR VOOS':'BUSCANDO...'}
                                               disabled={ disableSearchButton }
                                               style={{width:'100%'}}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {

    const {
        flightsData,
        airportOrigin,
        airportDestination,
        airports,
        flights,
        searching,
        startSearchMoment,
        cias_statistics,
        requestData,
        preventSearch,
        research,
        companiesToSearch
    } = state.busca;

    return {
        flightsData,
        airportOrigin,
        airportDestination,
        airports,
        flights,
        searching,
        startSearchMoment,
        cias_statistics,
        requestData,
        preventSearch,
        research,
        companiesToSearch
    }

};

export default connect(mapStateToProps,
    {
        getAirports,
        shareAirports,
        findFlights,
        startSearchingInCompany,
        endSearchingInCompany,
        errorSearchingInCompany,
        clearSearchingData,
        shareRequestFlightData,
        setSelectedCompanies,
        setSearching,
        eraseCookie,
        selectAirport,
        clearSearchingResultSet,
        show,
        setPreventSearch,
        setResearch,
        openTerms,
        setHashTracker,
        getUuid,
        sendNotification,
        getBestPrices,
        clearBestPrices,
        getCompanies
    })(FormSearch);