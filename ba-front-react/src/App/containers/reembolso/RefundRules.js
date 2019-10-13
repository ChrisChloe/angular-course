import React from 'react';
import DocumentMeta from 'react-document-meta';
import ContentHeader from '../../components/content-header/ContentHeader';

export default () => {
    const meta = {
        title: 'Condições para o reembolso de passagens | Busca Aéreo',
        description: 'Conheça as regras de reembolso de voos nacionais e internacionais para as cias aéreas Gol, LATAM, Avianca, Azul.',
        canonical: 'https://buscaaereo.com.br/#/reembolso',
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
            <ContentHeader id="banner-home" title="REEMBOLSO" subtitle="Tabela válida a partir de 20/12/2016.">
                <img className="img-responsive" src="./assets/img/icone-reembolso.png" alt="Reembolso"/>
            </ContentHeader>
            <div className="container-boots ng-scope">
                <section className="conteudo">
                    <article className="row table-reembolso">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th colSpan="3">TRECHOS NACIONAIS</th>
                            </tr>
                            <tr>
                                <th>Cia aérea</th>
                                <th>Antes do embarque</th>
                                <th>Após o embarque (No show)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong style={{"color": "#289bc7"}}>AZUL</strong></td>
                                <td>R$ 350,00</td>
                                <td>R$ 355,00</td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                <td>R$ 350,00</td>
                                <td><strong>Não é Possível</strong></td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#ff5a00"}}>GOL</strong></td>
                                <td>R$ 320,00</td>
                                <td><strong>Não é Possível</strong></td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#d5281d"}}>AVIANCA</strong></td>
                                <td>R$ 245,00</td>
                                <td>R$ 210,00</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th colSpan="3">CONTINENTES: AMÉRICA DO NORTE, EUROPA, OCEANIA, ÁSIA e ÁFRICA</th>
                            </tr>
                            <tr>
                                <th>Cia aérea</th>
                                <th>Antes do embarque</th>
                                <th>Após o embarque (No show)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong style={{"color": "#289bc7"}}>AZUL</strong></td>
                                <td>R$ 850,00</td>
                                <td>R$ 950,00</td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                <td>R$ 1280,00</td>
                                <td><strong>Não é Possível</strong></td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#d5281d"}}>AVIANCA</strong></td>
                                <td>R$ 820,00</td>
                                <td>R$ 920,00</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th colSpan="3">CONTINENTE: AMÉRICA DO SUL</th>
                            </tr>
                            <tr>
                                <th>Cia aérea</th>
                                <th>Antes do embarque</th>
                                <th>Após o embarque (No show)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                <td>R$ 700,00</td>
                                <td><strong>Não é Possível</strong></td>
                            </tr>
                            <tr>
                                <td><strong style={{"color": "#ff5a00"}}>GOL</strong></td>
                                <td>R$ 450,00</td>
                                <td><strong>Não é Possível</strong></td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="terms-reembolso text-center">
                            <p>
                                <strong>Comunicado importante:</strong>
                            </p>
                            <p>
                                Estamos ajustando as regras para solicitações de cancelamento de emissões realizadas no
                                mesmo dia,
                                adequando assim as novas regras da ANAC iniciadas em 13/03/2017. É imprescindível a
                                leitura e entendimento, a agência deve conferir a OP enviada para o setor de emissão,
                                assim como confirmar
                                o interesse do passageiro pelo bilhete aéreo, pois em caso de cancelamento para voos com
                                embarque até 07 dias da data de solicitação, mesmo que o cancelamento seja solicitado no
                                mesmo dia da emissão, haverão taxas de reembolso mediante tabela abaixo. Estamos à
                                disposição para esclarecer todas as dúvidas frente ao novo procedimento.
                            </p>
                            <p>
                                EQUIPE BUSCA ÁEREO
                            </p>
                        </div>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="3">CANCELAMENTOS NO MESMO DIA DA EMISSÃO</th>
                                </tr>
                                <tr>
                                    <th>Datas dos<br/>voos</th>
                                    <th>Voar até 07 dias da emissão</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong>Valores<br/>Nacionais</strong></td>
                                <td style={{"padding": "0"}}>
                                    <table className="table-internal">
                                        <thead>
                                        <tr>
                                            <th style={{"width": "143px"}}>Cia aérea</th>
                                            <th style={{"width": "175px"}}>Antes do embarque</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><strong style={{"color": "#289bc7"}}>AZUL</strong></td>
                                            <td>R$ 50,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                            <td>R$ 250,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#ff5a00"}}>GOL</strong></td>
                                            <td>R$ 280,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#d5281d"}}>AVIANCA</strong></td>
                                            <td>R$ 160,00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>



                            </tr>
                            <tr>
                                <td><strong>Valores<br/>Internacionais</strong></td>
                                <td style={{"padding": "0"}}>
                                    <table className="table-internal">
                                        <thead>
                                        <tr>
                                            <th>Cia / Destino</th>
                                            <th>Antes do embarque</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>América do Sul<br/><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                            <td>R$ 700,00</td>
                                        </tr>
                                        <tr>
                                            <td>América do Sul<br/><strong style={{"color": "#ff5a00"}}> GOL</strong></td>
                                            <td>R$ 450,00</td>
                                        </tr>
                                        <tr>
                                            <td>Outros destinos<br/><strong style={{"color": "#1b0088"}}>LATAM</strong>
                                            </td>
                                            <td>R$ 1000,00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th colSpan="3">CANCELAMENTOS NO MESMO DIA DA EMISSÃO</th>
                            </tr>
                            <tr>
                                <th>Datas dos<br/>voos</th>
                                <th>Voar após 07 dias da emissão</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong>Valores<br/>Nacionais e <br/> Internacionais</strong></td>
                                <td style={{"padding": "0"}}>
                                    <table className="table-internal">
                                        <thead>
                                        <tr>
                                            <th style={{"width": "143px"}}>Cia aérea</th>
                                            <th style={{"width": "175px"}}>Antes do embarque</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><strong style={{"color": "#289bc7"}}>AZUL</strong></td>
                                            <td>R$ 50,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#1b0088"}}>LATAM</strong></td>
                                            <td>R$ 70,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#ff5a00"}}>GOL</strong></td>
                                            <td>R$ 70,00</td>
                                        </tr>
                                        <tr>
                                            <td><strong style={{"color": "#d5281d"}}>AVIANCA</strong></td>
                                            <td>R$ 70,00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>



                            </tr>
                            </tbody>
                        </table>
                        <div className="terms-reembolso text-left">
                            <p> - Cancelamentos no mesmo dia da emissão deverão ser solicitados através do email: <a
                                href="mailto:emissao@buscaaereo.com.br">emissao@buscaaereo.com.br</a>,
                                de Segunda a Sexta, das 07h as 20h, e aos Sábados das 09h as
                                18h. Após esse horário as solicitações deverão ser encaminhadas para <a
                                    href="mailto:alteracao@buscaaereo.com.br">alteracao@buscaaereo.com.br</a> e seguirão
                                as regras de reembolso.</p>
                            <p>
                                - Prazo para solicitar reembolso <strong style={{"color": "#289bc7"}}>AZUL</strong>,
                                <strong style={{"color": "#1b0088"}}>LATAM</strong>, <strong
                                style={{"color": "#ff5a00"}}>GOL</strong>, <strong
                                style={{"color": "#d5281d"}}>AVIANCA</strong> é de 60 dias após a data de solicitação de
                                emissão, após esse prazo <strong>NÃO</strong> será possível o reembolso.
                            </p>
                            <p>
                                - Para cancelamentos de passagens de <strong>TODAS</strong> as companhias, a solicitação
                                deverá ser feita com até 4 horas de antecedência do voo, caso contrário será cobrada a
                                taxa de após check-in.
                            </p>
                            <p>
                                - <strong>NÃO</strong> cancelamos <strong style={{"color": "#ff5a00"}}>GOL</strong> após
                                o check-in, no show irreversível.
                            </p>
                            <p>
                                - Prazos para liberação do crédito: <strong style={{"color": "#289bc7"}}>AZUL</strong>
                                15 dias, <strong style={{"color": "#1b0088"}}>LATAM</strong> até 30 dias (Podendo ser
                                liberado antes, de acordo com a CIA), <strong style={{"color": "#ff5a00"}}>GOL</strong>
                                e <strong style={{"color": "#d5281d"}}>AVIANCA</strong> créditos liberados
                                imediatamente.
                            </p>
                        </div>
                        <br/>
                        <div>
                            <p>O preço da multa se refere somente a 1 passageiro em um trecho. Para solicitar quaisquer
                                alterações, enviar um e-mail para: <a href="mailto:alteracao@buscaaereo.com.br">alteracao@buscaaereo.com.br</a>
                                de segunda a sexta, das 9h ás 18h aos sábados das 9h ao meio-dia (Horário de Brasília).
                                O setor de Alteração não trabalha com plantão.</p>
                        </div>
                    </article>
                    <br/>
                </section>
            </div>
        </main>
    )
}

