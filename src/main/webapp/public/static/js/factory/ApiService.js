/**
 * Created by sleepbear on 2016. 3. 3..
 */

webing.service("apiService", function($http) {
    return {
        districts: function () {
            var url = 'http://117.17.102.241:8080/api/townList';
            return $http.get(url);
        },
        candidacise: function(districtCode) {
            var url = 'http://117.17.102.241:8080/api/candidacies/' + districtCode;
            return $http.get(url);
        },
        assemblyMember: function(assemblyMemberId) {
            var url = 'http://117.17.102.241:8080/api/assemblyMember/' + assemblyMemberId;
            return $http.get(url);
        }
    };
});