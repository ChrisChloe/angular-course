import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { logout } from "../../actions/login_actions"


class LogoutButton extends Component{

    constructor(props) {
        super(props)
    }

    handleLogout(e){
        e.preventDefault()
        window.stop();
        this.props.logout();
        hashHistory.push('/');
    }

    render(){
        return (
            <a href="#/logout" className="" onClick={(e) => this.handleLogout(e) }><i className="fa fa-sign-out"></i> Sair</a>
        )
    }

}


const mapStateToProps = (state) => {
    
    return state;

}

export default connect(mapStateToProps, {logout})(LogoutButton);
