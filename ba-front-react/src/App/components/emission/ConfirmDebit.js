import React, {Component} from 'react'

class ConfirmDebit extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="row alert alert-msg">
                <span>
                    <strong>Antes de processar o pagamento, certifique-se que o módulo de segurança
                        do seu internet banking está instalado em seu computador.</strong>
                    <br/><br/>
                    <div className="col-xs-12 col-lg-2  pull-right">
                    <button className="btn btn-success btn-sm btn-block" onClick={(e) => this.props.confirm(e)}>Sim, está instalado.</button>
                    </div>
                </span>
            </div>
        )
    }
}

export default ConfirmDebit;
