/**
 * Campaign create controller
 */
angular
    .module('app.controllers')
    .controller('CampaignCreateCtrl', ['$scope', '$state', '$uibModal', 'appConfig', 'Campaign', 'Template', 'EmailAccount', 'toastr', 'Agency', 'User',
        function ($scope, $state, $uibModal, appConfig, Campaign, Template, EmailAccount, toastr, Agency, User) {

            $scope.filterCriteriaAgency = appConfig.filterCriteria();
            $scope.filterCriteriaUser = appConfig.filterCriteria();
            $scope.filterCriteriaTemplate = appConfig.filterCriteria();
            $scope.agency_status = appConfig.agency_status;
            $scope.user_status = appConfig.user_status;

            $scope.sendTypes = appConfig.sendTypes;
            $scope.regions = appConfig.region;
            $scope.states = appConfig.statesAndRegion;
            $scope.ufs = appConfig.ufs;

            $scope.title = "Nova campanha";
            $scope.sendGroupTitle = "Selecione o Grupo de Envio";
            $scope.campaign = {};
            $scope.templates = [];

            $scope.regionOption = '';
            $scope.regions_selected = [];
            $scope.statusOption = '';
            $scope.status_selected = [];
            $scope.stateOption = '';
            $scope.state_selected = [];

            $scope.selected = '';



            $scope.loadingTest = false;

            $scope.agencies = [];
            $scope.users = [];
            $scope.accounts = [];

            $scope.agenciesSelected = [];
            $scope.usersSelected = [];

            $scope.selectedAllAgencies = false;
            $scope.selectedAllUsers = false;

            // $scope.sendAllAgencies  = false;
            // $scope.sendAllUsers     = false;

            $scope.sendToUsers = false;
            $scope.sendToAgencies = false;

            $scope.resourceAgency = Agency;
            $scope.resourceUser = User;

            $scope.host = 0;
            $scope.changeHost = function (config) {
                $scope.host = config.id;
            };


            $scope.showTemplate = function (template) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationEnabled,
                    templateUrl: 'views/template/show.html',
                    controller: 'TemplateShowCtrl',
                    size: 'lg',
                    resolve: {
                        templateId: template
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });

            }

            $scope.selectedState = function () {
                if ($scope.state_selected.indexOf($scope.stateOption) === -1) {
                    $scope.state_selected.push($scope.stateOption);
                }

                var index = $scope.regions.indexOf($scope.regions.find(function(region) { return region.title === $scope.stateOption.region }));
                if(index >= 0) $scope.regions.splice(index, 1);

                $scope.stateOption = null;
            }

            $scope.deleteStateOption = function (select) {
                var index = $scope.state_selected.indexOf(select);
                $scope.state_selected.splice(index, 1);

                var stillHasSelectedRegion = $scope.state_selected.find(function(state) { return state.region === select.region })

                if(!stillHasSelectedRegion) {
                    $scope.regions.push({ value: select.region.toLowerCase(), title: select.region })
                }

            }


            $scope.selectedRegion = function () {
                if ($scope.regions_selected.indexOf($scope.regionOption) === -1) {
                    $scope.regions_selected.push($scope.regionOption);
                }
                

                
                $scope.states = $scope.states.filter(function(state) { return state.region.toLowerCase() !== $scope.regionOption });
                
                


                $scope.regionOption = null;

            }
            $scope.deleteRegionOption = function (select) {
                var index = $scope.regions_selected.indexOf(select);
                $scope.regions_selected.splice(index, 1);


                appConfig.statesAndRegion.filter(function (state) { return state.region.toLowerCase() === select}).forEach(function(result){
                    $scope.states.push(result);

                });
                

            }



            $scope.selectedStatus = function () {
                if ($scope.status_selected.indexOf($scope.statusOption) === -1) {
                    $scope.status_selected.push($scope.statusOption);
                }
                $scope.statusOption = null;

            }
            $scope.deleteStatusOption = function (select) {
                var index = $scope.status_selected.indexOf(select);
                $scope.status_selected.splice(index, 1);

            }




            $scope.sendGroupValidator = function () {

                var disableButton = true;

                if (!$scope.sendToAgencies && !$scope.sendToUsers) {
                    $scope.status_selected = [];
                    $scope.regions_selected = [];
                    $scope.state_selected = [];
                }

                if ($scope.status_selected.length > 0 || $scope.regions_selected.length > 0 || $scope.state_selected.length > 0) {
                    disableButton = false;
                }
                return disableButton;

            }





            $scope.scheduled = {
                date: moment().format('DD/MM/YYYY'),
                time: moment().format('HH:mm')
            };

            var savedTemplate = null;


            var init = function () {

                $scope.filterCriteriaAgency.addParam('limit', 15);
                $scope.filterCriteriaUser.addParam('limit', 15);

                $scope.campaign = new Campaign();
                $scope.campaign.name = 'Nova Campanha de ' + moment().format('DD/MM/YYYY');
                $scope.campaign.subject = 'Campanha Busca Aéreo';

                Template.query({ limit: 4, orderBy: 'created_at', sortedBy: 'DESC' }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.templates = data.data;

                            // if ($scope.templates.length >= 1) {
                            //     $scope.campaign.template_id = $scope.templates[0].id;
                            //     $scope.changeTemplate($scope.campaign.template_id);
                            // }
                        }
                    }
                );

                EmailAccount.query({}, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.accounts = data.data;

                            if ($scope.accounts.length >= 1) {
                                $scope.campaign.email_account_id = $scope.accounts[0].id;
                            }
                        }
                    }
                );

            };


            $scope.onSelectTemplate = function (campaign, selected) {
                if (template) {
                    campaign.template_id = selected.id;
                    $scope.campaign.html = selected.body;
                } else {
                    campaign.template_id = null;
                }
            };

            $scope.searchTemplate = function (template) {
                if (template && template.length) {
                    Template.query({ limit: 4, search: template, orderBy: 'name', sortedBy: 'DESC' }, {},
                        function success(data) {
                            $scope.templates = data.data;
                        }
                    );
                }
            };

            $scope.changeTemplate = function (id) {
                $scope.templates.forEach(function (item) {
                    if (item.id == id) {
                        savedTemplate = $scope.campaign.html;
                        $scope.campaign.html = item.body;
                        return false;
                    }
                });
            };

            $scope.filterAgency = function (search) {
                $scope.$broadcast('onSearchAgency', search);
            };

            $scope.filterUser = function (search) {
                $scope.$broadcast('onSearchUser', search);
            };

            $scope.save = function (campaign, date, time) {

                campaign.scheduled_to = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');

                campaign.agencies = [];
                campaign.users = [];

                if ($scope.sendAllAgencies) {
                    campaign.send_all_agencies = 1;
                } else {
                    campaign.send_all_agencies = 0;

                    if ($scope.agenciesSelected) {
                        $scope.campaign.agencies = $scope.agenciesSelected;
                    }
                }

                if ($scope.sendAllUsers) {
                    campaign.send_all_users = 1;
                } else {
                    campaign.send_all_users = 0;

                    if ($scope.usersSelected) {
                        $scope.campaign.users = $scope.usersSelected;
                    }
                }

                campaign.$save(
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Campanha salva!");
                            $state.go('app.campaign');
                        }
                    }
                );
            };







            $scope.addOrRemoveUser = function (user, send) {
                if (send) {
                    $scope.usersSelected.push(user);
                } else {
                    $scope.usersSelected.splice($scope.usersSelected.indexOf(user), 1);

                }
            };

            $scope.addOrRemoveAgency = function (agency, send) {
                if (send) {
                    $scope.agenciesSelected.push(agency);
                } else {
                    $scope.agenciesSelected.splice($scope.agenciesSelected.indexOf(agency), 1);
                }
            };








            $scope.getUserSendState = function (user) {
                user.send = $scope.usersSelected.length && $scope.usersSelected.indexOf(user.id) != -1;
            };

            $scope.getAgencySendState = function (agency) {
                agency.send = $scope.agenciesSelected.length && $scope.agenciesSelected.indexOf(agency.id) != -1;
            };

            $scope.selectAllAgencies = function (selectAll) {
                $scope.agencies.forEach(function (agency) {
                    agency.send = selectAll;
                    $scope.addOrRemoveAgency(agency, agency.send);
                });
            };

            $scope.selectAllUsers = function (selectAll) {
                $scope.users.forEach(function (user) {
                    user.send = selectAll;
                    $scope.addOrRemoveUser(user, user.send);
                });
            };






            $scope.sendSpecificCampaign = function (campaign, date, time) {
                campaign.agencies = $scope.agenciesSelected.map(function (a) {
                    return a.id;
                });
                campaign.users = $scope.usersSelected.map(function (a) {
                    return a.id;
                });
                campaign.scheduled_to = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');
                Campaign.sendSpecificCampaign(campaign,
                    function success(data) {
                        if (!data.error) {
                            toastr.success('Campanha Criada');
                            $state.go('app.campaign');
                        }
                    });

            }

            $scope.sendTest = function (campaign) {
                $scope.loadingTest = true;
                campaign.email_test = $scope.test_email;
                Campaign.sendTest(campaign,
                    function success(data) {
                        if (!data.error) {
                            toastr.success(data.message);
                        }
                        $scope.loadingTest = false;
                    });
            }


            $scope.sendGroupCampaign = function (campaign, date, time) {
                campaign.send_agencies = $scope.sendToAgencies;
                campaign.send_users = $scope.sendToUsers;

                $scope.regions_selected ? campaign.region_filter = $scope.regions_selected : campaign.region_filter = null;
                $scope.status_selected  ? campaign.status_filter = $scope.status_selected  : campaign.status_filter = null;
                $scope.state_selected ? campaign.state_filter = $scope.state_selected.map(function(state){return state.name.toLowerCase()}) : campaign.state_filter = null;


                campaign.scheduled_to = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');
                Campaign.sendGroupCampaign(campaign,
                    function success(data) {
                        if (!data.error) {
                            toastr.success('Campanha Criada');
                            $state.go('app.campaign');
                        }
                    });
            }

            init();
        }]);
