import React, { Component } from 'react';
import {connect} from 'react-redux';
import {show} from "react-notification-system-redux";
import {changePassword, contact, getDataUser} from '../../actions/login_actions';
import {changeFinancialConfigModal} from '../../actions/busca_actions';
import LogoutButton         from '../../components/login/LogoutButton';
import ModalFinancialConfig from '../../containers/home/modalFinancialConfig/ModalFinancialConfig';

class HeaderInside extends Component {

    constructor(props) {

        super(props);

        this.state = {
            toggle: true,
        };
    };

    toggleMenu(){
        this.setState({toggle: !this.state.toggle});
    };

    closeMenu(){
        // this.props.setEndSearching(false);
        this.setState({toggle: true});
    };

    openFinancialModal(){
        this.props.changeFinancialConfigModal(true);
    };

    render() {

        const user = getDataUser();
        const {name} = user.payload || 'Visitante';

        return (
            <header className="header">
                <div className="container-boots">
                    <div className="row">

                        {/* <!-- Usuário Autenticado !--> */}
                        <div className="box-auth">

                            <div className="user-name">
                                <span><i>{name}</i>, seja bem vindo.</span>
                            </div>
                            <div className="nav-itens">
                                <ul className="nav-settings">
                                    <li>
                                        <a href="#/sua-conta"><i className="fa fa-user"></i> Sua Conta</a>
                                    </li>
                                    <li>
                                        <a href="#/emissoes"><i className="fa fa-ticket"></i> Emissões</a>
                                    </li>
                                    <li>
                                        <a href="#/boletos"><i className="fa fa-file-text"></i> Boletos</a>
                                    </li>
                                    <li>
                                        <a href="#/bilhete"><i className="fa fa-money"></i> Reembolso</a>
                                    </li>
                                    <li>
                                        {
                                            user.payload.service_charge &&
                                            <button className="financial-config-button" onClick={() => this.openFinancialModal()}>
                                                <i className="fa fa-money"></i> Configuração Financeira
                                            </button>
                                        }
                                    </li>
                                    <li>
                                        <LogoutButton />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="geral-box">
                            <div className="logo">
                                <div className="col-xs-6 col-md-2 col-lg-2">
                                    <h1>
                                        <a href="#/home" title="Busca Aéreo">
                                            <img src="assets/img/logotipo-branco-busca-aereo.png"
                                                 className="img-responsive" alt="Logotipo Busca Aéreo"
                                                 title="Busca Aéreo"/>
                                        </a>
                                    </h1>
                                </div>
                            </div>

                            {/* <!-- Inclusão de menu !--> */}
                            <nav className="menu">
                                <ul className="col-xs-12">
                                    {/* <!-- menu-ativo !--> */}
                                    <li><a onClick={(e) => this.closeMenu() } href="#/home">home</a></li>
                                    <li><a onClick={(e) => this.closeMenu() } href="#/busca">buscar passagens</a></li>
                                    <li><a onClick={(e) => this.closeMenu() } href="#/termos/condicoes">termos e condições</a></li>
                                    <li><a onClick={(e) => this.closeMenu() } href="#/formas/pagamento">formas de pagamento</a></li>
                                    <li><a onClick={(e) => this.closeMenu() } href="#/reembolso">Regras do reembolso</a></li>
                                </ul>
                            </nav>
                            <div className="menu-mobile">
                                <div className="btn-mobile">
                                    <i><a onClick={(e) => this.toggleMenu() } className="fa fa-bars toggle-menu" aria-hidden="true" alt="Menu BuscaAéreo"
                                          title="Buscar passagens"></a></i>
                                </div>
                                <div className="btn-mobile">
                                    <i><a  href="#/busca" className="fa fa-search fa-flip-horizontal"
                                           aria-hidden="true" style={{color: '#ff761b'}}></a></i>
                                </div>
                                {!this.state.toggle &&
                                <div className="lista-mobile">
                                    <ul>
                                        <li ><a onClick={(e) => this.closeMenu() } href="#/home">home</a></li>
                                        <li ><a onClick={(e) => this.closeMenu() } href="#/termos/condicoes">termos e condições</a></li>
                                        <li ><a onClick={(e) => this.closeMenu() } href="#/busca">buscar passagens</a></li>
                                        <li ><a onClick={(e) => this.closeMenu() } href="#/formas/pagamento">formas de pagamento</a></li>
                                        <li ><a onClick={(e) => this.closeMenu() } href="#/reembolso">reembolso</a></li>
                                    </ul>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isOpenFinancialConfig && <ModalFinancialConfig user={user}/>}
            </header>

        )
    }
}

const mapStateToProps = state => {
    return {
        isOpenFinancialConfig:   state.busca.isOpenFinancialConfig
    }
};

export default connect(mapStateToProps, { changeFinancialConfigModal })(HeaderInside);