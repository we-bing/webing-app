/**
 * Created by sleepbear on 2016. 3. 1..
 */

'use strict';
var webing = angular.module('webingApp', ['ngRoute']);

webing
    .controller('WebingController', function ($scope, $location, $anchorScroll, apiService, webingDataService, sharedDataService) {
        $scope.isMenuOpen = false;
        $scope.isSelectBoxOpen = false;
        $scope.dataModel = {};
        var fetchCityList;
        var init;
        var divideTownName;
        var dummyTown = {
            "townCode": 4739,
            "districtCode": 2110101,
            "districtName": "종로구",
            "cityCode": 1100,
            "townName": "종로구 사직동",
            "townNameArr": ["종로구", "사직동"],
            "$$hashKey": "object:41"
        };
        var dummyCandidacyList = [{
            "candidacyId": 100118396,
            "assemblyId": 0,
            "birth": "1953/12/10,(62세)",
            "party": "새누리당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100118396/gicho/100118396.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 종로56길",
            "education": "서울대학교 법학과 졸업",
            "criminal": "1건",
            "name": "정인봉",
            "candidacyStatus": "U",
            "experience": "(전) 국회의원,(현) 새누리당 종로구 위원장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5801,
                "keywordName": "전",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5802,
                "keywordName": "시장",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5803,
                "keywordName": "의원",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5804,
                "keywordName": "것",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5805,
                "keywordName": "위원장",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5806,
                "keywordName": "박",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5807,
                "keywordName": "오",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5808,
                "keywordName": "정치",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5809,
                "keywordName": "상대",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5810,
                "keywordName": "새누리당",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5811,
                "keywordName": "사람",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5812,
                "keywordName": "종",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5813,
                "keywordName": "선거",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5814,
                "keywordName": "말",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5815,
                "keywordName": "고발",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5816,
                "keywordName": "출마",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5817,
                "keywordName": "총선",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5818,
                "keywordName": "국회의원",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {
                "keywordId": 5819,
                "keywordName": "생각",
                "candidacyId": 100118396,
                "keywordStatus": "A"
            }, {"keywordId": 5820, "keywordName": "적", "candidacyId": 100118396, "keywordStatus": "A"}],
            "experienceArr": ["(전) 국회의원", "(현) 새누리당 종로구 위원장"],
            "isReverse": false
        }, {
            "candidacyId": 100118435,
            "assemblyId": 0,
            "birth": "1956/09/16,(59세)",
            "party": "새누리당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100118435/gicho/100118435.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 동숭3길",
            "education": "옥스퍼드대학교 정치학 박사(1985.10. ~ 1994.1.)",
            "criminal": "없음",
            "name": "박진",
            "candidacyStatus": "U",
            "experience": "(전) 국회 외교통상통일위원장,(현) 사단법인 아시아미래연구원 이사장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5761,
                "keywordName": "전",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5762,
                "keywordName": "의원",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5763,
                "keywordName": "예비후보",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5764,
                "keywordName": "지역",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5765,
                "keywordName": "종",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5766,
                "keywordName": "새누리당",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5767,
                "keywordName": "출마",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5768,
                "keywordName": "오",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5769,
                "keywordName": "시장",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5770,
                "keywordName": "등록",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5771,
                "keywordName": "경선",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5772,
                "keywordName": "때",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5773,
                "keywordName": "박사",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5774,
                "keywordName": "박",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5775,
                "keywordName": "미",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5776,
                "keywordName": "요청",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5777,
                "keywordName": "가능성",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5778,
                "keywordName": "당내",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {
                "keywordId": 5779,
                "keywordName": "총선",
                "candidacyId": 100118435,
                "keywordStatus": "A"
            }, {"keywordId": 5780, "keywordName": "명예", "candidacyId": 100118435, "keywordStatus": "A"}],
            "experienceArr": ["(전) 국회 외교통상통일위원장", "(현) 사단법인 아시아미래연구원 이사장"],
            "isReverse": false
        }, {
            "candidacyId": 100118613,
            "assemblyId": 0,
            "birth": "1961/01/04,(55세)",
            "party": "새누리당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100118613/gicho/100118613.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 혜화로3길",
            "education": "고려대학교 대학원(법학박사) 졸업",
            "criminal": "없음",
            "name": "오세훈",
            "candidacyStatus": "U",
            "experience": "(전) 제33, 34대 서울특별시장,(현) 고려대학교 기술경영전문대학원 석좌교수",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5781,
                "keywordName": "전",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5782,
                "keywordName": "부문",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5783,
                "keywordName": "대표",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5784,
                "keywordName": "등",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5785,
                "keywordName": "시장",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5786,
                "keywordName": "오",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5787,
                "keywordName": "국회의원",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5788,
                "keywordName": "사회",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5789,
                "keywordName": "시상식",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5790,
                "keywordName": "진행",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5791,
                "keywordName": "△의정활동",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5792,
                "keywordName": "대한민국가족지킴",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5793,
                "keywordName": "수",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5794,
                "keywordName": "수행",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5795,
                "keywordName": "국",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5796,
                "keywordName": "기술경영전문대학원(MOT)",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5797,
                "keywordName": "행복",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5798,
                "keywordName": "이날",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {
                "keywordId": 5799,
                "keywordName": "청소년들",
                "candidacyId": 100118613,
                "keywordStatus": "A"
            }, {"keywordId": 5800, "keywordName": "석좌교수", "candidacyId": 100118613, "keywordStatus": "A"}],
            "experienceArr": ["(전) 제33", " 34대 서울특별시장", "(현) 고려대학교 기술경영전문대학원 석좌교수"],
            "isReverse": false
        }, {
            "candidacyId": 100119121,
            "assemblyId": 0,
            "birth": "1967/07/15,(48세)",
            "party": "새누리당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119121/gicho/100119121.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 인왕산로1가길",
            "education": "한양대학교 경영학과 졸업",
            "criminal": "3건",
            "name": "장창태",
            "candidacyStatus": "U",
            "experience": "(전) 19대 종로구 국회의원(예비) 출마,(현) 21C 종로발전포럼 대표",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5841,
                "keywordName": "전",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5842,
                "keywordName": "의원",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5843,
                "keywordName": "종",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5844,
                "keywordName": "오",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5845,
                "keywordName": "총선",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5846,
                "keywordName": "시장",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5847,
                "keywordName": "예비후보",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5848,
                "keywordName": "지역",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5849,
                "keywordName": "박",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5850,
                "keywordName": "새누리당",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5851,
                "keywordName": "출마",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5852,
                "keywordName": "서울시장",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5853,
                "keywordName": "경선",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5854,
                "keywordName": "등",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5855,
                "keywordName": "당내",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5856,
                "keywordName": "후보",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5857,
                "keywordName": "등록",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5858,
                "keywordName": "정세균",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {
                "keywordId": 5859,
                "keywordName": "18대",
                "candidacyId": 100119121,
                "keywordStatus": "A"
            }, {"keywordId": 5860, "keywordName": "것", "candidacyId": 100119121, "keywordStatus": "A"}],
            "experienceArr": ["(전) 19대 종로구 국회의원(예비) 출마", "(현) 21C 종로발전포럼 대표"],
            "isReverse": false
        }, {
            "candidacyId": 100119143,
            "assemblyId": 0,
            "birth": "1955/09/16,(60세)",
            "party": "새누리당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119143/gicho/100119143.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 삼일대로28길",
            "education": "고등학교 졸업학력 검정고시 합격",
            "criminal": "3건",
            "name": "김막걸리",
            "candidacyStatus": "U",
            "experience": "(전) 일어강사,(현) 새누리당 중앙위 사회복지분과 부위원장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5821,
                "keywordName": "전",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5822,
                "keywordName": "의원",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5823,
                "keywordName": "종",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5824,
                "keywordName": "오",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5825,
                "keywordName": "총선",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5826,
                "keywordName": "시장",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5827,
                "keywordName": "예비후보",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5828,
                "keywordName": "지역",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5829,
                "keywordName": "박",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5830,
                "keywordName": "새누리당",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5831,
                "keywordName": "출마",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5832,
                "keywordName": "서울시장",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5833,
                "keywordName": "경선",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5834,
                "keywordName": "등",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5835,
                "keywordName": "당내",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5836,
                "keywordName": "후보",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5837,
                "keywordName": "등록",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5838,
                "keywordName": "정세균",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {
                "keywordId": 5839,
                "keywordName": "18대",
                "candidacyId": 100119143,
                "keywordStatus": "A"
            }, {"keywordId": 5840, "keywordName": "것", "candidacyId": 100119143, "keywordStatus": "A"}],
            "experienceArr": ["(전) 일어강사", "(현) 새누리당 중앙위 사회복지분과 부위원장"],
            "isReverse": false
        }, {
            "candidacyId": 100119211,
            "assemblyId": 0,
            "birth": "1968/12/13,(47세)",
            "party": "녹색당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119211/gicho/100119211.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 자하문로12길",
            "education": "미기재",
            "criminal": "없음",
            "name": "하승수",
            "candidacyStatus": "U",
            "experience": "(전) 참여연대 협동사무처장,(현) 녹색당 공동운영위원장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5961,
                "keywordName": "테러방지법",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5962,
                "keywordName": "필리버스터",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5963,
                "keywordName": "의원",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5964,
                "keywordName": "것",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5965,
                "keywordName": "등",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5966,
                "keywordName": "시민",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5967,
                "keywordName": "국회",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5968,
                "keywordName": "수",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5969,
                "keywordName": "선관위",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5970,
                "keywordName": "참여연대",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5971,
                "keywordName": "시민들",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5972,
                "keywordName": "녹색당",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5973,
                "keywordName": "반대",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5974,
                "keywordName": "선거구",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5975,
                "keywordName": "야당",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5976,
                "keywordName": "발언",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5977,
                "keywordName": "기",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5978,
                "keywordName": "앞",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {
                "keywordId": 5979,
                "keywordName": "더불어민주당",
                "candidacyId": 100119211,
                "keywordStatus": "A"
            }, {"keywordId": 5980, "keywordName": "말", "candidacyId": 100119211, "keywordStatus": "A"}],
            "experienceArr": ["(전) 참여연대 협동사무처장", "(현) 녹색당 공동운영위원장"],
            "isReverse": false
        }, {
            "candidacyId": 100119321,
            "assemblyId": 228,
            "birth": "1950/09/26,(65세)",
            "party": "더불어민주당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119321/gicho/100119321.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 동망산길",
            "education": "고려대학교 법학과 졸업",
            "criminal": "없음",
            "name": "정세균",
            "candidacyStatus": "U",
            "experience": "(전)민주당 대표,(전)노무현정부 산업자원부 장관",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5861,
                "keywordName": "것",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5862,
                "keywordName": "의원",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5863,
                "keywordName": "장관",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5864,
                "keywordName": "그",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5865,
                "keywordName": "북한",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5866,
                "keywordName": "수",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5867,
                "keywordName": "개성공단",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5868,
                "keywordName": "당",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5869,
                "keywordName": "말",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5870,
                "keywordName": "전",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5871,
                "keywordName": "대표",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5872,
                "keywordName": "정부",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5873,
                "keywordName": "당시",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5874,
                "keywordName": "등",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5875,
                "keywordName": "대통령",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5876,
                "keywordName": "연대",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5877,
                "keywordName": "때",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5878,
                "keywordName": "평화",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {
                "keywordId": 5879,
                "keywordName": "홍",
                "candidacyId": 100119321,
                "keywordStatus": "A"
            }, {"keywordId": 5880, "keywordName": "통일부", "candidacyId": 100119321, "keywordStatus": "A"}],
            "experienceArr": ["(전)민주당 대표", "(전)노무현정부 산업자원부 장관"],
            "isReverse": false
        }, {
            "candidacyId": 100119424,
            "assemblyId": 0,
            "birth": "1948/03/11,(68세)",
            "party": "개혁국민신당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119424/gicho/100119424.jpg",
            "gender": "남",
            "address": "서울특별시 서초구 서초중앙로",
            "education": "심천초등학교 졸업",
            "criminal": "3건",
            "name": "박세준",
            "candidacyStatus": "U",
            "experience": "(전)한국특허신지식인 초대회장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5921,
                "keywordName": "전",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5922,
                "keywordName": "의원",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5923,
                "keywordName": "종",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5924,
                "keywordName": "오",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5925,
                "keywordName": "총선",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5926,
                "keywordName": "후보",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5927,
                "keywordName": "서울시장",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5928,
                "keywordName": "시장",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5929,
                "keywordName": "경우",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5930,
                "keywordName": "등",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5931,
                "keywordName": "박",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5932,
                "keywordName": "이번",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5933,
                "keywordName": "정세균",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5934,
                "keywordName": "18대",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5935,
                "keywordName": "오차범위",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5936,
                "keywordName": "것",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5937,
                "keywordName": "당내",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5938,
                "keywordName": "출마",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {
                "keywordId": 5939,
                "keywordName": "지역구",
                "candidacyId": 100119424,
                "keywordStatus": "A"
            }, {"keywordId": 5940, "keywordName": "기", "candidacyId": 100119424, "keywordStatus": "A"}],
            "experienceArr": ["(전)한국특허신지식인 초대회장"],
            "isReverse": false
        }, {
            "candidacyId": 100119692,
            "assemblyId": 0,
            "birth": "1961/06/07,(54세)",
            "party": "무소속",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119692/gicho/100119692.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 성균관로5길",
            "education": "전북대학교 공과대학 토목공학과 졸업",
            "criminal": "없음",
            "name": "김대한",
            "candidacyStatus": "U",
            "experience": "(전)주독일외환은행 근무,(전)DHMG GmbH 대표",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5981,
                "keywordName": "의원",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5982,
                "keywordName": "전",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5983,
                "keywordName": "국민의당",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5984,
                "keywordName": "새누리당",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5985,
                "keywordName": "지역구",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5986,
                "keywordName": "더민주",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5987,
                "keywordName": "등",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5988,
                "keywordName": "예비후보",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5989,
                "keywordName": "등록",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5990,
                "keywordName": "총선",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5991,
                "keywordName": "대표",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5992,
                "keywordName": "공천",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5993,
                "keywordName": "중",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5994,
                "keywordName": "더민주에선",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5995,
                "keywordName": "무소속",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5996,
                "keywordName": "신청",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5997,
                "keywordName": "◇",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5998,
                "keywordName": "도전장",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {
                "keywordId": 5999,
                "keywordName": "새누리당에선",
                "candidacyId": 100119692,
                "keywordStatus": "A"
            }, {"keywordId": 6000, "keywordName": "공동대표", "candidacyId": 100119692, "keywordStatus": "A"}],
            "experienceArr": ["(전)주독일외환은행 근무", "(전)DHMG GmbH 대표"],
            "isReverse": false
        }, {
            "candidacyId": 100119833,
            "assemblyId": 0,
            "birth": "1963/02/28,(53세)",
            "party": "국민의당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119833/gicho/100119833.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 진흥로22길",
            "education": "서울대학교 대학원 생물학과 졸업(이학박사)",
            "criminal": "없음",
            "name": "박태순",
            "candidacyStatus": "U",
            "experience": "(전)참여정부 대통령비서실 정책자문위원,(현)국민의당 국민소통기획위원장",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5881,
                "keywordName": "전",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5882,
                "keywordName": "국민의당",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5883,
                "keywordName": "유권자",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5884,
                "keywordName": "것",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5885,
                "keywordName": "국회",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5886,
                "keywordName": "찬성",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5887,
                "keywordName": "법안",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5888,
                "keywordName": "국민회",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5889,
                "keywordName": "새정치민주연합",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5890,
                "keywordName": "의원",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5891,
                "keywordName": "국회의원",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5892,
                "keywordName": "이상",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5893,
                "keywordName": "임명",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5894,
                "keywordName": "대외협력위원장",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5895,
                "keywordName": "이날",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5896,
                "keywordName": "국민발안",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5897,
                "keywordName": "발",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5898,
                "keywordName": "Δ국민발안",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {
                "keywordId": 5899,
                "keywordName": "지역구",
                "candidacyId": 100119833,
                "keywordStatus": "A"
            }, {"keywordId": 5900, "keywordName": "파면", "candidacyId": 100119833, "keywordStatus": "A"}],
            "experienceArr": ["(전)참여정부 대통령비서실 정책자문위원", "(현)국민의당 국민소통기획위원장"],
            "isReverse": false
        }, {
            "candidacyId": 100119998,
            "assemblyId": 0,
            "birth": "1989/09/27,(26세)",
            "party": "국민의당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100119998/gicho/100119998.jpg",
            "gender": "여",
            "address": "서울특별시 종로구 북촌로9길",
            "education": "동아대학교 예술대학 미술학부 졸업",
            "criminal": "없음",
            "name": "김정윤",
            "candidacyStatus": "U",
            "experience": "(현)한옥 브랜드 명가재 대표",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5901,
                "keywordName": "의원",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5902,
                "keywordName": "전",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5903,
                "keywordName": "국민의당",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5904,
                "keywordName": "새누리당",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5905,
                "keywordName": "지역구",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5906,
                "keywordName": "더민주",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5907,
                "keywordName": "등",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5908,
                "keywordName": "예비후보",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5909,
                "keywordName": "등록",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5910,
                "keywordName": "총선",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5911,
                "keywordName": "대표",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5912,
                "keywordName": "공천",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5913,
                "keywordName": "중",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5914,
                "keywordName": "더민주에선",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5915,
                "keywordName": "무소속",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5916,
                "keywordName": "신청",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5917,
                "keywordName": "◇",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5918,
                "keywordName": "도전장",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {
                "keywordId": 5919,
                "keywordName": "새누리당에선",
                "candidacyId": 100119998,
                "keywordStatus": "A"
            }, {"keywordId": 5920, "keywordName": "공동대표", "candidacyId": 100119998, "keywordStatus": "A"}],
            "experienceArr": ["(현)한옥 브랜드 명가재 대표"],
            "isReverse": false
        }, {
            "candidacyId": 100120092,
            "assemblyId": 0,
            "birth": "1963/04/21,(52세)",
            "party": "정의당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100120092/gicho/100120092.jpg",
            "gender": "남",
            "address": "서울특별시 서대문구 홍은중앙로3길",
            "education": "미기재",
            "criminal": "3건",
            "name": "윤공규",
            "candidacyStatus": "U",
            "experience": "(전)개혁국민정당 종로구운영위원,(전)국민참여당 종로구운영위원",
            "candidacyPledge": [],
            "candidacyKeywordList": [],
            "experienceArr": ["(전)개혁국민정당 종로구운영위원", "(전)국민참여당 종로구운영위원"],
            "isReverse": false
        }, {
            "candidacyId": 100120143,
            "assemblyId": 0,
            "birth": "1958/02/26,(58세)",
            "party": "무소속",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100120143/gicho/100120143.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 사직로8길",
            "education": "건국대학교 경영대학원(중소기업학과) 석사",
            "criminal": "1건",
            "name": "이원옥",
            "candidacyStatus": "U",
            "experience": "(전)평화민주당 중앙당직자",
            "candidacyPledge": [],
            "candidacyKeywordList": [],
            "experienceArr": ["(전)평화민주당 중앙당직자"],
            "isReverse": false
        }, {
            "candidacyId": 100120147,
            "assemblyId": 0,
            "birth": "1978/12/16,(37세)",
            "party": "노동당",
            "districtCode": 2110101,
            "candidacyImg": "/photo_20160413/Sd1100/Gsg1101/Sgg2110101/Hb100120147/gicho/100120147.jpg",
            "gender": "남",
            "address": "서울특별시 종로구 자하문로",
            "education": "미기재",
            "criminal": "없음",
            "name": "김한울",
            "candidacyStatus": "U",
            "experience": "(전)서촌주거공간연구회 사무국장,(현)노동당 부대표",
            "candidacyPledge": [],
            "candidacyKeywordList": [{
                "keywordId": 5941,
                "keywordName": "것",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5942,
                "keywordName": "혜인씨",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5943,
                "keywordName": "삶",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5944,
                "keywordName": "청년들",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5945,
                "keywordName": "말",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5946,
                "keywordName": "청년",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5947,
                "keywordName": "정치",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5948,
                "keywordName": "후보",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5949,
                "keywordName": "노동당",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5950,
                "keywordName": "때",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5951,
                "keywordName": "참여",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5952,
                "keywordName": "문제",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5953,
                "keywordName": "일",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5954,
                "keywordName": "정당",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5955,
                "keywordName": "세월호",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5956,
                "keywordName": "대학",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5957,
                "keywordName": "사회",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5958,
                "keywordName": "수",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {
                "keywordId": 5959,
                "keywordName": "기획",
                "candidacyId": 100120147,
                "keywordStatus": "A"
            }, {"keywordId": 5960, "keywordName": "고민", "candidacyId": 100120147, "keywordStatus": "A"}],
            "experienceArr": ["(전)서촌주거공간연구회 사무국장", "(현)노동당 부대표"],
            "isReverse": false
        }];
        function goToTest() {
            $scope.selectedTown = dummyTown;
            webingDataService.town = $scope.selectedTown;
            webingDataService.candidacyList = dummyCandidacyList;
            //$location.path('candidacyList/' + webingDataService.town.districtCode);
            $location.path('candidacyDetail/100118396');
        }

        init = function() {
            fetchCityList();
            webingDataService.town = JSON.parse(localStorage.getItem('selectedTown'));
            //$location.path("home");
            goToTest();
        };

        divideTownName = function (cityList) {
            cityList.forEach(function(city){
                city.townList.forEach(function (town) {
                    town.townNameArr = town.townName.split(" ");
                });
            });
        };

        fetchCityList = function() {
            $scope.cityList = JSON.parse(localStorage.getItem('cityList'));
            if($scope.cityList === null) {
                apiService.districts().success(function(data) {
                    divideTownName(data);
                    $scope.cityList= data;
                    localStorage.setItem('cityList', JSON.stringify(data));
                });
            }
        };

        $scope.focusInput = function() {
            $scope.isSelectBoxOpen = true;
        };
        $scope.blurInput = function() {
        };
        $scope.selectTown = function (town) {
            $scope.dataModel.townNameModel = town.townNameArr[1];
            $scope.isSelectBoxOpen = false;
            $scope.selectedTown = town;
        };

        $scope.complete = function () {
            $scope.dataModel.townNameModel = '';
            $scope.isSelectBoxOpen = false;
            sharedDataService.canSearchTownOpen = false;
            webingDataService.town = $scope.selectedTown;
            localStorage.setItem('selectedTown', JSON.stringify($scope.selectedTown));
            $location.path('candidacyList/' + webingDataService.town.districtCode);
        };

        $scope.canOpenSelectBox = function() {
            return sharedDataService.canSearchTownOpen === true;
        };

        $scope.searchCancel = function() {
            sharedDataService.canSearchTownOpen = false;
        };

        $scope.back = function() {
            window.history.back();
        };

        $scope.menuClassToggle = function () {
            $scope.isMenuOpen = !$scope.isMenuOpen;
        };

        $scope.isPathHome = function() {
            return $location.path() === "/home";
        };

        $scope.isPathOther = function() {
            return $location.path() !== "/home";
        };
        $scope.isDetail = function() {
            return $location.path() !== "/candidacyDetail";
        };

        $scope.goToAnchor = function(anchorName) {
            if($location.path() !== "/home"){
                $location.path("home");
            }
            $location.hash(anchorName);
            $anchorScroll();
        };
        init();

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'public/static/view/home.html',
                controller: 'HomeController'
            })
            .when('/candidacyList/:districtCode', {
                templateUrl: 'public/static/view/candidacyList.html',
                controller: 'CandidacyListController'
            })
            .when('/candidacyDetail/:candidacyId', {
                templateUrl: 'public/static/view/candidacyDetail.html',
                controller: 'CandidacyDetailController'
            });

    });