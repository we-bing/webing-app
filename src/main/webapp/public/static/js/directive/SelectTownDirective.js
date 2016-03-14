/**
 * Created by sleepbear on 2016. 3. 8..
 */

webing.directive('selectTown', function(webingDataService, $location) {
    return {
        templateUrl : '/public/static/view/selectTownDirective.html',
        restrict: 'E',
        link : function(scope) {
            if(scope.townList === undefined) {
                scope.townList = webingDataService.townList;
            }
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