import React, {Component} from 'react';
import CurrencyInput from 'react-currency-input';

class InputMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    componentDidMount() {
        this.setState({value: this.props.serviceCharge})
    }

    render() {
        return (
            <div>
                <CurrencyInput
                    {...this.props.input}
                    prefix={'R$ '}
                    className={this.props.className}
                    value={this.state.value}
                    decimalSeparator={'.'}
                    thousandSeparator={','}
                    onChange={value => this.setState({value})}
                    autoComplete='off'
                    autoFocus={true}
                />
            </div>
        );
    }

}

export default InputMoney;