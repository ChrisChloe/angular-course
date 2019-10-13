import React from 'react';
import DocumentMeta from 'react-document-meta'
import ContentHeader from '../../components/content-header/ContentHeader';


export default () => {
    const meta = {
        title: 'Seja um parceiro Busca Aéreo e aumente o lucro da sua agência.',
        description: 'Os benefícios de escolher o Busca Aéreo vão muito além do lucro. Garantimos qualidade e eficiência em todo o processo, até o embarque do passageiro.',
        canonical: 'https://buscaaereo.com.br/#/seja-parceiro',
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
            <ContentHeader id="partner-banner" title="SEJA UM PARCEIRO" subtitle="Brasil">
                <img className="img-responsive" src="./assets/img/icone-aviao.png" alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="col-md-12 text-termos">
                        <p>Os benefícios de escolher o Busca Aéreo vão muito além do lucro. Nós fazemos questão de garantir economia, qualidade no atendimento e segurança no processo, de ponta a ponta, desde o acesso ao site até o embarque do passageiro.</p>

                        <div className="title-initials">
                            <h5>Confira porque a sua escolha deve ser pelo Busca Aéreo:</h5>
                        </div>

                        <div className="lista-icons partner-list">
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-busca"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Sistema de busca de passagens por milhas exclusivo para as agências associadas;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-economia"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Indicadores que sinalizam a sua economia ao optar pela passagem com milhas;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-sistema"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Sistema é rápido, prático e seguro;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-sigilo"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Os dados da agência e do passageiro são mantidos sob total sigilo;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-equipe"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Equipe capacitada, pronta para acompanhar e atender a todas as demandas;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-legislacao"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>O Busca Aéreo atua em total conformidade com a legislação vigente;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-passagem"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Emita passagens aéreas com milhas para todo o Brasil e alguns destinos internacionais;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-itens">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <div className="icons-parceiros icon-atendimento"></div>
                                    </div>
                                    <div className="col-xs-10 col-md-11">
                                        <p>Atendimento exclusivo para as agências de viagens.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <br/>
                </section>
            </div>
        </main>
    )
}

