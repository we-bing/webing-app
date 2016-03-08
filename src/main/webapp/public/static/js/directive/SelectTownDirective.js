/**
 * Created by sleepbear on 2016. 3. 8..
 */

webing.directive('selectTown', function(webingDataService, $location) {
    return {
        templateUrl : '/public/static/view/selectTownDirective.html',
        restrict: 'E',
        link : function(scope) {
            scope.data = {};
            scope.data.townList = webingDataService.townList;
            scope.selectedTown = {};

            scope.selectTown = function (town) {
                scope.selectedTown = town;
                scope.townName = town.townName;
            };
            scope.complete = function () {
                webingDataService.town = scope.selectedTown;
                localStorage.setItem('selectedTown', JSON.stringify(scope.selectedTown));
                $location.path('candidacyList/' + webingDataService.town.districtCode);
            };
        }
    };
});