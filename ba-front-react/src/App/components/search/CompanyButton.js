import React, { Component } from 'react';

class CompanyButton extends Component{

    constructor(props) {
        super(props)
    }
    
    render(){


        const {company} = this.props;
        const {title, checked} = company;
        return (
            <div className="company col-xs-3-4 col-sm-2 col-md-5">

                <input id={`radio-${title.toLowerCase()}`}
                       className="radio_companhia_aerea"
                       type="checkbox"
                       checked={checked}
                       onChange={() => {}}
                       onClick={(event) => company.handleCheck(event, company)}/>

                <label htmlFor={`radio-${title.toLowerCase()}`} >

                    {/* <img src={`assets/img/logotipo-${title.toLowerCase()}-menor.png`}
                         alt=""
                         title=""
                         className={`img-companhia-busca img-responsive logo-${title.toLowerCase()}`}/> */}
                    <img 
                        src={`assets/svg/${title.toLowerCase()}.svg`} 
                        className={`img-companhia-busca img-responsive logo-${title.toLowerCase()}`}/>
                    <span></span>
                </label>

            </div>
        )
    }

}


export default CompanyButton;
