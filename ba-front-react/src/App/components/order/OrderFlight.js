import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import FlightCiaPrice     from '../flight/FlightCiaPrice';
import FlightOurPrice     from '../flight/FlightOurPrice';
import FlightEcoPrice     from '../flight/FlightEcoPrice';
import moment from 'moment';

class OrderFlight extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {flight, title, suffix, sameFareType, sameCompany} = this.props;

        return (
            <div>

                <div className='destination-voo'>
                    <h2><strong>{title}</strong> - companhia escolhida:</h2>
                    {/* <img id='logotipoCompanhiaVooIdaResumo' src={`assets/img/${flight.company.image}`}/> */}
                    <img src={`assets/svg/${flight.company.title.toLowerCase()}.svg`} className="logotipoCompanhiaVooIdaResumo img-responsive"/>

                </div>

                <div id='voo-ida' className='voo'>

                    <span>
                        <small>{title}</small>

                        <small id='dataVooIdaResumo' className={flight.children !== 0 ? 'alinhar-data-resumo' : ''}>
                            {moment(flight.date_boarding).format('DD/MM/YYYY')}
                        </small>
                    </span>
                    <span>
                        <small>Preço CIA</small>
                        <FlightCiaPrice flight={flight} suffix={suffix} isResume={true}/>
                    </span>
                    <span>
                        <small>Valor Busca Aéreo</small>
                        <FlightOurPrice sameCompany={sameCompany} sameFareType={sameFareType} flight={flight} suffix={suffix} isResume={true}/>
                    </span>
                    <span className='bg-laranja'>
                        <small>Economize</small>
                        <FlightEcoPrice sameCompany={sameCompany} sameFareType={sameFareType} flight={flight} suffix={suffix} isResume={true}/>
                    </span>
                </div>

            </div>
        )
    }
}

OrderFlight.propTypes = {
    flight: PropTypes.shape({
        company: PropTypes.shape({image: PropTypes.string.isRequired}).isRequired
        , children: PropTypes.number.isRequired
        , date_boarding: PropTypes.string.isRequired
        , adult_price: PropTypes.number.isRequired
        , adult_price_company: PropTypes.number.isRequired
        , child_price: PropTypes.number.isRequired
        , child_price_company: PropTypes.number.isRequired
        , adult_miles_price: PropTypes.number.isRequired
        , adult_miles_price_company: PropTypes.number.isRequired
        , child_miles_price: PropTypes.number.isRequired
        , child_miles_price_company: PropTypes.number.isRequired
        , adult_discount: PropTypes.number.isRequired
        , adult_discount_company: PropTypes.number.isRequired
        , child_discount: PropTypes.number.isRequired
        , child_discount_company: PropTypes.number.isRequired
    })
    , suffix: PropTypes.string.isRequired
    , title: PropTypes.string.isRequired
};


export default OrderFlight;