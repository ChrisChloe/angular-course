import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import _ from 'lodash';
import {getEtickets, getStatusEmission} from '../../actions/refund_actions';
import {formatMoney} from 'accounting';
import moment from 'moment';
import ContentHeader from '../content-header/ContentHeader';
import { show } from 'react-notification-system-redux';
import DocumentMeta from 'react-document-meta';
import ModalRefund from "./ModalRefund";

class Refund extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            showModal: false
        };

        this.close = this.close.bind(this)

    }

    componentDidMount() {
        // this.props.setEndSearching(false);
        this.props.getEtickets({page: '1', search: ''});
    }

    handleGetEtickets(e) {
        e && e.preventDefault();
        const {search} = this.refs;
        const s = search || '';
        this.props.getEtickets({page: this.state.activePage, search: s.value});
    }

    openEmission(e, eticket) {

        e.preventDefault();
        this.setState({...this.state, eticket});
        this.setState({showModal: true});

    }

    handlePageChange(pageNumber) {
        this.props.getEtickets({page: pageNumber, search: ''})
    }

    close(e) {
        e.preventDefault();
        this.setState({ showModal: false});
    }

    renderEtickets() {
        return _(this.props.etickets).sortBy(a => a.op.id).reverse().map(eticket => {
            return (
                <tr style={{"padding": "5px 0"}} key={_.uniqueId()}>
                    <td className="text-center">{eticket.op.id}</td>
                    <td className="text-center">{eticket.confirmation_code}</td>
                    <td className="text-center">{eticket.flight.origin.initials} / {eticket.flight.destination.initials} </td>
                    <td className="text-center">{moment(eticket.created_at).format('L')}</td>
                    <td style={{"padding": "5px 0"}}>
                        <div className="btn-group btn-emission">
                            <button type="button" className="btn btn-sm btn-success"
                                    onClick={(e) => this.openEmission(e, eticket)}>
                                <i className="fa fa-search ng-scope">detalhe</i>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        }).value();
    }

    render() {

        const meta = {
            title: 'Reembolso | Busca Aéreo',
            description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
            canonical: 'https://buscaaereo.com.br/#/bilhete',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
                }
            }
        };

        return (
            <div>
                <DocumentMeta {...meta} />
                <ContentHeader id="refund-banner" title="SOLICITAÇÃO DE REEMBOLSO" subtitle="E-Tickets">
                    <img className="img-responsive" src="assets/img/icone-aviao.png" alt="Ícone Avião"/>
                </ContentHeader>
                <div className="container-boots">
                    <section className="row">
                        <div className="cothis.propsl-md-12">
                            <form className="form-control" onSubmit={(e) => this.handleGetEtickets(e)}>
                                <div className="box-localizador">
                                    <label><strong>Localizador</strong></label>
                                    <br/>
                                    <input type="text" name="search" ref="search"
                                           style={{"width": "215px", "padding": "2px 0px", "margin": "5px 0px"}}/>

                                    <button type="submit" className="btn btn-sm b-btn-default"
                                            style={{"margin": "-4px 0 0 5px"}}>
                                        <i className="fa fa-search" aria-hidden="true"></i> Buscar
                                    </button>
                                </div>
                                <div className="panel-emission">
                                    <table className="table responsive" style={{"width": "100%"}}>
                                        <thead>
                                        <tr>
                                            <th>N° Op</th>
                                            <th>Localizador</th>
                                            <th>Origen Destino</th>
                                            <th>Data</th>
                                            <th>Ações</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderEtickets()}
                                        </tbody>
                                    </table>
                                    <div className="pull-right">
                                        <Pagination
                                            activePage={this.props.dataPaginate.current_page || 1}
                                            itemsCountPerPage={15}
                                            totalItemsCount={this.props.dataPaginate.total || 0}
                                            pageRangeDisplayed={3}
                                            onChange={(p) => this.handlePageChange(p)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>

                {!_.isEmpty(this.state.eticket) &&
                    <ModalRefund close={this.close} eticket={this.state.eticket} showModal={this.state.showModal}/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {etickets}   = state.refund || {};
    const dataPaginate = state.refund.dataPaginate || {};
    return {etickets, dataPaginate}
};

export default connect(mapStateToProps, { getEtickets, getStatusEmission, show })(Refund);