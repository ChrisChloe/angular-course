import React, {Component} from 'react';
import PayBillet          from '../emission/PayBillet';
import PayTransfer        from '../emission/PayTransfer';
import PayGatewayForm     from '../emission/PayGatewayForm';


class SelectedMethodPay extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="rowAlertPayment">
                {this.props.method === "" &&
                    <span/>
                }
                {this.props.method === "billet" &&
                    <PayBillet isModifyMethod={this.props.isModifyMethod}/>
                }
                {this.props.method === "transfer" &&
                    <PayTransfer isModifyMethod={this.props.isModifyMethod} disablePayments={(value) => this.props.disablePayments(value)}/>
                }
                {(this.props.method !== "billet" && this.props.method !== "transfer" ) &&
                    <div className="col-md-12">
                        <PayGatewayForm isModifyMethod={this.props.isModifyMethod} gateway={this.props.method}/>
                    </div>
                }
            </div>
        )
    }
}

export default SelectedMethodPay;