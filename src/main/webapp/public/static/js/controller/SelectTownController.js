/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('SelectTownController', function ($scope, $routeParams, apiService ,$location, webingDataService) {
    $scope.data = {};
    $scope.data.townList = webingDataService.townList;
    $scope.selectedTown = {};

    $scope.selectTown = function (town) {
        $scope.selectedTown = town;
        $scope.townName = town.townName;
    };
    $scope.complete = function () {
        webingDataService.town = $scope.selectedTown;
        localStorage.setItem('town', JSON.stringify($scope.selectedTown));
        $location.path('candidacyList');
    };

});