/**
 * Created by sleepbear on 2016. 3. 3..
 */

webing.service("apiService", function($http) {
    return {
        districts: function () {
            var url = '/api/townList';
            return $http.get(url);
        },
        candidacise: function(districtCode) {
            var url = '/api/candidacies/' + districtCode;
            return $http.get(url);
        },
        assemblyMember: function(assemblyMemberId) {
            var url = '/api/assemblyMember/' + assemblyMemberId;
            return $http.get(url);
        }
    };
});