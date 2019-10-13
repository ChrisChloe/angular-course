import React, {Component} from 'react';
import FlightStopDetail   from './FlightStopDatail';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment    from 'moment';
import {selectFlight} from '../../actions/busca_actions';
import {SELECT_FLIGHT, SELECT_FLIGHT_BACK} from '../../actions/types';
import FlightCiaPrice from "./FlightCiaPrice";
import FlightOurPrice from "./FlightOurPrice";
import FlightEcoPrice from "./FlightEcoPrice";
import _ from 'lodash';

class Flight extends Component {

    constructor(props) {
        super(props);
        this.state = {showDetails: false, expandLine: false}
    }

    selectFlight(flight) {
        this.props.selectFlight(flight, flight.isFlightBack ? SELECT_FLIGHT_BACK : SELECT_FLIGHT)
    }

    showDetailsRadio(flight, uniqueFlightId, select) {

        $('.detalhe-trechos').slideUp();

        const uniqueFlight = $(`#${uniqueFlightId}`);

        this.state.showDetails ? uniqueFlight.slideUp() : uniqueFlight.slideDown();

        this.setState(prevState => ({showDetails: !prevState.showDetails}));

        if (select) {
            this.selectFlight(flight)
        }
    }

    expandLine(flight) {
        if ((flight.adult_miles_company > 0
            && flight.adult_miles_company < flight.adult_miles)
            ||
            (flight.child_miles_company > 0
            && flight.child_miles_company < flight.child_miles)
            ||
            (flight.adult_miles_price_company > 0
            && flight.adult_miles_price_company < flight.adult_miles_price)
            ||
            (flight.child_miles_price_company > 0
            && flight.child_miles_price_company < flight.child_miles_price)) {
            return true
        }
    }

    render() {

        const flight = this.props.flightData;

        const uniqueFlightId =  flight.flight_code.concat(_.uniqueId());

        return (
            <div className="row voo-list-box">
                <div className="result-voo-body">
                    <div className={`has-miles-reduced ${this.expandLine(flight) ? 'td-higher' : ''} has-miles-reduced`}>
                        {/*<div className="td td-sm-1 td-md-1 td-xs-1">
                             <span className="box-escolha">

                                 <input className="selecione_ida"
                                        name="selecionar_ida" value={flight.flight_code} type="radio"
                                        onClick={() => this.showDetailsRadio(flight, uniqueFlightId, true)}
                                        id={`input-${uniqueFlightId}`}/>
                                 <br/>
                                 <label htmlFor={`input-${flight.flight_code}`} className="hidden-xs">Selecionar</label>
                             </span>
                            <span style={{display: 'none'}} className="taxasIda">R$29,90</span>
                        </div>*/}

                        <div className="td td-sm-2 td-md-2 td-xs-2">
                            <img src={`assets/svg/${flight.company.title.toLowerCase()}.svg`} className="logoVoo img-responsive"/>
                            {/* <img className="logoVoo" alt="" title="" rel="Avianca" src={`assets/img/${flight.company.image}`}/> */}
                            <small className="numero-voo ">{flight.flight_code}</small>
                            <input className="selecione_ida"
                                   name="selecionar_ida" value={flight.flight_code} type="radio"
                                   onClick={() => this.showDetailsRadio(flight, uniqueFlightId, true)}
                                   id={`input-${uniqueFlightId}`}/>
                        </div>

                        <div className="td td-sm-2  td-md-2 td-xs-2">
                            <span className="dataPartidaIda">
                                {moment(flight.date_boarding).format('DD/MM/YYYY')}
                            </span>
                            <span className="horaPartidaIda">
                                {moment(flight.connections[0].boarding, 'hh:mm:ss').format('HH:mm')}
                            </span>
                            <span className="origemIda">
                                {flight.origin.initials}
                            </span>
                        </div>

                        <div className="td td-sm-2  td-md-2 td-xs-2">
                            <span>
                                {moment(flight.date_landing).format('DD/MM/YYYY')}
                            </span>
                            <span>

                                {moment(_.last(flight.connections).landing, 'hh:mm:ss').format('HH:mm')}
                            </span>
                            <span>
                                {flight.destination.initials}
                            </span>
                        </div>

                        <div className="td td-md-1 hidden-xs">
                             <span className="info-paradas">
                                 <small className="numero-paradas bg-cinza ">
                                     {_.size(flight.connections) - 1}
                                 </small>

                                 <small className="detalhe-paradas">
                                     <a title="Clique para ver os trechos" className="link-detalhe"
                                        onClick={() => this.showDetailsRadio(flight, uniqueFlightId)}
                                        style={{cursor:'pointer'}}>

                                        <span>
                                             {this.state.showDetails
                                                 ? <i className="fa fa-minus" aria-hidden="true"/>
                                                 : <i className="fa fa-plus" aria-hidden="true"/>
                                             }
                                        </span>
                                         Detalhes
                                     </a>
                                 </small>
                             </span>
                        </div>

                        <FlightCiaPrice flight={flight}/>
                        <FlightOurPrice flight={flight} sameFareType={true}/>
                        <FlightEcoPrice flight={flight}/>
                        <FlightStopDetail flight={flight} uniqueFlightId={uniqueFlightId}/>

                    </div>
                </div>
            </div>
        )
    }

}


