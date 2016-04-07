/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';


var webing = angular.module('webingApp', ['ngRoute', 'ngTouch']);

webing
    .controller('WebingController', function ($http, $scope, $location,$templateCache, apiService, webingDataService, sharedDataService) {
        $scope.isMenuOpen = false;
        $scope.selectedTown = {};
        var init;

        init = function() {
            $scope.selectedTown = webingDataService.town;
            $templateCache.removeAll();
            $location.path("home");
        };
        $scope.getSelectedDistrictName = function() {
            if(webingDataService.town) {
                return webingDataService.town.districtName;
            }
        };
        $scope.classToPath = function() {
            var path = $location.path().split('/')[1];
            if(path === "home"){
                return "dummy-home";
            }else if(path === "candidacyDetail") {
                if($scope.isSelectBoxOpen) return sharedDataService.getDetailPageClass() + 'search-open';
                return sharedDataService.getDetailPageClass();
            }
        };


        $scope.back = function() {
            window.history.back();
        };

        $scope.menuClassToggle = function () {
            $scope.isMenuOpen = !$scope.isMenuOpen;
        };

        $scope.isPathHome = function() {
            return $location.path() === "/home";
        };

        $scope.isPathOther = function() {
            return $location.path() !== "/home";
        };
        $scope.isDetail = function() {
            return $location.path() !== "/candidacyDetail";
        };

        init();

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'public/static/view/home.html',
                controller: 'HomeController'
            })
            .when('/webingIntro', {
                templateUrl: 'public/static/view/webingIntro.html'
            })
            .when('/webingContact', {
                templateUrl: 'public/static/view/webingContact.html'
            })
            .when('/candidacyList/:districtCode', {
                templateUrl: 'public/static/view/candidacyList.html',
                controller: 'CandidacyListController'
            })
            .when('/candidacyDetail/:candidacyId', {
                templateUrl: 'public/static/view/candidacyDetail.html',
                controller: 'CandidacyDetailController'
            });

    });

