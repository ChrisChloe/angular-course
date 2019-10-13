import React, { Component } from 'react';
import {connect}            from 'react-redux';
import Autocomplete         from 'react-autocomplete';
import { filterAirports }   from '../../utils/utils';
import { getAirports, selectAirport } from '../../actions/busca_actions';

class AirportInput extends Component{

    constructor(props) {
        super(props);
        this.state = {
            airports: [],
            filtered: [],
            loading: false
        };
        this.airport = {fulltitle: ''};
        this.value   =  '';

    }

    componentWillReceiveProps(nextProps){

        const { airports } = nextProps;
        
        if(airports && airports.length > 0){
            this.setState({
                ...this.state,
                airports: airports || [],
                filtered: airports || []
            })
        }

    }

    handlerBlur(){

        if(this.airport.fulltitle !== this.value){
            this.value = '';
        }

    }

    render() {
        const inputData = {
                      className: 'form-input data'
                    , type:'text'
                    , placeholder: this.props.placeholder
                    , required:"true"
                    , onBlur: () => this.handlerBlur()
        };

        return (
            <div>
                <Autocomplete
                    wrapperStyle={{display:'block'}}
                    value={this.value}
                    inputProps={inputData}
                    items={this.state.filtered}
                    getItemValue={airport => airport.fulltitle}
                    onSelect={(value, airport) => this.selectAirport(value, airport)}
                    onChange={(event, value) => this.filterAirports(event, value)}
                    renderItem={(airport, isHighlighted) => this.renderAirportList(airport, isHighlighted)}
                    renderMenu={(items, value, style) => this.renderMenu(items, value, style)}
                    selectOnBlur={true}
                />
            </div>
        )
    }

    renderAirportList(airport, isHighlighted){

        return (<li key={airport.id} className={isHighlighted ? 'active' : {padding: '2px 6px',cursor: 'default'}}>
                    <a>{airport.fulltitle}</a>
                </li>)

    }

    selectAirport(value, airport){

        if(value === this.value) return;


        this.airport = airport;
        this.setState({filtered: [airport] });
        this.value = value;
        this.props.selectAirport(airport, this.props.origin);

    }

    filterAirports(event, value){

        this.setState({loading: true, filtered: [] });
        
        this.value = value;

        const update = (items) => { this.setState({ filtered: items, loading: false })};

        filterAirports(value, update , this.state.airports)

    }


    renderMenu(items, value){

        const lis = value === '' ? (
                    <li style={{padding: 6}}>Digite o nome de um Aeroporto</li>
                ) : this.state.loading ? (
                    <li style={{padding: 6}}>Carregando...</li>
                ) : items.length === 0 ? (
                    <li style={{padding: 6}}>Não foram encontrados resultados que contenham: {value}</li>
                ) : items;

        return (<ul style={{display: 'block', maxHeight: '35vw', overflowY: 'scroll' }} className="dropdown-menu">
                    {lis}
                </ul>)

    }

}

const mapStateToProps = (state) => {
    const {airports, airportOrigin, airportDestination} = state.busca;
    return { airports:airports || [], airportOrigin, airportDestination }
};

export default connect( mapStateToProps , {getAirports, selectAirport})(AirportInput);
