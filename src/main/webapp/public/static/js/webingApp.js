/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';
var webing = angular.module('webingApp', ['ngRoute']);

webing
    .controller('WebingController', function ($scope, $location, $anchorScroll, apiService, webingDataService, sharedDataService) {
        $scope.isMenuOpen = false;
        $scope.isSelectBoxOpen = false;
        $scope.dataModel = {};
        var fetchCityList;
        var init;
        var divideTownName;
        var dummyTown = {
            "townCode": 4739,
            "districtCode": 2110101,
            "districtName": "종로구",
            "cityCode": 1100,
            "townName": "종로구 사직동",
            "townNameArr": ["종로구", "사직동"],
            "$$hashKey": "object:41"
        };

        function goToTest() {
            $scope.selectedTown = dummyTown;
            webingDataService.town = $scope.selectedTown;
            $location.path('candidacyList/' + webingDataService.town.districtCode);
        }

        init = function() {
            fetchCityList();
            webingDataService.town = JSON.parse(localStorage.getItem('selectedTown'));
            //$location.path("home");
            goToTest();
        };

        divideTownName = function (cityList) {
            cityList.forEach(function(city){
                city.townList.forEach(function (town) {
                    town.townNameArr = town.townName.split(" ");
                });
            });
        };

        fetchCityList = function() {
            $scope.cityList = JSON.parse(localStorage.getItem('cityList'));
            if($scope.cityList === null) {
                apiService.districts().success(function(data) {
                    divideTownName(data);
                    $scope.cityList= data;
                    localStorage.setItem('cityList', JSON.stringify(data));
                });
            }
        };

        $scope.focusInput = function() {
            $scope.isSelectBoxOpen = true;
        };
        $scope.blurInput = function() {
        };
        $scope.selectTown = function (town) {
            $scope.dataModel.townNameModel = town.townNameArr[1];
            $scope.isSelectBoxOpen = false;
            $scope.selectedTown = town;
        };

        $scope.complete = function () {
            $scope.dataModel.townNameModel = '';
            $scope.isSelectBoxOpen = false;
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