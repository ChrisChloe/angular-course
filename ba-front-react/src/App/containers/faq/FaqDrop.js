import React, {Component} from 'react';

class FaqDrop extends Component {
    constructor() {
        super();
        this.state = {
            showReply: false
        }
    }

    onClick(e) {
        e.preventDefault();
        this.setState({showReply: !this.state.showReply})
    }

    render() {

        return (
            <div className="box-faqs">
                <div data-toggle="collapse" onClick={(e) => this.onClick(e)} data-target={`#answer${this.props.id}`}>
                    {!this.state.showReply
                        ? <i className="fa fa-plus-square"></i>
                        : <i className="fa fa-minus-square"></i>
                    }
                    <div className="question">
                        <p>{this.props.question}</p>
                    </div>
                </div>
                <div id={`answer${this.props.id}`} className="collapse"><p className="answer">{this.props.answer}</p>
                </div>
            </div>
        )

    }
}

export default FaqDrop;
