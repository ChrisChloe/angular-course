import React, {Component} from 'react';
import {format} from '../../utils/utils';

class FlightOurPrice extends Component {

    constructor(props) {
        super(props)
    }

    renderPrice(flight, type) {

        const milesPrice = flight[`${type}_miles_price`];

        const companyMilesPrice = flight[`${type}_miles_price_company`];

        const label = type === 'adult' ? 'ADT' : 'CHD';

        return (
            <div className={`milhasDaGaleraIda ${flight.children === 0 && 'alinhamento'}`}>
                {milesPrice > 0 &&
                    <small>
                        <span id="valorDinheiroAdultoIda">
                            {label} {format(milesPrice)}
                        </span>

                        {(companyMilesPrice > 0 && companyMilesPrice < milesPrice) &&
                            <span className="price-same-company" id="valorDinheiroAdultoIda" title="Válido apenas para ida e volta da mesma companhia">
                                {label}: {format(companyMilesPrice)}*
                            </span>
                        }
                    </small>
                }
            </div>)
    }

    renderResumePrice(flight, suffix, sameCompany, sameFareType) {


        let milesPriceAdult         = flight[`adult_miles_price`];
        let milesPriceCompanyAdult  = flight[`adult_miles_price_company`];
        let milesPriceChild         = flight[`child_miles_price`];
        let milesPriceCompanyChild  = flight[`child_miles_price_company`];

        if (flight['adult_miles_price'] === 0) {

             milesPriceAdult         = flight[`adult_price`];
             milesPriceCompanyAdult  = flight[`adult_price_company`];
             milesPriceChild         = flight[`child_price`];
             milesPriceCompanyChild  = flight[`child_price_company`];

        }

        return (

            <small id="valorDinheiroIdaResumo">

                {((milesPriceCompanyAdult > 0) && (milesPriceCompanyAdult < milesPriceAdult)) && sameFareType && sameCompany

                    ?   <div>
                            ADT: {format(milesPriceCompanyAdult)}*
                        </div>

                    :   <div>
                            ADT: {format(milesPriceAdult) }
                        </div>
                }

                {flight['adult_miles_price' + suffix] === 0 &&
                    <div>---</div>
                }


                {(flight['child_miles_price' + suffix] > 0 && flight.children > 0)
                    ? ((milesPriceCompanyChild > 0) && (milesPriceCompanyChild < milesPriceChild)) && sameFareType && sameCompany

                        ?   <div>
                                CHD: {format(milesPriceCompanyChild)}*
                            </div>

                        :   <div>
                                CHD: {format(milesPriceChild) }
                            </div>

                    : null
                }
            </small>)

    }

    renderDetailPrice(flight, type, sameCompany, sameFareType) {

        const isAdult           = type === 'adult';

        const qtdPassenger      = flight[type === 'adult' ? 'adults' : 'children'];

        const milesPrice        = flight[`${type}_miles_price`];

        const milesPriceCompany = flight[`${type}_miles_price_company`];

        return (
            <div>
                {qtdPassenger > 0 &&
                    <small>{qtdPassenger}x</small>
                }

                { <span>
                    {(qtdPassenger > 0)
                        ? ((milesPriceCompany < milesPrice) && sameFareType && sameCompany)

                            ?   <small>
                                    {isAdult ? 'ADT' : 'CHD'}: {format(milesPriceCompany)}*
                                </small>

                            :   <small>
                                    {isAdult ? 'ADT' : 'CHD'}: {format(milesPrice)}
                                </small>
                        : ''
                    }
                </span> }

            </div>
        )
    }

    render() {

        const {flight, isResume, suffix, isDetail, sameCompany, sameFareType} = this.props;

        if(isResume) return this.renderResumePrice(flight, suffix, sameCompany, sameFareType);

        if(isDetail) return (
            <div>
                {this.renderDetailPrice(flight, 'adult', sameCompany, sameFareType)}
                {this.renderDetailPrice(flight, 'child', sameCompany, sameFareType)}
                {flight.babies > 0 &&
                    <span>
                        <small>{flight.babies}x </small>
                        <small>BB: {format(flight.baby_miles_price)} </small>
                    </span>
                }
            </div>
        );

        return (
            <div className="td td-xs-2 td-sm-1  col-md-2 c-preco-elo col-xs-2">

                {this.renderPrice(flight, 'adult')}

                {flight.children > 0 &&
                    <div className="sep-preco"/>
                }

                {(flight.adult_miles > 0 && flight.children > 0) &&
                    this.renderPrice(flight, 'child')
                }
            </div>
        )

    }
}

export default FlightOurPrice;