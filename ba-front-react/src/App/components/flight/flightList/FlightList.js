import React, { Component } from 'react';
import FlightHeader   from '../flightHeader/FlightHeader';
import SegmentList    from '../../segmentation/segmentList/SegmentList';
import Flight         from '../Flight';
import FlightSkeleton from '../flightSkeleton/FlightSkeleton';
import { connect }    from 'react-redux';
import Carousel       from '../../search/Carousel';

import _ from 'lodash';

class FlightList extends Component {

    constructor(props) {
        super(props)
    }

    getFlights (flightProp, isFlightBack = false) {

        const {sort} = this.props;

        const flights = _(this.props.flightsData).flatMap(fd => fd[flightProp]).value();

        return _(_.orderBy(flights, sort.property, (sort.isAsc)?'asc':'desc'))
                    .map(flight => <Flight key={_.uniqueId()} flightData={{...flight, isFlightBack}} />).value()

    }

    createSkeletonFlights () {

        return _.map(_.range(6), () => <FlightSkeleton key={_.uniqueId()}/> );

    }

    render() {

        const flights         = this.getFlights('flights');
        const flightsBack     = this.getFlights('flights_back', true);
        const flightsSkeleton = this.createSkeletonFlights();

        return ( _.isEmpty(flights)
            ? this.props.searching
                ? this.renderSkeletonFlights(flightsSkeleton, flightsBack)
                : <div className="container-boots"> <Carousel/> </div>
            : this.renderFlights(flights, flightsBack) )

    }

    renderFlights(flights, flightsBack){

        return (
            <div className="container-boots">

                <section className="conteudo" id="conteudo-voos" style={{margin: '0!important'}}>

                    <div>
                        <ul id="tabs" className={`nav nav-tabs ${this.props.searching ? 'loading' : ''}`} data-tabs="tabs">
                            <li className="active">
                                <a href="#tab-ida" data-toggle="tab">
                                    <span className="hidden-xs">Selecione seu voo de ida</span>
                                    <span className="hidden-sm hidden-md hidden-lg">Ida</span>
                                </a>
                            </li>

                            <li>
                                {!_.isEmpty(flightsBack)
                                    ? <a href="#tab-volta" data-toggle="tab">
                                        <span className="hidden-xs">Selecione seu voo de volta</span>
                                        <span className="hidden-sm hidden-md hidden-lg">Volta</span>
                                      </a>
                                    : <a>
                                        <span className="hidden-xs">Selecione seu voo de volta</span>
                                        <span className="hidden-sm hidden-md hidden-lg">Volta</span>
                                      </a>
                                }

                            </li>
                        </ul>

                        <div className="tab-content result-voo">
                            <div className="tab-pane active" id="tab-ida">

                                <SegmentList segmentProp="segments"/>

                                <FlightHeader/>

                                {flights}

                                {_.isEmpty(flights) &&
                                    <div className="row">
                                        <h5 className="txt-voo-nao-selecionado txt_center col-xs-12">
                                            Nenhum voo
                                        </h5>
                                    </div>
                                }

                            </div>
                            <div className="tab-pane" id="tab-volta">

                                <SegmentList segmentProp="segments_back"/>

                                <FlightHeader/>

                                {flightsBack}

                                {_.isEmpty(flightsBack) &&
                                    <div className="row">
                                        <h5 className="txt-voo-nao-selecionado txt_center col-xs-12">
                                            Nenhum voo
                                        </h5>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        )
    }

    renderSkeletonFlights(flightsSkeleton, flightsBack){

        return (
            <div className="container-boots">

                <section className="conteudo" id="conteudo-voos" style={{margin: '0!important'}}>

                    <div>
                        <ul id="tabs" className={`nav nav-tabs ${this.props.searching ? 'loading' : ''}`} data-tabs="tabs">
                            <li className="active">
                                <a href="#tab-ida" data-toggle="tab">
                                    <span className="hidden-xs">Selecione seu voo de ida</span>
                                    <span className="hidden-sm hidden-md hidden-lg">Ida</span>
                                </a>
                            </li>
                            <li>

                                { !_.isEmpty(flightsBack)
                                    ? <a href="#tab-volta" data-toggle="tab">
                                        <span className="hidden-xs">Selecione seu voo de volta</span>
                                        <span className="hidden-sm hidden-md hidden-lg">Volta</span>
                                    </a>
                                    : <a>
                                        <span className="hidden-xs">Selecione seu voo de volta</span>
                                        <span className="hidden-sm hidden-md hidden-lg">Volta</span>
                                    </a>
                                }

                            </li>
                        </ul>
                        <div className="tab-content result-voo">
                            <div className="tab-pane active" id="tab-ida">

                                <SegmentList segmentProp="segments"/>

                                <FlightHeader/>

                                {flightsSkeleton}

                            </div>
                            <div className="tab-pane" id="tab-volta">

                                <SegmentList segmentProp="segments_back"/>

                                <FlightHeader/>
                                {flightsSkeleton}

                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row text-center">
                            <div className="col-md-12 text-center">
                                <i className="fa fa-spinner fa-pulse"/>
                            </div>
                        </div>
                    </div>

                </section>



            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        flightsData: state.busca.flightsData || {},
        sort:        state.busca.sort || 'adult_miles_price',
        searching:   state.busca.searching
    }
};

export default connect(mapStateToProps, null)(FlightList)