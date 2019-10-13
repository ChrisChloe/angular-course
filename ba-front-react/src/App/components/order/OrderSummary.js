import React, { Component} from 'react';
import { setDialogIndex, setOp, openTerms  } from '../../actions/order_actions';
import { setSearchTimeOut, setEndSearching, sendSearchHash, sendUuid } from '../../actions/busca_actions';
import { show, removeAll } from 'react-notification-system-redux';
import { itsWorthConsiderCompanyPrice } from '../search/Financial';
import { connect }   from 'react-redux';
import OrderFlight   from './OrderFlight';
import _ from 'lodash';

class OrderSummary extends Component{

    constructor (props) {
        super(props)
    }

    isEmptyFlights (flightsData) {
        const flights = _(flightsData).flatMap( fd => fd.flights).value();
        return (!flightsData || !flights);
    }

    isSameFareType (flight, flightBack) {
        if (flight && flightBack) {
            return flight.fare_type === flightBack.fare_type;
        }
    };

    isSameCompany (flight, flightBack) {
        if (flight && flightBack) {
            return flight.company_id === flightBack.company_id;
        }
    };

    render () {

        const { flight, flightBack, flightsData } = this.props;

        const sameFareType = this.isSameFareType(flight, flightBack);
        const sameCompany  = this.isSameCompany(flight, flightBack);
        const suffix = itsWorthConsiderCompanyPrice(flight, flightBack) ? '_company' : '';

        if(flight){
            setInterval(() => {
                $('#box-voo-ida-resumo').show().addClass('move-to-right')
            }, 200)
        }

        if(flightBack){
            setInterval(() => {
                $('#box-voo-volta-resumo').show().addClass('move-to-left')
            }, 200)
        }


        return (
            <div>
                {!this.isEmptyFlights(flightsData) && flight &&
                    <section style={{minHeight: 152}} id="resumo-pedido" className={`${!this.isEmptyFlights(flightsData) && flight ? 'orderSummaryOpened' : ''}`}>

                        <div className="container-boots">
                            <div className="row">
                                <div className="col-xs-12">
                                    <h1>resumo do seu pedido</h1>
                                </div>

                                {(!flight && !flightBack) &&
                                    <h5 id="txt-voo-nao-selecionado"  className="txt_center col-xs-12">
                                        Nenhum voo selecionado!
                                    </h5>
                                }

                                {(flight || flightBack) &&
                                    <div className="col-xs-12 col-md-10"  style={{overflow:'hidden'}}>

                                        {flight &&
                                            <article id="box-voo-ida-resumo" className="col-xs-12 col-sm-6 col-md-6" >

                                                <OrderFlight sameCompany={sameCompany} sameFareType={sameFareType} flight={flight} suffix={suffix} title="Voo de Ida"/>

                                            </article>
                                        }

                                        {flightBack &&

                                            <article style={{display: 'block'}} id="box-voo-volta-resumo" className="col-xs-12 col-sm-6 col-md-6">

                                                <OrderFlight sameCompany={sameCompany} sameFareType={sameFareType}  flight={flightBack} suffix={suffix} title="Voo de Volta"/>

                                            </article>
                                        }

                                    </div>
                                }

                                {(flight) &&
                                    <div className="col-xs-12 col-sm-12 col-md-2">
                                        <div id="btn-opcoes">
                                            <div className="col-xs-12 col-md-12 ">
                                                <div>
                                                    <button
                                                        type="button" className="b-btn b-btn-success text-uppercase"
                                                        onClick={() => this.openConditionalTermsModal()}>concluir pedido</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </section>
                }
            </div>

        )
    }

    openConditionalTermsModal(){

        // DEPRECATED
        const tracker = {
            search_hash: this.props.hashTracker,
            status: 1
        };
        this.props.sendSearchHash(tracker);
        // DEPRECATED

        const uuidTracker = {
            search_group_uuid: this.props.uuid,
            status: 1
        };
        this.props.sendUuid(uuidTracker);

        this.props.removeAll();

        const {requestData, flightBack, flight} = this.props;

        if(requestData.type_trip === 1 && !flightBack){
            this.props.show({
                position:"tr",
                title:'Informação.',
                message: "Selecione o trecho de volta.",
                autoDismiss:60
            }, 'warning');
            return;
        }

        if(requestData.type_trip === 1 && !flight){
            this.props.show({
                position:"tr",
                title:'Informação.',
                message: "Selecione o trecho de ida.",
                autoDismiss:60
            }, 'warning');
            return;
        }


        // this.props.setSearchTimeOut(300000,600000);
        // this.props.setEndSearching(true);

        this.props.openTerms(true);


    }

}

const mapStateToProps = state => {

    const  {flightsData, flight, flightBack, requestData, hashTracker, uuid} = state.busca;
    return {flightsData, flight, flightBack, requestData, hashTracker, uuid};

};

export default connect(mapStateToProps, { openTerms, setOp, setDialogIndex, show, removeAll, setSearchTimeOut, setEndSearching, sendSearchHash, sendUuid })(OrderSummary)