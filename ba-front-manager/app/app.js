/**
 * App Module
 * @authors: Marcelo Barros, Lourivaldo Vasconcelos
 * Description
 */
var app = angular.module('managerApp', [
    'app.controllers',
    'app.services',
    'app.filters',
    'app.directives',
    'angular-oauth2',
    'http-auth-interceptor',
    'ngAnimate',
    'toastr',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.dropdownToggle',
    'ui.mask',
    'ui.utils.masks',
    'ui.select',
    'ngSanitize',
    'mwl.confirm',
    'angularModalService',
    'ng-bootstrap-datepicker',
    'frapontillo.bootstrap-switch',
    'ngFileUpload',
    'chart.js',
    'datatables',
    'dndLists',
    'textAngular',
    //'ui.bootstrap.datetimepicker',
    'colorpicker.module',
]);

angular.module('app.controllers', []);
angular.module('app.filters', []);
angular.module('app.directives', []);
angular.module('app.services', ['ngResource']);


app.config(['OAuthProvider', 'OAuthTokenProvider', 'appConfigProvider', '$httpProvider',
    function (OAuthProvider, OAuthTokenProvider, appConfigProvider, $httpProvider) {

        //Autenticar
        OAuthProvider.configure({
            baseUrl: appConfigProvider.config.baseAuthUrl,
            clientId: appConfigProvider.config.clientId,
            clientSecret: appConfigProvider.config.clientSecret,
            grantPath: 'oauth/token'
        });
        //Deixar só com HTTP
        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        });

        $httpProvider.interceptors.push("flashError");
    }]);

app.run(['$rootScope', '$cookies', '$state', '$timeout', '$stateParams', '$window', '$location', 'httpBuffer', 'OAuth', 'toastr',
    function ($rootScope, $cookies, $state, $timeout, $stateParams, $window, $location, httpBuffer, OAuth, toastr) {

        var history = [];

        $rootScope.isExecutive = function () {
            var user = $cookies.getObject('auth_user');
            user = user.name ? user : user.data;
            user = user.roles[0].name;

            var userExecutive = null;


            if (user === 'Executivo') {
                userExecutive = user;
            }

            return userExecutive;
        };

        $rootScope.loadingScreenHide = true;

        $rootScope.dialingScreenHide = true;
        $rootScope.phoneCallStarted = false;

        $rootScope.$on("routeAuthorizationDenied", function (event, message) {
            toastr.error(message);
        });

        $rootScope.$on("showLoadingScreen", function (event, show) {
            $rootScope.loadingScreenHide = !show;
        });

        $rootScope.$on("showDialingScreen", function (event, show) {
            if (show === 'done') {
                $rootScope.phoneCallStarted = true;
                $timeout(timing, 3000);
            } else if (show) {
                $rootScope.dialingScreenHide = false;
            } else if (!show) {
                $rootScope.dialingScreenHide = true;
                $rootScope.phoneCallStarted = false;
            }
        });

        var timing = function () {
            $rootScope.$emit("showDialingScreen", false);
            // console.log($rootScope.dialingScreenHide);
            // $rootScope.dialingScreenHide = true;
            // $rootScope.phoneCallStarted = false;
            // console.log($rootScope.dialingScreenHide);
        };

        $rootScope.blockScreen = false;

        $rootScope.$on("blockScreen", function (event, block) {

            $rootScope.blockScreen = block;

            if ($rootScope.blockScreen) {
                $('body').click(function (e) {
                    e.preventDefault();
                    return false;
                });

                window.onbeforeunload = function (e) {
                    e = e || window.event;

                    if (e) {
                        e.returnValue = 'Tem certeza?';
                    }

                    return 'Tem certeza?';
                };
            } else {
                window.onbeforeunload = null;
            }
        });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !OAuth.isAuthenticated()) {
                $rootScope.$emit("showLoadingScreen", false);
                // User isn’t authenticated
                $state.transitionTo("appSimple.login");
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess',
            function (event, to, toParams, from, fromParams) {

                if (!$window.ga)
                    return;

                $window.ga('send', 'pageview', { page: $location.path() });
                
                history.push($location.$$path);
            });

        //Back previous location
        $rootScope.back = function () {
            var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
            $location.path(prevUrl);
        };

        var currentPath = null;

        $rootScope.$on('oauth:error', function (event, data) {

            $rootScope.$emit("showLoadingScreen", false);

            try {
                //if ('invalid_request' === data.rejection.data.error) {
                //
                //}
                // Ignore `invalid_grant` error - should be catched on `LoginController`.
                if ('invalid_grant' === data.rejection.data.error) {
                    return;
                }
                // Refresh token when a `invalid_token` error occurs.
                if ('access_denied' === data.rejection.data.error) {
                    OAuth.getRefreshToken();
                }

                // Redirect to `/login` with the `error_reason`.
                if ($location.path() != '/login') {
                    currentPath = $location.path();
                }

                return $location.path('/login').search({ redirect: currentPath });
            } catch (e) {
                // statements
                //console.log("oauth:error");
            }

        });

        $rootScope.CloseSidebar = true;
        $rootScope._closeSidebarSmall = function () {
            $rootScope.CloseSidebar = !$rootScope.CloseSidebar;
        };
        $rootScope.screenSize = $window.innerWidth;
        angular.element($window).bind('resize', function () {
            $rootScope.screenSize = $window.innerWidth;
            $rootScope.$digest();
        });

        $rootScope.$on('$stateChangeStart', function() { 
            var topPage = document.getElementById('main-wrapper');
            if(topPage) topPage.scrollIntoView(); 
        });


    }]);

