import React from 'react';

import {connect} from 'react-redux'
import Notifications from 'react-notification-system-redux';

class NotificationWrapper extends React.Component {

    render() {
        return (
            <Notifications notifications={this.props.notifications}/>
        )
    }
}

export default connect(state => ({ notifications: state.notifications }))(NotificationWrapper)