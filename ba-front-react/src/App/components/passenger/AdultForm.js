import React, { Component } from 'react';
import PropTypes   from 'prop-types';

class AdultForm extends Component{

    constructor(props){

        super(props);
        this.state = {timeout:0}

    }

    isRequiredCpf(flight, flightBack){
        if(flight.company.required_cpf) return true;
        if(flightBack && flightBack.company.required_cpf) return true;
        return false;
    }

    handleChange(e){

        const {name, value} = e.target;
        this.props.handleChange(name, value, 'adults', this.props.id);

    }

    render (){

        const {flight, flightBack} = this.props;

        const isRequiredCpf = this.isRequiredCpf(flight, flightBack);

        return (
            <div className="row" style={{margin: 0}}>
                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-name'>
                            <small>Nome*</small>
                            <input type='text'
                                   placeholder='Nome do passageiro'
                                   maxLength='100'
                                   className='form-input form-input-default change'
                                   required="true"
                                   name="name"
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]{1,100}"
                                   title="Preencha este campo com o nome do passageiro"
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>
                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-surname'>
                            <small>Sobrenome*</small>
                            <input type='text'
                                   placeholder='Sobrenome do passageiro'
                                   maxLength='100'
                                   className='form-input form-input-default change'
                                   required="true"
                                   name="surname"
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]{1,100}"
                                   title="Preencha este campo com o sobrenome do passageiro"
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>
                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-email'>
                            <small>E-mail</small>
                            <input type='email'
                                   name="email"
                                   placeholder='seu.email@provedor.com.br'
                                   className='form-input form-input-default change'
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>
                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-phone'>
                            <small>Telefone</small>
                            <input type='text'
                                   name='phone'
                                   id="adult-phone"
                                   className='form-input form-input-default phone change'
                                   placeholder="(_) ____-___"
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>

                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-gender'>
                            <small>Sexo*</small>
                            <select name='gender'
                                    id="adult-gender"
                                    required
                                    className='form-input form-input-default change'
                                    disabled={this.props.disableInputs}
                                    onChange={e => this.handleChange(e)}>
                                <option/>
                                <option value='M'>M</option>
                                <option value='F'>F</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-birthday'>
                            <small className="hidden-xs">Data de nascimento*</small>
                            <small className="hidden-sm hidden-md hidden-lg">Nascimento*</small>
                            <input type='text'
                                   name="birthday"
                                   placeholder='__/__/____'
                                   className='form-input form-input-default date change'
                                   required="true"
                                   minLength={10}
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>

                {isRequiredCpf &&
                <div className='col-xs-12 col-md-2 col-lg-2'>
                    <div className='form-group'>
                        <label htmlFor='adult-cpf'>
                            <small>CPF*</small>
                            <input type='text'
                                   id="adult-cpf"
                                   name="cpf"
                                   placeholder='CPF'
                                   required="true"
                                   maxLength='16'
                                   className='cpf_mask form-input form-input-default change'
                                   onChange={e => this.handleChange(e)}
                                   disabled={this.props.disableInputs}
                                   autoComplete="off"/>
                        </label>
                    </div>
                </div>
                }
                {isRequiredCpf &&  <br/>}
                <div>
                    {this.props.showBaggage.flight &&
                    <div className="col-xs-6 col-md-3 col-lg-3">
                        <div className="form-input">
                            <input type="checkbox"
                                   name="baggage_departure"
                                   disabled={this.props.disableInputs}
                                   onChange={e => this.handleChange(e)}/>
                            <label> Bagagem adicional ida</label>
                        </div>
                    </div>
                    }
                    {this.props.flightBack && this.props.showBaggage.flight_back &&
                    <div className="col-xs-6 col-md-3 col-lg-3">
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
            </div>
        );
    }
}

const shape = PropTypes.shape({
    company: PropTypes.shape({required_cpf:PropTypes.number.isRequired})
});

AdultForm.propTypes = {

    flight: shape,
    flightBack:shape

};

export default AdultForm;
