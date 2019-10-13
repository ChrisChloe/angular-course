import React, {Component} from 'react';
import {format} from '../../utils/utils';

class FlightCiaPrice extends Component {

    constructor(props) {
        super(props)
    }

    renderPrice(flight, type) {

        const miles = flight[`${type}_miles`];
        const price = flight[`${type}_price`];
        const milesCompany = flight[`${type}_miles_company`];
        const labelAc = type === 'adult' ? 'ADT' : 'CHD';
        const labelDs = type === 'adult' ? 'Adulto' : 'Criança';

        return (
            <div className="milhasDaGaleraIda">

                {price > 0 &&
                    <small>
                        <span>{labelAc} {format(price + flight[`${type}_shipping_rate_company`])}</span>
                    </small>
                }

                {miles > 0 &&
                    <small>
                        Milhas ({labelDs}):
                        <span className="valorMilhasAdultoIda">{miles}</span>
                    </small>
                }

                {(milesCompany > 0 && milesCompany < miles) &&
                    <small className="miles-same-company" title="Válido apenas para ida e volta da mesma companhia *exceto algumas combinações">
                        Milhas ({labelDs}):
                        <span className="valorMilhasAdultoIda">{milesCompany}</span>*
                    </small>
                }

            </div>
        )
    }


    renderResumePrice(flight, suffix){

        return (
            <small id="valorDinheiroIdaResumo">
                {flight['adult_price'+suffix] > 0 &&
                    <div>
                        ADT: {format(flight['adult_price'+suffix] + flight[`adult_shipping_rate_company`]) }
                    </div>
                }

                {flight['adult_price'+suffix] === 0 &&
                    <div>---</div>
                }

                {((flight['child_price'+suffix] > 0) && (flight.children > 0))
                    ?
                        <div>
                            CHD: {format(flight['child_price'+suffix]) }
                        </div>

                    : null
                }

            </small>
        )
    }


    render() {
        const {flight, isResume, suffix} = this.props;

        return (
            <div>
                {!isResume &&
                <div className="td td-md-3 even-second hidden-xs">
                    <div className={`${flight.children === 0 && 'alinhamento'}`}>
                        {this.renderPrice(flight, 'adult')}

                        {flight.children > 0 &&
                            <div className="sep-preco"></div>
                        }

                        {((flight.adult_miles > 0) && (flight.children > 0)) &&
                            this.renderPrice(flight, 'child')
                        }
                    </div>
                </div>
                }
                {isResume &&
                    this.renderResumePrice(flight, suffix)
                }

            </div>
        )

    }
}

export default FlightCiaPrice;