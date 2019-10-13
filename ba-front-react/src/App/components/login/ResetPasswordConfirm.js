import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import { resetPasswordConfirm } from '../../actions/login_actions'
import AppVersion from "../../containers/templates/AppVersion";
import { show } from 'react-notification-system-redux'

class ResetPasswordConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {loading: false};
    }

    handleConfirmReset(e) {
        e.preventDefault();

        this.setState({loading: true});

        const {password, password_confirmation} = this.refs;

        const {token} = this.props.params;

        this.props.resetPasswordConfirm({password: password.value, password_confirmation:password_confirmation.value, token:token})
            .then(response => {

                if (response.error) {
                    this.setState({loading: false});
                    this.props.show({
                        title: 'Ops!',
                        message: 'Link de recuperação de senha expirado.',
                        autoDismiss: 5
                    }, 'error');
                }

                this.setState({loading: false});

                hashHistory.push("/login");

                this.props.show({
                    title: 'Redefinição de Senha',
                    message: response.payload.data.message,
                    autoDismiss: 5,
                    // action: {
                    //     label: 'Voltar para o Login',
                    //     callback: function () {
                    //         hashHistory.push("/login");
                    //     }
                    // }
                }, 'success');

            }).catch((r) => {

                console.log('error',r.payload.data.message);

                this.setState({loading: false});

                try{

                    this.props.show({
                        title: 'Ops!',
                        message: r.payload.data.message,
                        autoDismiss: 5
                    }, 'error');

                }catch(e){

                    console.log('e',e)

                    this.props.show({
                        title: 'Ops!',
                        message: 'Essa área do sistema está indisponível no momento.',
                        autoDismiss: 5
                    }, 'error');

                }

            })

    }

    render() {
        return (
            <div className="container-boots">
                <div className="row">
                    <div className="login col-xs-12 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-3-4">
                        <div className="login-auth col-xs-12">
                            <header>
                                <img src="/assets/img/logotipo-busca-aereo.png" className="img-responsive"
                                     alt="Logotipo Busca Aéreo" title="Busca Aéreo"/>
                            </header>
                            <form method="post" role="reset_password" name="form" onSubmit={(e) => {this.handleConfirmReset(e)}}>

                                <div className="form-group">
                                    <input className="form-input form-input-default" placeholder="Digite a nova senha"
                                           name="password" required="required" ref="password" type="password"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-input form-input-default" placeholder="Repita a senha"
                                           name="password_confirmation" ref="password_confirmation" required="required" type="password"/>
                                </div>

                                <div className="action-login">
                                    <input className="b-btn b-btn-default fr" type="submit" disabled={this.state.loading} value={this.state.loading ? 'Processando...' : 'Redefinir'}/>
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

export default connect(mapStateToProps, { resetPasswordConfirm, show })(ResetPasswordConfirm);
