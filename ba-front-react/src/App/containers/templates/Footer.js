import React from 'react';
import AppVersion from "./AppVersion";


export default () =>
    <footer className="footer">
        <a href="#" className="btn-footer-top" data-title="Ir ao topo do site">
            <i className="fa fa-angle-double-up"></i>
        </a>
        <div className="container-boots">
            <div id="info-footer-box" className="row">
                <div className="inf-footer col-md-4 col-sm-4" style={{ paddingTop: '1.5%' }}>
                    <i className='fa fa-envelope-o'></i>
                    <span>contato@buscaaereo.com.br</span>
                    <br />
                    <i className='fa fa-phone'></i>
                    <span>+55 (81) 4042.9770</span>
                </div>
                <div className="inf-footer col-md-4 col-sm-4" style={{ paddingTop: '1.5%' }}>
                    <i className='fa fa-clock-o'></i>
                    <span>Horário de atendimento:</span>
                    <span><p> Segunda a Sexta 06Hrs às 00Hr</p></span>
                    <span><p>Sábado 09Hrs às 22Hrs.</p></ span>
                    <span><p>Domingo 09Hrs às 21Hrs.</p></ span>
                </div>
                <div className="inf-footer col-md-4 col-sm-4" style={{ paddingTop: '1.5%' }}>
                    <i className='fa fa-map-marker'></i>
                    <span>
                        Rua Paissandú, 567, 1º andar <p>Paissandu, Recife - PE, CEP 52010-000</p>
                    </span>
                </div>
                <div className="col-md-12" >
                    <div className="row" style={{ margin: '0%' }}>
                        <div className="formas-pagamento col-md-12">
                            <h1 style={{ paddingRight: '1%' }}>formas de pagamento</h1>
                            <div className="col-md-7 col-md-offset-5">
                                <figure><img src="assets/img/icone-paypal.png" alt="PayPal" title="Pague com PayPal" className="fl" /></figure>
                                <figure><img src="assets/img/icone-cartao-visa.png" alt="Cartão Visa" title="Pague com Cartão Visa" className="fl" /></figure>
                                <figure><img src="assets/img/icone-cartao-master.png" alt="Cartão Master" title="Pague com Cartão Master" className="fl" /></figure>
                                <figure><img src="assets/img/icone-cartao-amex.png " alt="Cartão Amex" title="Pague com Cartão Amex" className="fl" /></figure>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12" >
                    <div className="row" style={{ margin: '0%' }}>
                        <div className="col-md-12 redes-sociais">
                            <div style={{ marginLeft: '46%' }}>
                                <figure>
                                    <a href='https://www.facebook.com/buscaaereo' target='_blank' >
                                        <i className='fa fa-facebook-official fl' aria-hidden='true'></i>
                                    </a>
                                </figure>
                                <figure>
                                    <a href='https://www.instagram.com/busca.aereo/' target='_blank'>
                                        <i className='fa fa-instagram fl'></i>
                                    </a>
                                </figure>
                                <figure>
                                    <a href='https://www.linkedin.com/company/buscaaereo' target='_blank'>
                                        <i className='fa fa-linkedin-square fl'></i>
                                    </a>
                                </figure>
                                <figure>
                                    <a href='https://www.youtube.com/channel/UC0rIxwJZGwQY9XkbwjPOu0Q' target='_blank'>
                                        <i className='fa fa-youtube-square fl'></i>
                                    </a>
                                </figure>
                            </div>
                        </div>
                        <br />
                        <div className='version col-md-12'>
                            <AppVersion />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </footer>

