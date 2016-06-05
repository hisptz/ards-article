'use strict';

/* Filters */

var articlesFilters = angular.module('articlesFilters', []);


articlesFilters.filter('trimSpaces', function() {

    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(inputString) {



        return inputString.replace(/ /g,"-");

    }

});
articlesFilters.filter('trusted', function($sce){
        return function(html){
            return $sce.trustAsHtml(html)
        }
    })