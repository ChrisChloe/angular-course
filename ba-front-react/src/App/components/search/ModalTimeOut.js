import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { setResearch }      from '../../actions/busca_actions';
import {hashHistory}        from 'react-router';

class ModalTimeOut extends Component{

    constructor (props) {

        super(props);

        this.state = {

            show: false,
            isTimeout: false

        };

        this.startTime = false;

    }

    research () {

        this.props.setResearch(true);
        this.setState({ show: false, isTimeout: false });
        if (!(document.URL.split('#/')[1] === 'busca')) { hashHistory.push('/busca') }

    }

    close (){

        this.setState({ show: false });

    }

    toSearch () {

        this.setState({ show: false, isTimeout: false });
        hashHistory.push('/busca');

    }

    setTime (timeModalTimeOut) {

        if(!this.startTime){

            this.startTime    = true;

            const alertTime   = timeModalTimeOut.alert;
            const timeoutTime = timeModalTimeOut.timeout;

            setTimeout(() => {

                this.setState({show: true});

            }, alertTime);

            setTimeout(() => {

                this.setState({isTimeout: true, show: true});

            }, timeoutTime);

        }

    }

    componentDidMount(){ }

    render () {

        const {doneSearch, timeModalTimeOut} = this.props;

        doneSearch && timeModalTimeOut ? this.setTime(timeModalTimeOut) : this.startTime = false;

        return (

             <div className={`modal modal-time ${this.state.show && doneSearch ? 'show' : 'fadeInDown' }`} style={{zIndex: '999999999', background: 'rgba(0,0,0,.4)'}} data-backdrop="static" role="dialog" id="modal-timeout" data-keyboard="false">
                <div className={`modal-dialog animated ${this.state.show ? 'pulse' : ' fadeOut'}`}>
                    <div className="modal-content modal-timeout" style={{borderRadius: '10px',overflow: 'hidden'}}>
                        {
                            this.state.isTimeout
                            ? this.renderTimeout()
                            : this.renderAlert()
                        }
                    </div>
                </div>
            </div>);

    }

    renderTimeout () {

        return (

            <div className='modal-radius'>
                <div className="modal-body modal-timeout-body">

                    <div className="row">
                        <div className="text-center timeout-img">
                            <img src="assets/img/timeout.png"/>
                        </div>
                    </div>

                    <div className="row padding-default">
                        <div className="col-xs-12 text-center">
                            <h2>Sua busca expirou :(</h2>
                        </div>
                    </div>

                </div>
                <div className="modal-footer modal-timeout-footer">

                    <div className="row padding-default">
                        <div className="col-md-12 text-center">

                            <a className="btn btn-shadown"
                               data-dismiss="modal"
                               onClick={(e) => this.toSearch()}>
                                <span>Início</span>
                            </a>


                            <a className="btn btn-shadown"
                               data-dismiss="modal"
                               onClick={(e) => this.research(e)}>
                                <span>Refazer a Busca</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        )

    }

    renderAlert () {

        return (

            <div className='modal-radius'>
                <div className="modal-body modal-timeout-alert-body">
                    <div className="row">
                        <div className="text-center timeout-img">
                            <img src="assets/img/timeout-alert.png"/>
                        </div>
                    </div>

                    <div className="row padding-default">
                        <div className="col-xs-12 text-center">
                            <h2>ATENÇÃO</h2>
                            <h3>Sua busca expira em 5 minutos...</h3>
                        </div>
                    </div>
                </div>
                <div className="modal-footer modal-timeout-footer">

                    <div className="row padding-default">
                        <div className="col-md-12 text-center">
                            <a className="btn btn-shadown"
                               onClick={() => this.close()}>
                            <span>OK</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        )

    }

}

const mapStateToProps = (state) => {

    const  {doneSearch, timeModalTimeOut} = state.busca;

    return {doneSearch, timeModalTimeOut}

};

export default connect( mapStateToProps, {setResearch}) (ModalTimeOut);
