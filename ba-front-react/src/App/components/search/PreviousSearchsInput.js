import React, { Component } from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';
import _ from 'lodash'
import { getObjectCookie, getAllPreviousSearches } from '../../utils/utils'

class PreviousSearchsInput extends Component{

    constructor(props) {
        super(props)
        this.state = {
            prevSearches: [],
            filteredArray: [],
            selected: '',
            loading: false
        }
    }

    componentDidMount(){
        let ps = getAllPreviousSearches(getObjectCookie('auth_user_data'))
        this.setState({
            ...this.state,
            prevSearches: ps,
            filteredArray: ps,
            selected: _.isEmpty(ps) ? 'Nenhuma busca recente encontrada' : 'Selecione uma busca recente.'
        })
    }

    _handleSelect(value, item){
        this.setState({ ...this.state, selected: value})
        this.props.onSelect(item);
    }

    _handleOnChange(text, value){
        this.setState({
            ...this.state,
            filteredArray: this.state.prevSearches.filter(ps => ps.origin.fulltitle.toLowerCase().indexOf(value.toLowerCase()) != -1 || ps.destination.fulltitle.toLowerCase().indexOf(value.toLowerCase()) != -1),
            selected: value
        })
    }

    render() {
        let inputData = { className: 'form-input data', type:'text', readOnly: true, style: {cursor: 'pointer'}, title: "Selecione uma busca recente"};

        return (
            <Autocomplete
                wrapperStyle={{display:'block', cursor: 'pointer'}}
                value={this.state.selected}
                inputProps={inputData}
                items={this.state.filteredArray.slice(0, 5)}
                getItemValue={prevSearch => prevSearch.origin.city+' ('+prevSearch.origin.initials+') '+ ' - '+prevSearch.destination.city+ ' ('+prevSearch.destination.initials+') '}
                onSelect={(value, item) => this._handleSelect(value, item)}
                onChange={(event, value) => this._handleOnChange(event, value)}
                renderItem={(item, isHighlighted) => this._renderItem(item, isHighlighted)}
                renderMenu={(items, value, style) => this._renderMenu(items, value, style)}
                selectOnBlur={false}
            />
        )
    }

    _renderItem(item, isHighlighted){
        return (<li key={_.uniqueId()} className={isHighlighted ? 'active' : {padding: '2px 6px',cursor: 'pointer'}}>
            <a className="previous-search">
                <p>
                    {item.origin.city} ({item.origin.initials}) - {item.destination.city} ({item.destination.initials})
                </p>
                <small>
                    Ida: {item.date_starting}
                { item.date_back &&
                    <span> &nbsp;&nbsp;&nbsp;
                        Volta: {item.date_back}
                    </span>
                }
                </small>
                <small> &nbsp;&nbsp;&nbsp;
                    Passageiros: { parseInt(item.babies) + parseInt(item.adults) + parseInt(item.children) }
                </small>
            </a>
        </li>)
    }

    _renderMenu(items, value, style){
        return (<ul style={{display: 'block'}} className="dropdown-menu">
            {items.length === 0 ? <li style={{padding: 6}}>Não foram encontradas buscas recentes para este usuário.</li> : items}
        </ul>)
    }


}

export default connect( null , { getAllPreviousSearches })(PreviousSearchsInput);
