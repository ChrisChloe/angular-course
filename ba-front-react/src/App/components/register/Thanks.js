import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {connect} from 'react-redux'
import {hashHistory} from 'react-router';

class Thanks extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.registered) {
            hashHistory.push('/');
        }
    }

    componentDidMount() {
        const page = this.props.location.pathname;

        if (this.props.registered) {
            ReactGA.set({page});
            ReactGA.pageview(page);
            // setTimeout(() => {
            //     window.location.href = 'https://blog.buscaaereo.com.br/'
            // }, 3500);
        }
    }

    render() {
        return (
            <main>
                <div className="container-boots widget">
                    <section className="row widget-content">
                        <br/><br/>
                        <div className="col-md-12">
                            <div>
                               <span className="text-title-thanks">
                                <strong>O SEU PRÉ-CADASTRO FOI REALIZADO<p> COM SUCESSO! </p></strong>
                                </span>
                                <br/>
                                <div className="text-content-thanks">
                                    Caso tenha alguma dúvida quanto ao acesso da nossa plataforma,
                                    favor entrar em contato com nossa equipe comercial através do
                                    TELEFONE <span>(81) 4042.9770.</span>
                                    <br/><br/>
                                    <p>
                                        Para obter maiores informações, siga o Busca Aéreo também nas
                                        redes sociais:
                                    </p>
                                </div>
                                <br/>
                                <br/>
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <a target="_blank" href="https://www.facebook.com/buscaaereo" className="no-subl">
                                            <figure style={{marginLeft: '10px'}}><img src="assets/img/FacebookIcon.png"
                                                                                      alt="Facebook" title="Facebook"/><span className="text-redessociais">FACEBOOK</span>
                                            </figure>
                                        </a>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        <a target="_blank" href="https://www.instagram.com/busca.aereo/" className="no-subl">
                                            <figure style={{marginLeft: '10px'}}><img src="assets/img/InstagramIcon.png"
                                                                                      alt="Instagram"
                                                                                      title="Instagram"/><span className="text-redessociais">INSTAGRAM</span></figure>
                                        </a>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        <a target="_blank" href="https://www.linkedin.com/company/buscaaereo" className="no-subl">
                                            <figure style={{marginLeft: '10px'}}><img src="assets/img/LinkedinIcon.png"
                                                                                      alt="Linkedin" title="Linkedin"/> <span className="text-redessociais">LINKEDIN</span></figure>
                                        </a>

                                    </div>
                                    <div className="col-md-3 text-center">
                                        <a target="_blank" href="https://blog.buscaaereo.com.br/" className="no-subl">
                                            <figure style={{marginLeft: '10px'}}><img src="assets/img/BlogIcon.png"
                                                                                      alt="Blog" title="Blog"/> <span className="text-redessociais">BLOG</span></figure>
                                        </a>

                                    </div>
                                    <br/><br/><br/><br/><br/><br/><br/><br/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => {
    const {registered} = state.login;
    return {registered}
};

export default connect(mapStateToProps, null)(Thanks);


