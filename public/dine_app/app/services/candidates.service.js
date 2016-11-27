var appServices = angular.module('dine.services');

appServices.factory('CandidatesService', ["$http", "UserService", "ConfigService", function($http, UserService, ConfigService) {

    var userManuallyInitialized = false;
    var user = UserService.getUser();

    var getNextSetOfMatches = function(successCallback, failureCallback) {
        if (user.id == -1 && userManuallyInitialized) {
            user = UserService.getUser();
        }

        if (user.id == -1) {
            failureCallback({
                id: -1,
                message: "user must be logged in"
            });
        }

        var req = {
            method: 'GET',
            url: ConfigService.url + "/candidate",
            params: {
                userId: user.id
            }
        }


        $http(req).then(
            function(value) {
                successCallback(value);
            },
            function(error) {
                failureCallback(error);
            }
        );

    }

    var swipeRight = function(id) {
        console.log("swipe right");
    }

    var swipeLeft = function() {
        console.log("swipe left");
    }




    return {
        getNextSetOfMatches: getNextSetOfMatches,
        swipeRight: swipeRight,
        swipeLeft: swipeLeft
    }

}]);
