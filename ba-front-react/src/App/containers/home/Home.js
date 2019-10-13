import React from 'react';
import DocumentMeta  from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';

const url = './assets/';

export default () => {

    const meta = {
        title: 'Home | Busca Aéreo',
        description: 'Passagens aéreas Gol, Tam,TAP, Azul e Avianca. Emita pelo PagSeguro e tenha mais conforto e comodidade.',
        canonical: 'https://buscaaereo.com.br/#/home',
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
            <ContentHeader id="banner-home" title="HOME" subtitle="Brasil">
                <img className="img-responsive" src={`${url}img/icone-aviao.png`} alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="infografico col-md-12">
                        <div className="infog-box">
                            <figure>
                                <img src={`${url}img/bg-info.gif`}  className="img-responsive"
                                     alt="Background Info"
                                     title="Background Info"/>
                                <figcaption>
                                    <span>
                                        Olá,
                                    </span>
                                    <span>Confira agora um tutorial de como utilizar a ferramenta BuscaAéreo. No caso de
                                        dúvidas, você pode entrar em contato com a nossa central.
                                    </span>
                                </figcaption>
                            </figure>
                            <h1>Buscar Passagens</h1>
                            <figure>
                                <img src={`${url}img/img-info1.png`} className="img-responsive" alt="Imagem Info Gráfico 1"
                                     title="Imagem Info Gráfico 1"/>
                                <figcaption>
                                    <p>
                                        Preencha todos os campos solicitados para realizar a sua emissão. Ao lado do
                                        formulário, você pode encontrar qual companhia aérea deseja realizar o embarque
                                        do seu passageiro. Com tudo preenchido, clique em "Buscar Voos".
                                    </p>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src={`${url}img/img-info2.png`} className="img-responsive" alt="Imagem Info Gráfico 2"
                                     title="Imagem Info Gráfico 2"/>
                                <figcaption>
                                    <p>
                                        Você verá todas as opções de companhias, condições e valores na tabela abaixo do
                                        formulário. Clique em "selecionar" no canto esquerdo do voo escolhido. Para
                                        visualizar o voo de volta, clique na aba do lado direito do "Selecione seu voo
                                        de ida" e clique em "selecionar" ao lado da opção escolhida para a volta do
                                        passageiro.
                                    </p>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src={`${url}img/img-info3.png`} className="img-responsive" alt="Imagem Info Gráfico 13"
                                     title="Imagem Info Gráfico 3"/>
                                <figcaption>
                                    <p>
                                        Preencha todos os dados do seu passageiro e, caso necessite, você pode anotar
                                        alguma observação importante no campo "observações gerais". Obs: Apenas emissões
                                        com a companhia Azul, é necessário o preenchimento do CPF do passageiro.
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                    </article>
                </section>
            </div>
        </div>

    )
}