/**
 * Text Angular Editor Customisation
 */
app.config(['$provide', function ($provide) {
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate',
        function (taRegisterTool, taOptions) {

            taRegisterTool('color', {
                display: "<button type='button' colorpicker id='text-angular-font-color' ng-init='fontColor = \"#000\"' ng-model='fontColor' class='btn btn-default' ng-class='displayActiveToolClass(active)' ng-disabled='showHtml()'><i class='fa fa-paint-brush'></i></button>",
                //display: "<span class='barBtn'><button type='button' colorpicker id='text-angular-font-color' ng-init='fontColor = \"#000\"' ng-model='fontColor' class='btn btn-xs btn-default' ng-class='displayActiveToolClass(active)' ng-disabled='showHtml()'><i class='fa fa-font'></i></button></span>",
                action: function (deffered) {
                    var textAngular = this;

                    var scope = angular.element('#text-angular-font-color').scope();

                    scope.$on('colorpicker-closed', function (el, color) {
                        if (color.value !== '') {
                            textAngular.$editor().wrapSelection('foreColor', color.value);
                            deffered.resolve();
                        }
                    });

                    return false;
                }
            });

            taRegisterTool('fontName', {
                display: "<div class='dropdown' style='padding:0px;'>" +
                    "<button class='btn dropdown-toggle' id='dropdownMenu1' type='button' ng-disabled='showHtml()' style='padding-top: 4px;'><i class='fa fa-font'></i><i class='fa fa-caret-down'></i></button>" +
                    "<ul class='dropdown-menu' aria-labelledby='dropdownMenu1'><li ng-repeat='o in options'><button class='btn checked-dropdown' style='font-family: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.css)'><i ng-if='o.active' class='fa fa-check'></i>{{o.name}}</button></li></ul></div>",
                action: function (event, font) {
                    //Ask if event is really an event.
                    if (!!event.stopPropagation) {
                        //With this, you stop the event of textAngular.
                        event.stopPropagation();
                        //Then click in the body to close the dropdown.
                        $("body").trigger("click");
                    }
                    return this.$editor().wrapSelection('fontName', font);
                },
                options: [
                    { name: 'Sans-Serif', css: 'Arial, Helvetica, sans-serif' },
                    { name: 'Serif', css: "'times new roman', serif" },
                    { name: 'Wide', css: "'arial black', sans-serif" },
                    { name: 'Narrow', css: "'arial narrow', sans-serif" },
                    { name: 'Comic Sans MS', css: "'comic sans ms', sans-serif" },
                    { name: 'Courier New', css: "'courier new', monospace" },
                    { name: 'Garamond', css: 'garamond, serif' },
                    { name: 'Georgia', css: 'georgia, serif' },
                    { name: 'Tahoma', css: 'tahoma, sans-serif' },
                    { name: 'Trebuchet MS', css: "'trebuchet ms', sans-serif" },
                    { name: "Helvetica", css: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
                    { name: 'Verdana', css: 'verdana, sans-serif' },
                    { name: 'Proxima Nova', css: 'proxima_nova_rgregular' }
                ]
            });

            taRegisterTool('fontSize', {
                display: "<span class='bar-btn-dropdown dropdown' style='padding:0px;'>" +
                    "<button class='btn btn-blue dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-text-height'></i><i class='fa fa-caret-down'></i></button>" +
                    "<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='btn btn-blue checked-dropdown' style='font-size: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.value)'><i ng-if='o.active' class='fa fa-check'></i> {{o.name}}</button></li></ul>" +
                    "</span>",
                action: function (event, size) {
                    //Ask if event is really an event.
                    if (!!event.stopPropagation) {
                        //With this, you stop the event of textAngular.
                        event.stopPropagation();
                        //Then click in the body to close the dropdown.
                        $("body").trigger("click");
                    }
                    return this.$editor().wrapSelection('fontSize', parseInt(size));
                },
                options: [
                    { name: 'Muito Pequeno', css: 'xx-small', value: 1 },
                    { name: 'Pequeno', css: 'x-small', value: 2 },
                    { name: 'Mediano', css: 'small', value: 3 },
                    { name: 'Grande', css: 'medium', value: 4 },
                    { name: 'Muito grande', css: 'large', value: 5 },
                    { name: 'Enorme', css: 'x-large', value: 6 }
                ]
            });

            // add the button to the default toolbar definition
            taOptions.toolbar[1].push('color');
            taOptions.toolbar[1].push('fontName');
            taOptions.toolbar[1].push('fontSize');

            return taOptions;
        }]);
}]);

app.config(['toastrConfig', function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 3,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        target: 'body'
    });
}]);