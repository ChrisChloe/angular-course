import React, {Component} from 'react';
import _ from 'lodash'
import moment from 'moment'
import {format} from '../../utils/utils'
import Connection from '../connection/Connection'

class DetailFlight extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {type, op} = this.props;
        const isBack = type === 'flight_back';
        return (
            <div>
                <div>
                    <div className="col-md-12">
                        <div className={isBack?"flight-back":"flight-going"} style={{"float": "left"}}>
                            <h4 style={{"minWidth": "250px"}}>
                                Voo de <span style={{"fontWeight": "bold"}}>{isBack?"VOLTA":"IDA"}</span>:
                            </h4>
                            <ul>
                                <li>
                                    <small>
                                        <strong>Cia: </strong>
                                        {op[type].company.title}
                                    </small>
                                </li>
                                <li>
                                    <small>
                                        <strong>Nº Voo: </strong>
                                        {op[type].flight_code}
                                    </small>
                                </li>
                                <li>
                                    <small>
                                        <strong>Saída: </strong>
                                        {moment(op[type].date_boarding.concat(' ' + op[type].boarding)).format('DD/MM/YYYY HH:mm')}
                                    </small>
                                </li>
                                <li>
                                    <small>
                                        <strong>Chegada: </strong>
                                        {moment(op[type].date_landing.concat(' ' + op[type].landing)).format('DD/MM/YYYY HH:mm')}
                                    </small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col-md-12">
                        <div className={isBack?"flight-back":"flight-going"}
                             style={{"float": "left", "minWidth": "300px"}}>
                            <h4 style={{"fontWeight": "bold"}}>Taxas</h4>
                            <ul style={{"float": "left"}}>
                                {/*{op[type].company.additional_tax > 0 &&*/}
                                {/*<li>*/}
                                    {/*<small>*/}
                                        {/*<strong>Tx: </strong>*/}
                                        {/*{format(op[type].company.additional_tax)}*/}
                                    {/*</small>*/}
                                {/*</li>*/}
                                {/*}*/}

                                {!_.isEmpty(op.passengers.babies) > 0 &&
                                <li>
                                    <small>
                                        <strong>BB: </strong>
                                        {format(op[type].company.additional_baby_tax)}
                                    </small>
                                </li>
                                }
                            </ul>
                        </div>

                    </div>
                </div>

                {op[type].connections.length == 0 &&
                <div className="col-md-12">
                    <div className={isBack?"flight-back":"flight-going"}
                         style={{"float": "left", "minWidth": "300px"}}>
                        <h4 style={{"fontWeight": "bold"}}>Voo Direto</h4>
                    </div>
                </div>
                }
                {op[type].connections.length > 0 &&
                <div>
                    <div>
                        <div className="col-md-12">
                            <div className={isBack?"flight-back":"flight-going"}
                                 style={{"float": "left", "minWidth": "300px"}}>
                                <h4 style={{"fontWeight": "bold"}}>Trechos</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="col-md-12">
                            <div className="detalhe-trechos">
                                <div className="boxConexao">
                                    {_.map(op[type].connections, connection => {
                                        return (
                                            <Connection {...connection} key={_.uniqueId()} flight_code=""/>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )

    }
}

export default DetailFlight;