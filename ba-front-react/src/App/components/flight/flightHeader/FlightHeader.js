import React, {Component} from 'react';
import FlightCellHeader   from '../FlightCellHeader';
import { connect }        from 'react-redux';
import { sortFlights }    from '../../../actions/busca_actions';

class FlightHeader extends Component{

    componentWillMount(){
        this.props.sortFlights(
            {
                property:'adult_miles_price',
                isAsc: true
            })
    }

    render() {

        const {flight_selected} = this.props;


        return (<div className="row voo-list-box">
                    <div className={`result-voo-header hidden-xs ${flight_selected ? 'selected_flight' : '' } ${this.props.searching ? 'loading' : ''} ${this.props.searching ? 'loading' : ''}`}>

                        {/*<FlightCellHeader className="td-md-1" title="Escolha"/>*/}

                        <FlightCellHeader className="td-md-2" title="Voo" property="flight_code"/>

                        <FlightCellHeader className="td-md-2" title="Partida" property="date_boarding"/>

                        <FlightCellHeader className="td-md-2" title="Chegada" property="date_landing"/>

                        <FlightCellHeader className="td-md-1" title="Parada(s)" property="connections"/>

                        <FlightCellHeader className="td-md-3 even-second" title="Preço CIA" property="adult_miles"/>

                        <FlightCellHeader className="col-sm-2 col-md-2 c-preco-elo" title="Nosso Preço" property="adult_miles_price" active={true}/>

                        <FlightCellHeader className="td-md-2 c-economize" title="Economize" property="adult_discount"/>

                    </div>
                </div>)
    }
}

const mapStateToProps = state => {
    return {
        searching:       state.busca.searching,
        flightsData:     state.busca.flightsData,
        flight_selected: state.busca.flight
    }
};

export default connect(mapStateToProps, { sortFlights })(FlightHeader);