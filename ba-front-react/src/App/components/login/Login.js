import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { hashHistory }      from 'react-router';
import { show, removeAll }  from 'react-notification-system-redux';
import DocumentMeta         from 'react-document-meta';
import ClearCacheModal      from './ClearCacheModal';
import { getLocation, formatLowerCase }      from '../../utils/utils';
import AppVersion           from "../../containers/templates/AppVersion";
import { login, getAuthenticatedUser, createUserLoginData, logout, isLoggedIn, checksBlocked, blockUser} from '../../actions/login_actions';
import { getClearCacheInstructions } from '../../utils/clearCache';
import _ from 'lodash';

class Login extends Component{

    constructor(props) {
        super(props)
        this.state = {
            tokens:{},
            loading:false,
            countAttempts: 0,
            instructions: null,
            showModal: false,
            passError: false,
            userError: false,
            username: '',
            password: '',
            position: {}
        };

    }

    componentDidMount(){
        // this.props.setEndSearching(false);

        if (isLoggedIn()){
           hashHistory.push('/home');
        }

        getLocation()
        .then( (response) => {

            const lat = response.coords.latitude;
            const lng = response.coords.longitude;

            this.setState({position: { lat, lng}});
        })
        .catch( (err) => {
            return
        })

        // this.setState({...this.state, instructions: getClearCacheInstructions(), showModal: true})

    }

    openModalClearCache(){
        this.setState({...this.state, instructions: getClearCacheInstructions(), showModal: true})
    }

    sendPosition (position) {

        this.props.getAuthenticatedUser(this.props.tokens, position).then(() => {
            const {authUser} = this.props || {}

            const token = JSON.stringify({token: this.state.tokens, timeLogin: new Date().getTime()});

            if (_.isNil(authUser) || _.isNil(authUser.email)) {

                this.props.show({
                    title: 'Usuário ou senha incorretos.',
                    message: 'Verifique seu usuário e senha e tente novamente',
                    autoDismiss: 5
                }, 'error');

                this.setState({loading: false, password: ''});

                return;
            }

            const user = JSON.stringify({
                ...authUser,
                agency: null,
                name: this.cleanUpSpecialChars(authUser.name)
            });

            this.props.createUserLoginData(token, user);

            this.setState({loading: false});
            hashHistory.push('/busca');

        })


    }

    handleLogin(e){

        e.preventDefault();

        this.props.removeAll();

        this.setState({loading:true});

        const {username, password} = this.state;

        this.props.checksBlocked(username)
        .then(response => {


            if (response.payload.hasOwnProperty('response')) {
                if (response.payload.response.data.warning) {
                    throw response.payload.response.data;
                }
            }


            if(response.payload.data.hasOwnProperty('error_version')){
                this.openModalClearCache();
                throw response.payload.data;
            }


            if (response.payload.data.error) throw response;
            const status = response.payload.data.status;
            let message = '';

            switch (status) {
                case 'inativo':
                    message = 'Sua conta está bloqueada!';
                    break;
                case 'inexistente':
                    message = 'Esta conta não existe!';
                    this.setState({userError: true, password: ''});
                    break;
                case 'ativo':
                    return {error: false};
                    break;
            }

            this.props.show({
                title: 'Atenção!',
                message: message,
                autoDismiss: 5
            }, 'warning');

            this.setState({loading:false});
            this.username.focus();

            return {error_user: true, error: true};

        })
        .then(res => {
            if (res.error) throw res;
            this.props.login({username, password})
            .then(response => {

                if (response.error) throw response;

                this.setState({tokens: this.props.tokens});

                this.sendPosition(this.state.position);

            }).catch(error => {
                console.log('error:', error);
                this.setState({loading: false});

                if(error.error_version) throw error;

                if (!error.payload.request) {
                    this.props.show({
                        title: 'Estamos realizando uma manutenção no nosso sistema.',
                        message: 'Por favor, tente mais tarde ou contate o suporte.',
                        autoDismiss: 5
                    }, 'error');
                    return;
                }

                if (error.payload.request.status === 0) {
                    this.props.show({
                        title: 'Estamos realizando uma manutenção no nosso sistema.',
                        message: 'Por favor, tente mais tarde ou contate o suporte.',
                        autoDismiss: 5
                    }, 'error');
                }

                if (error.payload.request.status === 401) {
                    this.state.countAttempts++;
                    this.setState({...this.state, passError: true, password: '', userError: false});
                    this.props.show({
                        title: 'Usuário ou senha incorretos.',
                        message: 'Verifique seu usuário e senha e tente novamente',
                        autoDismiss: 5
                    }, 'error');

                    // if (this.state.countAttempts === 4) {
                    //     this.props.show({
                    //         title: 'Atenção.',
                    //         message: 'Sua conta será bloqueada, resta apenas uma tentativa!',
                    //         autoDismiss: 3
                    //     }, 'warning');
                    // }

                    if (this.state.countAttempts === 5) { //excedeu o limite de tentativas erradas.
                        this.props.blockUser(username).then(response => {
                            if (response.error) throw response;

                            // this.props.show({
                            //     title: 'Sua conta foi bloqueada!',
                            //     message: 'Limite de tentativas incorretas excedido.',
                            //     autoDismiss: 3
                            // }, 'error');

                            // setTimeout(function () {
                            //     location.reload()
                            // }, 3000);

                        }).catch(r => console.log(r.error))
                    }
                }

            });

        })
        .catch(res => {
            this.setState({loading: false});

            if(res.error_version) return;

            if(res.error_user) return;

            if(res.error) {
                this.props.show({
                    title: 'Estamos realizando uma manutenção no nosso sistema.',
                    message: res.message,
                    autoDismiss: 5
                }, 'error');

                return;

            }

            if (res.warning) {
                this.props.show({
                    title: 'Atenção.',
                    message: res.message,
                    autoDismiss: 5
                }, 'warning');
            }

        });
    }

