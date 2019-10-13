angular
    .module('managerApp')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'OAuthProvider', 'OAuthTokenProvider', 'appConfigProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider) {

            $httpProvider.interceptors.push('oauthFixInterceptor');

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'views/templates/full.html',
                    authenticate: true,
                    params: {
                        selectedFlights: null
                    }
                })
                .state('app.home', {
                    url: '/',
                    templateUrl: 'views/dashboard/index.html',
                    authenticate: true,
                    controller: 'DashboardCtrl'
                })
                .state('app.dashboard-markup', {
                    url: '/dashboard/markup',
                    templateUrl: 'views/dashboard/index-markup.html',
                    authenticate: true,
                    controller: 'DashboardMarkupCtrl'
                })
                .state('app.info', {
                    url: '/info',
                    templateUrl: 'views/dashboard/info.html',
                    authenticate: true,
                    controller: 'InfoCtrl'
                })
                .state('appSimple', {
                    abstract: true,
                    templateUrl: 'views/templates/simple.html',
                    authenticate: false,
                    params: { version: appConfigProvider.config.version }
                });
            // Additional Pages
            $stateProvider
                .state('appSimple.login', {
                    url: '/login',
                    templateUrl: 'views/autentication/login.html',
                    authenticate: false,
                    controller: 'LoginCtrl',
                    params: { version: appConfigProvider.config.version }
                })
                .state('appSimple.logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl',
                })
                .state('appSimple.reset', {
                    url: '/password/reset',
                    controller: 'PasswordResetEmailCtrl',
                    templateUrl: 'views/autentication/password-reset-email.html'
                })
                .state('appSimple.password', {
                    url: '/password/:token',
                    controller: 'PasswordResetCtrl',
                    templateUrl: 'views/autentication/password-reset.html'
                })
                .state('app.404', {
                    url: '/404',
                    templateUrl: 'views/404.html'
                })
                .state('app.500', {
                    url: '/500',
                    templateUrl: 'views/500.html'
                });
            //Dashboard
            $stateProvider
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/index.html',
                    authenticate: true,
                    controller: 'DashboardCtrl'
                });
            //Search
            $stateProvider
                .state('app.search', {
                    url: '/search',
                    templateUrl: 'views/search/index.html',
                    authenticate: true,
                    controller: 'SearchGroupCtrl',
                    params: { search: null }
                })
                .state('app.search-show', {
                    url: '/search/:id',
                    controller: 'SearchShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/search/show.html'
                })
                .state('app.search-group-show', {
                    url: '/search-groups/:id',
                    controller: 'SearchGroupShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/search/groupShow.html'
                });

            //Op
            $stateProvider
                .state('app.op', {
                    url: '/op',
                    templateUrl: 'views/op/index.html',
                    authenticate: true,
                    controller: 'OpCtrl'
                })
                .state('app.op-show', {
                    url: '/op/:id',
                    controller: 'OpShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/op/show.html'
                })
                .state('app.report-op-archived', {
                    url: '/op-archived',
                    controller: 'ReportOpArchivedCtrl',
                    authenticate: true,
                    templateUrl: 'views/reportOpArchived/index.html'
                });
            //Emission
            $stateProvider
                .state('app.emission', {
                    url: '/emission',
                    controller: 'EmissionCtrl',
                    authenticate: true,
                    templateUrl: 'views/emission/index.html'
                })
                .state('app.reembolso', {
                    url: '/reembolso',
                    controller: 'ReembolsoCtrl',
                    authenticate: true,
                    templateUrl: 'views/reembolso/index.html'
                })
                //.state('app.emission-create', {
                //    url: '/emission/create',
                //    controller: 'EmissionCreateCtrl',
                //    authenticate: true,
                //    templateUrl: 'views/emission/form.html'
                //})
                .state('app.emission-edit', {
                    url: '/emission/:id/edit',
                    controller: 'EmissionEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/emission/edit.html'
                })
                .state('app.emission-show', {
                    url: '/emission/:id',
                    controller: 'EmissionShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/emission/show.html'
                })
                .state('app.emission-statistics', {
                    url: '/emission-statistics',
                    controller: 'EmissionStatisticsCtrl',
                    authenticate: true,
                    templateUrl: 'views/emission/statistics.html'
                });
            //Check-in
            $stateProvider
                .state('app.check-in', {
                    url: '/check-in',
                    controller: 'CheckInCtrl',
                    templateUrl: 'views/check-in/index.html',
                    params: { search: null }
                });
            //Card

            $stateProvider
                .state('app.conciliation', {
                    url: '/conciliation',
                    controller: 'ConciliationCtrl',
                    templateUrl: 'views/conciliation/index.html'
                })
                .state('app.conciliation-show', {
                    url: '/conciliation/show',
                    controller: 'ConciliationShowCtrl',
                    templateUrl: 'views/conciliation/tables/response-show.html',
                    params: { responseData: false }
                });

            $stateProvider
                .state('app.card', {
                    url: '/card',
                    controller: 'CardCtrl',
                    templateUrl: 'views/card/index.html'
                })
                .state('app.card-create', {
                    url: '/card/create',
                    controller: 'CardCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/card/form.html'
                })
                .state('app.card-edit', {
                    url: '/card/:id/edit',
                    controller: 'CardEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/card/form.html'
                })
                .state('app.card-show', {
                    url: '/card/:id',
                    controller: 'CardShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/card/show.html'
                })
                .state('app.card-statement', {
                    url: '/card/:id/statement',
                    controller: 'CardStatementCtrl',
                    templateUrl: 'views/card/statement.html'
                });

            $stateProvider
                .state('app.cardflags', {
                    url: '/cardflags',
                    controller: 'CardFlagsCtrl',
                    authenticate: true,
                    templateUrl: 'views/cardflags/index.html'
                })
                .state('app.cardflags-create', {
                    url: '/cardflags/create',
                    controller: 'CardFlagsCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/cardflags/form.html'
                })
                .state('app.cardflags-show', {
                    url: '/cardflags/:id',
                    controller: 'CardFlagsShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/cardflags/show.html'
                })
                .state('app.cardflags-edit', {
                    url: '/cardflags/:id/edit',
                    controller: 'CardFlagsEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/cardflags/form.html'
                });
            //User
            $stateProvider
                .state('app.user', {
                    url: '/user',
                    //controller: 'UserCtrl',
                    authenticate: true,
                    templateUrl: 'views/user/index.html'
                })
                .state('app.user-create', {
                    url: '/user/create/:id',
                    controller: 'UserCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/user/form.html'
                })
                .state('app.user-edit', {
                    url: '/user/:id/edit',
                    controller: 'UserEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/user/form.html'
                })
                .state('app.user-show', {
                    url: '/user/:id',
                    controller: 'UserShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/user/show.html'
                });
            //Agency
            $stateProvider
                .state('app.agency', {
                    url: '/agency',
                    controller: 'AgencyCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/index.html'
                })
                .state('app.agency-create', {
                    url: '/agency/create',
                    controller: 'AgencyCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/form.html'
                })
                .state('app.agency-edit', {
                    url: '/agency/:id/edit',
                    controller: 'AgencyEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/form.html'
                })
                .state('app.agency-show', {
                    url: '/agency/:id',
                    controller: 'AgencyShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/show.html'
                })
                .state('app.agency-show-financial', {
                    url: '/agency/financial/:id',
                    controller: 'AgencyEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/show-financial.html'
                })
                .state('app.agency-employee', {
                    url: '/agency/employee/:id',//:id - agency id
                    controller: 'EmployeeCtrl',
                    authenticate: true,
                    templateUrl: 'views/employee/index.html'
                })
                .state('app.agency-cpf', {
                    url: '/agency/cpf/:cpf',
                    controller: 'AgencyShowCpfCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/show-cpf.html'
                })
                .state('app.agency-cnpj', {
                    url: '/agency/cnpj/:cnpj',
                    controller: 'AgencyShowCnpjCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/show-cnpj.html'
                }).state('app.agency-financial', {
                    url: '/showfinancial/:id',
                    controller: 'AgencyEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/agency/show-financial.html'
                });
            $stateProvider
                .state('app.invoice-bank-transfer', {
                    url: '/invoice-bank-transfer',
                    controller: 'InvoiceBankTransferCtrl',
                    authenticate: true,
                    templateUrl: 'views/invoice/invoice-bank-transfer.html'
                }).state('app.invoice-billet', {
                    url: '/invoice-billet',
                    controller: 'InvoiceBilletCtrl',
                    authenticate: true,
                    templateUrl: 'views/invoice/invoice-billet.html'
                }).state('app.invoice-cielo-credit', {
                    url: '/invoice-cielo-credit/',
                    controller: 'InvoiceCieloCreditCtrl',
                    authenticate: true,
                    templateUrl: 'views/invoice/invoice-cielo-credit.html'
                }).state('app.invoice-cielo-debit', {
                    url: '/invoice-cielo-debit',
                    controller: 'InvoiceCieloDebitCtrl',
                    authenticate: true,
                    templateUrl: 'views/invoice/invoice-cielo-debit.html'
                }).state('app.invoice-pagseguro', {
                    url: '/invoice-pagseguro',
                    controller: 'InvoicePagSeguroCtrl',
                    authenticate: true,
                    templateUrl: 'views/invoice/invoice-pagseguro.html'
                });

            /*   Bank Accoount */
            $stateProvider
                .state('app.bank-account', {
                    url: '/bank-account',
                    controller: 'BankAccountCtrl',
                    authenticate: true,
                    templateUrl: 'views/bank-account/index.html'
                })
                .state('app.bank-account-edit', {
                    url: '/bank-account/:id/edit',
                    controller: 'BankAccountEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/bank-account/form.html'
                })
                .state('app.bank-account-create', {
                    url: '/bank-account/create/',
                    controller: 'BankAccountCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/bank-account/form.html'
                })
                .state('app.bank-account-show', {
                    url: '/bank-account/:id',
                    controller: 'BankAccountShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/bank-account/show.html'
                })
                .state('app.bank-account-movement', {
                    url: '/bank-account/movement/:id',
                    controller: 'BankAccountMovementCtrl',
                    authenticate: true,
                    templateUrl: 'views/bank-account/movement.html'

                });

            /*   Accounts Paid */
            $stateProvider
                .state('app.account-paid', {
                    url: '/account-paid',
                    controller: 'AccountPaidCtrl',
                    authenticate: true,
                    templateUrl: 'views/account-paid/index.html'
                })
                .state('app.account-paid-create', {
                    url: '/account-paid/create/:id',
                    controller: 'AccountPaidCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/account-paid/form.html'
                })
                .state('app.account-paid-type', {
                    url: '/account-paid-type',
                    controller: 'AccountPaidTypeCtrl',
                    authenticate: true,
                    templateUrl: 'views/account-paid/type.html'
                })
                .state('app.account-paid-type-create', {
                    url: '/account-paid-type/create/:id',
                    controller: 'AccountPaidTypeCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/account-paid/form-type.html'
                });

            /*   Accounts Received*/
            $stateProvider
                .state('app.account-received', {
                    url: '/account-received',
                    controller: 'AccountReceivedCtrl',
                    authenticate: true,
                    templateUrl: 'views/account-received/index.html'
                });

            //Markup
            $stateProvider
                .state('app.markup', {
                    url: '/markup/:id',//id from company
                    controller: 'MarkupCtrl',
                    authenticate: true,
                    templateUrl: 'views/markup/index.html'
                })
                .state('app.markup-edit', {
                    url: '/markup/:id/edit',
                    controller: 'MarkupEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/markup/form.html'
                });
            //RefundFares
            $stateProvider
                .state('app.refund-fares', {
                    url: '/refund-fares/:id',//id from company
                    controller: 'RefundFaresCtrl',
                    authenticate: true,
                    templateUrl: 'views/refund-fares/index.html'
                });

            //PriceMarkup
            $stateProvider
                .state('app.price-markup', {
                    url: '/price-markup/:id',//id from company
                    authenticate: true,
                    templateUrl: 'views/price-markup/index.html'
                });

            //TravelMarkup
            $stateProvider
                .state('app.travel-markup', {
                    url: '/travel-markup/:id',//id from company
                    authenticate: true,
                    templateUrl: 'views/travel-markup/index.html'
                });

            //webSystem
            $stateProvider
                .state('app.web-system', {
                    url: '/web-system',
                    authenticate: true,
                    templateUrl: 'views/web-system/index.html'
                })
                .state('app.web-system-edit', {
                    url: '/web-system-edit/:id',
                    controller: 'WebSystemEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/web-system/edit.html'
                });

            //InboxMail
            $stateProvider
                .state('app.inbox-mail', {
                    url: '/inbox-mail/:id',//id from emails
                    controller: 'InboxMailCtrl',
                    authenticate: true,
                    templateUrl: 'views/inbox-mail/index.html'
                });
            //Company
            $stateProvider
                .state('app.company', {
                    url: '/company',
                    controller: 'CompanyCtrl',
                    authenticate: true,
                    templateUrl: 'views/company/index.html'
                })
                .state('app.company-create', {
                    url: '/company/create',
                    controller: 'CompanyCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/company/form.html'
                })
                .state('app.company-edit', {
                    url: '/company/:id/edit',
                    controller: 'CompanyEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/company/form.html'
                })
                .state('app.company-show', {
                    url: '/company/:id',
                    controller: 'CompanyShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/company/show.html'
                });


            //Balance
            $stateProvider
                .state('app.balance', {
                    url: '/balance',
                    controller: 'BalanceCtrl',
                    authenticate: true,
                    templateUrl: 'views/balance/index.html'
                })
                .state('app.balance-edit', {
                    url: '/balance/:id/edit',
                    controller: 'BalanceEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/balance/form.html'
                })
                .state('app.balance-show', {
                    url: '/balance/:id',
                    controller: 'BalanceShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/balance/show.html'
                });

            //Adjustment
            $stateProvider
                .state('app.adjustment', {
                    url: '/adjustment/:id',//Company ID
                    //controller: 'AdjustmentCtrl',
                    authenticate: true,
                    templateUrl: 'views/adjustment/index.html'
                });


            //Airport
            $stateProvider
                .state('app.airport', {
                    url: '/airport',
                    controller: 'AirportCtrl',
                    authenticate: true,
                    templateUrl: 'views/airport/index.html'
                })
                .state('app.airport-create', {
                    url: '/airport/create',
                    controller: 'AirportCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/airport/form.html'
                })
                .state('app.airport-edit', {
                    url: '/airport/:id/edit',
                    controller: 'AirportEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/airport/form.html'
                })
                .state('app.airport-show', {
                    url: '/airport/:id',
                    controller: 'AirportShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/airport/show.html'
                });
            //Api
            $stateProvider
                .state('app.api-statistic', {
                    url: '/api-statistic',
                    controller: 'ApiStatisticCtrl',
                    templateUrl: 'views/api/statistic.html'
                });

            //Api Config
            $stateProvider
                .state('app.api-config', {
                    url: '/api-config',
                    controller: 'ApiConfigCtrl',
                    templateUrl: 'views/api-config/index.html'
                });

            //Group
            $stateProvider
                .state('app.group', {
                    url: '/group',
                    controller: 'GroupCtrl',
                    authenticate: true,
                    templateUrl: 'views/group/index.html'
                })
                .state('app.group-create', {
                    url: '/group/create',
                    controller: 'GroupCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/group/form.html'
                })
                .state('app.group-edit', {
                    url: '/group/:id/edit',
                    controller: 'GroupEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/group/form.html'
                })
                .state('app.group-show', {
                    url: '/group/:id',
                    controller: 'GroupShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/group/show.html'
                });
            //wallet
            $stateProvider
                .state('app.wallet', {
                    url: '/wallet',
                    controller: 'WalletCtrl',
                    authenticate: true,
                    templateUrl: 'views/wallet/index.html'
                })
                .state('app.wallet-create', {
                    url: '/wallet/create',
                    controller: 'WalletCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/wallet/form.html'
                })
                .state('app.wallet-edit', {
                    url: '/wallet/:id/edit',
                    controller: 'WalletEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/wallet/form.html'
                })
                .state('app.wallet-show', {
                    url: '/wallet/:id',
                    controller: 'WalletShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/wallet/show.html'
                });
            //Role
            $stateProvider
                .state('app.role', {
                    url: '/role',
                    controller: 'RoleCtrl',
                    authenticate: true,
                    templateUrl: 'views/role/index.html'
                })
                .state('app.role-create', {
                    url: '/role/create',
                    controller: 'RoleCreateCtrl',
                    authenticate: true,
                    templateUrl: 'views/role/form.html'
                })
                .state('app.role-edit', {
                    url: '/role/:id/edit',
                    controller: 'RoleEditCtrl',
                    authenticate: true,
                    templateUrl: 'views/role/form.html'
                })
                .state('app.role-show', {
                    url: '/role/:id',
                    controller: 'RoleShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/role/show.html'
                });
            //MailConfig
            $stateProvider
                .state('app.email-config', {
                    url: '/email-config',
                    controller: 'EmailConfigCtrl',
                    templateUrl: 'views/email-config/index.html'
                })
                .state('app.email-config-create', {
                    url: '/email-config/create',
                    controller: 'EmailConfigCreateCtrl',
                    templateUrl: 'views/email-config/form.html'
                })
                .state('app.email-config-edit', {
                    url: '/email-config/:id/edit',
                    controller: 'EmailConfigEditCtrl',
                    templateUrl: 'views/email-config/form.html'
                })
                .state('app.email-config-show', {
                    url: '/email-config/:id',
                    controller: 'EmailConfigShowCtrl',
                    templateUrl: 'views/email-config/show.html'
                });
            //MailAccount
            $stateProvider
                .state('app.email-account', {
                    url: '/email-account',
                    controller: 'EmailAccountCtrl',
                    templateUrl: 'views/email-account/index.html'
                })
                .state('app.email-account-create', {
                    url: '/email-account/create',
                    controller: 'EmailAccountCreateCtrl',
                    templateUrl: 'views/email-account/form.html'
                })
                .state('app.email-account-edit', {
                    url: '/email-account/:id/edit',
                    controller: 'EmailAccountEditCtrl',
                    templateUrl: 'views/email-account/form.html'
                })
                .state('app.email-account-show', {
                    url: '/email-account/:id',
                    controller: 'EmailAccountShowCtrl',
                    templateUrl: 'views/email-account/show.html'
                });
            //templates
            $stateProvider
                .state('app.template', {
                    url: '/template',
                    controller: 'TemplateCtrl',
                    templateUrl: 'views/template/index.html'
                })
                .state('app.template-create', {
                    url: '/template/create',
                    controller: 'TemplateCreateCtrl',
                    templateUrl: 'views/template/form.html'
                })
                .state('app.template-edit', {
                    url: '/template/:id/edit',
                    controller: 'TemplateEditCtrl',
                    templateUrl: 'views/template/form.html'
                });
            /*.state('app.templates-show', {
                url: '/template/:id',
                controller: 'TemplateShowCtrl',
                templateUrl: 'views/template/show.html'
            });*/
            //campaigns
            $stateProvider
                .state('app.campaign', {
                    url: '/campaign',
                    controller: 'CampaignCtrl',
                    templateUrl: 'views/campaign/index.html'
                })
                .state('app.campaign-create', {
                    url: '/campaign/create',
                    controller: 'CampaignCreateCtrl',
                    templateUrl: 'views/campaign/form.html'
                })
                .state('app.campaign-edit', {
                    url: '/campaign/:id/edit',
                    controller: 'CampaignEditCtrl',
                    templateUrl: 'views/campaign/form.html'
                })
                .state('app.campaign-show', {
                    url: '/campaign/:id',
                    controller: 'CampaignShowCtrl',
                    templateUrl: 'views/campaign/show.html'
                });
            //Emission Request
            $stateProvider
                .state('app.emission-request', {
                    url: '/emission-request',
                    controller: 'EmissionRequestCtrl',
                    templateUrl: 'views/emission-request/index.html'
                })
                .state('app.emission-request-edit', {
                    url: '/emission-request/:id/edit',
                    controller: 'EmissionRequestEditCtrl',
                    templateUrl: 'views/emission-request/edit.html'
                });
            //Report
            $stateProvider
                .state('app.report', {
                    url: '/report',
                    templateUrl: 'views/report/index.html',
                    authenticate: true,
                    controller: 'ReportAgencyCtrl'
                });
            //Email-message
            $stateProvider
                .state('app.email-message', {
                    url: '/email-message',
                    controller: 'EmailMessageCtrl',
                    templateUrl: 'views/email-message/index.html'
                });
            //Emails
            $stateProvider
                .state('app.emails', {
                    url: '/emails',
                    controller: 'EmailsCtrl',
                    templateUrl: 'views/emails/index.html'
                });
            //Report-log
            $stateProvider
                .state('app.report-log', {
                    url: '/report-log',
                    controller: 'ReportEmissionCtrl',
                    templateUrl: 'views/report-log/index.html'
                });
            //Financial
            $stateProvider
                .state('app.financial-payable', {
                    url: '/financial/payable',
                    templateUrl: 'views/financial/payable.html',
                    authenticate: true,
                    controller: 'FinancialPayableCtrl'
                })
                .state('app.financial-remittance-return', {
                    url: '/financial/remittance-return',
                    templateUrl: 'views/financial/remittance-return.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReturnCtrl'
                })
                .state('app.financial-remittance', {
                    url: '/financial/remittance',
                    templateUrl: 'views/financial/remittance.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceCtrl'
                })
                .state('app.financial-payments', {
                    url: '/financial/payments',
                    templateUrl: 'views/financial/payments.html',
                    authenticate: true,
                    controller: 'FinancialPaymentsCtrl'
                })
                .state('app.financial-remittance-view', {
                    url: '/financial/remittance/:id',
                    templateUrl: 'views/financial/remittance-view.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceCtrl'
                })
                .state('app.financial-remittance-return-view', {
                    url: '/financial/remittance-return/:id',
                    templateUrl: 'views/financial/remittance-return-view.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReturnCtrl'
                })
                .state('app.agencies-to-invoice', {
                    url: '/agencies/to-invoice',
                    templateUrl: 'views/agency/to-invoice.html',
                    authenticate: true,
                    controller: 'AgencyToInvoiceCtrl'
                })
                .state('app.agency-to-invoice', {
                    url: '/agency/to-invoice/:id',
                    templateUrl: 'views/agency/to-invoice-view.html',
                    authenticate: true,
                    controller: 'AgencyToInvoiceCtrl'
                })
                .state('app.emission-to-invoice', {
                    url: '/agency/emission-to-invoice/:id',
                    templateUrl: 'views/agency/emission-to-invoice-view.html',
                    authenticate: true,
                    controller: 'EmissionToInvoiceCtrl'
                })
                .state('app.financial-receipts', {
                    url: '/financial/receipts',
                    templateUrl: 'views/financial/receipts.html',
                    authenticate: true,
                    controller: 'FinancialReceiptsCtrl'
                })
                .state('app.financial-remittance-receipts', {
                    url: '/financial/remittance-receipts',
                    templateUrl: 'views/financial/remittance-receipts.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReceiptsCtrl'
                })
                .state('app.financial-remittance-receipts-view', {
                    url: '/financial/remittance-receipts/:id',
                    templateUrl: 'views/financial/remittance-receipts-view.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReceiptsCtrl'
                })
                .state('app.receipts-view', {
                    url: '/financial/receipts-view/:id',
                    templateUrl: 'views/invoice/tables/receipts-view.html',
                    authenticate: true,
                    controller: 'EmissionByInvoiceCtrl'
                })
                .state('app.financial-remittance-return-receipts', {
                    url: '/financial/remittance-return-receipts',
                    templateUrl: 'views/financial/remittance-return-receipts.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReturnReceiptsCtrl'
                })
                .state('app.financial-remittance-return-receipts-view', {
                    url: '/financial/remittance-return-receipts/:id',
                    templateUrl: 'views/financial/remittance-return-receipts-view.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReturnReceiptsCtrl'
                })
                .state('app.financial-remittance-return-receipts-detail', {
                    url: '/financial/remittance-return-receipts/details/:id',
                    templateUrl: 'views/financial/remittance-return-receipts-detail.html',
                    authenticate: true,
                    controller: 'FinancialRemittanceReturnReceiptsCtrl'
                });

            // Commercial
            $stateProvider
                .state('app.commercial-goals', {
                    url: '/commercial-goals',
                    templateUrl: 'views/commercial-goals/index.html',
                    authenticate: true,
                    controller: 'CommercialGoalsCtrl'
                })
                .state('app.commercial-goals-create', {
                    url: '/commercial-goals/create',
                    templateUrl: 'views/commercial-goals/form.html',
                    authenticate: true,
                    controller: 'CommercialGoalsCreateCtrl'
                })
                .state('app.commercial-goals-edit', {
                    url: '/commercial-goals/edit/:id',
                    templateUrl: 'views/commercial-goals/form.html',
                    authenticate: true,
                    controller: 'CommercialGoalsEditCtrl'
                });



            //Refund
            $stateProvider
                .state('app.refund', {
                    url: '/refund',
                    templateUrl: 'views/refund/index.html',
                    authenticate: true,
                    controller: 'RefundCtrl'
                })
                .state('app.refund-show', {
                    url: '/refund/:id',
                    controller: 'RefundShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/refund/show.html'
                });

            //Coupon
            $stateProvider
                .state('app.coupon', {
                    url: '/coupon',
                    templateUrl: 'views/coupon/index.html',
                    authenticate: true,
                    controller: 'CouponCtrl'
                })
                .state('app.coupon-show', {
                    url: '/coupon/:id',
                    controller: 'CouponShowCtrl',
                    authenticate: true,
                    templateUrl: 'views/coupon/show.html'
                });

            //E-Invoice
            $stateProvider
                .state('app.electronic-service-invoice', {
                    url: '/electronic-service-invoice',
                    templateUrl: 'views/electronic-service-invoice/index.html',
                    authenticate: true,
                    controller: 'ElectronicServiceInvoiceCtrl'
                })
                .state('app.electronic-service-invoice-agency', {
                    url: '/electronic-service-invoice/agency',
                    templateUrl: 'views/electronic-service-invoice/agencies.html',
                    authenticate: true,
                    controller: 'ElectronicServiceInvoiceAgencyCtrl'
                })
                .state('app.electronic-service-invoice-show', {
                    url: '/electronic-service-invoice/:id',
                    templateUrl: 'views/electronic-service-invoice/show.html',
                    authenticate: true,
                    controller: 'ElectronicServiceInvoiceShowCtrl'
                })
                .state('app.electronic-service-invoice-agency-show', {
                    url: '/electronic-service-invoice/agency/:id/show',
                    templateUrl: 'views/electronic-service-invoice/agency-show.html',
                    authenticate: true,
                    controller: 'ElectronicServiceInvoiceAgencyShowCtrl'
                });

            // Unified List of Invoices
            $stateProvider
                .state('app.unified-invoices-list', {
                    url: '/unified-invoices-list',
                    templateUrl: 'views/unified-invoices/index.html',
                    authenticate: true,
                    controller: 'UnifiedInvoicesCtrl'
                });


            //Contacts
            $stateProvider
                .state('app.contacts', {
                    url: '/contacts',
                    controller: 'ContactCtrl',
                    authenticate: true,
                    templateUrl: 'views/contacts/index.html'
                });

        }]);