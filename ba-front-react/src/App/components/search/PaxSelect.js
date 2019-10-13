import React, { Component } from 'react'
import _ from 'lodash'

class PaxSelect extends Component{

    constructor(props){
        super(props);
        this.state = {value: ''}
    }

    render (){
        const value = this.state.value || this.props.defaultValue
        return (
            <select className="form-input" value={value} onChange={(e) => this.setState({value: e.target.value})} ref={ref => {
                this.props.getRef(ref)
            }}>
                {(this.props.type !='adults') && <option value={0}>0 {
                        this.props.type == 'children' ? 'Crianças' : 'Bebês'
                }</option>}
                {_.range(1,10).map( i => {
                    return <option key={i} value={i}>{i} {
                        this.props.type == 'adults' && i == 1 ? 'Adulto' : this.props.type == 'adults' ? 'Adultos' :
                        this.props.type == 'children' && i == 1 ? 'Criança' : this.props.type == 'children' ? 'Crianças' :
                            this.props.type == 'babies' && i == 1 ? 'Bebê' : 'Bebês'
                    }</option>
                })}
            </select>
        )
    }
}

export default PaxSelect;
