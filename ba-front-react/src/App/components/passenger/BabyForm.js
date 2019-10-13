import React, { Component } from 'react';

class BabyForm extends Component{

    constructor(props){
        super(props);
        this.state = {timeout:0}
    }

    handleChange(e){

        const {name, value} = e.target;
        this.props.handleChange(name, value, 'babies', this.props.id);

    }

    render (){
        return (
            <div className="row" style={{margin: 0}}>
            <div className='col-xs-12 col-md-3 col-lg-3'>
                <div className='form-group'>
                    <label htmlFor='baby-name'>
                        <span>Nome*</span>
                        <input type='text'
                               placeholder='Nome do passageiro'
                               maxLength='100'
                               className='form-input form-input-default change'
                               name="name"
                               required="true"
                               onChange={(e) => this.handleChange(e)}
                               disabled={this.props.disableInputs}
                               pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]{1,100}"
                               title="Preencha este campo com o nome do passageiro"
                               autoComplete="off"/>
                    </label>
                </div>
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3'>
                <div className='form-group'>
                    <label htmlFor='baby-name'>
                        <span>Sobrenome*</span>
                        <input type='text'
                               placeholder='Sobrenome do passageiro'
                               maxLength='100'
                               className='form-input form-input-default change'
                               name="surname"
                               required="true"
                               onChange={(e) => this.handleChange(e)}
                               disabled={this.props.disableInputs}
                               pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]{1,100}"
                               title="Preencha este campo com o sobrenome do passageiro"
                               autoComplete="off"/>
                    </label>
                </div>
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3'>
                <div className='form-group'>
                    <label htmlFor='child-birthday'>
                        <span className="hidden-xs">Data de nascimento*</span>
                        <span className="hidden-sm hidden-md hidden-lg">Nascimento*</span>
                        <input type='text'
                               placeholder='__/__/____'
                               className='form-input form-input-default date change'
                               name="birthday"
                               required="true"
                               onChange={(e) => this.handleChange(e)}
                               disabled={this.props.disableInputs}
                               autoComplete="off"/>
                    </label>
                </div>
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3'>
                <div className='form-group'>
                    <label htmlFor='babies-gender'>
                        <span>Sexo*</span>
                        <select name='gender'
                                id="babies-gender"
                                required
                                className='form-input form-input-default change'
                                onChange={(e) => this.handleChange(e)}
                                disabled={this.props.disableInputs}>
                            <option/>
                            <option value='M'>M</option>
                            <option value='F'>F</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>);
    }
}

export default BabyForm;
