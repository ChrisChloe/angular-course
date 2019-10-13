import React, {Component} from 'react'

class ClearCacheModal extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <section className="box-conclusao-pedido" style={{position: 'absolute', zIndex: 10, left: 50, right: 50 }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-hidden="true" onClick={() => this.props.dismiss(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div id="step1">

                                <div className="step">
                                    <h6>Instruções para limpeza de cache.</h6>
                                </div>

                                <section name="termo" id="termo">
                                    <h5>Siga os passos baixo para limpar a cache no navegador {this.props.instructions && this.props.instructions.browserType}</h5>
                                    { (this.props.instructions && this.props.instructions.steps)
                                        && this.props.instructions.steps
                                            .map((step, index) => <p key={index}>{''+(index+1)+'. '+step}</p>)
                                    }

                                </section>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="term-accept">
                                <button type="button" className="btn btn-success"
                                        onClick={() => { this.props.dismiss(false) }}>Ok.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ClearCacheModal;