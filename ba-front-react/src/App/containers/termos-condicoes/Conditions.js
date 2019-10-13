import React from 'react';
import DocumentMeta from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';

export default () => {
    const meta = {
        title: 'Conheça nossos termos e condições de uso | Busca Aéreo',
        description: 'Confira as regras gerais do nosso termo de uso. Agências parceiras deverão concordar e atender as devidas instruções.',
        canonical: 'https://buscaaereo.com.br/#/termos/condicoes',
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
            <ContentHeader id="banner-home" title="TERMOS E CONDIÇÕES" subtitle="Brasil">
                <img className="img-responsive" src="../assets/img/icone-aviao.png" alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="col-md-12 text-termos">
                        <p>Solicitamos as agências parceiras informar aos seus passageiros que as passagens foram
                            emitidas através da conversão de pontos de programa de fidelidade ou milhas aéreas, que não
                            haverá acúmulo de pontos/ milhas pelo voo a ser realizado, que as passagens emitidas estão
                            sujeitas às regras do programa de fidelidade da respectiva companhia aérea e que o
                            procedimento de reembolso é distinto daquele comumente praticado pelas companhias
                            aéreas.</p>

                        <p>É imprescindível a realização do check-in pela internet com três dias de antecedência do
                            embarque de todos os bilhetes emitidos no Busca Aéreo independente da companhia aérea, caso
                            ocorra algum impeditivo para a conclusão do procedimento pelo site, a agência deve nos
                            contatar com prioridade para averiguação.</p>

                        <p>A agência é responsável pelo acompanhamento do embarque dos seus passageiros com bilhetes
                            gerados no Busca Aéreo, sendo prioritário avisar que o horário de chegada ao aeroporto para
                            embarque é de três horas de antecedência antes do voo, de acordo com o horário de embarque
                            expresso no bilhete aéreo adquirido e qualquer questionamento efetuado pelas companhias
                            aéreas no momento do embarque a agência deve entrar em contato com os telefones disponíveis
                            da empresa para acompanhamento.</p>

                        <p>No caso específico de solicitação de reembolso de algum bilhete aéreo emitido, a agência de
                            viagens deverá enviar e-mail para o setor de alteração, <a
                                href="mailto:alteracao@buscaaereo.com.br" target="_blank"><strong>alteracao@buscaaereo.com.br</strong></a>
                            com a solicitação desejada, respeitando o horário de funcionamento do setor, reiterando que
                            qualquer tipo de solicitação não pode ser efetuado por qualquer outro canal fornecido pelas
                            companhias aéreas call center, balcão de aeroporto entre outros, todos devem ser
                            direcionados para o e-mail sinalizado acima.</p>

                        <p>O prazo para reembolso do bilhete aéreo emitido é de até 60 dias, contados a partir da data
                            de emissão do bilhete. Reiterando que não procedemos remarcações em nenhuma companhia.</p>

                        <p>A agência de viagens deverá informar aos seus passageiros que irão voar com bilhetes emitidos
                            no Busca Aéreo todos esses procedimentos próprios de bilhetes gerados através de milhas
                            aéreas, assim como as regras de reembolso vigentes, que estão expostas no site do Busca
                            Aéreo na aba denominada reembolso.</p>

                    </article>
                    <br/>
                </section>
            </div>
        </main>
    )
}

