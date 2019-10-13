import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortFlights } from "../../actions/busca_actions"

class FlightCellHeader extends Component{

    constructor(props){
        super(props)
        this.state = {isAsc:true, sorted: false}
    }

    componentDidMount(){
        if(this.props.active){
            this.setState({isAsc: !this.state.isAsc, sorted: true});
        }
    }

    sort(e){

        e.preventDefault();

        this.props.sortFlights({property:this.props.property, isAsc: this.state.isAsc})

        this.setState({isAsc: !this.state.isAsc, sorted: true});

    }

    render (){
        return(
            <div className={this.props.className}>
                <a href="#" onClick={(e) => this.sort(e)}>
                    <span>{this.props.title}</span>

                    {this.props.property &&
                        <span>
                            {!this.state.sorted &&
                                <span>
                                    <i className="fa fa-sort" aria-hidden="true"></i>
                                </span>
                            }
                            {this.state.sorted &&
                            <span>
                                {this.state.isAsc ?
                                    <span>
                                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                                    </span>
                                    :<span>
                                        <i className="fa fa-sort-asc" aria-hidden="true"></i>
                                    </span>
                                }
                            </span>
                            }
                        </span>
                    }
                </a>
            </div>
        )
    }
}


export default connect(null, { sortFlights })(FlightCellHeader);