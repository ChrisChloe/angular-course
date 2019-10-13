import React, {Component} from 'react';
import _ from 'lodash'
import {format} from '../../utils/utils'
import DetailFlight from "./DetailFlight";

class DetailsOp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {op} = this.props;
        return (
            <tr className="detalhe-op collapse" style={{"backgroundColor": "#ededed"}} id={op.id}>
                <td colSpan="9">
                    <div className="painel-quotation">
                        <div className="panel-details">
                            <div className="details-custom">
                                <div className="col-md-12">
                                    <div className="flight-going" style={{"float": "left"}}>
                                        <h4 style={{"minWidth": "200px", "fontSize": "13px"}}>Preço
                                            <span style={{"fontWeight": "bold"}}> Total: </span>
                                            {format(op.price)}
                                        </h4>
                                    </div>
                                </div>
                                <br/>
                                <DetailFlight op={op} type="flight"/>
                                {!_.isNil(op.flight_back) &&
                                <DetailFlight op={op} type="flight_back"/>
                                }
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default DetailsOp;
