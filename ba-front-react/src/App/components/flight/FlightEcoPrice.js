import React, {Component} from 'react'
import {format} from '../../utils/utils'

class FlightEcoPrice extends Component {

    constructor(props) {
        super(props)
    }

    renderPrice(flight, type) {
        return (
            <div className="milhasDaGaleraIda alinhamento">
                {flight[`${type}_discount`] > 0 &&
                    <small>
                        <span className="reduced">
                            {type === 'adult' ? 'ADT' : 'CHD'} {format(flight[`${type}_discount`])}
                        </span>
                    </small>
                }
                {flight[`${type}_discount`] === 0 &&
                    <small>
                        <span className="reduced">----</span>
                    </small>
                }
                {(flight[`${type}_discount_company`] > 0 && flight[`${type}_discount_company`] < flight[`${type}_discount`]) &&
                    <small title="Válido apenas para ida e volta da mesma companhia">
                        <span className="price-same-company reduced valorDinheiroAdultoIda">
                        {type === 'adult' ? 'ADT' : 'CHD'}: {format(flight[`${type}_discount_company`])}*</span>
                    </small>
                }
            </div>)
    }

    renderResumePrice(flight, suffix) {
        return (
            <small id="valorDinheiroIdaResumo">
                {flight['adult_discount'+suffix] > 0 &&
                <div>
                    ADT: {format(flight['adult_discount'+suffix]) }
                </div>
                }

                {flight['adult_discount'+suffix] === 0 &&
                <div>---</div>
                }
                {(flight['child_discount'+suffix] > 0 && flight.children > 0) &&
                <div>
                    CHD: {format(flight['child_discount'+suffix]) }
                </div>
                }
            </small>)
    }

    render() {
        const {flight, isResume, suffix} = this.props;

        if(isResume) return this.renderResumePrice(flight, suffix);

        return (<div className="td td-md-2 c-economize hidden-xs">
                      {this.renderPrice(flight, 'adult')}
                </div>)

    }
}

export default FlightEcoPrice;