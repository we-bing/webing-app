/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';
var webing = angular.module('webingApp', ['ngRoute']);

webing
    .controller('WebingController', function ($scope, $location, $anchorScroll, apiService, webingDataService, sharedDataService) {
        var init;
        $scope.isMenuOpen = false;

        var fetchCityList;

        init = function() {
            fetchCityList();
            webingDataService.town = JSON.parse(localStorage.getItem('selectedTown'));
            $location.path("home");
        };

        fetchCityList = function() {
            $scope.cityList = JSON.parse(localStorage.getItem('cityList'));
            if($scope.cityList === null) {
                apiService.districts().success(function(data) {
                    $scope.cityList= data;
                    localStorage.setItem('cityList', JSON.stringify(data));
                });
            }
            console.log($scope.cityList);
        };

        $scope.selectTown = function (town) {
            $scope.selectedTown = town;
            $scope.townNameModel = town.townName;
        };
        $scope.complete = function () {
            sharedDataService.canSearchTownOpen = false;
            webingDataService.town = $scope.selectedTown;
            localStorage.setItem('selectedTown', JSON.stringify($scope.selectedTown));
            $location.path('candidacyList/' + webingDataService.town.districtCode);
        };
        $scope.canOpenSelectBox = function() {
            return sharedDataService.canSearchTownOpen === true;
        };
        $scope.searchCancel = function() {
            sharedDataService.canSearchTownOpen = false;
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