import React, {Component}   from 'react';
import {format, formatDate} from '../../utils/utils';
import {itsWorthConsiderCompanyPrice} from '../search/Financial';
import {connect}      from 'react-redux';
import PropTypes      from 'prop-types';
import FlightOurPrice from "../flight/FlightOurPrice";
import _ from 'lodash';
import moment from "moment/moment";

class FlightsTableResume extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (

            <table id="box-info-voo-ida" className="box-info-voo table table-bordered responsive nowrap" cellSpacing="0" width="100%">
                <thead>
                <tr>
                    <th>Vôo</th>
                    <th className="hidden-xs">Partida</th>
                    <th className="hidden-sm hidden-md hidden-lg">Trecho</th>
                    <th className="hidden-xs">Chegada</th>
                    <th className="hidden-xs">Milhas</th>
                    {(!this.props.paymentPresentation) &&
                        <th><span className="hidden-xs">Nosso</span> Preço</th>
                    }
                    {(!this.props.paymentPresentation) &&
                        <th>Taxas</th>
                    }
                    {(!this.props.paymentPresentation) &&
                        <th className="hidden-xs">Total</th>
                    }
                </tr>
                </thead>
                <tbody>
                {this.renderLines()}
                </tbody>
            </table>);
    }

    renderLines() {

        const {flight, flightBack,  opFlight, opFlightBack, sameFareType, sameCompany} = this.props;

        const trueFlight = flight || opFlight;
        const trueFlightBack = flightBack || opFlightBack;

        if(trueFlightBack) trueFlightBack.isBack = true;

        return _([trueFlight, trueFlightBack]).filter(f => !_.isNil(f))
            .map(flight => {

                const total = flight.isBack ? this.props.totalBack : this.props.totalFlight;
                return {...flight, total}

            }).map(flight => {

                return (<tr className="linha-tabela" key={_.uniqueId()}>

                    <td style={{width: 120}} className="bg-cinza-escuro info-companhia-numero-voo">

                        <img src={`assets/svg/${flight.company.title.toLowerCase()}.svg`} className="img-responsive"/>
                        {/* <img src={`assets/img/${flight.company.image}`}/> */}

                        <small className="numero-voo">
                            {flight.flight_code}
                        </small>

                    </td>

                    <td style={{width: 120}} className="hidden-xs info-horario info-ida">
                    <span>
                        {formatDate(flight.date_boarding)}
                    </span>
                    <span>
                        {!_.isEmpty(flight.connections)
                            ? moment(flight.connections[0].boarding, 'hh:mm:ss').format('HH:mm')
                            : moment(flight.boarding, 'hh:mm:ss').format('HH:mm')
                        }
                    </span>
                    <span>
                        {flight.origin.initials}
                    </span>
                    </td>
                    <td style={{width: 120}} className="hidden-xs info-horario info-ida">
                    <span>
                        {formatDate(flight.date_landing)}
                    </span>
                    <span>
                        {!_.isEmpty(flight.connections)
                            ? moment(flight.connections[(_.size(flight.connections) - 1)].landing, 'hh:mm:ss').format('HH:mm')
                            : moment(flight.landing, 'hh:mm:ss').format('HH:mm')
                        }
                    </span>
                    <span>
                        {flight.destination.initials}
                    </span>
                    </td>
                    <td style={{width: 120}} className="info-horario info-ida hidden-sm hidden-md hidden-lg">
                    <span>
                        <strong>
                            {formatDate(flight.date_boarding)}
                        </strong>
                    </span>
                        <span>
                        {flight.origin.initials}
                    </span>
                        <br/>
                        <span>
                        <strong>
                            {formatDate(flight.date_landing)}
                        </strong>
                    </span>
                        <span>
                        {flight.destination.initials}
                    </span>
                    </td>

                    <td style={{width: 120}} className="hidden-xs">
                        {/*Milhas*/}
                        {!sameCompany &&
                            <span>

                                <small>
                                    ADT: {flight.adult_miles}
                                </small>

                                {flight.children > 0 &&
                                    <small>
                                        <br/> CHD: {flight.child_miles}
                                    </small>
                                }

                            </span>
                        }

                        {sameCompany &&
                        <span>

                        {(flight.adults > 0 && flight.adult_miles <= flight.adult_miles_company) &&
                        <small> ADT: {flight.adult_miles} </small>
                        }

                            {(flight.adults > 0 && flight.adult_miles > flight.adult_miles_company) &&
                            <small> ADT: {flight.adult_miles_company} </small>
                            }

                            {(flight.children > 0 && flight.child_miles <= flight.child_miles_company) &&
                            <small><br/> CHD:{flight.child_miles} </small>
                            }
                            {(flight.children > 0 && flight.child_miles > flight.child_miles_company) &&
                            <small><br/>CHD: {flight.child_miles_company} </small>
                            }
                            </span>
                        }

                        {flight.babies > 0 &&
                        <small><br/>BB: {flight.baby_miles} </small>
                        }

                    </td>

                    {(!this.props.paymentPresentation) &&

                        <td style={{width: 120}} className="bg-azul-claro preco-busca-aereo">
                            {/* Nosso preço */}
                            <FlightOurPrice sameFareType={sameFareType}  sameCompany={sameCompany} flight={flight} isDetail={true}/>
                        </td>

                    }

                    {(!this.props.paymentPresentation) &&

                        <td style={{width: 120}} className="economize bg-laranja">
                            {/* Taxas */}
                            <small> {flight.adults + flight.children} x</small>

                            <small> Tx: {
                                flight.shipping_rate > 0
                                ? format(flight.shipping_rate)
                                : 'Sob consulta'
                            } </small>

                            {(flight.company.additional_tax > 0) &&
                                <small> Tx Add: {flight.company.additional_tax} </small>
                            }

                            {flight.babies > 0 &&
                                <small> {flight.babies} x </small>
                            }

                            {flight.babies > 0 &&
                                <small> BB: {format(flight.company.additional_baby_tax)} </small>
                            }

                        </td>
                    }
                    {(!this.props.paymentPresentation) &&
                        <td style={{width: 120}} className="hidden-xs">
                            <small>
                                {format(flight.total)} {!(flight.shipping_rate > 0) ? ' + taxas' : ''}
                            </small>
                        </td>

                    }

                </tr>)
            }).value()

    }

}

FlightsTableResume.propTypes = {
    paymentPresentation: PropTypes.bool.isRequired
};


const mapStateToProps = state => {

    return {flight: state.busca.flight, flightBack: state.busca.flightBack}

};

export default connect(mapStateToProps, null)(FlightsTableResume);