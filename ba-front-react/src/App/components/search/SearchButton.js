import React, { Component } from 'react'
import { connect } from 'react-redux';

class SearchButton extends Component{

    constructor(props){
        super(props)
    }

    search(){

    }

    render(){
        return this.props.component
    }

}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, null)(SearchButton)