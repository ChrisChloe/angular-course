import React, {Component} from 'react';
import DocumentMeta       from 'react-document-meta';
import FormSearch         from './FormSearch';
import FlightList         from '../flight/flightList/FlightList';
import OrderSummary       from '../order/OrderSummary';
import SearchingStatusBar from './SearchingStatusBar';
import ConditionTerms     from '../order/ConditionTerms';
import ModalHomeSearch    from '../../containers/home/modalHomeSearch/ModalHomeSearch';

class SearchWrap extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const meta = {
            title: 'Buscar passagens por milhas até 70% mais barata | Busca Aéreo',
            description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
            canonical: 'https://buscaaereo.com.br/#/busca',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
                }
            }
        };

        return (
            <div>
                <DocumentMeta {...meta} />
                <ModalHomeSearch />
                <ConditionTerms />
                <FormSearch/>
                <SearchingStatusBar/>
                <OrderSummary/>
                <FlightList/>
            </div>
        )
    }

}


export default SearchWrap;
