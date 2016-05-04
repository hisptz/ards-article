'use strict';

/* App Module */

var article = angular.module('article',
    ['ui.bootstrap',
        'ngRoute',
        'ui.router',
        'ngCookies',
        'ngSanitize',
        'highcharts-ng',
        'datatables',
        'ckeditor',
        'isteven-multi-select',
        'articleDirectives',
        'articleControllers',
        'articleServices',
        'articleFilters',
        'd2Services',
        'd2Controllers',
        'pascalprecht.translate',
        'd2HeaderBar',
        'd2Directives'
    ])

    .value('DHIS2URL', '../../../')

    .config(function ($translateProvider, $routeProvider, $stateProvider, $urlRouterProvider) {


            $routeProvider.when('/article', {
                templateUrl: "views/articles.html",
                controller: 'articleController'
            })

        .otherwise('/article');
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLoader('i18nLoader');
    });
