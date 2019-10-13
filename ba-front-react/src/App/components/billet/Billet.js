import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { show } from 'react-notification-system-redux';
import DocumentMeta from 'react-document-meta';
import _ from 'lodash';
import { getBillets, setOps } from '../../actions/emission_actions';
import ContentHeader from '../content-header/ContentHeader';
import BilletRow from './BilletRow';
import { setOp, getOp, setMethodPay, setReceiptsRules } from '../../actions/order_actions';
import {
    clearSelectedFlights,
    clearSearchingData,
    clearSearchingResultSet
} from "../../actions/busca_actions";

class Billet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            op: 0,
            loading: false,
            paymentButtonState: '',
            showModal: false
        };

        this.receiptsRequest = false;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

    }

    componentDidMount() {
        // this.props.setEndSearching(false);
        this.setState({ loading: true });
        this.props.getBillets({ page: this.props.params.page || 1, agency: this.props.agency_id })
            .then((r) => {
                this.setState({ loading: false });
                if (r.error) throw r;
            })
            .catch(error => {
                this.setState({ loading: false });
                this.props.show({
                    title: 'Ops :(',
                    message: 'Houve um erro ao tentar carregar os boletos.',
                    autoDismiss: 15
                }, 'error');
            });

        this.props.clearSelectedFlights();
        this.props.clearSearchingData();
        this.props.clearSearchingResultSet();
        // this.props.setEndSearching(false);
        this.props.setMethodPay('');

    }

    handlePageChange(pageNumber) {
        this.setState({ loading: true });
        // hashHistory.push(`boletos/${pageNumber}`);
        this.props.getBillets({ page: pageNumber }).then((r) => {

            if (r.error) throw r;
            this.setState({ loading: false })

        }).catch(error => {
            console.log('error', error);
            this.props.show({
                title: 'Ops :(',
                message: 'Houve um erro ao tentar carregar os boletos.',
                autoDismiss: 15
            }, 'error');
            this.setState({ loading: false })
        })
    }

    renderBillets() {
        return _(this.props.billets).map(billet => {
            return (
                <BilletRow open={this.open} op={billet} />
            )
        }).value();
    }


    close(e) {
        e.preventDefault();
        this.setState({ showModal: false });
    }


    open(e) {
        e.preventDefault();
        this.setState({ showModal: true });

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
                <DocumentMeta {...meta} />
                <ContentHeader id="banner-home" title="Boletos" subtitle="Gerenciamento de boletos">
                    <img className="img-responsive" src="assets/img/icone-aviao.png" alt="Ícone Avião" />
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

                    <section className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="conteudo">
                                <div className="panel-emission scroll-mob">
                                    <table className="table responsive" cellSpacing="0" style={{ "width": "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Status</th>
                                                <th>Valor</th>
                                                <th>Vencimento</th>
                                                <th>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                         {this.renderBillets()}
                                        </tbody>
                                    </table>
                                    <div className="pull-right">
                                        <div className="col-md-12">
                                        <Pagination
                                            activePage={this.props.dataPaginate.current_page || 1}
                                            itemsCountPerPage={15}
                                            totalItemsCount={this.props.dataPaginate.total || 0}
                                            pageRangeDisplayed={3}
                                            onChange={(p) => this.handlePageChange(p)} />
                                        </div>

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
    const billets = state.order.billets || {};
    const dataPaginate = state.order.dataPaginate || {};

    return {billets, dataPaginate, op: state.order.op}
};

const actions = {
    getBillets,
    setOp,
    setOps,
    getOp,
    clearSelectedFlights,
    clearSearchingData,
    clearSearchingResultSet,
    setMethodPay,
    setReceiptsRules,
    show
};

export default connect(mapStateToProps, actions)(Billet);