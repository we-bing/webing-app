/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';


var webing = angular.module('webingApp', ['ngRoute', 'ngTouch']);

webing
    .controller('WebingController', function ($scope, $location, $anchorScroll, apiService, webingDataService, sharedDataService) {
        $scope.isMenuOpen = false;
        $scope.isSelectBoxOpen = false;
        $scope.dataModel = {};
        var fetchCityList;
        var init;
        var divideTownName;

        //function goToTest() {
        //    $scope.selectedTown = dummyTown;
        //    webingDataService.town = $scope.selectedTown;
        //    //$location.path('candidacyList/' + webingDataService.town.districtCode);
        //    $location.path('candidacyDetail/100119321');
        //}

        init = function() {
            fetchCityList();
            $location.path("home");
            //goToTest();
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

        $scope.swipeLeft = function() {
            console.log("left");
        };
        $scope.swipeRight = function() {
            console.log("right");
        };
        $scope.focusInput = function() {
            $scope.isSelectBoxOpen = true;
        };
        $scope.selectBoxClose = function() {
            $scope.isSelectBoxOpen = false;
        };
        $scope.classToPath = function() {
            var path = $location.path().split('/')[1];
            if(path === "home"){
                return "dummy-home";
            }else if(path === "candidacyDetail") {
                if($scope.isSelectBoxOpen) return 'dummy-detail ' + 'search-open';
                return 'dummy-detail';
            }
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
        $scope.selectAndComplete = function(town) {
            $scope.selectTown(town);
            $scope.complete();
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
        $scope.isDetail = function() {
            return $location.path() !== "/candidacyDetail";
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

