/**
 * Created by sleepbear on 2016. 3. 6..
 */

webing.controller('CandidacyDetailController', function ($scope, $routeParams, apiService, webingDataService) {
    var currentIndex;
    var candidacyListSize = 0;
    var init;
    var updateCandidacy;

    $scope.isActivityFolding = true;
    $scope.selectedTab = 'course';
    init = function() {
        var selectedCandidacyId = $routeParams.candidacyId;
        webingDataService.candidacyList.forEach(function(candidacy, index){
            if(candidacy.candidacyId == selectedCandidacyId){
                currentIndex = index;
            }
        });
        candidacyListSize = webingDataService.candidacyList.length;
        updateCandidacy();
    };

    $scope.changeFoldStatus =function() {
        $scope.isActivityFolding = !$scope.isActivityFolding
    };

    $scope.changeToRight = function() {
        currentIndex = (currentIndex+1) % candidacyListSize;
        updateCandidacy();
    };
    $scope.changeToLeft = function() {
        currentIndex -= 1;
        if(currentIndex == -1) currentIndex = candidacyListSize - 1;
        updateCandidacy();
    };

    $scope.isPreviousAssembly = function() {
        return $scope.currentCandidacy.assemblyId !== 0;
    };

    updateCandidacy = function() {
        $scope.currentCandidacy = webingDataService.candidacyList[currentIndex];
        var assemblyId = $scope.currentCandidacy.assemblyId;
        if(assemblyId !== 0 && webingDataService.assemblyList[assemblyId] === undefined) {
            apiService
                .assemblyMember(assemblyId)
                .success(function(assemblyMember) {
                    assemblyMember.completedPledgesRate = parseFloat(assemblyMember.completedPledgesRate);
                    $scope.currentCandidacy.assemblyMember = assemblyMember;
                    webingDataService.assemblyList[assemblyId] = assemblyMember;
                });
        }else if (webingDataService.assemblyList[assemblyId] !== undefined) {
            $scope.currentCandidacy.assemblyMember = webingDataService.assemblyList[assemblyId];
        }
    };

    init();
});