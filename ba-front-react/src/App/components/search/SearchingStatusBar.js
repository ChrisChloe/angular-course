import React, {Component} from 'react';
import {connect}         from 'react-redux';
import _ from 'lodash';

class SearchingStatusBar extends Component{

    constructor(props){
        super(props)
    }

    render(){

        const sorted = _(this.props.companies).uniqBy(u => u.id).sortBy( c => c.id).value();

        let counter = sorted.filter((company)=>company.done  || company.error);
        let searching =  _.map(sorted, company => {

            return(<div key={_.uniqueId()} className="spinner">
                        <div className={company.title.toLowerCase()}>

                             <div className="c-logo"/>

                            {company.searching &&
                                <div className="spinner-icon"/>
                            }
                            {company.done &&
                                <div className="result-ok">
                                    <i className="fa fa-check-circle" aria-hidden="true"/>
                                </div>
                            }
                            {company.error &&
                                <div className="result-fail">
                                    <i className="fa fa-times-circle" aria-hidden="true"/>
                                </div>
                            }
                        </div>
                   </div>
            )
        });

        if (counter.length === sorted.length){
            searching = [];
        }
        console.log(searching);
        return(
            <section className={`busca-loading-bar ${!_.isEmpty(searching) ? 'loading' : ''}`} style={{display: _.isEmpty(searching) ? 'none' : '' }} >
                <div id="loading-bar-spinner">
                    {searching}
                </div>
            </section>)

    }
}


const mapStateToProps = state => {

    return {companies: state.busca.companies,
            requestData: state.busca.requestData}
};

export default connect(mapStateToProps, null)(SearchingStatusBar)
