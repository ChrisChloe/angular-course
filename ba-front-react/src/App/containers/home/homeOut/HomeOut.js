import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import _ from 'lodash';
import {contact} from "../../../actions/login_actions";
import { show } from 'react-notification-system-redux';
import { formatLowerCase } from '../../../utils/utils';

class HomeOut extends Component {

    constructor(props) {
        super(props);
        this.state = {error:false};
    }

    handleSubmit(e) {
        e.preventDefault();

        const {name, phone, email} = this.refs;
        const data = {name: name.value, phone: phone.value, email: email.value};

        if(this.verifyValues(data)){
            this.props.contact(data)
                .then( (res) => {

                    if (res.error) throw res;

                    hashHistory.push('/cadastro');

                })
                .catch( (error) => {

                    try{

                        console.log(error);

                        const messages = error.payload.response.data.message;
                        
                        if (messages.hasOwnProperty('email')) hashHistory.push('/login')

                        if(_.isObject(messages)){

                            Object.keys(messages).forEach((key) => {
                                this.props.show({
                                    title: 'Ops!',
                                    message: messages[key],
                                    autoDismiss: 5
                                }, 'error');
                            });

                        }else{
                            throw 'error';
                        }

                    }catch (e){
                        this.props.show({
                            title: 'Ops :( ',
                            message: 'Não foi possível processar sua requisição. Por favor, tente mais tarde.',
                            autoDismiss: 5
                        }, 'error');
                    }
                });
        } else {
            this.setState({error: true});
        }
    }

    alterMaskPhone() {
        const {phone} = this.refs;
        const tel = phone.value.replace(/[\s\)\(\-]/g, '');

        if (tel.length <= 10)
            return $('.phone').mask("(00) 0000-00000");
        if (tel.length >= 11)
            return $('.phone').mask("(00) 00000-0000");

    }

    verifyValues(data){
        if(_.isEmpty(data.name)) return false;
        if(_.isEmpty(data.phone) || data.phone.length < 14) return false;
        if(_.isEmpty(data.email)) return false;

        return true;
    }

    onChangeEmailInput(e){

        let email = e.target.value;

        if (email) {
            email = formatLowerCase(email);
        }

        this.refs.email.value = email;
    }

    render() {

        const autoPlay = process.env.NODE_ENV === "production";

        const meta = {
            title: 'Busca Aéreo – ferramenta de busca de passagens aéreas por milhas',
            description: 'Quer aumentar os lucros e resultados do seu negócio? Conheça o Busca Aéreo: atendimento personalizado na emissão de passagens aéreas com desconto.',
            canonical: 'https://buscaaereo.com.br/#/',
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
                <div className="container-boots ">
                    <section className="welcome-content row">
                        <article className="col-xs-12 col-md-12">
                            <hgroup>
                                <h6>Passagens Aéreas com desconto</h6>
                                <h1 className="title-mobile">Maximize os lucros e resultados do seu negócio</h1>
                                <div className="arrow-title"><i className="fa fa-plane" aria-hidden="true"/></div>
                                <h2 className="hidden-xs hidden-sm hidden-md hidden-lg">Mais lucro para sua agência de
                                    viagens</h2>
                                <h3 className="hidden-xs hidden-sm hidden-md hidden-lg">Compre passagem com milhas</h3>
                            </hgroup>
                        </article>
                        <article className="col-xs-12 col-md-7">
                            <div className="box-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/uh2PHPcycKI?autoplay=${autoPlay}&amp;rel=0&amp;controls=0&amp;showinfo=0`}
                                    allowFullScreen="0" width="99%" height="315" frameBorder="0"/>
                            </div>
                        </article>
                        <article className="col-xs-12 col-md-5">
                            <div className="signin">
                                <div className="title-signin">
                                    <h3>Saiba como cadastrar a sua agência</h3>
                                </div>
                                <form className="form-signin" method="post" onSubmit={(e) => this.handleSubmit(e)}>
                                    <fieldset>
                                        <label>
                                            <p className="col-xs-12 col-md-2 col-lg-2">Agência:</p>
                                            <input className="col-xs-12 col-md-10 col-lg-10" name="name"
                                                   placeholder="Nome" required="true"
                                                   ref="name" type="text"/>
                                        </label>
                                        <label>
                                            <p className="col-xs-12 col-md-2 col-lg-2">Fone:</p>
                                            <input className="col-xs-12 col-md-10 col-lg-10 phone"
                                                   name="phone"
                                                   placeholder="(99) 9999-9999"
                                                   minLength={10}
                                                   maxLength={11}
                                                   required="true"
                                                   onBlur={() => this.alterMaskPhone()}
                                                   ref="phone" type="text"/>
                                        </label>
                                        <label>
                                            <p className="col-xs-12 col-md-2 col-lg-2">E-mail:</p>
                                            <input className="col-xs-12 col-md-10 col-lg-10" name="email"
                                                   placeholder="agencia@mail.com.br" required="true"
                                                   ref="email" type="email"
                                                   onChange={(e) => this.onChangeEmailInput(e)}/>
                                        </label>
                                        {this.state.error &&
                                        <label style={{margin: '-19px 0px 0px 0px', padding: '0', fontSize: '12px'}} className="col-xs-12 alert-danger animated center-block text-center fadeInRight">
                                            Verifique se todos os dados estão corretos antes de envia-los.
                                        </label>
                                        }
                                        <label>
                                            <input value="Enviar" type="submit"/>
                                        </label>
                                    </fieldset>
                                </form>
                            </div>
                        </article>
                    </section>
                </div>
                <section className="welcome-content ">
                    <article className="sobre" style={{background: 'url("./assets/img/bg-sobre.jpg") 50%'}}>
                        <div className="container-boots">
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <arcticle>
                                    <h5 style={{"color": "#FFFFFF"}}>Sobre nós</h5>
                                    <div className="arrow-title">
                                        <i className="arrow-bg fa fa-plane" aria-hidden="true"/>
                                    </div>
                                </arcticle>
                                <article>
                                    <p>
                                        <strong>Busca Aéreo</strong> é uma empresa especializada na venda de passagens
                                        aéreas com milhas em todo território nacional, voltada para Agência de Viagem.
                                        Com
                                        uma tecnologia de ponta, realizamos uma comparação de tarifa e pontos em tempo
                                        real
                                        junto as principais companhias aéreas. Por meio do nosso sistema é possível
                                        acompanhar de maneira ágil e fácil as possibilidades de lucro em um só lugar,
                                        otimizando o tempo de trabalho.
                                    </p>
                                    <p className="hidden-xs">
                                        A vantagem em negociar conosco vai além do lucro, uma vez que buscamos a
                                        satisfação
                                        dos nossos clientes, focando na agilidade dos processos e segurança dos
                                        passageiros.
                                    </p>
                                    <p className="hidden-xs">
                                        <span><strong>Seja nosso parceiro e aumente o lucro de sua agência com sustentabilidade e responsabildade.</strong></span>
                                    </p>
                                </article>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        )
    }

}

export default connect(null, { contact, show })(HomeOut);
