/* global angular */

'use strict';

/* Controllers */
var articleControllers = angular.module('articleControllers', [])

.controller('MainController', function($scope, $window,$routeParams,$location,$http, ModalService,articleService,utilityService) {

    //// layout modals
    $scope.leftColumn = "col-md-2 col-xs-12";
    $scope.centerColumn = "col-md-8 col-xs-12 ";
    $scope.changeBootstrapClass = function(action){
        if(action=="show"){
            $scope.leftColumn = "col-md-2 col-xs-12";
            $scope.centerColumn = "col-md-8 col-xs-12 ";
        }

        if(action=="hide"){
            $scope.leftColumn = "";
            $scope.centerColumn = "col-md-10 col-xs-12 ";
        }

        if(action=="extend"){
            $scope.leftColumn = "col-md-4 col-xs-12";
            $scope.centerColumn = "col-md-6 col-xs-12 ";
        }
    }



    $scope._appPrograms = [];
    $scope._tabProgram = "";
    $scope._tabContentProgram = "";
    $scope._smsProgram = "";
    $scope._linkProgram = "";
    $scope._appCharts = [];
    $scope._currentUser = null;
    $scope._users = [];
    $scope.activeClass = [];
    $scope.documents = [];
    $scope.analysis = [];

    articleService.getUsers().then(function(value){
        $scope._users = articleService.processUsers(value.users);
    });
    articleService.loggedUser().then(function(value){
        $scope._currentUser = value;
    });

    // app resources functions
    $scope.loadPrograms = function(){
        articleService.getPrograms().then(function(response){
            $scope.Programs = $scope.groupPrograms(response.programs);
        });
    }
    $scope.loadCharts = function(){
        articleService.retrieveSetting().then(function(response){
            $scope.charts = response.selectedCharts;
        },function(error){
            $scope.errors  = true;
        });
    }

    $scope.groupPrograms = function(appPrograms){
        angular.forEach(appPrograms,function(programObject,programIndex){
            if(programObject.name.indexOf('cms')>=0){
                articleService._appPrograms.push(programObject);

            }
            if(programObject.name.indexOf('cms messages')>=0){
                articleService._smsProgram = programObject;
                $scope._smsProgram = programObject;

                var content = '';
                //$scope.createTabContent(cmsService._tabContentProgram,content,"Livestock",2);
                //$scope.loadMessages(cmsService._smsProgram);
                //$scope.createMessage(cmsService._smsProgram,JSON.stringify({type:"users",list:[{id: "K8jZ8exCsNH",name: "Leonard Mpande"}]}),JSON.stringify({id:"K8jZ8exCsNH",name:"Leonard Mpande"}),"Stay Tuned","Hellow User Stay tuned");
            }
            if(programObject.name.indexOf('cms extenal links')>=0){
                articleService._linkProgram = programObject;

                $scope.loadExternalLinks(articleService._linkProgram);
                //$scope.addExternalLinks(cmsService._linkProgram,"http://www.countrystat.org/","CountryStat",'shown');
                //$scope.createMessage(cmsService._smsProgram,JSON.stringify({type:"users",list:[{id: "K8jZ8exCsNH",name: "Leonard Mpande"}]}),JSON.stringify({id:"K8jZ8exCsNH",name:"Leonard Mpande"}),"Stay Tuned","Hellow User Stay tuned");
            }

        });
    }

    $scope.loadExternalLinks = function(contentProgram){

        var eventObject = utilityService.prepareEventObject(contentProgram);
        articleService.getExternalLinks(eventObject).then(function(response){
            $scope.externalLinks = utilityService.refineExternalLinks(response.events);
        });
    }

    $scope.toggleToCMS = function(){

        $location.path('/cms/articles/sub/all');

    }
    $scope.toggleToHOME = function(){

        $location.path('/home/all');

    }
    // Load favourites report tables
    $scope.getReportTable = function(){
        articleService.getReportTables().then(function(reportTables){
            $scope.analysis = utilityService.formatAnalysis(reportTables);
        },function(error){
            $scope.analysis = false;
        });
    }


    $scope.loadMessages = function(){

        articleService.retrieveSetting().then(function(response){
            $scope.first_message = null;
            $scope.second_message = null;
            $scope.messages = response.availableMessages;
            angular.forEach($scope.messages,function(value,index){

                if(typeof value.first_message !=="undefined"){
                    $scope.first_message    = value.first_message;
                    $scope.hideFirstMessage = value.hide;

                }

                if(typeof value.second_message !=="undefined"){
                    $scope.second_message    = value.second_message;
                    $scope.hideSecondMessage = value.hide;
                }

            });
        });
    }


    $scope.toggleableCMSTab = function(tab){

        angular.forEach($scope.activeClass,function(tabD,index){
            $scope.activeClass[index] = "";
            if(index==tab){
                $scope.activeClass[index] = "active";
            }
        })

        if(typeof $scope.newMessageForm != "undefined"){
            $scope.newMessageForm = false;
        }

    }


    function switchCMSTab (){
        var link = $location.path();
        console.log(link)
        if(link.indexOf('tab')<=-1){
            var url_length = link.length;
            var article = link.substr(5,url_length-1);
            $scope.activeClass[article] = 'active';
        }else{

        }

    }
    switchCMSTab();

    $scope.users = [
        { icon: "<i class='fa fa-user'></i>",               name: "Leonard Mpande",              maker: "(Opera Software)",        ticked: false  }
    ];


    // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    articleService.getParentOrgUnit().then(function(response){
        angular.forEach(response.organisationUnits,function(value){
            articleService.parentOrganisationUnit  = value.id;
        });
        $scope.loadPrograms();
        $scope.loadMessages();
        $scope.loadCharts();
    },function(){
        console.log("there is error probable the network error");
    });

    $scope.getReportTable();



    String.prototype.Capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

})

.controller('articleController',function($scope, $window,$routeParams,$location, articleService,utilityService){

    $scope.currentTab = 'all';
    if($routeParams.tabs){
        $scope.currentTab = $routeParams.tabs;
        $scope.currentTabCapitaize = $routeParams.tabs.Capitalize();
    }

})