/**
 * Created by sleepbear on 2016. 3. 6..
 */

webing.controller('CandidacyDetailController', function ($scope, $routeParams, apiService, webingDataService) {
    var currentIndex;
    var candidacyListSize = 0;
    var init;
    var updateCandidacy;

    var scrollEvent;
    var profileHeight = (window.innerHeight * 0.55) - 30;
    $scope.isDeatailContentFixed = false;
    var pledgeContent = document.getElementsByClassName('pledge-content')[0];
    var courseContent = document.getElementsByClassName('course-content')[0];
    var candidacyDetail = document.getElementById('candidacyDetail');
    var detailContentScrollEvent;
    scrollEvent = function (event) {
        var scrollPosition = event.target.scrollTop;
        if(scrollPosition > profileHeight){
            candidacyDetail.classList.add('content-fix');
            $scope.isDeatailContentFixed = true;
        }
    };
    detailContentScrollEvent = function(event) {
        if(event.target.scrollTop === 0){
            candidacyDetail.classList.remove('content-fix');
            candidacyDetail.scrollTop = profileHeight;
        }
    };
    pledgeContent.addEventListener('scroll', detailContentScrollEvent);
    courseContent.addEventListener('scroll', detailContentScrollEvent);
    candidacyDetail.addEventListener('scroll', scrollEvent);


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