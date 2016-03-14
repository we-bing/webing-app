/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';
var webing = angular.module('webingApp', ['ngRoute']);

webing
    .controller('WebingController', function ($scope, $location, $anchorScroll, apiService, webingDataService) {
        var init;
        $scope.data = {};
        $scope.isMenuOpen = false;

        var fetchTownList;

        init = function() {
            fetchTownList();
            webingDataService.town = JSON.parse(localStorage.getItem('selectedTown'));
            $location.path("home");
        };

        fetchTownList = function() {
            webingDataService.townList = JSON.parse(localStorage.getItem('townList'));
            if(webingDataService.townList === null) {
                apiService.districts().success(function(data) {
                    webingDataService.townList = data;
                    $scope.data.townList = webingDataService.townList;
                    localStorage.setItem('townList', JSON.stringify(data));
                });
            }else{
                $scope.data.townList = webingDataService.townList;
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
        $scope.goToAnchor = function(anchorName) {
            if($location.path() !== "/home"){
                $location.path("home");
            }
            $location.hash(anchorName);
            $anchorScroll();
        };
        init();

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'public/static/view/home.html',
                controller: 'HomeController'
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