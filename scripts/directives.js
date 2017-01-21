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


articlesDirectives.directive("homeLeftMenu", ['articlesService','utilityService','$location',function(articlesService,utilityService,$location){
    return {
        restrict: "E",
        replace: true,
        scope: {
            reportTables: "=reportTables",
            documentObject: "=documentObject",
            tab: "=tabs",
            menu: "=menu",
            favourite: "=favourite"
        },
        templateUrl: "views/directives/home_left_menu.html",
        link: function($scope, element, attrs) {
            $scope.error  = false;
            $scope.errorMessage  = "no document found";

            $scope.appBaserUrl = dhis2.settings.baseUrl;

            $scope.openTab = {};
            $scope.openChildTab = {};
            $scope.statusClass = {};
            $scope.openTab['analysis'] = true;
            $scope.openAccordion = function(parentElement,childElement){

                if ( !$scope.openTab[parentElement] ) {
                    $scope.openTab = {};
                    $scope.statusClass = {};
                    $scope.openTab[parentElement] = true;
                    $scope.statusClass[$scope.favourite] = "alert-success";
                }

                if ( !$scope.openChildTab[childElement] && childElement != "" ) {
                    $scope.openChildTab = {};
                    $scope.statusClass = {};
                    $scope.openChildTab[childElement] = true;
                    $scope.statusClass[$scope.favourite] = "alert-success";
                    console.log(childElement);
                }

                $location.path('/'+parentElement+'/menu/'+childElement);
            }

            $scope.$watch($scope.tab,function(newTab,oldTab){
                $scope.openTab[$scope.tab] = true;
                $scope.openChildTab[$scope.menu] = true;
                $scope.statusClass[$scope.favourite] = "alert-success";
                //$location.path('/'+scope.tab+'/menu/'+scope.menu);
            });


            $scope.loadExternalLinks = function(){

                articlesService.listExternalLink().then(function(response){
                    $scope.externalLinks = response;
                });
            }


            $scope.loadExternalLinks = function(){

                articlesService.listExternalLink().then(function(response){
                    $scope.externalLinks = response;
                });
            }

            $scope.documents = null;

            $scope.listDocuments = function(){
                articlesService.loadDocuments().then(function(data){

                    $scope.documents = data.documents;
                })
            }

            $scope.listDocuments();


            $scope.loadExternalLinks();

        }
    };
}]);
