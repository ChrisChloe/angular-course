import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {format} from '../../utils/utils';
import {connect} from 'react-redux';
import {setDialogIndex, setOp} from "../../actions/order_actions";
import ButtonDownload from './ButtonDownload';

class Quotation extends Component {
    constructor(props) {
        super(props);
        this.state = {showDetails: false}
    }

    showDetailsOP(op) {
        this.state.showDetails ? $(`#${op.id}`).hide() : $(`#${op.id}`).show()
        this.setState(prevState => ({showDetails: !prevState.showDetails}))

    }

    sliptName(name){
        if(name.length > 15)
            return name.slice(0,15) + "...";
        return name;
    }

    // openModalTransfer(e, op){
    //     this.props.setOp(op);
    //     this.props.setDialogIndex(2);
    //     // $('#modal-op-step-1').modal('show')
    //     this.props.open(e);
    // }

    render() {
        const op = this.props.op || {};

        return (
            <tr style={{borderBottom: '1px solid #e7e5e5', height: 38}}>
                <td className="text-center">
                    <label className="btn btn-xs b-btn-default"
                           title="Detalhes do voo" onClick={() => this.showDetailsOP(op)}>
                        {this.state.showDetails
                            ? <i className="fa fa-close"></i>
                            : <i className="fa fa-search"></i>
                        }
                    </label>
                </td>
                <td className="text-center">#{op.id}</td>
                <td style={{padding: 3}}>
                    {_.map(op.passengers.adults, adult => {
                        return (
                            <div key={_.uniqueId()} className="">
                                <label className="label label-adults"
                                       title={`Adulto: ${adult.fullname}`}>
                                    <i className="fa fa-user" aria-hidden="true"></i> {this.sliptName(adult.fullname)}
                                </label>
                            </div>
                        )
                    })}
                    {_.map(op.passengers.children, child => {
                        return (
                            <div key={_.uniqueId()}>
                                <label className="label label-children"
                                       title={`Criança: ${child.fullname}`}>
                                    <i className="fa fa-child"
                                       aria-hidden="true"></i> {this.sliptName(child.fullname)}
                                </label>
                            </div>
                        )
                    })}
                    {_.map(op.passengers.babies, baby => {
                        return (
                            <div key={_.uniqueId()}>
                                <label className="label label-babies"
                                       title={`Bebê: ${baby.fullname}`}>
                                    <i className="fa fa-child"
                                       aria-hidden="true"></i> {this.sliptName(baby.fullname)}
                                </label>
                            </div>
                        )
                    })}
                </td>
                <td className="text-center" style={{padding: 3}}><center>{format(op.price)}</center></td>
                <td className="text-center" style={{padding: 3}}>
                    <span title={op.flight.origin.title}>{op.flight.origin.initials}</span>&nbsp;/&nbsp;
                    <span title={op.flight.destination.title}>{op.flight.destination.initials}</span>
                </td>
                <td style={{padding: 3}}>
                    <span
                        className="text-center display-block">{moment(op.created_at).format('DD/MM/YYYY HH:mm')}</span>
                </td>
                <td style={{padding: 3}}>

                    {(op.status === 6)
                        ?   <span className="text-center display-block">EMITIDO</span>

                        :  ((op.form_payment && op.received_confirmation))
                                ?  (op.status === 7)
                                        ? <span className="text-center display-block">PROCESSAMENTO</span>

                                        : <span className="text-center display-block">EM EMISSÃO</span>

                                : <span className="text-center display-block">AGUARDANDO</span>

                    }

                </td>
                <td>
                    <div className="btn-group btn-emission">
                        <ButtonDownload id={op.id}/>
                    </div>
                </td>
                <td style={{padding: 3}}>
                    <div className="btn-group btn-emission">

                        {((op.status === 1) || (op.status === 6))
                        ?   <span className="b-label-default btn-sm btn-block">Pago</span>

                        :  ((op.form_payment))
                            ?  (op.status === 7)
                                ?   (op.form_payment === 5)
                                    ?   ((op.attachments == null) || (op.attachments.length < 5))
                                        ?   <button type="button" className="btn btn-sm b-label-default btn-block"
                                                onClick={(e) => this.props.pay(e, op)}><i className="fa fa-paperclip"/> Anexar
                                            </button>

                                        : <span className="b-label-default btn-sm btn-block">Em Processamento</span>

                                    :   <button type="button" className="btn btn-sm b-label-default btn-block"
                                            onClick={(e) => this.props.pay(e, op)}><i className="fa fa-money"/> Pagar
                                        </button>

                                :   <span className="b-label-default btn-sm btn-block">AGUARDANDO</span>

                            :   <button type="button" className="btn btn-sm b-label-default btn-block"
                                        onClick={(e) => this.props.pay(e, op)}><i className="fa fa-money"/> Pagar
                                </button>

                        }

                    </div>
                </td>
            </tr>
        )
    }
}

export default connect(null, {setDialogIndex, setOp})(Quotation);