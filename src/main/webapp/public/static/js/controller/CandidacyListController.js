/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('CandidacyListController', function ($scope, $routeParams, $location, apiService, webingDataService) {
    var init;

    $scope.data = {};
    $scope.data.candidacise = [];

    init = function() {
        $scope.district = webingDataService.town;
        if (webingDataService.candidacyList === null) {
            $scope.fetchCandidacies($scope.district.districtCode);
        }else{
            $scope.data.candidacise = webingDataService.candidacyList;
        }
    };
    $scope.fetchCandidacies = function (districtCode) {
        apiService.candidacise(districtCode).success(function(candidacyMembers) {
            $scope.data.candidacise = candidacyMembers;
            webingDataService.candidacyList = candidacyMembers;
        });
    };
    $scope.onClickDetail = function(candidacy) {
        $location.path('candidacyDetail/' + candidacy.candidacyId);
    };

    init();

});