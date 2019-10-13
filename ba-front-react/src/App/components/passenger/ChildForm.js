import React, { Component } from 'react';

class ChildForm extends Component{

    constructor(props){
        super(props);
        this.state = {timeout:0}
    }

    handleChange(e){

        const {name, value} = e.target;
        this.props.handleChange(name, value, 'children', this.props.id);

    }

    render (){
        return (
            <div className="row" style={{margin: 0}}>
            <div className='col-xs-12 col-md-3 col-lg-3'>
                <div className='form-group'>
                    <label htmlFor='child-name'>
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
                    <label htmlFor='child-name'>
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
                    <label htmlFor='child-gender'>
                        <span>Sexo*</span>
                        <select name='gender'
                                id="child-gender"
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

                <div>
                    {this.props.showBaggage.flight &&
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-input">
                                <input type="checkbox" name="baggage_departure"
                                       disabled={this.props.disableInputs}
                                       onChange={e => this.handleChange(e)}/>
                                <label> Bagagem adicional ida</label>
                            </div>
                        </div>
                    }
                    {this.props.flightBack && this.props.showBaggage.flight_back &&
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-input">
                                <input type="checkbox"
                                       name="baggage_return"
                                       disabled={this.props.disableInputs}
                                       onChange={e => this.handleChange(e)}/>
                                <label> Bagagem adicional volta</label>
                            </div>
                        </div>
                    }
                </div>
        </div>);
    }
}

export default ChildForm;
