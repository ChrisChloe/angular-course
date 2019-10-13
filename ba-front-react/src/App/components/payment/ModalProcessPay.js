import React, {Component} from 'react';

class ModalProcessPay extends Component {

    constructor(props) {
        super(props)
    }

    renderCielo(){

        const {status, error, msgSeq, msg, isCredit} = this.props;

        return (
            <div className="modal-body">
                {status === 1
                    ? <div>
                        {error
                            ? <div style={{marginTop: '-20px'}}>
                                <div className="col-md-12 m-b load-pro">
                                    <img src="assets/img/exclamation.png" height="80" className="img2 animated fadeInDown img2"/>
                                </div>
                                <div className="col-md-12 m-b-md">
                                    <img src="assets/img/Shadow.png" className="load-pro-sh"/>
                                </div>
                                {msg}
                              </div>
                            : <div>
                                <div className="col-md-12 load-pro">
                                    {msgSeq === 1
                                        ? <img src="assets/img/check.png" height="80"  alt="" className="animated fadeIn img2"/>
                                        : <img src="assets/img/airplane.png" height="60"  alt="" className="img infinite animated fadeInLeft"/>
                                    }
                                </div>
                                <div className="col-md-12 m-b">
                                    <img src="assets/img/Shadow.png" className={`load-pro-sh ${msgSeq === 1 ? 'animated pulse' : 'infinite animated fadeInLeft'}`}/>
                                </div>
                                {msg}
                              </div>
                        }
                    </div>
                    : <div>
                        <div className="col-md-12 load-pro">
                            <img src="assets/img/fly.png" height="80" alt="" className="infinite animated rotateIn img2"/>
                        </div>
                        <div className="col-md-12 m-b-md">
                            <img src="assets/img/Shadow.png" className="load-pro-sh animated infinite fadeIn"/>
                        </div>
                        <h2><strong>FALTA POUCO,</strong> ESTAMOS VERIFICANDO SE NÃO HÁ NENHUM ERRO NO SEU CADASTRO.</h2>
                    </div>
                }
                <div className={`col-md-12 ${msgSeq === 1 && !isCredit ? 'm-t-xl' : 'm-t'}`}>
                <div className="col-xs-4"><img src="assets/img/icone_01.png" className="icon-proc img-responsive animated fadeIn"/></div>
                <div className="col-xs-4"><img src="assets/img/icone_02.png" className="icon-proc img-responsive animated fadeIn"/></div>
                <div className="col-xs-4"><img src="assets/img/icone_03.png" className="icon-proc img-responsive animated fadeIn"/></div>
                </div>
            </div>
        )
    }

    renderBillet() {

        const {loading} = this.props;

        return (
            <div className="modal-body">
                {loading
                    ? <div>
                        <div className="col-md-12 load-pro">
                            <img src="assets/img/fly.png" height="80" alt=""
                                 className="infinite animated rotateIn img2"/>
                        </div>
                        <div className="col-md-12 m-b-md">
                            <img src="assets/img/Shadow.png"
                                 className="load-pro-sh animated infinite fadeIn"/>
                        </div>
                        <h2><strong>AGUARDE...</strong> ESTAMOS CONFIRMANDO A SUA FORMA DE PAGAMENTO.</h2>
                    </div>
                    : <div>
                        <div className="col-md-12 load-pro">
                            <img src="assets/img/check.png" height="80" alt=""
                                 className="animated fadeInDown img2"/>
                        </div>
                        <div className="col-md-12 m-b-md">
                            <img src="assets/img/Shadow.png" className="load-pro-sh fadeInDown animated"/>
                        </div>
                        <br/><br/>
                        <h2><strong>FORMA DE PAGAMENTO CONFIRMADA COM SUCESSO!</strong></h2>
                        <h3>O boleto será enviado para o seu e-mail até o próximo dia útil através do <strong>financeiro@buscaaereo.com.br</strong>.</h3>
                        <h3>Caso não receba na caixa de entrada, gentileza verificar o Spam.</h3>
                        <h4><i>Obrigado por escolher o Busca Aéreo!</i></h4>
                    </div>
                }

                {loading &&
                    <div className="col-md-12 m-t-lg">
                        <div className="col-xs-4"><img src="assets/img/icone_01.png" className="icon-proc img-responsive animated fadeIn"/></div>
                        <div className="col-xs-4"><img src="assets/img/icone_02.png" className="icon-proc img-responsive animated fadeIn"/></div>
                        <div className="col-xs-4"><img src="assets/img/icone_03.png" className="icon-proc img-responsive animated fadeIn"/></div>
                    </div>
                }
            </div>
        )
    }


     isEdgeOrFirefox () {
         const ua = window.navigator.userAgent;
         const msie = ua.indexOf('MSIE ');
         const trident = ua.indexOf('Trident/');
         const edge = ua.indexOf('Edge/');
         const isEdge = (msie > 0) || (trident > 0) || (edge > 0);
         const isFirefox = !!window.sidebar;

         if (isEdge || isFirefox) {
             return true;
         }

         return false;
    }

    render() {

        const {type, show} = this.props;

        if (show) {window.scroll(0,0)}

        return (
            <div className={`${this.isEdgeOrFirefox() && 'no-chrome'}`} >
                <div className={`${show && 'modal-backdrop'}`} >
                    <div className={`modal fade animated fadeInDown ${show ? 'modal-show' : 'modal-hide'}`} data-backdrop="static" role="dialog" id="modal-process" data-keyboard="false">
                        <div className="modal-dialog modal-lg lg2">
                            <div className="modal-content modal-processamento">

                                {
                                    type === 'billet'
                                    ? this.renderBillet()
                                    : this.renderCielo()
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ModalProcessPay;
