/**
 * Dashboard Service
 */
angular
    .module("app.services")
    .service('Dashboard', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/dashboards', null,
                {
                    'markup': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/markup'
                    },
                    'opCountStatus': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/chart-op-count-status'
                    },
                    'userCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/user-count'
                    },
                    'agencyCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/agency-count'
                    },
                    'opCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/op-count'
                    },
                    'boardingCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/boarding-count'
                    },
                    'searchCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/search-count'
                    },
                    'agencyCountList': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/agency-count-list'
                    },
                    'emissionStatistics': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/emission-statistics'
                    },
                    'specificSearchCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/agency/search-count'
                    },
                    'specificOpCount': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/dashboards/agency/op-count'
                    }
                });
        }]);
