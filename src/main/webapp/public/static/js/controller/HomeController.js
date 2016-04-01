/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('HomeController', function ($scope, $routeParams, apiService ,$location, webingDataService, sharedDataService, $filter) {
    var fetchCityList;
    var init;
    var divideTownName;
    $scope.dataModel = {};
    $scope.dataModel.townNameModel = "";
    $scope.openSearchBox = function() {
        sharedDataService.canSearchTownOpen = true;
    };
    $scope.focusInput = function() {
        $scope.isSelectBoxOpen = true;
    };
    $scope.selectBoxClose = function() {
        $scope.isSelectBoxOpen = false;
    };
    $scope.selectTown = function (town) {
        $scope.dataModel.townNameModel = town.townNameArr[1];
        $scope.isSelectBoxOpen = false;
        $scope.selectedTown = town;
    };

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
    $scope.townNameFilter = function(town) {
        var filteredSize = $filter("filter")([town.townName], $scope.dataModel.townNameModel).length;
        return filteredSize === 0;
    };
    $scope.modelLengthTwo = function() {
        return function() {
            return $scope.dataModel.townNameModel.length != 1;
        };
    };
    init();
});