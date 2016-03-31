/**
 * Created by sleepbear on 2016. 3. 6..
 */

webing.controller('CandidacyDetailController', function ($scope, $routeParams, apiService, webingDataService) {
    var currentIndex;
    var candidacyListSize = 0;
    var init;
    var updateCandidacy;

    var scrollEvent;
    var windowHeight = window.innerHeight;
    var profileHeight = 290 ;
    var pledgeContent = document.getElementsByClassName('pledge-content')[0];
    var courseContent = document.getElementsByClassName('course-content')[0];
    var candidacyDetail = document.getElementById('candidacyDetail');
    var detailContentScrollEvent;
    var isMenuInvisible = false;

    $scope.pledgeToggle = {};

    scrollEvent = function (event) {

        var currentScrollPosition = event.target.scrollTop;
        if(!isMenuInvisible && currentScrollPosition < windowHeight * 0.02){
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
    $scope.indexNumber = function(index) {
        return index + 1;
    };
    init();

    $scope.dummyPledgeList = [{
        "pledgeId": 38,
        "candidacyId": 100119827,
        "pledgeTitle": "권역 외상 센터 유치",
        "pledgeDescription": "도내서 발생한 각종 사고의 중증외상환자의 타도 이송에 따른 시간.공간적 제한에 따른 적기 치료 기회를 보장하기 위해 권역외상센터를 유치하겠다"
    }, {
        "pledgeId": 39,
        "candidacyId": 100119827,
        "pledgeTitle": "발달장애인 직업능력개발훈련센터",
        "pledgeDescription": "발달장애인의 재활 및 자립 의지 향상과 사회적 참여 기회를 강화하기 위해서는 확대해야할 사업임에도 불구하고 정부는 오히려 축소하고 있는 실정”이라며 “발달장애인을 위한 직업훈련 인프라 확보와 체계적인 직업훈련을 통한 취업률 향상으로 발달장애인의 삶의 질을 개선시켜주기 위한 노력을 안 하는 국가의 책임이 크다"
    }, {
        "pledgeId": 40,
        "candidacyId": 100119710,
        "pledgeTitle": "도민의 삶에 실질적으로 도움이 되는 특별자치도",
        "pledgeDescription": "제주특별법 전면 개정, 시장직선제 도입, 제주만의 부동사정책 권한 확보 등을 제시했다."
    }, {
        "pledgeId": 41,
        "candidacyId": 100119710,
        "pledgeTitle": "평화와 인권이 살아 숨쉬는 제주·촘촘한 복지안정망 제주공동체",
        "pledgeDescription": " 4·3희생자 추가진상조사 실시 및 진상조사보고서 발간, 4·3희생자 신고 상설화, ‘평화의 섬’ 정책 부활, 마을중심의 복지안전망 구축 등을 제시했다."
    }, {
        "pledgeId": 45,
        "candidacyId": 100118454,
        "pledgeTitle": "택지 개발",
        "pledgeDescription": "마을단위로 추진위원회를 구성하고, 특색있는 택지 개발을 진행해야 한다. 택지 규모는 20~60가구 내외로 전원주택이나 다세대 주택 중심으로 건설해야 한다”며 “이런 소규모 택지개발로 무분별한 건축행위 등 문제를 해결할 수 있다. 이를 위해 주택건설촉진법 등 관련법을 개정하겠다"
    }, {
        "pledgeId": 46,
        "candidacyId": 100118454,
        "pledgeTitle": "악취 방지법 개정",
        "pledgeDescription": "한림 지역 악취를 해결하기 위해서 악취 방지법을 개정하겠다."
    }, {
        "pledgeId": 47,
        "candidacyId": 100118454,
        "pledgeTitle": "제주 전기차 특구로 지정",
        "pledgeDescription": "전기자동차 관련 산업 육성을 위한 특화사업으로 ▲전기차 카셰어링 운영 ▲전기차 안전검사 개발 ▲배터리 재활용체계 구축 ▲전기차 중고차 시장 활성화"
    }];


});