import React, { Component } from 'react'
import { formatMoney } from 'accounting'
import _ from 'lodash'
import Connection from "../connection/Connection";


class FlightStopDatail extends Component {

    render (){
        return this.renderDetail()
    }

    renderDetail(){

        const {flight, uniqueFlightId} = this.props;

        const connections = _.map(flight.connections, connection => <Connection key={_.uniqueId()} {...connection}/>)

        return (
            <article className="detalhe-trechos collapse" id={uniqueFlightId} >
                <div className="boxTrecho-info">
                    <span>
                       <div className="boxTrecho-logo">
                       <img src={`assets/svg/${flight.company.title.toLowerCase()}.svg`} className="logotipoCompanhiaIda img-responsive"/>
                          {/* <img className="logotipoCompanhiaIda img-responsive" src={`assets/img/${flight.company.image}`}/> */}
                       </div>
                    </span>
                    <span className="hidden-xs ">
                        <strong>Voo: </strong>{flight.flight_code}
                    </span>
                    <span className="">
                        <strong>Parada(s): </strong>
                        {(flight.connections.length -1) <= 1 ? flight.connections.length -1 + " Conexão" : flight.connections.length -1 + " Conexões"}
                    </span>
                    <span className="hidden-sm hidden-md hidden-lg">

                       <strong>Preço Cia: </strong>
                        {flight.adult_price > 0 &&
                            <div className="bloco-milhas">
                                ADT: {formatMoney(flight.adult_price, "R$", 2, ".", ",")}
                            </div>
                        }
                        {(flight.children && flight.adult_price > 0) &&
                            <div className="bloco-milhas">
                                | CHD: {formatMoney(flight.child_price, "R$", 2, ".", ",")}
                            </div>
                        }

                    </span>
                    <span>
                       <strong>Qntd. Milhas: </strong>
                        {flight.adult_miles &&
                            <div className="bloco-milhas">
                                ADT: {flight.adult_miles}
                            </div>
                        }
                        {(flight.children > 0 && flight.child_miles > 0) &&
                            <div className="bloco-milhas"> | CHD:
                                {flight.child_miles}
                            </div>
                        }
                    </span>
                    <span className="">
                        <strong>Taxa de Embarque: </strong>
                        {flight.shipping_rate > 0
                            ? formatMoney(flight.shipping_rate, "R$", 2, ".", ",")
                            :'Sob consulta'
                        }
                    </span>
                </div>
                <div className="boxConexao">
                    {connections}
                </div>
            </article>
        )

    }

}

export default FlightStopDatail;