import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from '../segment/Segment';
import moment from 'moment';
import _ from 'lodash';

class SegmentList extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const segmentsList = this.props.bestPrices;
        if (_.isEmpty(segmentsList)) return this.renderSkeletonSegments(segmentsList);

        return this.renderSegments(segmentsList);
    }

    getSegments(segmentsList, loading = false) {
        if (!segmentsList) return null;
        const formatBr = 'DD/MM/YYYY';
        const formatUs = 'YYYY-MM-DD';

        const {date_starting, date_back} = this.props.requestData;

        const startDate = (this.props.segmentProp === 'segments') ? date_starting : date_back;

        return _(_.range(-3, 4))
            .map(n => moment(startDate, formatBr).add(n, 'd').format(formatBr))
            .map((day) => {
                let segment = _(segmentsList)
                    .filter(s => moment(s.date, formatUs).isSame(moment(day, formatBr)))
                    .map(s => ({...s, day}))
                    .sortBy(a => a.price)
                    .head();

                const tripDay = !_.isNil(segment) ? moment(segment.date, formatUs).isSame(moment(startDate, formatBr)) : false;
                if (day) {
                    return <Segment key={_.uniqueId()} segmentData={{...segment, tripDay, day, loading}}/>
                } else {
                    return (<div className={`box-preco col-md-1-2 bg-preco-indis`}>
                        <span>
                            <p>
                                {/*{day}*/}
                            </p>
                        </span>
                    </div>)
                }
            }).value()
    }


    renderSegments(segmentsList) {
        return (
            <div className="table-ida tab-pane active">
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="box-melhorPreco">
                            <div className="geralBox-melhorPreco">
                                <div className="title-melhorPreco">
                                </div>
                                <div className="box-precos">

                                    {this.getSegments(segmentsList)}

                                </div>
                            </div>
                        </div>
                        <div className="row arrow-slide">
                            <div className="col-xs-12">
                                <div className="pull-left col-md-12 hidden-sm hidden-md hidden-lg">
                                    <i className="fa fa-angle-double-left arrow-slide-animation-l" aria-hidden="true"/>
                                </div>
                                <div className="pull-right col-md-12 hidden-sm hidden-md hidden-lg">
                                    <i className="fa fa-angle-double-right arrow-slide-animation-l arrow-slide-animation-r"
                                       aria-hidden="true"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderSkeletonSegments(segmentsList) {
        return (
            <div className="table-ida tab-pane active">
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="box-melhorPreco">
                            <div className="geralBox-melhorPreco">
                                <div className="title-melhorPreco">
                                </div>
                                <div className="box-precos">

                                    {this.getSegments(segmentsList, true)}

                                </div>
                            </div>
                        </div>
                        <div className="row arrow-slide">
                            <div className="col-xs-12">
                                <div className="pull-left col-md-12 hidden-sm hidden-md hidden-lg">
                                    <i className="fa fa-angle-double-left arrow-slide-animation-l" aria-hidden="true"/>
                                </div>
                                <div className="pull-right col-md-12 hidden-sm hidden-md hidden-lg">
                                    <i className="fa fa-angle-double-right arrow-slide-animation-l arrow-slide-animation-r"
                                       aria-hidden="true"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SegmentList.propTypes = {
    segmentProp: PropTypes.string.isRequired
};

const mapStateToProps = state => {

    return {
        bestPrices: state.busca.bestPrices || {},
        requestData: state.busca.requestData
    }

};

export default connect(mapStateToProps, null)(SegmentList);