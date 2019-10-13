angular
    .module('managerApp')
    .provider('appConfig', ['env', '$httpParamSerializerProvider', function (env, $httpParamSerializerProvider) {

        var config = {
            // Servidor de Backend
            baseUrl: env.apiUrl,
            baseAuthUrl: env.apiAuthUrl,
            baseFinUrl: env.apiFinUrl,
            baseVisionUrl: env.apiVisionUrl,
            baseMonitorUrl: env.apiMonitorUrl,
            clientId: env.auth.clientId,
            clientSecret: env.auth.clientSecret,
            version: "2016 ©Busca Aéreo by Mangue3 v3.0.0",
            versionNumber: '3.0.0',
            crmUrl: 'https://app.elomilhas.com.br/',
            pagination: function () {
                return {
                    totalItems: 0,
                    currentPage: 0,
                    itemsPerPage: 20
                };
            },
            filterCriteria: function () {
                var searchParams = {};
                var queryParams = {};

                return {
                    page: 1,
                    limit: 20,
                    search: null,
                    sortedBy: 'desc',
                    orderBy: 'id',
                    addSearchParam: function (key, value) {
                        searchParams[key] = value;
                    },
                    addParam: function (key, value, reset) {
                        if (reset) {
                            queryParams[key] = value;
                            return;
                        }

                        if (queryParams[key] !== undefined) {
                            if (typeof queryParams[key] === 'object') {
                                queryParams[key].push(value);
                            } else {
                                var temp = queryParams[key];
                                queryParams[key] = [temp, value];
                            }
                        } else {
                            queryParams[key] = value;
                        }
                    },
                    removeParam: function (key, reset) {
                        delete queryParams[key];
                    },
                    getParams: function () {
                        var params = searchParams;
                        //petrus search format
                        var search = Object.keys(params).map(function (key) {
                            return key + ':' + params[key];
                        }).join(";");

                        var query = {
                            search: this.search ? this.search + (search ? search + ';' : "") : search,
                            page: this.page,
                            limit: this.limit,
                            sortedBy: this.sortedBy,
                            orderBy: this.orderBy
                        };

                        Object.keys(queryParams).forEach(function (key) {
                            if (typeof queryParams[key] === 'object') {
                                queryParams[key].forEach(function (val, i) {
                                    query[key + '[' + i + ']'] = val;
                                });
                            } else {
                                query[key] = queryParams[key];
                            }
                        });

                        return query;
                    }
                };
            },
            companies: [
                {id: 1, name: "Avianca",       main: true},
                {id: 2, name: "Latam",         main: true},
                {id: 3, name: "Gol",           main: true},
                {id: 4, name: "Azul",          main: true},
                {id: 5, name: "Tap",           main: false},
                {id: 6, name: "Tam Red Black", main: false},
                {id: 7, name: "Gol Diamante",  main: false},
            ],
            employees: [
                {name: "Lourivaldo Vasconcelos", role: "Programador Sênior", contact: "(81) 9 9460-1007"},
                {name: "Danyllo", role: "Programador Pleno", contact: "(81) 9 8587-9004"},
                {name: "Albino", role: "Programador Júnior", contact: "(81) 9 8810-6310"},
                {name: "Danilo", role: "Programador Júnior", contact: "(81) 9 9740-9599"},
                {name: "Márcio", role: "Programador Júnior", contact: "(81) 9 9833-4195"},
                {name: "Iago Neres", role: "Programador Júnior", contact: "(81) 9 9946-8892"},
                {name: "Eva", role: "Estagiária", contact: ""},
                {name: "João Nascimento", role: "Estagiário", contact: "(81) 9 9461-7360"},
                {name: "Eudes Roger", role: "Estagiário", contact: "(81) 9 8633-2206"},
                {name: "Umberto Barros", role: "Estagiário", contact: "(81) 9 9818-1213"}
            ],
            cardFlags: [
                { value: 'mastercard', title: 'MasterCard' },
                { value: 'american_express', title: 'American Express' },
                { value: 'diners_club', title: 'Diners Club' },
                { value: 'elo_card', title: 'Elo' },
                { value: 'hipercard', title: 'Hipercard' },
                { value: 'uatp', title: 'UATP' },
                { value: 'visa', title: 'Visa' }
            ],
            request_emission_status: [
                { value: 1, title: 'Aguardando Aprovação' },
                { value: 2, title: 'Emitindo' },
                { value: 3, title: 'Confirmado' },
                { value: 4, title: 'Verificar' },
                { value: 5, title: 'Cancelado' }
            ],
            agency_status: [
                { value: 5, title: 'Bloqueada (Sem acesso/Expirado)' },
                { value: 4, title: 'Cadastur (Com acesso)' },
                { value: 3, title: 'Desativada (Sem acesso)' },
                { value: 2, title: 'Prospecção (Com acesso)' },
                { value: 1, title: 'Ativa (Com acesso)' },
                { value: 0, title: 'Inativa (Com acesso/Banner)' }
            ],
            search_status: [
                { value: '0', title: 'Criada' },
                { value: '1', title: 'Selecionada' },
                { value: '2', title: 'Termos e Condições' },
                { value: '3', title: 'Preenchimento dos dados' },
                { value: '4', title: 'Pagamento' }
            ],
            search_region: [
                { value: 'nulo', title: 'Sem Regional' },
                { value: 'norte', title: 'Norte' },
                { value: 'nordeste', title: 'Nordeste' },
                { value: 'sul', title: 'Sul' },
                { value: 'sudeste', title: 'Sudeste' },
                { value: 'centro-oeste', title: 'Centro-Oeste' }
            ],
            region: [
                { value: 'psv', title: 'PSV' },
                { value: 'norte', title: 'Norte' },
                { value: 'nordeste', title: 'Nordeste' },
                { value: 'sul', title: 'Sul' },
                { value: 'sudeste', title: 'Sudeste' },
                { value: 'centro-oeste', title: 'Centro-Oeste' }
            ],
            user_status: [
                { value: 2, title: 'Prospecção' },
                { value: 1, title: 'Ativa' },
                { value: 0, title: 'Inativa' }
            ],
            birthday: [
                { value: 'custom', title: 'Do Periodo' },
                { value: 'month', title: 'Do Mês' },
                { value: 'week', title: 'Da Semana' },
                { value: 'day', title: 'Do Dia' }
            ],

            op_archive_reasons: [
                { value: 1,  title: 'Aguardando Resposta do Cliente',},
                { value: 2,  title: 'Agência Fazendo Cotação',},
                { value: 3,  title: 'Agência Solicitou Cancelamento',},
                { value: 4,  title: 'Aumento de Pontuação',},
                { value: 5,  title: 'Falta de Milhas no Estoque',},
                { value: 6,  title: 'OP Gerada e Não Enviada para Emissão',},
                { value: 7,  title: 'Pagamento não aprovado',},
                { value: 8,  title: 'Pagamento não enviado',},
                { value: 9,  title: 'Voo Esgotado',},
                { value: 10, title: 'Acordo Financeiro', },
                { value: 11, title: 'Teste do Sistema', },
            ],

            states: [
                { value: "AC", title: "AC" },
                { value: "AL", title: "AL" },
                { value: "AP", title: "AP" },
                { value: "AM", title: "AM" },
                { value: "BA", title: "BA" },
                { value: "CE", title: "CE" },
                { value: "DF", title: "DF" },
                { value: "ES", title: "ES" },
                { value: "GO", title: "GO" },
                { value: "MA", title: "MA" },
                { value: "MT", title: "MT" },
                { value: "MS", title: "MS" },
                { value: "MG", title: "MG" },
                { value: "PA", title: "PA" },
                { value: "PB", title: "PB" },
                { value: "PR", title: "PR" },
                { value: "PE", title: "PE" },
                { value: "PI", title: "PI" },
                { value: "RJ", title: "RJ" },
                { value: "RN", title: "RN" },
                { value: "RS", title: "RS" },
                { value: "RO", title: "RO" },
                { value: "RR", title: "RR" },
                { value: "SC", title: "SC" },
                { value: "SP", title: "SP" },
                { value: "SE", title: "SE" },
                { value: "TO", title: "TO" }
            ],

            countries: ["AN", "AF", "ZA", "AX", "AL", "DE",
                "AD", "AO", "AI", "AQ", "AG", "SA", "DZ", "AR",
                "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD",
                "BB", "BE", "BZ", "BJ", "BM", "BY", "BO", "BQ",
                "BA", "BR", "BW", "BV", "BN", "BG", "BF", "BI",
                "BT", "CV", "KH", "CM", "CA", "KY", "KZ", "CF",
                "TD", "CZ", "CL", "CN", "CY", "CX", "CC", "CO",
                "KM", "CG", "CD", "CK", "KR", "KP", "CI", "CR",
                "HR", "CU", "CW", "DK", "DJ", "DM", "DO", "EG",
                "SV", "AE", "EC", "ER", "SK", "SI", "ES", "US",
                "EE", "ET", "FO", "FJ", "PH", "FI", "FR", "GA",
                "GM", "GH", "GE", "GS", "GI", "GR", "GD", "GL",
                "GP", "GU", "GT", "GG", "GY", "GF", "GW", "GN",
                "GQ", "HT", "HM", "HN", "HK", "HU", "YE", "IN",
                "ID", "IQ", "IR", "IE", "IS", "IL", "IT", "JM",
                "JP", "JE", "JO", "KI", "KW", "LA", "LS", "LV",
                "LB", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
                "MG", "MY", "MW", "MV", "ML", "MT", "FK", "IM",
                "MP", "MA", "MH", "MQ", "MU", "MR", "YT", "UM",
                "MX", "MM", "FM", "MZ", "MD", "MC", "MN", "ME",
                "MS", "NA", "NR", "NP", "NI", "NE", "NG", "NU",
                "NF", "NO", "NC", "NZ", "OM", "NL", "PW", "PS",
                "PA", "PG", "PK", "PY", "PE", "PN", "PF", "PL",
                "PR", "PT", "QA", "KE", "KG", "GB", "RE", "RO",
                "RW", "RU", "EH", "AS", "WS", "PM", "SB", "SM",
                "SH", "LC", "BL", "KN", "SX", "MF", "ST", "VC",
                "SN", "SL", "RS", "SC", "SG", "SY", "SO", "LK",
                "SZ", "SD", "SS", "SE", "CH", "SR", "SJ", "TH",
                "TW", "TJ", "TZ", "TF", "IO", "TL", "TG", "TK",
                "TO", "TT", "TN", "TC", "TM", "TR", "TV", "UA",
                "UG", "UY", "UZ", "VU", "VA", "VE", "VN", "VI",
                "VG", "WF", "ZM", "ZW"],

            statesAndRegion: [
                {name: "Acre", region: "Norte"},
                {name: "Amapá", region: "Norte"},
                {name: "Amazonas", region: "Norte"},
                {name: "Roraima", region: "Norte"},
                {name: "Rondônia", region: "Norte"},
                {name: "Tocantins", region: "Norte"},
                
                {name: "Paraíba", region: "Nordeste"},
                {name: "Alagoas", region: "Nordeste"},
                {name: "Pernambuco", region: "Nordeste"},
                {name: "Bahia", region: "Nordeste"},
                {name: "Ceará", region: "Nordeste"},
                {name: "Maranhão", region: "Nordeste"},
                {name: "Rio Grande do Norte", region: "Nordeste"},
                {name: "Pará", region: "Nordeste"},
                {name: "Piauí", region: "Nordeste"},
                {name: "Sergipe", region: "Nordeste"},
                
                {name: "Goiás",              region: "Centro-Oeste"},
                {name: "MTS", region: "Centro-Oeste"},
                {name: "DF",   region: "Centro-Oeste"},
                {name: "MT",        region: "Centro-Oeste"},
                
                {name: "MG", region: "Sudeste"},
                {name: "ES", region: "Sudeste"},
                {name: "RJ", region: "Sudeste"},
                {name: "SP", region: "Sudeste"},
                
                {name: "PR", region: "Sul"},
                {name: "RGS", region: "Sul"},
                {name: "SC", region: "Sul"},
            ],

            regions: [
                'Norte',
                'Nordeste',
                'Centro-Oeste',
                'Sudeste',
                'Sul'
            ],

            statesAndRegionKeys: [
                {state: "AC", region: "Norte"},
                {state: "AP", region: "Norte"},
                {state: "AM", region: "Norte"},
                {state: "RR", region: "Norte"},
                {state: "RO", region: "Norte"},
                {state: "TO", region: "Norte"},
                
                {state: "PB", region: "Nordeste"},
                {state: "AL", region: "Nordeste"},
                {state: "PE", region: "Nordeste"},
                {state: "BA", region: "Nordeste"},
                {state: "CE", region: "Nordeste"},
                {state: "MA", region: "Nordeste"},
                {state: "RN", region: "Nordeste"},
                {state: "PA", region: "Nordeste"},
                {state: "PI", region: "Nordeste"},
                {state: "SE", region: "Nordeste"},
                
                {state: "GO",   region: "Centro-Oeste"},
                {state: "MS",  region: "Centro-Oeste"},
                {state: "DF",   region: "Centro-Oeste"},
                {state: "MT",   region: "Centro-Oeste"},
                
                {state: "MG", region: "Sudeste"},
                {state: "ES", region: "Sudeste"},
                {state: "RJ", region: "Sudeste"},
                {state: "SP", region: "Sudeste"},
                
                {state: "PR", region: "Sul"},
                {state: "RS", region: "Sul"},
                {state: "SC", region: "Sul"},
            ],

            adjustmentTypes: [
                { value: 0, title: 'Desconto' },
                { value: 1, title: 'Acréscimo' }
            ],
            fareTypes: [
                { value: 0, title: 'Milhas' },
                { value: 1, title: 'Tarifa' }
            ],
            calculationTypes: [
                { value: 'money', title: 'Dinheiro' },
                { value: 'percentage', title: 'Porcentagem' }
            ],
            applicationTypes: [
                { value: 'markup', title: 'Markup' },
                { value: 'op', title: 'OP' }
            ],

            flightTypes: [
                { value: 'default', title: 'Todos' },
                { value: 'national', title: 'Nacional' },
                { value: 'international', title: 'Internacional' }
            ],
            couponableTypes: [
                {title: 'Agência', value: 'agency'},
                {title: 'Usuário', value: 'users'}
            ],

            sendTypes: [
                {title:'Específico', value:'specific'},
                {title:'Por Grupo', value:'group'}
            ],

            addressTypes: [
                {title:'Fiscal', value: 1},
                {title:'Postal', value: 2}

            ],

            checkInCodes: [
                { code: '0', title: 'Check-in inválido' },
                { code: '1', title: 'Check-in disponível' },
                { code: '2', title: 'Check-in não disponível' },
                { code: '3', title: 'Check-in bloqueado' },
                { code: '4', title: 'Check-in realizado' }
            ],
            subContinents: [
                { value: 0, title: 'América do sul' },
                { value: 1, title: 'Outro' }
            ],
            emissionTypes: {
                oneWayTrip: 0, //Ida
                backTrip: 1, //Volta
                roundTrip: 2 //Ida e volta
            },
            typePayments:[
                { title: 'Cielo Crédito',          value: 1},
                { title: 'Cielo Débito',           value: 2},
                { title: 'Boleto',                 value: 3},
                { title: 'Transferência Bancária', value: 4},
                { title: 'PAGSEGURO',              value: 5}
            ],
            invoiceStatus: [
                { title: 'A Receber',              value: 1},
                { title: 'Em Processamento',       value: 2},
                { title: 'Cancelado',              value: 3},
                { title: 'Recebido',               value: 4},
                { title: 'Em Remessa',             value: 5},
            ],
            markupTypes: [
                { value: 1, title: 'Nacional' },
                { value: 2, title: 'América do sul' },
                { value: 3, title: 'Internacional' },
                { value: 4, title: 'Customizado' },
                { value: 5, title: 'Trecho' },
            ],
            markupCalculationTypes: [
                { value: 0, title: 'A cada 10.000 (padrão)' },
                { value: 1, title: 'Qualquer Qtd Milhas (preço fixo)' }
            ],
            PricemarkupTypes: [
                { value: 1, title: 'Nacional' },
                { value: 2, title: 'América do sul' },
                { value: 3, title: 'Internacional' }
            ],
            PricemarkupTypes_operation: [
                { value: 2, title: 'Acréscimo' },
                { value: 1, title: 'Desconto' },
            ],
            PricemarkupTypes_calculation: [
                { value: 1, title: 'Porcentagem' },
                { value: 2, title: 'Valor em Dinheiro' },
            ],
            Replys: [
                { value: 1, title: 'Ajuste de assunto', body: '<p>Olá,</p><p>Favor encaminhar email novamente com assunto original.</p><p>Exemplo : Ordem de emissão: (#00000). </p><p>Responda: ok. </p>' },
                { value: 2, title: 'Comprovante em outro email', body: '<p>Olá,</p><p> Favor encaminhar email com anexo de comprovante no mesmo email de confirmação de emissão. </p><p>Responda: ok. </p>' },

            ],
            PaymentTypes: [
                { value: 0, title: 'Antecipado' },
                { value: 1, title: 'Faturado' },
                { value: 2, title: 'Faturada / Antecipado vôos Próximos (4 dias)' },

            ],
            RefundFaresTypeTrip: [
                { value: 0, title: 'Nacional' },
                { value: 1, title: 'Internacional' },
            ],
            RefundsubContinents: [
                { value: 0, title: 'Outro' },
                { value: 1, title: 'América do sul' },
            ],
            ufs: [
                {
                    'id': 1,
                    'title': 'AC'
                },
                {
                    'id': 2,
                    'title': 'AL'
                },
                {
                    'id': 3,
                    'title': 'AP'
                },
                {
                    'id': 4,
                    'title': 'AM'
                },
                {
                    'id': 5,
                    'title': 'BA'
                },
                {
                    'id': 6,
                    'title': 'CE'
                },
                {
                    'id': 7,
                    'title': 'DF'
                },
                {
                    'id': 8,
                    'title': 'ES'
                },
                {
                    'id': 9,
                    'title': 'GO'
                },
                {
                    'id': 10,
                    'title': 'MA'
                },
                {
                    'id': 11,
                    'title': 'MT'
                },
                {
                    'id': 12,
                    'title': 'MS'
                },
                {
                    'id': 13,
                    'title': 'MG'
                },
                {
                    'id': 14,
                    'title': 'PA'
                },
                {
                    'id': 15,
                    'title': 'PB'
                },
                {
                    'id': 16,
                    'title': 'PR'
                },
                {
                    'id': 17,
                    'title': 'PE'
                },
                {
                    'id': 18,
                    'title': 'PI'
                },
                {
                    'id': 19,
                    'title': 'RJ'
                },
                {
                    'id': 20,
                    'title': 'RN'
                },
                {
                    'id': 21,
                    'title': 'RS'
                },
                {
                    'id': 22,
                    'title': 'RO'
                },
                {
                    'id': 23,
                    'title': 'RR'
                },
                {
                    'id': 24,
                    'title': 'SC'
                },
                {
                    'id': 25,
                    'title': 'SP'
                },
                {
                    'id': 26,
                    'title': 'SE'
                },
                {
                    'id': 27,
                    'title': 'TO'
                },
                {
                    'id': 28,
                    'title': 'IN'
                }
            ],
            table_language: {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Mostrando _MENU_ Registros",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar ",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            }
        };
        return {
            config: config,
            $get: function () {
                return config;
            }
        };
    }]);
