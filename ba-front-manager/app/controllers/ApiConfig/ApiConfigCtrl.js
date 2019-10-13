/**
 * Api config index controller
 */
-angular
    .module('app.controllers')
    .controller('ApiConfigCtrl', ['$scope', '$state', 'appConfig', 'Api', 'Company', 'Cache', 'toastr',
        function ($scope, $state, appConfig, Api, Company, Cache, toastr) {

            $scope.models = {
                selected: null,
                lists:    {}
            };

            $scope.apis = [];
            $scope.companies = [];

            $scope.caches = [];

            // Model to JSON for demo purpose
            $scope.$watch('models', function(model) {
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);

            var init = function () {
                Api.query({},{},
                    function success(response){

                        $scope.apis = response.data;

                        response.data.forEach(function(item){
                            $scope.models.lists[item.id] = item.companies;
                        });
                    });

                Company.query({},{},
                    function success(response){
                        $scope.companies = response.data;
                    });

                Cache.query({},{},
                    function success(response){
                        var caches = response.data;

                        if(caches){
                            addTimeFormattedField(caches);
                            $scope.caches = caches;
                        }
                    });
            };

            var addTimeFormattedField = function(caches){
                caches.forEach(function(cache){
                    cache.time_formated = moment.utc(cache.time).format("HH:mm:ss");
                });

                return caches;
            };

            $scope.saveCache = function(cache){

                cache.time = moment.duration(cache.time_formated).asMilliseconds();

                Cache.update({id: cache.id}, cache,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                        }
                    });
            };

            $scope.getName = function(id){
                var name = 'ND';
                $scope.apis.forEach(function(api){
                    if(api.id == id){
                        name = api.name;
                        return false;
                    }
                });
                return name;
            };

            var findCompanyApi = function(company){
                var apiId = -1;

                var func = function(c){
                    if(c.id == company.id){
                        apiId = id;
                        return false;
                    }
                };

                for(var id in $scope.models.lists){
                    if(apiId != -1){break;}
                    $scope.models.lists[id].forEach(func);
                }

                return parseInt(apiId);
            };

            $scope.changeCompanyApi = function(company, originApi){

                var actualApiId = findCompanyApi(company);

                if(actualApiId != -1 && originApi != actualApiId){

                    Api.config({}, {company_id:company.id, api_id:actualApiId},
                        function success(response){
                            if(response.data && !response.data.error){
                                toastr.success('Transferido com sucesso!');
                            }else{
                                toastr.error('Não foi possível transferir!');
                            }
                        });
                }

            };


            init();
        }]);
