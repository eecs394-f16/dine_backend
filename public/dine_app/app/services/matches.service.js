var appServices = angular.module('dine.services');

appServices.factory('MatchesService', ["UserService", "ConfigService", "$http", function(UserService, ConfigService, $http) {

    var matches = [];
    var user = UserService.getUser();
    var observerCallbacks = [];
    var error = undefined;
    var state = {
        working: true,
        error: false
    };



    if(user.id == -1){
        error = "you must be logged in to see your matches";
        $scope.error = true;;
    }

    var getMatchesFromServer = function() {
        var req = {
                method: 'GET',
                url: ConfigService.url + "/matches",
                params: {
                    userId: user.id
                }
            }
        state.working = true;
        $http(req).then(
            function(value) {
                matches = value.data;
                notifyObservers();
                state.working = false;
            },
            function(server_error) {
                console.log(server_error);
                state.working = false;
                state.error = true;
                error = server_error;
            }
        );

    };


    var addMatch = function(candidate){
        matches.push(candidate)
    };

    var getMatches = function(){
        return matches;
    };

    var getState = function(){
        return state
    }

    //register an observer
    var registerObserverCallback = function(callback) {
        observerCallbacks.push(callback);
    };

    //call this when you know 'foo' has been changed
    var notifyObservers = function() {
        angular.forEach(observerCallbacks, function(callback) {
            callback();
        });
    };

    getMatchesFromServer();

    return {
        addMatch: addMatch,
        getMatches: getMatches,
        getMatchesFromServer: getMatchesFromServer,
        getState: getState,
        registerObserverCallback
    }
}]);
