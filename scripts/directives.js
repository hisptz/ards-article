'use strict';

/* Directives */

var articlesDirectives = angular.module('articlesDirectives', []);

articlesDirectives.directive("homeRightMenu", ['articlesService',function(articlesService){
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
            $scope.errorsThree  = false;
            $scope.errorSms  = false;


            $scope.$watch('messageObject', function(newmessageObject, oldmessageObject){

                $scope.messages = newmessageObject;
                if(!$scope.messages){
                    $scope.errorSms = true;
                }
            }, true);

            $scope.$watch('chartObject', function(newChartObject, oldChartObject){
                if(typeof newChartObject != "undefined"){

                }
            }, true);


            $scope.checkStatus = function( messages ) {
                var status = true;
                var messageLength = 0;
                if(messages){
                    messageLength = messages.length;
                }


                if(messageLength==1){
                    if(messages[0].hidden){
                        return false;
                    }
                }if(messageLength==0){
                    return false;
                }else{
                    var test = 0;
                    angular.forEach(messages,function(valueS,indexS){
                        if(valueS.hidden){
                            test++;
                        }
                    })

                    if(test==2){
                        return false;
                    }
                }



                return status;
            }


        }
    };
}]);

articlesDirectives.directive("homeLeftMenu", ['articlesService','utilityService',function(articlesService,utilityService){

    return {
        restrict: "E",
        replace: true,
        scope: {
            reportTables: "=reportTables",
            documentObject: "=documentObject",
        },
        templateUrl: "views/directives/home_left_menu.html",
        link: function($scope, element, attrs) {
            $scope.error  = false;
            $scope.errorMessage  = "no document found";

            $scope.loadExternalLinks = function(){

                articlesService.listExternalLink().then(function(response){
                    $scope.externalLinks = response;
                });
            }


            // get report tables
            $scope.getReportTable = function () {

                if(localStorage.getItem('reportTables')){
                    $scope.reportTables = utilityService.prepareReportTables(JSON.parse(localStorage.getItem('reportTables')));
                }else{

                    articlesService.getReportTables().then(function(data){
                        $scope.reportTables = utilityService.prepareReportTables(data.reportTables);
                        localStorage.setItem('reportTables',JSON.stringify(data.reportTables));
                    },function(error){

                    });
                }


            }

            $scope.getReportTable();



            $scope.loadExternalLinks = function(){

                articlesService.listExternalLink().then(function(response){
                    $scope.externalLinks = response;
                });
            }


            $scope.loadExternalLinks();
            $scope.getReportTable();

        }
    };
}]);
