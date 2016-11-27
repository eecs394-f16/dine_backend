var appServices = angular.module('dine.services');

appServices.factory('LikeService', ['$http', "ConfigService", 'UserService',function($http, ConfigService, UserService) {
    var user = UserService.getUser();

    var like = function(person_liking, person_being_liked, success, failure) {
        var req = {
                method: 'POST',
                url: ConfigService.url + "/like",
                params: {
                    person_liking: person_liking,
                    person_being_liked: person_being_liked
                }
            }

        $http(req).then(
            function(value) {
                success(value.data.result);
            },
            function(error) {
                failure(error);
            }
        );

    };

    var unlike = function(person_unliking, person_being_unliked, success, failure) {
        var req = {
                method: 'POST',
                url: ConfigService.url + "/unlike",
                params: {
                    person_unliking: person_unliking,
                    person_being_unliked: person_being_unliked
                }
            }

        $http(req).then(
            function(value) {
                success(user);
            },
            function(error) {
                failure(error);
            }
        );

    };


    return {
        like: like,
        unlike: unlike
    }
}]);
