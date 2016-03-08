/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('CandidacyListController', function ($scope, $routeParams, $location, apiService, webingDataService) {
    var init;

    $scope.data = {};
    $scope.data.candidacise = [];

    init = function() {
        $scope.district = webingDataService.town;
        $scope.fetchCandidacies($scope.district.districtCode);
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