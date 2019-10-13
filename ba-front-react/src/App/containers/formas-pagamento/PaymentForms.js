import React from 'react';
import DocumentMeta from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';


export default () => {
    const meta = {
        title: 'Formas de Pagamento | Busca Aéreo',
        description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
        canonical: 'https://buscaaereo.com.br/#/formas/pagamento',
        meta: {
            charset: 'utf-8',
            name: {
                keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
            }
        }
    };

    return (
        <main>
            <DocumentMeta {...meta} />
            <ContentHeader id="banner-home" title="FORMAS DE PAGAMENTO" subtitle="Brasil">
                <img className="img-responsive" src="./assets/img/icone-aviao.png" alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="col-md-12 text-termos">
                    <div className="item active">
                                    <img src="assets/img/banner-pagseguro-carousel.png" className="img-responsive" title="PagSeguro" alt="Banner PagSeguro"/>
                                    <div className="carousel-caption"></div>
                                </div>
                    </article>
                </section>
            </div>
        </main>
    )
}

