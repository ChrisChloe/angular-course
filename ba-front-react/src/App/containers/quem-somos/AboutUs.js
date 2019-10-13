import React from 'react';
import DocumentMeta from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';


export default () => {
    const meta = {
        title: 'Quem somos - A ferramenta especializada na venda de passagens aéreas.',
        description: 'Busca Aéreo é uma empresa especializada na venda de passagens aéreas com milhas, exclusivamente para agências de viagens. Seja nosso parceiro!',
        canonical: 'https://buscaaereo.com.br/#/quem-somos',
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
            <ContentHeader id="banner-home" title="QUEM SOMOS" subtitle="Brasil">
                <img className="img-responsive" src="./assets/img/icone-aviao.png" alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="col-md-12 text-termos">
                        <p><strong>Busca Aéreo</strong> é uma ferramenta especializada na venda de passagens aéreas com preços competitivos, focado no público corporativo e agência de viagens. Somos uma das maiores consolidadoras de milhas do Brasil, com mais de 5 anos de experiência na emissão de passagens, garantindo o embarque do passageiro com segurança e qualidade.</p>

                        <p>Atuando em todo o território nacional, trabalhamos com uma tecnologia de ponta que entrega eficiência na comparação de tarifas e milhas das principais companhias aéreas do Brasil. O objetivo do Busca Aéreo é maximizar suas vendas e lucros e entregar facilidade e transparência nas emissões dos bilhetes.</p>

                        <p>No Busca Aéreo você pode visualizar e cotar todos os trechos nacionais operados pela LATAM, Gol, Azul e Avianca, todos os destinos da América do Sul atendidos pela Gol e LATAM, além dos trechos internacionais operados pela LATAM.</p>
                    </article>
                    <article className="col-md-12 text-termos">
                        <div className="title-initials">
                            <h4>Escolha o Busca Aéreo</h4>
                            <div className="arrow-title-initials"><span className="border-title"></span></div>
                        </div>

                        <p>A vantagem em negociar conosco vai além do lucro. Trabalhamos com as melhores condições do mercado e uma equipe altamente qualificada para o atendimento da sua demanda. Além disso, possuímos um horário comercial estendido e sistema de plantão, dando total ênfase na satisfação dos nossos clientes, na agilidade dos processos e na segurança dos passageiros.</p>

                        <p>Seja nosso parceiro e aumente o lucro de sua agência com sustentabilidade e responsabilidade.</p>
                    </article>
                    <article className="col-md-12 text-termos bg-cadastre">
                        <h4>Faça seu pré-cadastro no Busca Aéreo através do nosso formulário</h4>
                        <div className="text-center">
                            <a href="#/" type="button" className="btn btn-default btnInter-cadastre" role="button">Cadastre-se</a>
                        </div>
                    </article>
                    <br/>
                </section>
            </div>
        </main>
    )
}

