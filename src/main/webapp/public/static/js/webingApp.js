/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';
var webing = angular.module('webingApp', ['ngRoute']);

webing
    .controller('WebingController', function ($scope, $location, apiService, webingDataService) {
        var init;
        $scope.data = {};

        var fetchTownList;

        init = function() {
            fetchTownList();
            webingDataService.town = JSON.parse(localStorage.getItem('selectedTown'));
            var pathString = webingDataService.town === null ? 'selectTown' : 'candidacyList/' + webingDataService.town.districtCode;
            $location.path(pathString);
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
        init();

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/selectTown', {
                templateUrl: 'public/static/view/selectTown.html',
                controller: 'SelectTownController'
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