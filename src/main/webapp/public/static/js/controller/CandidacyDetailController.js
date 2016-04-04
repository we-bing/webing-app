/**
 * Created by sleepbear on 2016. 3. 6..
 */

webing.controller('CandidacyDetailController', function ($scope, $routeParams, $sce ,apiService, webingDataService, sharedDataService) {
    var currentIndex;
    var candidacyListSize = 0;
    var init;
    var updateCandidacy;

    var scrollEvent;
    var windowHeight = window.innerHeight;
    var profileHeight = 222 ;
    var pledgeContent = document.getElementsByClassName('pledge-content')[0];
    var courseContent = document.getElementsByClassName('course-content')[0];
    var candidacyDetail = document.getElementById('candidacyDetail');
    var detailContentScrollEvent;
    var isMenuInvisible = false;
    var fetchFirstNews;
    $scope.pledgeToggle = {};
    $scope.fetchedNews = [];
    scrollEvent = function (event) {

        var currentScrollPosition = event.target.scrollTop;
        if(!isMenuInvisible && currentScrollPosition < windowHeight * 0.01){
            candidacyDetail.classList.add('menu-invisible');
            isMenuInvisible = true;
            event.target.scrollTop = 0;
        }else if( !candidacyDetail.classList.contains('content-fix')
            && currentScrollPosition === 0 ) {
            candidacyDetail.classList.remove('menu-invisible');
            isMenuInvisible = false;
        }
        if(currentScrollPosition > 1 && currentScrollPosition > profileHeight){
            candidacyDetail.classList.add('content-fix');
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

    fetchFirstNews = function() {
        if($scope.currentCandidacy.candidacyKeywordList) {
            var firstCandidacyKeyword = $scope.currentCandidacy.candidacyKeywordList[0].keywordName;
            $scope.selectNewsKeyword(firstCandidacyKeyword);
        }
    };


    $scope.isActivityFolding = true;
    $scope.selectedTab = 'course';

    $scope.isTextTooShort = function(pledge) {
        return pledge.pledgeDescription.length < 50;
    };
    $scope.isTextTooLong = function(pledge) {
        return !$scope.pledgeToggle[pledge.pledgeId] && pledge.pledgeDescription.length > 100;
    };
    init = function() {
        var selectedCandidacyId = $routeParams.candidacyId;
        webingDataService.candidacyList.forEach(function(candidacy, index){
            if(candidacy.candidacyId == selectedCandidacyId){
                currentIndex = sharedDataService.currentDetailCardIndex = index
            }
        });
        candidacyListSize = webingDataService.candidacyList.length;
        updateCandidacy();
    };


    $scope.changeFoldStatus =function() {
        $scope.isActivityFolding = !$scope.isActivityFolding
    };

    $scope.changeToRight = function() {
        $scope.fetchedNews = [];
        sharedDataService.currentDetailCardIndex = currentIndex = (currentIndex+1) % candidacyListSize;
        updateCandidacy();

    };
    $scope.changeToLeft = function() {
        $scope.fetchedNews = [];
        currentIndex -= 1;
        if(currentIndex == -1) currentIndex = candidacyListSize - 1;
        sharedDataService.currentDetailCardIndex = currentIndex;
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
        fetchFirstNews();
    };

    $scope.detailColorChange = function (type) {
        var detailColorClass = [
            'first-card-',
            'second-card-',
            'third-card-',
            'fourth-card-'
        ];
        return detailColorClass[currentIndex % 4] + type;
    };
    $scope.indexNumber = function(index) {
        return index + 1;
    };

    $scope.selectNewsKeyword = function(newKeyword) {
        var candidacyName = $scope.currentCandidacy.name;
        apiService.news(candidacyName, newKeyword)
            .success(function(result) {
                $scope.fetchedNews = result;
            });
    };

    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAsHtml(html_code);
    };
    init();

});