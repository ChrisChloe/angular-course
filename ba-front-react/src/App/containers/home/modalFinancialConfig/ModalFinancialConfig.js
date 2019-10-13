import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, initialize} from 'redux-form';
import './style.css';
import {changeFinancialConfigModal, updateServiceCharge} from "../../../actions/busca_actions";
import InputMoney from './InputMoney';


class ModalFinancialConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            user: {},
            serviceCharge: '',
            serviceChargeType: ''
        }
    }

    componentWillMount() {
        const user = this.props.user.payload;
        this.setState({
            user: user,
            serviceCharge: user.service_charge,
            serviceChargeType: user.service_charge_type
        });
    }

    componentDidMount() {
        this.handleFormInitialize();
    }

    close(){
        this.setState({show: false});
        setTimeout(()=>{this.props.changeFinancialConfigModal(false);}, 500);
    }

    handleFormSubmit(values) {
        const agencyId = this.state.user.agency_id;
        let serviceCharge = values.service_charge.replace("R$ ","");
        serviceCharge = serviceCharge.replace(",","");
        const serviceChargeType = values.service_charge_type;

        const requestData = {
            service_charge: serviceCharge,
            service_charge_type: serviceChargeType,
            agency_id: agencyId
        };
        this.props.updateServiceCharge(requestData);
    }

    handleFormInitialize() {
        const initialData = {
            "service_charge": this.state.serviceCharge,
            "service_charge_type": this.state.serviceChargeType
        };
        this.props.initialize(initialData);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className={`modal-backdrop ${this.state.show ? 'show' : ' fadeOut'}`}>
                <div className={`modal-financial-container animated  panel panel-default ${this.state.show ? 'show' : ' fadeOut'}`}>
                    <button className="btn-close" onClick={() => this.close()}><i className="fa fa-times"></i></button>
                    <div className="panel-heading">Alterar taxa de serviço</div>
                    <div className={'panel-body'}>
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <div className="form-group">
                                <label htmlFor="tax">Valor da Taxa: </label>
                                <Field name="service_charge"
                                       component={InputMoney}
                                       className="form-input"
                                       serviceCharge={this.state.serviceCharge}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tax">Tipo da Taxa: </label>
                                <div>
                                    <label><Field name="service_charge_type" component="input" type="radio" value="passenger"/> Por Passageiro</label><br/>
                                    <label><Field name="service_charge_type" component="input" type="radio" value="op"/> Por Ordem de Passagem</label>
                                </div>
                            </div>
                            <button type="submit" className="btn-submit pull-right">Concluir</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ModalFinancialConfig = reduxForm({
    form: 'formServiceCharge'
})(ModalFinancialConfig);

const mapStateToProps = state => {
    return {
        isOpenFinancialConfig:   state.busca.isOpenFinancialConfig,
        serviceCharge:           state.busca.serviceCharge
    }
};

export default connect(mapStateToProps, { changeFinancialConfigModal, updateServiceCharge })(ModalFinancialConfig);