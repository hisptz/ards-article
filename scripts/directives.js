'use strict';

/* Directives */

var articleDirectives = angular.module('articleDirectives', []);

articleDirectives.directive("homeRightMenu", function(){
    return {
        restrict: "E",
        replace: true,
        scope: {
            messageObject: "=messageObject",
            chartObject: "=chartObject"
        },
        templateUrl: "views/directives/home_right_menu.html",
        link: function($scope, element, attrs) {
            $scope.errors  = false;
            $scope.errorSms  = false;
            $scope.errorMessage  = "no chart found";

            $scope.$watch('chartObject', function(newchartObject, oldchartObject){
                $scope.charts = newchartObject;
                if(!$scope.charts&&newchartObject!=null){
                    $scope.errors = true;
                }
            }, true);

            $scope.$watch('messageObject', function(newmessageObject, oldmessageObject){
                $scope.messages = newmessageObject;
                if(!$scope.messages){
                    $scope.errorSms = true;
                }
            }, true);

        }
    };
});
articleDirectives.directive("homeLeftMenu", function(){
    return {
        restrict: "E",
        replace: true,
        scope: {
            analysisObject: "=analysisObject",
            otherLinksObject: "=otherLinksObject",
            documentObject: "=documentObject",
        },
        templateUrl: "views/directives/home_left_menu.html",
        link: function($scope, element, attrs) {
            $scope.error  = false;
            $scope.errorMessage  = "no document found";

            $scope.$watch('documentObject', function(newdocumentObject, olddocumentObject){
                $scope.documents = newdocumentObject;
                if(newdocumentObject==false){
                    $scope.error = true;
                }
            }, true);


            $scope.$watch('otherLinksObject', function(newotherLinksObject, oldotherLinksObject){
                $scope.externalLinks = newotherLinksObject;
            }, true);



            $scope.$watch('analysisObject', function(newanalysisObject, oldanalysisObject){
                $scope.analysis = newanalysisObject;
            }, true);

        }
    };
});