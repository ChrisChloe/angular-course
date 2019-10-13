import React, {Component} from 'react';
import ContentHeader from '../content-header/ContentHeader';
import {changePassword, getDataUser} from '../../actions/login_actions';
import {mask} from '../../utils/utils';
import NotificationSystem from 'react-notification-system';
import {connect} from 'react-redux';
import { show } from 'react-notification-system-redux';
import DocumentMeta from 'react-document-meta';

class YourAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {loading: false, disable: true, incompatible: false};
    }

    componentDidMount() {
        mask();
    }

    componentWillMount() {
        // this.props.setEndSearching(false);
        const json = this.props.getDataUser();
        this.setState(json.payload);
    }

    handleChangePass(e) {
        e.preventDefault();

        this.setState({loading: true});
        const {password, confirmPassword} = this.refs;

        this.props.changePassword({
            password: password.value,
            password_confirmation: confirmPassword.value,
            userId: this.state.userId
        })
            .then(response => {
                    if (response.error) throw response;
                    this.setState({loading: false});
                    this.props.show({
                        message: 'Senha alterada com sucesso!',
                        autoDismiss: 5
                    }, 'success');
                    this.refs.password.value = '';
                    this.refs.confirmPassword.value = '';
                }
            ).catch((r) => {
            console.log(r)
            this.setState({loading: false});
            this.props.show({
                message: 'Erro ao alterar senha!',
                autoDismiss: 5
            }, 'error');
        })


    }

    checkPassword() {
        const {password, confirmPassword} = this.refs;

        this.setState({incompatible: false});

        if (password.value.length >= 4 && confirmPassword.value.length >= 4) {
            (password.value === confirmPassword.value)
                ? this.setState({disable: false, incompatible: false})
                : this.setState({disable: true, incompatible: true})
        }
    }

    render() {

        const meta = {
            title: 'Sua Conta | Busca Aéreo',
            description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
            canonical: 'https://buscaaereo.com.br/#/sua-conta',
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
                <ContentHeader id="banner-home" title="MEUS DADOS" subtitle={this.state.name}>
                    <img className="img-responsive" src="assets/img/icone-aviao.png" alt="Ícone Avião"/>
                </ContentHeader>
                <div className="container-boots">
                    <div className="conteudo">
                        {/*<!-- Formulário de Dados Cadastrais !-->*/}
                        <form method="post" id="form-painel" onSubmit={(e) => {
                            this.handleChangePass(e)
                        }} name="form">
                            <div className="row">
                                <fieldset className="panel-form">
                                    <header className="title-panel">
                                        <h4>Dados</h4>
                                    </header>
                                    <div className="col-xs-6 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name-data"><strong>Nome</strong></label><br/>
                                            <input type="text" className="form-input form-input-default"
                                                   defaultValue={this.state.name} disabled/>
                                        </div>
                                    </div>

                                    <div className="col-xs-6 col-md-4">
                                        <div className="form-group">
                                            <label><strong>E-mail</strong></label><br/>
                                            <input type="text" className="form-input form-input-default" name=""
                                                   defaultValue={this.state.email} disabled/>
                                        </div>
                                    </div>

                                    <div className="col-xs-6 col-md-3">
                                        <div className="form-group">
                                            <label><strong>CPF/CNPJ</strong></label><br/>
                                            <input type="text" className="form-input form-input-default cpf_cnpj"
                                                   name=""
                                                   defaultValue={this.state.cpf_cnpj} disabled/>
                                        </div>
                                    </div>

                                    <div className="col-xs-6 col-md-4">
                                        <div className="form-group">
                                            <label><strong>D. Nascimento</strong></label><br/>
                                            <input type="text" className="form-input form-input-default"
                                                   defaultValue={this.state.birthday} disabled/>
                                        </div>
                                    </div>

                                    <div className="col-xs-6 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="phone-data"><strong>Telefone</strong></label><br/>
                                            <input type="text" className="form-input form-input-default phone"
                                                   defaultValue={this.state.phone} disabled/>
                                        </div>
                                    </div>

                                    <div className="col-xs-6 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="info-data"><strong>OBS:</strong></label><br/>
                                            <label htmlFor="info-text">Alteração de dados Cadastrais por
                                                telefone.</label><br/>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            {/*
                            <br/>
                            <div className="row">
                                <!-- Formulário de alterar senha !-->
                                <fieldset className="panel-form">
                                    <header className="title-panel">
                                        <h4>Alterar Senha</h4>
                                    </header>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="password-data"><strong>Nova Senha</strong></label>
                                            <input type="password" ref="password"
                                                   placeholder="*****" onChange={(e) => {
                                                this.checkPassword(e)
                                            }}
                                                   className="form-input form-input-default"
                                                   id="password" required="true"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="password-confirm"><strong>Confirmar Senha</strong></label>
                                            <input type="password" ref="confirmPassword"
                                                   placeholder="*****" onChange={(e) => {
                                                this.checkPassword(e)
                                            }}
                                                   className="form-input form-input-default"
                                                   id="password-confirm"/>
                                            {this.state.incompatible &&
                                            <p style={{'font-size': 'x-small', 'color': 'red'}}>Senhas não conferem.</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-md-3">
                                        <br/>
                                        <button type="submit" className="btn btn-success"
                                                disabled={this.state.loading}>
                                            <i className="fa fa-floppy-o"></i> {this.state.loading ? 'Salvando...' : 'Salvar'}
                                        </button>
                                    </div>
                                </fieldset>

                            </div>
                            */}
                        </form>
                    </div>
                </div>
                <NotificationSystem ref="toast" />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {passChange} = state.login || {};

    return {passChange}

};

export default connect(mapStateToProps, { changePassword, getDataUser, show })(YourAccount);