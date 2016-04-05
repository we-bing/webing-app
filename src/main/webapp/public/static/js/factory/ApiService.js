/**
 * Created by sleepbear on 2016. 3. 3..
 */

webing.service("apiService", function($http) {
    var apiUrl = "http://117.17.102.241:8080";
    return {
        districts: function () {
            var url = apiUrl + '/api/townList';
            return $http.get(url);
        },
        cityList: function () {
            var url = apiUrl + '/api/cityList';
            return $http.get(url);
        },
        countyList: function (cityCode) {
            var url = apiUrl + '/api/countyList/'+cityCode ;
            return $http.get(url);
        },
        townList: function (countyCode) {
            var url = apiUrl + '/api/townList/'+countyCode;
            return $http.get(url);
        },
        candidacise: function(districtCode) {
            var url = apiUrl + '/api/candidacies/' + districtCode;
            return $http.get(url);
        },
        assemblyMember: function(assemblyMemberId) {
            var url = apiUrl + '/api/assemblyMember/' + assemblyMemberId;
            return $http.get(url);
        },
        news : function(candidacyName, newsKeyword) {
            var url = apiUrl + '/api/newsKeywords';
            var config = {
                params: {
                    query: candidacyName + " " + newsKeyword
                }
            };
            return $http.get(url, config);
        }
    };
});