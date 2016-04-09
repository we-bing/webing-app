/**
 * Created by sleepbear on 2016. 3. 3..
 */

webing.service("apiService", function($http) {

    return {
        districts: function () {
            var url = '/api/townList';
            return $http.get(url);
        },
        cityList: function () {
            var url = '/api/cityList';
            return $http.get(url);
        },
        countyList: function (cityCode) {
            var url = '/api/countyList/'+cityCode ;
            return $http.get(url);
        },
        townList: function (countyCode) {
            var url = '/api/townList/'+countyCode;
            return $http.get(url);
        },
        candidacise: function(districtCode) {
            var url = '/api/candidacies/' + districtCode;
            return $http.get(url);
        },
        assemblyMember: function(assemblyMemberId) {
            var url = '/api/assemblyMember/' + assemblyMemberId;
            return $http.get(url);
        },
        news : function(candidacyName, newsKeyword) {
            var url = '/api/newsKeywords';
            var config = {
                params: {
                    query: candidacyName + " " + newsKeyword
                }
            };
            return $http.get(url, config);
        }
    };
});