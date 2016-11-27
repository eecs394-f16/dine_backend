/* recommended */
var RegisterProfileController = function($scope, $location,$rootScope, UserService, ConfigService){
    $scope.user = UserService.getUser();
    $scope.industries = ConfigService.industries;
    $scope.error = undefined;
    $scope.workingState = undefined;

    $scope.profileInfo = {
        employer: undefined,
        industry: undefined,
        job_title: undefined,
        education: undefined
    }
    var errorHandler = function(){
        $scope.error = error.message;
        $scope.workingState = undefined;
    }

    $scope.createProfile = function(){

        $scope.workingState = "CREATING_PROFILE"
        $scope.profileInfo.industry = $scope.profileInfo.industry.name;
        var updates = [];
        for(var key in $scope.profileInfo){
            updates.push({key: key, value: $scope.profileInfo[key]});
        }

        UserService.updateUser(
            {
                key_name: "username",
                key_value: $scope.user.username,
                updates: updates
            },
            function(){
                $scope.workingState = "LOGGING_IN";
                UserService.login(
                    $scope.user.email,
                    $scope.user.password,
                    function(){
                        $scope.user = UserService.getUser();
                        $rootScope.loggedInUser = UserService.getUser();
                        $location.path('/account');
                    },
                    errorHandler
                )
            },
            errorHandler
        )
    }
}
angular
    .module('dine.register')
    .controller("RegisterProfileController", RegisterProfileController);

RegisterProfileController.$inject = ['$scope', '$location', "$rootScope","UserService", "ConfigService"];
