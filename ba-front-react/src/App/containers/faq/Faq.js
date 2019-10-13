import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta'
import ContentHeader from '../../components/content-header/ContentHeader';
import FaqDrop from './FaqDrop'


class Faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    question: 'O que é o busca aéreo?',
                    answer: 'É uma ferramenta especializada na venda de passagens aéreas com preços competitivos, focado no público corporativo e agência de viagens.'
                },
                {
                    id: 2,
                    question: 'O Busca Aéreo atende todos os estados brasileiros?',
                    answer: 'Sim. Trabalhamos com clientes de todo o Brasil. Só é necessário fazer o cadastro para se tornar um parceiro.'
                },
                {
                    id: 3,
                    question: 'Como posso me tornar um parceiro?',
                    answer: 'Preencha o formulário de cadastro e clique em enviar. Um dos nossos profissionais entrará em contato com você para esclarecer suas dúvidas e solicitar informações complementares com o objetivo de dar continuidade ao cadastro da sua agência de viagem.'
                },
                {
                    id: 4,
                    question: 'Há alguma taxa para eu me tornar um parceiro?',
                    answer: 'Não. A adesão ao Busca Aéreo é gratuita.'
                },
                {
                    id: 5,
                    question: 'Como funciona a compra de passagens aéreas com milhas?',
                    answer: 'Após tornar-se parceiro Busca Aéreo,você receberá um nome de usuário e uma senha. Acesse o nosso sistema, forneça informações sobre a viagem, tais como destino, data de ida e volta e a quantidade de passageiros.'
                },
                {
                    id: 6,
                    question: 'Por que é vantajoso comprar com o Busca Aéreo?',
                    answer: 'O nosso sistema foi desenvolvido para lhe entregar os melhores valores, inclusive sinalizando se é mais rentável para sua agência a emissão de passagens com milhas e o valor da sua economia por usar o Busca Aéreo.'
                },
                {
                    id: 7,
                    question: 'O Busca Aéreo garante o sigilo das minhas informações e dos meus clientes?',
                    answer: 'Sim, desde o momento do cadastro, todas as informações são mantidas sob o mais absoluto sigilo.'
                },
                {
                    id: 8,
                    question: 'O processo de venda de milhas está em cumprimento com as normas legais vigentes?',
                    answer: 'Sim, todo o processo realizado pela Busca Aéreo está de acordo com a legislação em vigor.'
                },
                {
                    id: 9,
                    question: 'Por que escolher o Busca Aéreo?',
                    answer: 'Os benefícios de escolher o Busca Aéreo vão muito além do lucro. Nós fazemos questão de garantir economia, qualidade no atendimento e segurança no processo, de ponta a ponta, desde o acesso ao site até o embarque do passageiro.'
                }
            ],
        }
    }

    render() {
        const meta = {
            title: 'Dúvidas frequentes | Busca Aéreo',
            description: 'Esclareça as suas dúvidas sobre a emissão de passagens aéreas com desconto e venha fazer parte do Busca Aéreo para obter maiores lucros no seu negócio.',
            canonical: 'https://buscaaereo.com.br/#/faq',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'BuscaAereo, Passagens, Viagens, Milhas'
                }
            }
        };
        const faqDrops = this.state.questions.map(q =>
            <FaqDrop key={q.id} id={q.id} question={q.question} answer={q.answer}/>
        );

        return (
            <main>
                <DocumentMeta {...meta} />
                <ContentHeader id="faq-banner" title="PERGUNTAS FREQUENTES" subtitle="Brasil">
                    <img className="img-responsive" src="./assets/img/icone-aviao.png" alt="Ícone Avião"/>
                </ContentHeader>
                <div className="container-boots">
                    <section className="conteudo row">
                        <article className="col-xs-12 col-md-12 faqs">
                            {faqDrops}
                        </article>
                    </section>
                </div>
            </main>
        )
    }

}

export default Faq;


