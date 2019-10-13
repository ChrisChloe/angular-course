import React, { Component } from 'react';
import { withRouter }       from 'react-router';


class HeaderOutside extends Component{

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
        this.setState({toggle: true});
    };

    navigate(e){
        e.preventDefault();
        this.props.router.push('login');
    }

    render(){

        return (
            <header className="header">
                <div className="container-boots">
                    <div className="row">
                        <div className="geral-box">
                            <div className="logo">
                                <div className="col-xs-6 col-md-2 col-lg-2">
                                    <h1>
                                        <a href="#/" title="Busca Aéreo">
                                            <img src="assets/img/logotipo-branco-busca-aereo.png" className="img-responsive" alt="Logotipo Busca Aéreo" title="Busca Aéreo"/>
                                        </a>
                                    </h1>
                                </div>
                            </div>


                            <div className="col-md-8 hidden-xs hidden-sm">
                                <nav className="menu-initials">
                                    <ul className="col-md-12">

                                        <li><a onClick={(e) => this.closeMenu() } href="#/quem-somos">quem somos</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="https://blog.buscaaereo.com.br/">blog</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/como-funciona">como funciona</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/seja-parceiro">seja um parceiro</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/faq">perguntas frequentes</a></li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="col-xs-4 col-sm-2 col-sm-offset-2 col-md-2 col-md-offset-0 col-lg-2">
                                <div className="button-enter">
                                    <button type="button" className="btn btn-defaut" href= "/login" onClick={(e) => this.navigate(e)}>
                                        <p className="hidden-xs">Acessar</p>
                                        <p className="hidden-sm hidden-md hidden-lg">Entrar</p>
                                        <i className="fa fa-arrow-right" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>

                            <div className="menu-mobile">
                                <div className="btn-mobile">
                                    <i><a onClick={(e) => this.toggleMenu()} className="fa fa-bars" aria-hidden="true"/></i>
                                </div>
                                {!this.state.toggle && <div className="lista-mobile">
                                    <ul>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/quem-somos">quem somos</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/como-funciona">como funciona</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/seja-parceiro">seja um parceiro</a></li>
                                        <li><a onClick={(e) => this.closeMenu() } href="#/faq">perguntas frequentes</a></li>
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}


export default withRouter(HeaderOutside);

