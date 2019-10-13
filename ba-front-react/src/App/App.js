import React, {Component} from 'react';
import NotificationWrapper from './NotificationWrapper'

import Layout from "./containers/Layout";

class App extends Component {


    render() {
        const {path} = this.props.children.props.route;

        return (
            <div>
                <NotificationWrapper />
                {(path != '/login' && path != '/password/reset' && path != '/password/:token')
                    ? <Layout> {this.props.children} </Layout>
                    : <div> {this.props.children} </div>
                }
            </div>
        )
    }

}

export default App;
