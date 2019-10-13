import React, {Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import Pagination from 'react-js-pagination';
import _ from 'lodash';
import { getOps, setOps } from '../../actions/emission_actions';
import ContentHeader from '../content-header/ContentHeader';
import DetailsOp from './DetailsOp';
import Quotation from './Quotation';
import Modal from '../order/DialogOrderConclusion';
import { setOp, getOp , setMethodPay, setReceiptsRules} from '../../actions/order_actions';
import { 
    clearSelectedFlights, 
    clearSearchingData,
    clearSearchingResultSet
} from "../../actions/busca_actions";
import { show } from 'react-notification-system-redux';
import DocumentMeta from 'react-document-meta';
import ModalPayTransfer from "./ModalPayTransfer";

class Emission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            op:0,
            loading: false,
            paymentButtonState: '',
            showModal: false
        }

        this.receiptsRequest = false;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

    }

    componentDidMount() {
        // this.props.setEndSearching(false);
        this.setState({ loading:true });
        this.props.getOps({page: this.props.params.page || 1})
        .then((r) => {
            this.setState({loading:false});
            if(r.error) throw r;
        })
        .catch(error => {
            this.setState({ loading:false });
            console.log('error', error);
            this.props.show({
                title: 'Ops :(',
                message: 'Houve um erro ao tentar carregar as OPs.',
                autoDismiss:15
            }, 'error');
        });
        
        this.props.clearSelectedFlights();
        this.props.clearSearchingData();
        this.props.clearSearchingResultSet();
        // this.props.setEndSearching(false);
        this.props.setMethodPay('');

    }

    handlePageChange(pageNumber) {
        this.setState({ loading:true });
        hashHistory.push(`emissoes/${pageNumber}`);
        this.props.getOps({page: pageNumber}).then((r) => {

            if(r.error) throw r;
            this.setState({loading:false})

        }).catch(error => {
            console.log('error', error);
            this.props.show({
                title: 'Ops :(',
                message: 'Houve um erro ao tentar carregar as OPs.',
                autoDismiss:15
            }, 'error');
            this.setState({loading:false})
        })
    }

    renderOps() {
        return _(this.props.ops).sortBy(a => a.id).reverse().map(op => {
                return (
                    <tbody key={op.id}>
                    <Quotation open={this.open} op={op} pay={(e) => this.handlePay(e, op)}/>
                    <DetailsOp op={op}/>
                    </tbody>
                )
            }
        ).value();
    }


    close (e) {
        e.preventDefault();
        this.setState({ showModal: false});
    }


    open (e) {
        e.preventDefault();
        this.setState({ showModal: true});

    }


    handlePay(e, op){
        e.preventDefault();

        const agency_id = op.agency_id;
        const price     = op.price;
        const flight_departure = op.flight.date_boarding;

        this.props.setOp(op);

        if (!this.receiptsRequest) {

            this.receiptsRequest = true;
            this.props.setReceiptsRules({agency_id, price, flight_departure}).then( res => {
                this.props.setMethodPay('');

                if (this.props.op) {

                    hashHistory.push(`/pay`);

                    $('body').attr('oncontextmenu', 'return false');
                    addEventListener("keydown", function (e) {
                        if (e.ctrlKey && e.shiftKey && e.keyCode == '73' || e.keyCode == '123') {
                            e.preventDefault()
                        }
                    });
                }

            });
        }

    }

    render() {
        const meta = {
            title: 'Emissões | Busca Aéreo',
            description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
            canonical: 'https://buscaaereo.com.br/#/emissoes',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
                }
            }
        };
        return (
            <div>
                {this.state.showModal && <ModalPayTransfer close={this.close} showModal={this.state.showModal}/>}
                <DocumentMeta {...meta} />
                <ContentHeader id="banner-home" title="PAINEL" subtitle="Gerenciamento de cotações, dados e buscas.">
                    <img className="img-responsive" src="assets/img/icone-aviao.png" alt="Ícone Avião"/>
                </ContentHeader>
                <div className="container-boots">

                    {this.state.loading &&
                        <section className="busca-loading-bar">
                            <div id="loading-bar-spinner">
                                <span> Carregando...</span>&nbsp;
                                <span className="spinner-icon"></span>
                            </div>
                        </section>
                    }

                    {/*{(!this.state.loading && this.props.params.id)&&*/}
                        {/*<a className={'btn btn-success'} onClick={() => this.handlePageChange(1)}>Primeira Página</a>*/}
                    {/*}*/}

                    <section className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="conteudo">
                                <div className="panel-emission scroll-mob">
                                    <table className="table responsive" cellSpacing="0" style={{"width": "100%"}}>
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th width="10%">ID</th>
                                            <th>Passageiros</th>
                                            <th>Preço</th>
                                            <th>Origem / Destino</th>
                                            <th>Data Criação</th>
                                            <th width="15%">Status</th>
                                            <th>Baixar</th>
                                            <th>Pagar</th>
                                        </tr>
                                        </thead>
                                        {this.renderOps()}
                                    </table>
                                    <div className="pull-right">
                                        {/*{!this.props.params.id &&*/}
                                        {/*}*/}

                                            <Pagination
                                                activePage={this.props.dataPaginate.current_page || 1}
                                                itemsCountPerPage={15}
                                                totalItemsCount={this.props.dataPaginate.total || 0}
                                                pageRangeDisplayed={3}
                                                onChange={(p) => this.handlePageChange(p)}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const ops = state.emission.ops || {};
    const dataPaginate = state.emission.dataPaginate || {};

    return {ops, dataPaginate, op: state.order.op}
};

export default connect(mapStateToProps, { 
    getOps, 
    setOp, 
    setOps, 
    getOp, 
    clearSelectedFlights, 
    clearSearchingData,
    clearSearchingResultSet, 
    setMethodPay, 
    setReceiptsRules, 
    show
})(Emission);