/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('HomeController', function ($scope, $routeParams, apiService ,$location, webingDataService, sharedDataService, $filter) {

    var fetchCityList;
    var fetchCountyList;
    var fetchTownList;
    var init;
    var listItemObjectInit;
    var fetchedCityList = [];
    $scope.isSelectPopupOpen = false;
    $scope.region = {};
    $scope.regionName = {
        city : "시/도",
        county : "구/시/군",
        town : "동/읍/리"
    };

    listItemObjectInit = function() {
        $scope.currentListItemObject = {
            type : "",
            item : []
        };
    };
    init = function() {
        listItemObjectInit();
        fetchCityList();
    };

    $scope.currentListItemObject = {
        type : "",
        item : []
    };

    fetchCityList = function() {
        apiService.cityList().success(
            function (data) {
                fetchCityList = data;
                $scope.currentListItemObject.type = 'city';
                $scope.currentListItemObject.items = fetchCityList;
            }
        );
    };
    fetchCountyList = function(code) {
        apiService.countyList(code).success(
            function (data) {
                $scope.currentListItemObject.type = 'county';
                $scope.currentListItemObject.items = data;
            }
        );
    };
    fetchTownList = function(code) {
        apiService.townList(code).success(
            function (data) {
                $scope.currentListItemObject.type = 'town';
                $scope.currentListItemObject.items = data;
            }
        );
    };

    $scope.selectRegion = function(item) {
        var type = $scope.currentListItemObject.type;
        $scope.region[type] = item;
        $scope.regionName[type] = item[type + 'Name'];
        $scope.isSelectPopupOpen = false;
    };

    $scope.cityOpen = function() {
        $scope.isSelectPopupOpen = true;
        $scope.currentListItemObject.type = 'city';
        $scope.currentListItemObject.items = fetchCityList;
        $scope.region = {};
        $scope.regionName = {
            county : "구/시/군",
            town : "동/읍/리"
        };
    };
    $scope.countyOpen = function() {
        var code = $scope.region.city.cityCode;
        listItemObjectInit();
        $scope.isSelectPopupOpen = true;
        fetchCountyList(code);
        $scope.region.town = {};
        $scope.regionName.town = "동/읍/리";
    };
    $scope.townOpen = function() {
        var code = $scope.region.county.countyCode;
        listItemObjectInit();
        $scope.isSelectPopupOpen = true;
        fetchTownList(code);
    };
    $scope.hasRegion = function(type) {
        return $scope.region[type];
    };
    $scope.districtFind = function() {
        webingDataService.town = $scope.region.town;
        var districtCode = $scope.region.town.districtCode;
        $location.path("/candidacyList/" + districtCode);
    };
    init();
});