import React from 'react';
import DocumentMeta from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';


export default () => {
    const meta = {
        title: 'Como funciona – cadastre sua agência e emita sua passagem aérea',
        description: ' Agência de viagem? Não precisa mais perder tempo buscando passagens aéreas em vários sites. Compre sua passagem por milhas usando o sistema Busca Aéreo.',
        canonical: 'https://buscaaereo.com.br/#/como-funciona',
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
            <ContentHeader id="banner-home" title="COMO FUNCIONA" subtitle="Brasil">
                <img className="img-responsive" src="./assets/img/icone-aviao.png" alt="Ícone Avião"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo row">
                    <article className="col-md-12 text-termos">
                        <div className="title-initials">
                            <h4>Passagem por milhas? É no Busca Aéreo.</h4>
                            <div className="arrow-title-initials"><span className="border-title"></span></div>
                        </div>

                        <p>Quer comprar passagem por milhas mas não sabe como fazer? Nós te ajudamos. Confira abaixo o passo a passo para se cadastrar no Busca Aéreo. Caso você já esteja cadastrado no nosso site, veja a partir do passo dois, como fazer a cotação.</p>

                        <div className="title-initials">
                            <h5>Primeiro passo - Efetue seu cadastro</h5>
                        </div>

                        <p><strong>1)</strong> Para começar, preencha o formulário acima e clique em enviar. Um dos nossos profissionais entrará em contato com você para esclarecer suas dúvidas e solicitar informações complementares com o objetivo de dar continuidade ao cadastro da sua agência de viagem.</p>

                        <div className="title-initials">
                            <h5>Segundo passo - Efetue seu cadastro</h5>
                        </div>

                        <p><strong>2)</strong> Logo após a aprovação do cadastro da sua agência, você receberá um nome de usuário e uma senha. Acesse o nosso sistema, forneça informações sobre a viagem, tais como destino, data de ida e volta e a quantidade de passageiros. O sistema vai lhe mostrar os melhores valores para cotação, inclusive sinalizando se é mais rentável para sua agência a emissão de passagens com milhas e o valor da sua economia por usar o Busca Aéreo.</p>

                        <p>Assista o passo a passo:</p>

                        <p style={{"textAlign": "left"}}><i style={{"color":"#cc181e","fontSize":"20px"}} className="fa fa-play-circle" aria-hidden="true"></i><a href="https://www.youtube.com/watch?v=uh2PHPcycKI" target="_blank">https://www.youtube.com/watch?v=uh2PHPcycKI</a></p>

                        <div className="title-initials">
                            <h5>Terceiro passo - Efetue seu cadastro</h5>
                        </div>

                        <p><strong>3)</strong> Ao decidir pela passagem com milhas, solicite a emissão do bilhete e siga as instruções do sistema. Assim que o processo for finalizado você receberá o bilhete eletrônico/e-ticket em seu e-mail, com todas as informações necessárias.</p>
                    </article>

                    <article className="col-md-12 text-termos bg-cadastre">
                        <h4>Rápido, fácil e totalmente seguro. Não perca tempo e faça já o seu cadastro!</h4>
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

