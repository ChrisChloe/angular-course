import React, {Component} from 'react';
import {formatMoney} from "accounting";
import {connect} from 'react-redux';
import {getStatusEmission} from "../../actions/refund_actions";
import { show } from 'react-notification-system-redux';

class ModalRefund extends Component {

    constructor(props) {
        super(props);
    }

    format (number) {
        return formatMoney(number, "R$", 2, ".", ",")
    }

    sendRefund (e, eticket, type) {
        e.preventDefault();

        this.setState({...this, refunding: true});

        this.props.getStatusEmission(eticket, type)
        .then( (response) => {

                if (response.payload.data.error) throw response;

                this.props.show({
                    message: 'Reembolso Solicitado, favor verificar sua caixa de email',
                    autoDismiss: 5
                }, 'success');


        })
        .catch( (r) => {
            this.props.show({
                title: "Ops :(",
                message: r.payload.data.message,
                autoDismiss: 5
            }, 'error');
        })
    }

    componentDidUpdate () {
        if (this.props.showModal) {window.scroll(0,0)}
    }

    componentDidMount () {
        if (this.props.showModal) {window.scroll(0,0)}
    }

    close (e) {
        this.props.close(e);

    }

    render() {

        return (
            <div className={`${this.props.showModal ? 'modal-backdrop': '' }`} >
                <div className={`animated ${this.props.showModal ? 'modal-show fadeInDown' : 'modal-hide'}`}
                     id="modal-refund"
                     style={{top: '20px'}}>
                    <section className="box-conclusao-pedido">
                        <div className="modal-dialog">
                            {this.props.eticket &&
                                <div className="modal-content">
                                    <div className="modal-header header-refund">
                                        <button onClick={(e) => this.close(e)} type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 className="modal-title" id="myModalLabel" style={{padding: '10px 0px'}}>Detalhes do Localizador
                                            #{this.props.eticket.confirmation_code}
                                        </h4>
                                    </div>
                                    <div className="modal-body content-modal">
                                        <div className="panel-emission">
                                            <table className="table responsive" cellSpacing="0"
                                                   style={{"width": "100%"}}>
                                                <thead>
                                                <tr>
                                                    <th>Passageiros</th>
                                                    <th>Preço</th>
                                                    <th>Trecho</th>
                                                    <th>Multa</th>
                                                    <th>Crédito</th>
                                                    <th>Cia</th>
                                                    <th>Tipo</th>
                                                    <th>Ação</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>

                                                    <td>
                                                        <label className="label label-adults"
                                                               title={`Adulto:${this.props.eticket.passenger.fullname}`}>
                                                            <i className="fa fa-user" aria-hidden="true" /> {this.props.eticket.passenger.fullname}
                                                        </label>
                                                    </td>

                                                    <td className="text-center">{this.format(this.props.eticket.flight.adult_original_price)}</td>

                                                    <td className="text-center">{this.props.eticket.flight.origin.initials} / {this.props.eticket.flight.destination.initials}</td>

                                                    {(this.props.eticket.refund_price) &&
                                                        <td className="text-center">
                                                            {this.format(this.props.eticket.refund_price)}
                                                        </td>
                                                    }

                                                    {(this.props.eticket.refund_price) &&
                                                        <td className="text-center">
                                                            {this.format(this.props.eticket.flight.adult_original_price - this.props.eticket.refund_price)}
                                                        </td>
                                                    }
                                                    {(!this.props.eticket.refund_price) &&
                                                        <td className="text-center">
                                                            {this.format(0)}
                                                        </td>
                                                    }
                                                    {(!this.props.eticket.refund_price) &&
                                                        <td className="text-center">
                                                            Não permitido
                                                        </td>
                                                    }

                                                    <td className="text-center">{this.props.eticket.flight.company.title}</td>

                                                    <td>
                                                        <span className="text-center display-block">Ida</span>
                                                    </td>

                                                    <td style={{"padding": "5px 0"}}>
                                                        <div className="btn-group btn-emission">
                                                            {(this.props.eticket.refund_status == 3) && (this.props.eticket.refund_price) &&
                                                                <button type="button" className="btn btn-sm b-btn-default"
                                                                        onClick={(e) => this.sendRefund(e, this.props.eticket, 'flight')} disabled={this.refunding}>
                                                                    {this.refunding ? 'Enviando...' : 'Reembolsar'}
                                                                </button>
                                                            }

                                                            {(this.props.eticket.refund_status == 0) || (this.props.eticket.refund_status == 1) &&
                                                                <span
                                                                    className="btn btn-sm b-btn-default disabled">Solicitado
                                                                </span>
                                                            }

                                                            {(this.props.eticket.refund_status == 2) &&
                                                                <span
                                                                    className="btn btn-sm b-btn-default disabled">Reembolsado
                                                                </span>
                                                            }

                                                            {(!this.props.eticket.refund_status) &&
                                                                <span
                                                                    className="btn btn-sm b-btn-default disabled">Não permitido
                                                                </span>
                                                            }

                                                            {(!this.props.eticket.refund_price) && (this.props.eticket.refund_status == 3) &&
                                                                <span
                                                                    className="btn btn-sm b-btn-default disabled">Não permitido
                                                                </span>
                                                            }

                                                        </div>
                                                    </td>
                                                </tr>
                                                {this.props.eticket.flight_back &&
                                                    <tr>
                                                        <td>
                                                            <label className="label label-adults"
                                                                   title={`Adulto:${this.props.eticket.passenger.fullname}`}>
                                                                <i className="fa fa-user" aria-hidden="true"></i>
                                                                {this.props.eticket.passenger.fullname}
                                                            </label>
                                                        </td>

                                                        <td className="text-center">{this.format(this.props.eticket.flight_back.adult_original_price)}</td>

                                                        <td className="text-center">{this.props.eticket.flight.destination.initials}
                                                            / {this.props.eticket.flight.origin.initials}
                                                        </td>

                                                        {(this.props.eticket.refund_price_back) &&
                                                            <td className="text-center">
                                                                {this.format(this.props.eticket.refund_price_back)}
                                                            </td>
                                                        }

                                                        {(this.props.eticket.refund_price_back) &&
                                                            <td className="text-center">
                                                                {this.format(this.props.eticket.flight_back.adult_original_price - this.props.eticket.refund_price_back)}
                                                            </td>
                                                        }

                                                        {(!this.props.eticket.refund_price_back) &&
                                                            <td className="text-center">
                                                                {this.format(0)}
                                                            </td>
                                                        }

                                                        {(!this.props.eticket.refund_price_back) &&
                                                            <td className="text-center">
                                                                Não permitido
                                                            </td>
                                                        }

                                                        <td className="text-center">{this.props.eticket.flight_back.company.title}</td>

                                                        <td>
                                                            <span className="text-center display-block">Volta</span>
                                                        </td>

                                                        <td style={{"padding": "5px 0"}}>
                                                            <div className="btn-group btn-emission">
                                                                {(this.props.eticket.refund_back_status == 3) && (this.props.eticket.refund_price_back) &&
                                                                    <button type="button" className="btn btn-sm b-btn-default" disabled={this.refunding}
                                                                            onClick={(e) => this.sendRefund(e, eticket, 'flight_back')}>
                                                                    {this.refunding ? 'Solicitando...' : 'Reembolsar'} </button>
                                                                }

                                                                {(this.props.eticket.refund_back_status == 0 ) || (this.props.eticket.refund_back_status == 1 ) &&
                                                                    <span
                                                                        className="btn btn-sm b-btn-default disabled">Solicitado
                                                                    </span>
                                                                }

                                                                {(this.props.eticket.refund_back_status == 2 ) &&
                                                                    <span
                                                                        className="btn btn-sm b-btn-default disabled">Reembolsado
                                                                    </span>
                                                                }

                                                                {(!this.props.eticket.refund_back_status) &&
                                                                    <span
                                                                        className="btn btn-sm b-btn-default disabled">Não permitido
                                                                    </span>
                                                                }

                                                                {(this.props.eticket.refund_back_status == 3) && (!this.props.eticket.refund_price_back) &&
                                                                    <span
                                                                        className="btn btn-sm b-btn-default disabled">Não permitido
                                                                    </span>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }

                                                </tbody>
                                            </table>
                                        </div>
                                        <span>Valor Total: {this.format(this.props.eticket.miles_price)}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </section>
                </div>
            </div>
        )

    }

}

export default connect(null, {getStatusEmission, show})(ModalRefund);
