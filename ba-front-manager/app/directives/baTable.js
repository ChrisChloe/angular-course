/**
 * Table Directive
 */
angular
    .module('app.directives')
    .directive('baTable', ['appConfig', '$rootScope', '$location', function (appConfig, $rootScope, $location) {

        return {
            restrict: 'E',
            templateUrl: 'views/table.html',
            transclude: {
                'header': '?baTableHeader',
                'body': 'baTableBody',
                'footer': '?baTableFooter'
            },
            scope: {
                id: '=?baTableId',//To filter two table on a single controller
                resource: '=baTableResource',
                resourceFunction: '=?baTableResourceFunction',
                items: '=baTableItems',
                filterCriteria: '=?baTableFilterCriteria',
                disablePagination: '=?baTableDisablePagination',
                disabledPagination: '=?baTableDisabledPagination',
                disableSearch: '=?baTableDisableSearch',
                paginationTitle: '=?baTablePaginationTitle',
                paginationMaxSize: '=?baTablePaginationMaxSize',
                disableEntries: '=?baTableDisableEntries',
                textAlign: '=?baTableTextAlign',
                //Callbacks @todo:implement
                changeCallback: '=?baTableOnChange',
                searchCallback: '=?baTableOnSearch',
                sortCallback: '=?baTableOnSort',
                //refresh:          '=?baTableRefresh',
            },
            controller: ["$scope", function ($scope) {

                //$scope.search         = {};
                //$scope.search.search  = $location.search().search;
                //
                //$scope.search = $scope.search || {};
                //$scope.search.search  = $scope.search.search || $location.search().search;
                //
                //if($scope.filterCriteria && $scope.filterCriteria.getParams()){
                //    $scope.search                = $scope.search || {};
                //    $scope.filterCriteria.search = $scope.filterCriteria.search || $location.search().search;
                //    $scope.search.search         = $scope.filterCriteria.search || $location.search().search;
                //}

                //event from directive baTableSort
                $scope.$on("onSort", function (event, orderby, sortedby) {
                    $scope.filterCriteria.orderBy = orderby;
                    $scope.filterCriteria.sortedBy = sortedby;
                    $scope.filterCriteria.page = 1;
                    $scope.list($scope.filterCriteria);
                });

                $scope.$on("onRefresh", function (event, search) {
                    $scope.list($scope.filterCriteria);
                });

                //event from directive baTableSort
                $scope.$on($scope.id ? 'onSearch' + $scope.id : 'onSearch', function (event, search) {

                    if (search) {

                        $scope.filterCriteria.search = search.search;

                        /*--advanced-search-params--*/
                        if (search.title) {
                            $scope.filterCriteria.addParam('title', search.title, true);
                        } else {
                            $scope.filterCriteria.removeParam('title');
                        }
                        
                        if (search.cpf_cnpj) {
                            $scope.filterCriteria.addParam('cpf_cnpj', search.cpf_cnpj, true);
                        } else {
                            $scope.filterCriteria.removeParam('cpf_cnpj');
                        }
                        
                        if (search.phone) {
                            $scope.filterCriteria.addParam('phone', search.phone, true);
                        } else {
                            $scope.filterCriteria.removeParam('phone');
                        }   

                        if (search.email) {
                            $scope.filterCriteria.addParam('email', search.email, true);
                        } else {
                            $scope.filterCriteria.removeParam('email');
                        } 
                        
                        if (search.cep) {
                            $scope.filterCriteria.addParam('cep', search.cep, true);
                        } else {
                            $scope.filterCriteria.removeParam('cep');
                        } 





                        //@todo:refatorar
                        if (search.group) {
                            $scope.filterCriteria.addParam('group', search.group, true);
                        } else {
                            $scope.filterCriteria.removeParam('group');
                        }

                        if (search.archived_reason) {
                            $scope.filterCriteria.addParam('archived_reason', search.archived_reason, true);
                        } else {
                            $scope.filterCriteria.removeParam('archived_reason');
                        }

                        if (search.region) {
                            $scope.filterCriteria.addParam('region', search.region, true);
                        } else {
                            $scope.filterCriteria.removeParam('region');
                        }

                        if (search.from) {
                            $scope.filterCriteria.addParam('from', search.from, true);
                        } else {
                            $scope.filterCriteria.removeParam('from');
                        }
                        if (search.to) {
                            $scope.filterCriteria.addParam('to', search.to, true);
                        } else {
                            $scope.filterCriteria.removeParam('to');
                        }
                        if (search.min_time) {
                            $scope.filterCriteria.addParam('min_time', search.min_time, true);
                        } else {
                            $scope.filterCriteria.removeParam('min_time');
                        }
                        if (search.max_time) {
                            $scope.filterCriteria.addParam('max_time', search.max_time, true);
                        } else {
                            $scope.filterCriteria.removeParam('max_time');
                        }

                        if (search.type) {
                            $scope.filterCriteria.addParam('type', search.type, true);
                        } else {
                            $scope.filterCriteria.removeParam('type');
                        }

                        if (search.min_birthday) {
                            $scope.filterCriteria.addParam('min_birthday', search.min_birthday, true);
                        } else {
                            $scope.filterCriteria.removeParam('min_birthday');
                        }

                        if (search.max_birthday) {
                            $scope.filterCriteria.addParam('max_birthday', search.max_birthday, true);
                        } else {
                            $scope.filterCriteria.removeParam('max_birthday');
                        }

                        if (search.company) {
                            $scope.filterCriteria.addParam('company', search.company, true);
                        } else {
                            $scope.filterCriteria.removeParam('company');
                        }

                        if (search.status || search.status === 0) {
                            $scope.filterCriteria.addParam('status', search.status, true);
                        } else {
                            $scope.filterCriteria.removeParam('status');
                        }

                        if (search.gateway_type || search.gateway_type === 0) {
                            $scope.filterCriteria.addParam('gateway_type', search.gateway_type, true);
                        } else {
                            $scope.filterCriteria.removeParam('gateway_type');
                        }

                        if (search.payment_type || search.payment_type === 0) {
                            $scope.filterCriteria.addParam('payment_type', search.payment_type, true);
                        } else {
                            $scope.filterCriteria.removeParam('payment_type');
                        }

                        if (search.agency_status || search.agency_status === 0) {
                            $scope.filterCriteria.addParam('agency_status', search.agency_status, true);
                        } else {
                            $scope.filterCriteria.removeParam('agency_status');
                        }

                        if (search.provider_name) {
                            $scope.filterCriteria.addParam('provider_name', search.provider_name, true);
                        } else {
                            $scope.filterCriteria.removeParam('provider_name');
                        }

                        if (search.provider_code) {
                            $scope.filterCriteria.addParam('provider_code', search.provider_code, true);
                        } else {
                            $scope.filterCriteria.removeParam('provider_code');
                        }

                        if (search.confirmation_code) {
                            $scope.filterCriteria.addParam('confirmation_code', search.confirmation_code, true);
                        } else {
                            $scope.filterCriteria.removeParam('confirmation_code');
                        }

                        if (search.checkin_code) {
                            $scope.filterCriteria.addParam('checkin_code', search.checkin_code, true);
                        } else {
                            $scope.filterCriteria.removeParam('checkin_code');
                        }

                        /**
                        * Start financial query params
                        **/
                        if (search.start_date) {
                            $scope.filterCriteria.addParam('start_date', search.start_date, true);
                        } else {
                            $scope.filterCriteria.removeParam('start_date');
                        }

                        if (search.end_date) {
                            $scope.filterCriteria.addParam('end_date', search.end_date, true);
                        } else {
                            $scope.filterCriteria.removeParam('end_date');
                        }

                        if (search.start_due_date) {
                            $scope.filterCriteria.addParam('start_due_date', search.start_due_date, true);
                        } else {
                            $scope.filterCriteria.removeParam('start_due_date');
                        }

                        if (search.end_due_date) {
                            $scope.filterCriteria.addParam('end_due_date', search.end_due_date, true);
                        } else {
                            $scope.filterCriteria.removeParam('end_due_date');
                        }

                        if (search.due_date_invoice) {
                            $scope.filterCriteria.addParam('due_date_invoice', search.due_date_invoice, true);
                            
                        } else {
                            $scope.filterCriteria.removeParam('due_date_invoice');
                        }

                        if (search.query) {
                            $scope.filterCriteria.addParam('query', search.query, true);
                        } else {
                            $scope.filterCriteria.removeParam('query');
                        }

                        if (search.status_id) {
                            $scope.filterCriteria.addParam('status_id', search.status_id, true);
                        } else {
                            $scope.filterCriteria.removeParam('status_id');
                        }

                        if (search.client_id) {
                            $scope.filterCriteria.addParam('client_id', search.client_id, true);
                        } else {
                            $scope.filterCriteria.removeParam('client_id');
                        }

                        if (search.bank_id) {
                            $scope.filterCriteria.addParam('bank_id', search.bank_id, true);
                        } else {
                            $scope.filterCriteria.removeParam('bank_id');
                        }

                        if (search.uf) {
                            $scope.filterCriteria.addParam('uf', search.uf, true);
                        } else {
                            $scope.filterCriteria.removeParam('uf');
                        }

                        /**
                        * End financial query params
                        **/

                        $scope.list($scope.filterCriteria);
                    }
                });

            }],
            link: function (scope, element, attrs, ctrl, transclude) {

                var Resource = scope.resource;
                var resourceFunction = scope.resourceFunction ? scope.resourceFunction : 'query';

                scope.listAmount = 0;

                if (!Resource) {
                    throw "Invalid resource";
                }

                if (!scope.items) {
                    throw "Invalid items";
                }

                //scope.items = scope.items ? scope.items : [];

                scope.pagination = scope.pagination ? scope.pagination : appConfig.pagination();
                scope.paginationMaxSize = scope.paginationMaxSize || 10;

                scope.filterCriteria = scope.filterCriteria ? scope.filterCriteria : appConfig.filterCriteria();


                scope.list = function (filterCriteria) {
                    scope.listAmount++;

                    //Show loading
                    $rootScope.$emit("showLoadingScreen", true);

                    //Search url or submit
                    if (scope.listAmount <= 1) {
                        scope.filterCriteria.search = scope.disableSearch ? null : scope.filterCriteria.search || $location.search().search;
                        scope.search = scope.disableSearch ? {} : scope.search || {};
                        scope.search.search = scope.filterCriteria.search;
                    }

                    if (scope.disableSearch) {
                        $location.search('search', '');
                    } else {
                        $location.search('search', scope.filterCriteria.search);
                    }

                    if (scope.disablePagination) {
                        scope.filterCriteria.addParam('limit', 999999999999, true);
                    }

                    Resource[resourceFunction](filterCriteria.getParams(), filterCriteria.id ? { id: filterCriteria.id } : {},
                        function success(response) {

                            $rootScope.$emit("showLoadingScreen", false);

                            if (scope.items) {
                                scope.items.splice(0, scope.items.length);
                            }

                            if (response.data instanceof Array) {
                                response.data.forEach(function (item) {
                                    scope.items.push(item);
                                });
                            }else{
                                scope.items = response.data;
                            }


                            if (!response.meta || !response.meta.pagination) {
                                throw "Invalid meta pagination!";
                            }

                            if (scope.disablePagination) {
                                scope.pagination.totalItems = 999999999999;
                                scope.pagination.currentPage = 1;
                                scope.pagination.itemsPerPage = 999999999999;
                            } else {
                                scope.pagination.totalItems = response.meta.pagination.total;
                                scope.pagination.currentPage = response.meta.pagination.current_page;
                                if (!scope.pagination.itemsPerPage) {
                                    scope.pagination.itemsPerPage = response.meta.pagination.per_page;
                                }
                            }

                            if (scope.hasOwnProperty('changeCallback')) {
                                scope.changeCallback(scope.items);
                            }
                        }, function error(error) {
                            if(error.status === 403) {
                                $rootScope.$emit("routeAuthorizationDenied", error.data.message);
                            }
                        });
                };

                //Page changed callback
                scope.pageChanged = function (currentPage) {
                    scope.filterCriteria.page = currentPage;
                    scope.list(scope.filterCriteria);
                };

                //Show Entries changed callback
                scope.showEntries = function (itemsPerPage) {
                    scope.filterCriteria.limit = itemsPerPage;
                    scope.list(scope.filterCriteria);
                };

                //Filter search
                scope.filter = function (search) {
                    if (search) {
                        scope.filterCriteria.search = search.search;
                    }
                    scope.list(scope.filterCriteria);
                };

                scope.list(scope.filterCriteria);

                //event from directive baTableSort
                scope.$on("onRefresh", function () {
                    scope.list(scope.filterCriteria);
                });

            }
        };
    }]);
