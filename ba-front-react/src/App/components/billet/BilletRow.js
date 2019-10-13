import React, { Component } from 'react';
import { format, formatDate } from '../../utils/utils';
import { connect } from 'react-redux';
import { setDialogIndex, setOp } from "../../actions/order_actions";
import ButtonDownload from './ButtonDownload';

class BilletRow extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false }
    }


    render() {
        const billet = this.props.op || {};

        return (
            <tr style={{borderBottom: '1px solid #e7e5e5', height: 38}}>
                <td className="text-center">{billet.id}</td>
                <td className="text-center">{billet.status_title}</td>
                <td className="text-center">{format(billet.amount)}</td>
                <td className="text-center">{formatDate(billet.due_date)}</td>
                <td className="text-center">
                    <div className="btn-group btn-emission">
                        <ButtonDownload billet={billet} />
                    </div>
                </td>
            </tr>
        )
    }
}

export default connect(null, { setDialogIndex, setOp })(BilletRow);