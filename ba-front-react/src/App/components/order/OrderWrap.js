import React, { Component } from 'react';
import { connect      } from 'react-redux';
import { setOp } from "../../actions/order_actions";
import { getDataUser } from "../../actions/login_actions";

import { hashHistory  } from 'react-router';
import PaymentMethod    from '../payment/PaymentMethod';
import show  from 'react-notification-system-redux';
import OrderReview from "./OrderReview";

class OrderWrap extends Component{

    constructor(props){
        super(props);
    }

    render (){

        return (
            <div className={'container-boots'} style={{height:'auto', minHeight:550}}>

                    <div>
                        <OrderReview/>
                    </div>
                    
                    {(this.props.newOp && this.props.receiptsRules) &&
                        <div>
                            <PaymentMethod isModifyMethod={false}/>
                        </div>
                    }

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        ops: state.emission.ops,
        newOp:state.order.newOp,
        index: state.order.index,
        dataUser: state.login.dataUser,
        receiptsRules: state.order.receiptsRules
    }
    
};

export default connect(mapStateToProps, { setOp, show, getDataUser })(OrderWrap);
