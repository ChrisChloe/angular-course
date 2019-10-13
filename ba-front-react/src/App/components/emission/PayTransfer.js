import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { show } from 'react-notification-system-redux';
import { gatewayCash, uploadFile, sendOp } from '../../actions/order_actions';
import { sendSearchHash, sendUuid } from '../../actions/busca_actions';
import { buildObjectOP } from "../../utils/objectOp";
import _ from 'lodash';

class PayTransfer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            files: [],
            filesStatus: [],
            sending: false
        }
    }


    sendOnlyFile(op) {

        this.sendPayTransfer(op);

    }


    sendPayTransfer(op) {

        let files = [];

        for (let i = 0; i < this.state.files.length; i++) {
            files[i] = { ...files[i], sending: true };
            this.setState({ filesStatus: files });

            this.props.uploadFile(op.id, this.state.files[i])
                .then(res => {
                    if (res.error) throw res.payload.response.data;

                    files[i] = { ...files[i], sending: false, error: false };
                    this.setState({ filesStatus: files });

                    if (i === (this.state.files.length - 1)) {
                        if (!this.props.isTransfer)
                            this.props.disablePayments(false);

                        this.setState({ sending: false });

                        this.props.gatewayCash(op.id)
                            .then(res => {
                                if (res.payload.data.error) throw res.payload.data;

                                $('#modal-op-step-1').modal('hide');
                                hashHistory.push('/emissoes');

                                this.props.show({
                                    title: 'Comprovante(s) enviado(s) com sucesso!',
                                    message: 'Agora é so aguardar enquanto validamos o(s) seu(s) comprovante(s), ou você pode anexar outros.',
                                    autoDismiss: 20
                                }, 'success');

                            })
                            .catch(data => {
                                this.setState({ filesStatus: [] });
                                this.props.show({
                                    title: 'Ops!',
                                    message: data.message,
                                    autoDismiss: 15
                                }, 'error');
                            });

                    }

                }).catch(err => {
                    console.log(err);

                    files[i] = { ...files[i], sending: false, error: true };
                    this.setState({ filesStatus: files });

                    if (err.limit_error) {
                        this.props.show({
                            title: 'Ocorreu algum erro durante o envio. :(',
                            message: err.message,
                            autoDismiss: 10
                        }, 'error');

                        this.setState({ sending: false });
                        $('#modal-op-step-1').modal('hide');
                        hashHistory.push('/emissoes');
                        window.location.reload();

                        i = 6;

                        return;
                    }

                    if (i === (this.state.files.length - 1)) {
                        if (!this.props.isTransfer)
                            this.props.disablePayments(false);

                        this.props.show({
                            title: 'Ocorreu algum erro durante o envio. :(',
                            message: err.message,
                            autoDismiss: 10
                        }, 'error');

                        this.setState({ sending: false });

                    }
                });
        }

    }


    sendPayTransferWithoutFiles() {

        const { newOp, method } = this.props;
        this.setState({ sending: true });

        if (!this.props.isTransfer)
            this.props.disablePayments(true);

        this.props.sendOp(newOp.id)
            .then(op_send => {
                this.props.gatewayCash(newOp.id)
                    .then(res => {

                        // DEPRECATED
                        const tracker = {
                            search_hash: this.props.hashTracker,
                            status: 4
                        };
                        this.props.sendSearchHash(tracker);
                        // DEPRECATED

                        const uuidTracker = {
                            search_group_uuid: this.props.uuid,
                            status: 4
                        };

                        this.props.sendUuid(uuidTracker);

                        hashHistory.push('/emissoes');


                    })
                    .catch(err => {
                        this.props.show({
                            title: 'Ops!',
                            message: err.message,
                            autoDismiss: 10
                        }, 'error');
                    })
            })
            .catch(error => {
                this.props.show({
                    title: 'Ops!',
                    message: err.message,
                    autoDismiss: 10
                }, 'error');
            });

    }


    sendReceipt(e) {

        e.preventDefault();

        this.setState({ sending: true });
        if (!this.props.isTransfer)
            this.props.disablePayments(true);

        const { newOp, method, op } = this.props;

        if (op) {

            this.sendOnlyFile(op)

        } else {

            this.setState({ disableButton: true });

            const isModifyMethod = this.props.isModifyMethod;

            if (isModifyMethod) {

                const op = this.props.op;
                this.sendPayTransfer(op);


            } else {

                this.props.sendOp(newOp.id)
                    .then(res => {

                        // DEPRECATED
                        const tracker = {
                            search_hash: this.props.hashTracker,
                            status: 4
                        };
                        this.props.sendSearchHash(tracker);
                        // DEPRECATED

                        const uuidTracker = {
                            search_group_uuid: this.props.uuid,
                            status: 4
                        };

                        this.props.sendUuid(uuidTracker);
                        this.sendPayTransfer(newOp);

                    })
                    .catch(err => {
                        this.props.show({
                            title: 'Ops!',
                            message: err.message,
                            autoDismiss: 10
                        }, 'error');

                    })
            }
        }

    }


    removeFile(file) {

        let files = _.filter(this.state.files, f => f !== file);
        this.setState({ files });

        if (files.length == 0) {
            $('#file').val('');
        }

    }


    addFiles(files) {

        if (files.length > 5) {
            this.props.show({
                title: 'Ops!',
                message: 'Número máximo de arquivos permitido é 5.',
                autoDismiss: 10
            }, 'error');
            return;
        }

        this.setState({ files: files })
    }


    render() {

        const bankData = [
            {
                bankName: "Banco do Brasil",
                agency: "7",
                agencyDigit: "8",
                type: "CC",
                account: "44791",
                accountDigit: "9",
                operation: "",
                Titular: "PSV Turismo"
            },
            {
                bankName: "Caixa Econômica",
                agency: "1582",
                agencyDigit: "",
                type: "CC",
                account: "1475",
                accountDigit: "6",
                operation: "003",
                Titular: "PSV Turismo"
            },
            {
                bankName: "Santander",
                agency: "3295",
                agencyDigit: "",
                type: "CC",
                account: "13090445",
                accountDigit: "1",
                operation: "",
                Titular: "PSV Turismo"
            },
            {
                bankName: "Itaú",
                agency: "9246",
                agencyDigit: "",
                type: "CC",
                account: "24411",
                accountDigit: "6",
                operation: "",
                Titular: "PSV Turismo"
            },
            {
                bankName: "Bradesco",
                agency: "3209",
                agencyDigit: "",
                type: "CC",
                account: "48",
                accountDigit: "5",
                operation: "",
                Titular: "PSV Turismo"
            }
        ];

        return (
            <div className="wrapper-info-voo">
                <input type="file" id="file" ref="fileUploader" style={{ display: "none" }}
                    accept="image/jpg, image/x-png, image/png, image/jpeg, application/pdf"
                    onChange={e => this.addFiles(e.target.files)}
                    multiple
                />
                <div className="row">
                    <div className='col-12 pay-header'>
                        <h3>Transferência Bancária</h3>
                    </div>
                </div>

                {_.isEmpty(this.state.files) &&
                    <div className="col-xs-12 alert alert-msg xs-p-10 xs-ml-5">

                        <p style={{ fontWeight: 900, textAlign: 'center' }} className="m-l-xs col-md-8">
                            Se já realizou a transferência clique em <small style={{ color: '#265626' }}> <i className="fa fa-paperclip"></i> Anexar </small>
                            {((!this.props.isModifyMethod) && (!this.props.op)) &&
                                <span>, caso contrário, clique em <small style={{ color: '#333' }}> Anexar depois </small></span>
                            }
                        </p>

                        <br className="hidden-lg hidden-md" />

                        <div className="col-xs-12 col-md-3 pull-right xs-mt-5">
                            <div className="col-md-12 div-max-width">
                                <button className="btn btn-success btn-md btn-block btn-max-width" onClick={() => { this.refs.fileUploader.click() }} disabled={this.state.sending}>
                                    <span className="">
                                        <i className="fa fa-paperclip "></i> Anexar
                                    </span>
                                </button>
                            </div>

                            <div className="col-md-12 div-max-width" style={{ marginTop: '10px' }}>
                                {((!this.props.isModifyMethod) && (!this.props.op)) &&
                                    <button className="btn btn-default btn-md btn-block btn-max-width" onClick={() => this.sendPayTransferWithoutFiles()} disabled={this.state.sending}>
                                        <span className=""> Anexar depois </span>
                                    </button>
                                }
                            </div>

                        </div>

                    </div>
                }

                {!_.isEmpty(this.state.files) &&
                    <div className="col-xs-12 alert alert-msg xs-p-10">
                        <span>
                            <span className="m-l-xs col-md-12">
                                <strong>Você anexou o(s) arquivo(s): </strong>
                                <br />
                                {_.map(this.state.files, (file, i) => {
                                    return (<span key={_.uniqueId()} style={{
                                        color: '#fe8e42',
                                        fontWeight: '400'
                                    }}><i>{file.name}</i>
                                        {_.isEmpty(this.state.filesStatus[i])
                                            ? <button className="btn btn-default btn-xs m-l-xs"
                                                onClick={() => this.removeFile(file)}
                                                disabled={file.sending}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                            : this.state.filesStatus[i].sending ?
                                                <i className="fa fa-spinner fa-spin"></i> : this.state.filesStatus[i].error ?
                                                    <i className="fa fa-close"></i> : <i className="fa fa-check"></i>
                                        }
                                        <br />
                                    </span>)
                                })}
                            </span>
                        </span>
                        <div className="row">
                            <div className="col-xs-6 col-md-3 pull-right xs-mt-5">
                                <button className="btn btn-success btn-md btn-block m-l-n-xs"
                                    onClick={(e) => this.sendReceipt(e)} disabled={this.state.sending}>
                                    {!this.state.sending
                                        ? <span>
                                            <span className="">
                                                <i className="fa fa-upload "></i> Enviar
                                            </span>
                                        </span>
                                        : <span>
                                            <i className="fa fa-spinner fa-spin"></i> Enviando...
                                        </span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }

                <hr />

                <table id="box-info-voo-ida"
                    className="accounts-transfer table table-bordered responsive nowrap" cellSpacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th>Banco</th>
                            <th>Agência</th>
                            <th>Conta</th>
                            <th>Operação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(bankData, (bankData) => {
                            return (
                                <tr className="linha-tabela" key={bankData.agency}>
                                    <td className="bg-cinza-escuro">
                                        <span>{bankData.bankName}</span>
                                    </td>
                                    <td>
                                        <span>{bankData.agency}{bankData.agencyDigit && ` - ${bankData.agencyDigit}`}</span>

                                    </td>
                                    <td>
                                        <span>{bankData.account}{bankData.accountDigit && ` - ${bankData.accountDigit}`}
                                        </span>
                                    </td>
                                    <td>
                                        <span>{bankData.operation}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        op: state.order.op,
        newOp: state.order.newOp,
        method: state.order.method,
        hashTracker: state.busca.hashTracker,
        uuid: state.busca.uuid
    };
};

export default connect(mapStateToProps, { gatewayCash, uploadFile, show, sendOp, sendSearchHash, sendUuid })(PayTransfer);