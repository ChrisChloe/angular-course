import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetPassword} from '../../actions/login_actions'
import AppVersion from "../../containers/templates/AppVersion";
import { show } from 'react-notification-system-redux'
import {hashHistory} from 'react-router';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = {loading: false};
    }

    handleResetPass(e) {
        e.preventDefault();

        this.setState({loading: true});
        const {email} = this.refs;

        this.props.resetPassword({email: email.value}).then(response => {

                this.setState({loading: false});
                if (response.error) throw response;

                this.props.show({
                    title: 'Redefinição de Senha',
                    message: 'Um link de redefinição de senha foi enviado para o seu e-mail.',
                    autoDismiss: 5
                }, 'success');

                email.value = ''

                hashHistory.push("/login");

            }).catch((r) => {

                console.log(r)

                this.setState({loading: false});

                this.props.show({
                    title: 'Redefinição de Senha',
                    message: 'Não foi possivel enviar o link de redefinição de senha.',
                    autoDismiss: 5
                }, 'error');

                email.value = ''

            })

    }

    render() {
        return (
            <div className="container-boots">
                <div className="row">
                    <div className="login col-xs-12 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-3-4">
                        <div className="login-auth col-xs-12">
                            <header>
                                <img src="assets/img/logotipo-busca-aereo.png" className="img-responsive"
                                     alt="Logotipo Busca Aéreo" title="Busca Aéreo"/>
                            </header>

                            <form method="post" role="reset_password" name="form" onSubmit={(e) => {this.handleResetPass(e)}}>
                                <div className="form-group">
                                    <input className="form-input form-input-default"
                                           placeholder="usuario@buscaareo.com.br"
                                           required="required" name="email" ref="email" type="email"/>
                                </div>
                                <div className="action-login">
                                    <input className="b-btn b-btn-default fr" type="submit" disabled={this.state.loading} value={this.state.loading ? 'Processando...' : 'Recuperar'}/>
                                </div>
                            </form>
                            <a href="#/login"> Retornar ao Login</a>
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
    return state
}

export default connect(mapStateToProps, { resetPassword, show })(ResetPasswordForm);
