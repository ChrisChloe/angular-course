import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment    from 'moment';

class Connection extends Component{

    constructor(props){
        super(props)
    }

    formatTime(time){
        return moment(time,'hh:mm:ss').format('HH:mm')
    }

    render () {

        const connection = this.props;

        return (
            <div>
                <div className="boxTrecho-conexao">
                    <div className="boxParadas">
                        <div className="parada-bg hidden-xs">
                            <i className="fa fa-map-marker" aria-hidden="true"/>
                        </div>
                        <span>{this.formatTime(connection.boarding)}</span>
                        <span>{connection.origin}</span>
                    </div>
                    <div className="separador-trecho">
                        <span className="hidden-xs">{connection.flight_code}</span>
                        <span>{this.formatTime(connection.duration)} hr</span>
                    </div>
                    <div className="boxParadas">
                        <div className="parada-bg hidden-xs">
                            <i className="fa fa-map-marker" aria-hidden="true"/>
                        </div>
                        <span>{this.formatTime(connection.landing)}</span>
                        <span>{connection.destination}</span>
                    </div>
                </div>
                    {connection.waiting &&
                    <div className="boxEspera">
                        <div className="espera-bg"/>
                        <span>{ this.formatTime(connection.waiting)} hr</span>
                    </div>
                    }
            </div>
        )

    }

}

Connection.propTypes = {
    flight_code: PropTypes.string.isRequired,
    origin:      PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    boarding:    PropTypes.string.isRequired,
    landing:     PropTypes.string.isRequired,
    duration:    PropTypes.string.isRequired,
    waiting:     PropTypes.string
};

export default Connection;