Flight
    .propTypes = {
    flight: PropTypes.shape({
        flightNumber: PropTypes.string.isRequired
        , id: PropTypes.number.isRequired
        , search_id: PropTypes.number.isRequired
        , flight_code: PropTypes.number.isRequired
        , flight_direction: PropTypes.number.isRequired
        , origin: PropTypes.shape({
            title: PropTypes.string.isRequired
            , initials: PropTypes.string.isRequired
        })
        , destination: PropTypes.shape({
            title: PropTypes.string.isRequired
            , initials: PropTypes.string.isRequired
        })
        , duration: PropTypes.string.isRequired
        , adults: PropTypes.number.isRequired
        , children: PropTypes.number.isRequired
        , babies: PropTypes.number.isRequired
        , company: PropTypes.shape({
            title: PropTypes.string.isRequired
            , image: PropTypes.string.isRequired
            , additional_tax: PropTypes.number.isRequired
            , additional_baby_tax: PropTypes.number.isRequired
            , additional_baggage_tax: PropTypes.number.isRequired
            , required_cpf: PropTypes.number.isRequired
        })
        , program: PropTypes.string.isRequired
        , shipping_rate: PropTypes.number.isRequired
        , fare_type: PropTypes.number.isRequired
        , adult_price: PropTypes.number.isRequired
        , child_price: PropTypes.number.isRequired
        , baby_price: PropTypes.number.isRequired
        , price_baggage_type: PropTypes.number.isRequired
        , adult_price_company: PropTypes.number.isRequired
        , child_price_company: PropTypes.number.isRequired
        , baby_price_company: PropTypes.number.isRequired
        , price_company_baggage_type: PropTypes.number.isRequired
        , adult_miles: PropTypes.number.isRequired
        , child_miles: PropTypes.number.isRequired
        , baby_miles: PropTypes.number.isRequired
        , miles_baggage_type: PropTypes.number.isRequired
        , adult_miles_company: PropTypes.number.isRequired
        , child_miles_company: PropTypes.number.isRequired
        , baby_miles_company: PropTypes.number.isRequired
        , miles_company_baggage_type: PropTypes.number.isRequired
        , adult_miles_price: PropTypes.number.isRequired
        , child_miles_price: PropTypes.number.isRequired
        , baby_miles_price: PropTypes.number.isRequired
        , adult_miles_price_company: PropTypes.number.isRequired
        , child_miles_price_company: PropTypes.number.isRequired
        , baby_miles_price_company: PropTypes.number.isRequired
        , adult_discount: PropTypes.number.isRequired
        , child_discount: PropTypes.number.isRequired
        , adult_discount_company: PropTypes.number.isRequired
        , child_discount_company: PropTypes.number.isRequired
        , company_id: PropTypes.number.isRequired
        , date_boarding: PropTypes.string.isRequired
        , date_landing: PropTypes.string.isRequired
        , is_national: PropTypes.bool.isRequired
        , connections: PropTypes.arrayOf(PropTypes.shape({
            flight_code: PropTypes.string.isRequired
            , origin: PropTypes.string.isRequired
            , destination: PropTypes.string.isRequired
            , boarding: PropTypes.string.isRequired
            , landing: PropTypes.string.isRequired
            , duration: PropTypes.string.isRequired
            , waiting: PropTypes.string
        }))
    })
};

const mapStateToProps = (state) => {
        return state;
};

export default connect(mapStateToProps, {selectFlight})(Flight);