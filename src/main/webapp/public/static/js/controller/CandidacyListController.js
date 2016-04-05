/**
 * Created by sleepbear on 2016. 3. 1..
 */

webing.controller('CandidacyListController', function ($scope, $routeParams, $location,$sce, apiService, webingDataService) {
    var init;
    var currentPopupIndex = 0;
    init = function() {
        $scope.cardChecked = false;
        $scope.district = webingDataService.town;
        $scope.fetchCandidacies($scope.district.districtCode);
    };

    $scope.isPopClosed = webingDataService.visited;

    $scope.popupContent = {};
    $scope.popClose = function() {
        $scope.isPopClosed = webingDataService.visited = true;
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
                    member.experienceArr = member.experience.split('&');
                    member.isReverse = false;
                });
                $scope.candidacise = webingDataService.candidacyList = candidacyMembers;
            });
    };
    $scope.onClickDetail = function(candidacy) {
        $location.path('candidacyDetail/' + candidacy.candidacyId);
    };

    $scope.currentPopup = function() {
        return $scope.popupContentList[currentPopupIndex];
    };
    $scope.nextContent = function() {
        currentPopupIndex += 1;
        $scope.popupContent = $scope.currentPopup();
    };
    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAsHtml(html_code);
    };
    $scope.isLastContent = function() {
        return currentPopupIndex === 4;
    };
    $scope.popupContentList = [{
        title: "키워드로 만나는 후보자",
        img: "/public/static/img/popup_1.png",
        text: "얼굴과 이름, 정당에 대한 선입견 없이<br>후보자에 대한 기사에서 출력된 키워드를 바탕으로<br>관심 가는 후보를 만나보세요.<br>카드를 누르면 어떤 후보인지 알 수 있습니다."
         },
        {
            title: "'모든' 후보자 꼼꼼히 살펴보기",
            img: "/public/static/img/popup_2.png",
            text: "'후보자 상세보기' 버튼을 누르면<br>후보자의 공약과 발자취를 쉽게 확인할 수 있어요.<br> 화살표를 통해 좌우 페이지로 넘어가서<br> '모든 후보자'를 꼼꼼히 살펴보세요!"
        },
        {
            title: "'한 눈에 들어오는' 공약",
            img: "/public/static/img/popup_3.png",
            text: "후보자들의 공약을 군더더기 빼고 싹 가져왔습니다.<br> 공약 제목을 흝어보고, 공약 세부 내용을 자세히 살펴보세요."
        },
        {
            title: "숫자로 보는 19대 재선 후보",
            img: "/public/static/img/popup_4.png",
            text: "국정 참가율, 공약이행률 등<br> 유권자가 꼭 알고 싶은 정보만 빠르게 간추렸습니다.<br>긴긴 국정활동보고서 대신<br>숫자로 후보의 성실도를 가늠해보세요.!"
        }, {
            title: "뉴스 키워드로 후보 살펴보기",
            img: "/public/static/img/popup_5.png",
            text: "후보자에 관련된 기사는 무엇이 있을까요?<br>몇 만개나 되는 기사 중에서 반복 빈도가 높은 키워드를 후출하여 연관 기사를 추려드립니다.<br>후보의 발자취를 꼼꼼히 확인해보세요!"
        }

    ];
    init();

});