/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('HomeController', function ($scope, $routeParams, apiService ,$location, webingDataService, sharedDataService) {

    $scope.openSearchBox = function() {
        sharedDataService.canSearchTownOpen = true;
    };
});