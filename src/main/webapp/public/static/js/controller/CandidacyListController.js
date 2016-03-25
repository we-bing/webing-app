/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('CandidacyListController', function ($scope, $routeParams, $location, apiService, webingDataService) {
    var init;

    init = function() {
        $scope.cardChecked = false;
        $scope.district = webingDataService.town;
        $scope.fetchCandidacies($scope.district.districtCode);
    };

    $scope.changeStatus = function() {
        $scope.candidacise.forEach(function (candidacy) {
            candidacy.isReverse = $scope.cardChecked;
        });
    };
    $scope.fetchCandidacies = function (districtCode) {
        apiService.candidacise(districtCode)
            .success(function(candidacyMembers) {
                candidacyMembers.forEach(function (member) {
                    member.experienceArr = member.experience.split(',');
                    member.isReverse = false;
                });
                $scope.candidacise = webingDataService.candidacyList = candidacyMembers;
                console.log($scope.candidacise);
            });
    };
    $scope.onClickDetail = function(candidacy) {
        $location.path('candidacyDetail/' + candidacy.candidacyId);
    };

    init();

});