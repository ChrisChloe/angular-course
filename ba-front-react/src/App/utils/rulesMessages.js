import React from 'react';


function getMessage (cause) {

    let body   = null;
    let title  = null;

    switch (cause) {

        case 'LIMIT':

            title = 'Não há limite disponível para forma de pagamento selecionada.';
            body  = 'Para dar continuidade a sua emissão, favor formalizar o "OK" no email para que sua "OP" seja direcionada ao setor financeiro para análise.';

            return {title, body};


        case 'DATE':

            title = 'Forma de Pagamento Inválida';
            body  = 'Para essa forma de pagamento, a data do seu voo deve ser acima de 2 dias.';

            return {title, body};

        case 'DISABLED':

            title = 'Essa forma de pagamento ainda não está disponível para sua agência.';
            body  = 'Para maiores informações favor entrar em contato com o financeiro Busca Aéreo.';

            return {title, body};
    }

}


export function getTooltip(cause) {
    return htmlTooltipMessage(getMessage(cause));
}

export function getRow(cause) {
    return htmlRowMessage(getMessage(cause));
}


function htmlRowMessage(objectMessage) {
    return (
        <div className="col-md-12" style={{background: '#e59124', opacity: '.8', color: '#ffffff'}}>
            <p><i className='fa fa-warning'/> {objectMessage.title} {objectMessage.body} </p>
        </div>
    )
}


function htmlTooltipMessage(objectMessage) {
    return (
        <div>
            <p><i className='fa fa-warning'/> {objectMessage.title} </p>
            <p>{objectMessage.body}   </p>
        </div>
    )
}