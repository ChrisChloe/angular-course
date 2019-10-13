import React, {Component} from 'react';
import {signIn, register} from '../../actions/login_actions';
import {hashHistory}      from 'react-router';
import {connect} from 'react-redux';
import {mask, formatLowerCase}    from '../../utils/utils';
import json      from '../../../../package.json';
import moment    from 'moment';
import { show }  from 'react-notification-system-redux';
import _ from 'lodash';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.name  = null;
        this.email = null;
        this.phone = null;
    }

    componentDidMount(){
        mask();
    }

    handleCadastro(e) {
        e.preventDefault();

        const {name, cpf_cnpj, email, phone, password, confirm_password} = this.refs || {};
        const props = {
            name: name.value,
            cpf_cnpj: cpf_cnpj.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            confirm_password: confirm_password.value
        };

        this.setState({loading: true});

        if (password.value === confirm_password.value) {
            this.props.signIn(props)
                .then(response => {

                    if (response.error) throw response;

                    this.setState({loading: false});
                    this.props.register(true);
                    hashHistory.push('/obrigado');

                })
                .catch(r => {

                    this.setState({loading: false});

                    try{

                        const messages = r.payload.response.data.message;

                        if(_.isObject(messages)){

                            if (messages.hasOwnProperty('email')) hashHistory.push('/login')

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
            this.setState({loading: false});

            this.props.show({
                title: 'Ops!',
                message: 'As senhas não estão iguais',
                autoDismiss: 5
            }, 'error');
        }
    }

    onChangeEmailInput(e){

        let email = e.target.value;

            if (email) {
                email = formatLowerCase(email);
            }

        this.refs.email.value = email;
    }

    render() {

        if (this.props.contact) {

            const {name, email, phone} = this.props.contact.data.data;

            this.name  = name;
            this.email = email;
            this.phone = phone;
        }

        return (
            <div className='container-boots'>
                <section className='welcome-content row'>
                    <article className='col-md-12'>
                        <hgroup>
                            <h1 className='title-mobile'>Cadastrar a sua agência!</h1>
                        </hgroup>
                    </article>
                    <article className='col-xs-12 col-md-5'>
                        <section className='container-boots'>
                            <div className='col-md-10'>
                                <div className='col-md-6 col-md-offset-4'>
                                    <div className='login-auth col-xs-12'>
                                        <header><img src='assets/img/logotipo-busca-aereo.png?time=1470063061'
                                                     className='img-responsive' alt='Logotipo Busca Aéreo'
                                                     title='Busca Aéreo'/></header>
                                        <br/>
                                        <form method='post' name='form' id='form-cadastro-agencia'
                                              onSubmit={(e) => {this.handleCadastro(e)}}>

                                            <div className='form-group'>
                                                <label>Nome da Agência:</label>
                                                <input className='form-input form-input-default' ref='name' type='text'
                                                       required={true} defaultValue={this.name}
                                                       placeholder='Agencia'/>
                                            </div>

                                            <div className='form-group'>
                                                <label>CPF/CNPJ:</label>
                                                <input className='form-input form-input-default cpf_cnpj' ref='cpf_cnpj'
                                                       type='text' required={true} placeholder='22.222.222/0001-22'/>
                                            </div>

                                            <div className='form-group'>
                                                <label>E-mail:</label>
                                                <input className='form-input form-input-default' ref='email'
                                                       type='email' required={true} defaultValue={this.email}
                                                       placeholder='email@agencia.com.br'
                                                       onChange={(e) => this.onChangeEmailInput(e)}/>
                                            </div>

                                            <div className='form-group'>
                                                <label>Telefone:</label>
                                                <input className='form-input form-input-default phone' ref='phone'
                                                       type='text' required={true} defaultValue={this.phone}
                                                       placeholder='(99) 99999-9999'/>
                                            </div>

                                            <div className='form-group'>
                                                <label>Digite sua senha:</label>
                                                <input className='form-input form-input-default' ref='password'
                                                       type='password' required={true} placeholder='****'/>

                                            </div>
                                            <div className='form-group'>
                                                <label>Confirme sua senha:</label>
                                                <input className='form-input form-input-default' ref='confirm_password'
                                                       type='password' required={true} placeholder='****'/>

                                            </div>

                                            <div className='action-login'>
                                                <input className='b-btn b-btn-default fr' id='btn-submit'
                                                       value={this.state.loading ? 'ENVIANDO...' : 'EFETUAR PRÉ-CADASTRO'}
                                                       type='submit'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='copyright-login'>
                                        <small className=''>
                                            <i className='fa fa-copyright'></i> Busca Aéreo v{json.version} - {moment().year()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </section>
                <br/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    const {contact} = state.login || {};
    return {contact}
};

export default connect(mapStateToProps, { signIn, register, show })(SignIn);