    cleanUpSpecialChars(str){
        str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
        str = str.replace(/[àáâãäå]/g,"a");
        str = str.replace(/[ÈÉÊËẼ]/g,"E");
        str = str.replace(/[èéêëẽ]/g,"e");
        str = str.replace(/[ÌÍÎÏĨ]/g,"I");
        str = str.replace(/[ìíîïĩ]/g,"i");
        str = str.replace(/[òóôöõ]/g,"o");
        str = str.replace(/[ÒÓÔÖÕ]/g,"O");
        str = str.replace(/[ùúûüũ]/g,"u");
        str = str.replace(/[ÙÚÛÜŨ]/g,"U");

        return str.replace(/[^a-z0-9\ç\s]/gi,''); // final clean up
    }

    onChangeEmailInput(e){

        let userName = e.target.value;

        if (userName) {
            userName = formatLowerCase(userName);
        }

        this.setState({...this.state, username: userName, userError: false});

    }

    render(){

        const meta = {
            title: 'Login | Busca Aéreo',
            description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
            canonical: 'https://buscaaereo.com.br/#/login',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
                }
            }
        };

        return (
            <div className="container-boots" style={{ flex: 1}}>
                <DocumentMeta {...meta} />
                {this.state.showModal && <ClearCacheModal instructions={this.state.instructions} dismiss={dismiss => this.setState({...this.state, showModal: dismiss})} /> }
                <div className="row">
                <div className="login col-xs-12 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-3-4">

                    <div className="login-auth">
                        <header><img src="assets/img/logotipo-busca-aereo.png?time=1470063061" className="img-responsive" alt="Logotipo Busca Aéreo" title="Busca Aéreo"/></header>
                        <form method="post" role="login" name="form" onSubmit={(e) => this.handleLogin(e)} >


                            <div className="form-group">
                                {this.state.userError && <small className="text-danger">Usuário Inválido.</small>}
                                <input className={`form-input form-input-${this.state.userError ? 'error' : 'default'}`} placeholder="usuario@buscaareo.com.br" required="required" name="username" type="email"
                                       value={this.state.username} onChange={(e) => this.onChangeEmailInput(e)}
                                       ref={(input) => { this.username = input; }} />
                            </div>
                            <div className="form-group">
                                <input className={`form-input form-input-${this.state.passError ? 'error' : 'default'}`} placeholder="*******" required="required" name="password" type="password"
                                       value={this.state.password} onChange={(e) => {
                                           this.setState({...this.state, password: e.target.value, passError: false})
                                        }} ref={(input) => { this.password = input; }}/>
                                {this.state.passError && <small className="text-danger">Senha Incorreta.</small>}
                            </div>

                            <div className="action-login">
                                <button className="b-btn b-btn-default btn-block" type="submit"
                                    disabled={this.state.loading}>
                                    {this.state.loading ? 'Carregando...' : 'Logar'}
                                </button>
                                <a href="#/password/reset" className="text-center"> Esqueci a senha</a>
                            </div>
                        </form>
                    </div>
                    <div className="copyright-login">
                        <AppVersion/>
                    </div>
                </div>
            </div>
            </div>
        )

    }

}

const mapStateToProps = (state) => {

    const {tokens, authUser} = state.login || {};

    return {tokens, authUser}

};

export default connect(mapStateToProps, { login, getAuthenticatedUser, createUserLoginData, logout, isLoggedIn, checksBlocked, blockUser, show, removeAll })(Login);
