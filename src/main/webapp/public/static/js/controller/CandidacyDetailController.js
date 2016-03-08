/**
 * Created by sleepbear on 2016. 3. 6..
 */

webing.controller('CandidacyDetailController', function ($scope, $routeParams, apiService, webingDataService) {
    $scope.currentCandidacy = {};
    var currentIndex;
    var candidacyListSize = 0;

    var init;
    var updateCandidacy;

    $scope.changeToRight = function() {
        currentIndex = (currentIndex+1) % candidacyListSize;
        updateCandidacy();
        console.log("love keuroo");
    };
    $scope.changeToLeft = function() {
        currentIndex -= 1;
        if(currentIndex == -1) currentIndex = candidacyListSize - 1;
        updateCandidacy();
        console.log("keuroo love");
    };

    init = function() {
        var selectedCandidacyId = $routeParams.candidacyId;
        webingDataService.candidacyList.forEach(function(candidacy, index){
            if(candidacy.candidacyId == selectedCandidacyId){
                currentIndex = index;
            }
        });
        candidacyListSize = webingDataService.candidacyList.length;
        $scope.currentCandidacy = webingDataService.candidacyList[currentIndex];
        console.log($scope.currentCandidacy);
    };
    updateCandidacy = function() {
        $scope.currentCandidacy = webingDataService.candidacyList[currentIndex];
    };

    init();
});