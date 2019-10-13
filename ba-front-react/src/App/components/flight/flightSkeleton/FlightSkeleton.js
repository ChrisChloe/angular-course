import React, { Component } from 'react';

class FlightSkeleton extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div className="row voo-list-box">
                <div className="result-voo-body">
                    <div className={`has-miles-reduced has-miles-reduced`}>
                        {/*<div className="td td-sm-1 td-md-1 td-xs-1">
                             <span className="box-escolha">

                                 <input className="selecione_ida"
                                        name="selecionar_ida"
                                        value="asdasd"
                                        type="radio"
                                        id='asdasd'/>
                                 <br/>
                                 <a className="skeleton-preview p0-35-light p0-35-light-logo"/>
                             </span>
                            <span style={{display: 'none'}} className="taxasIda">R$29,90</span>
                        </div>*/}

                        <div className="td td-sm-2 td-md-2 td-xs-2 p-top">


                            <a className="skeleton-preview p0-35-light"/>
                            <br/>
                            <small className="skeleton-preview p0-25-light"/>
                            <br/>
                            <input className="selecione_ida"
                                   name="selecionar_ida"
                                   value="asdasd"
                                   type="radio"
                                   id='asdasd'/>
                            <br/>
                        </div>

                        <div className="td td-sm-2  td-md-2 td-xs-2">
                            <span className="dataPartidaIda">
                                <small className="skeleton-preview p0-35-light"/>
                            </span>
                            <span className="horaPartidaIda">
                                <small className="skeleton-preview p0-25-light"/>
                            </span>
                            <span className="origemIda">
                                <small className="skeleton-preview p2-15-light"/>
                            </span>
                        </div>

                        <div className="td td-sm-2  td-md-2 td-xs-2">
                             <span className="dataPartidaIda">
                                <small className="skeleton-preview p0-35-light"/>
                            </span>
                            <span className="horaPartidaIda">
                                <small className="skeleton-preview p0-25-light"/>
                            </span>
                            <span className="origemIda">
                                <small className="skeleton-preview p2-15-light"/>
                            </span>
                        </div>

                        <div className="td td-md-1 hidden-xs p-top">
                            <a className="skeleton-preview p6-40-light"/>
                            <br/>
                            <div style={{height:'8px'}}/>
                            <span className="horaPartidaIda">
                                <small className="skeleton-preview p0-30-light"/>
                            </span>
                        </div>

                        <div className="td td-md-3 even-second hidden-xs p-top">
                             <span className="dataPartidaIda">
                                <small className="skeleton-preview p0-40-dark"/>
                            </span>
                            <span className="horaPartidaIda">
                                <small className="skeleton-preview p0-40-dark"/>
                            </span>
                        </div>

                        <div className="td td-xs-2 td-sm-1 col-md-2 c-preco-elo col-xs-2 p-top">
                            <small className="skeleton-preview p0-40-dark"/>
                        </div>

                        <div className="td td-md-2 c-economize hidden-xs" style={{paddingTop:'20px'}}>
                            <small className="skeleton-preview p0-40-dark"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default FlightSkeleton;