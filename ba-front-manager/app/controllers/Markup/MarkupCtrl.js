/**
 * Markup index controller
 */
angular
    .module('app.controllers')
    .controller('MarkupCtrl', ['$scope', '$state', 'appConfig', 'Markup', 'Company', 'Agency', 'Airport', 'Group', 'toastr',
        function ($scope, $state, appConfig, Markup, Company, Agency, Airport, Group, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = Markup;

            $scope.markups     = [];
            $scope.agencies    = [];
            $scope.airports    = [];
            $scope.groups      = [];

            $scope.markupTypes = [];
            $scope.markupCalculationTypes = [];

            $scope.markup      = null;
            $scope.company     = null;

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('orderBy', 'type', true);
                $scope.filterCriteria.addParam('sortedBy','asc', true);

                $scope.markupTypes = appConfig.markupTypes;
                $scope.markupCalculationTypes = appConfig.markupCalculationTypes;
                $scope.markup      = new Markup();

                Company.get({id: companyId},
                    function success(data) {
                        $scope.company = data.data;
                    });

                $scope.$on("itemRestored", function (event, markup) {
                    $scope.markups.push(markup);
                });
            };

            //Markup Add
            $scope.save = function (markup) {
                markup.company_id = $scope.company.id;

                if(markup.expiration){
                    markup.expiration = moment(markup.expiration).format('DD/MM/YYYY');
                }

                if(markup.type != 4){
                    markup.airport_id = null;
                    markup.agency_id  = null;
                }

                markup.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.markups.push(data.data);
                            markup = new Markup();
                            markup.type = 1;
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.trash = function (markup) {

                Markup.delete({id: markup.id}, markup,
                    function success(data) {
                        if (!data.error){
                            $scope.markups.splice($scope.markups.indexOf(markup), 1);
                            toastr.success("Enviado para Lixeira!");
                            $scope.$broadcast('itemTrashed', markup);
                        }
                    });
            };

            $scope.searchAirport = function(search){
                if(search && search.length){
                    Airport.query({limit: 20, search: search, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.airports = response.data;
                        }
                    );
                }else{
                    Airport.query({limit: 20, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.airports = response.data;
                        }
                    );
                }
            };

            $scope.searchAgency = function(search){
                if(search && search.length){
                    Agency.query({limit: 20, search: search, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.agencies = response.data;
                        }
                    );
                }else{
                    Agency.query({limit: 20, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.agencies = response.data;
                        }
                    );
                }
            };

            $scope.searchGroup = function(search){
                if(search && search.length){
                    Group.query({limit: 20, search: search, orderBy:'name', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.groups = response.data;
                        }
                    );
                }else{
                    Group.query({limit: 20, orderBy:'name', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.groups = response.data;
                        }
                    );
                }
            };

            $scope.getAirports = function(markup){

                if(markup.airport){
                    return markup.airport.initials;
                }else if(markup.origin || markup.destination){
                    return markup.origin.initials + ' ' + markup.destination.initials;
                }

                return '--';
            };

            init();
        }]);

