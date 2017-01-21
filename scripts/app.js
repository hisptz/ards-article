'use strict';

/* App Module */
var home = angular.module('articles',
                    ['ui.bootstrap',
                        'ngRoute',
                        'ngCookies',
                        'ngSanitize',
                        'highcharts-ng',
                        'ngCsv',
                        'articlesDirectives',
                        'articlesControllers',
                        'articlesServices',
                        'articlesFilters',
                        'd2Directives',
                        'd2Services',
                        'multi-select-tree',
                        'd2Controllers',
                        'pascalprecht.translate',
                    'd2HeaderBar'])

.value('DHIS2URL', '..')

.config(function ($routeProvider, $translateProvider) {


    $routeProvider.when('/', {
            templateUrl: "views/articles.html",
            controller: 'articlesController'
        })
        .when('/analysis', {
            templateUrl: "views/analysis.html",
            controller: 'analysisController'
        })
        .otherwise('/');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('i18nLoader');
});
