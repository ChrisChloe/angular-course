import React, {Component} from 'react';

class ContentHeader extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section id={this.props.id} className="banner ng-scope">
                <div className="container-boots">
                    <div className="relative col-md-12">
                        <hgroup>
                            <h1 className="title-mobile">{this.props.title}</h1>
                            <h2>{this.props.subtitle}</h2>
                        </hgroup>
                        <figure className="icone-banner absolute">
                            {this.props.children}
                        </figure>
                    </div>
                </div>
            </section>
        )
    }

}

export default ContentHeader;
