import React, {Component} from 'react';
import Footer        from './templates/Footer';
import HeaderInside  from './templates/HeaderInside';
import HeaderOutside from './templates/HeaderOutside';
import {isLoggedIn}  from '../actions/login_actions';
import ModalTimeOut  from '../components/search/ModalTimeOut';

class Layout extends Component{

    render(){
        const header = isLoggedIn()?<HeaderInside/>:<HeaderOutside/>;
        const signIn = (window.location.hash === '#/cadastro');
        return (
            <div>
                {header}
                {/*<ModalTimeOut />*/}
                <content>
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </content>
                {!signIn && <Footer/>}
            </div>
        );
    }

}

export default Layout;