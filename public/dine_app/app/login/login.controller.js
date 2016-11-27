/* recommended */
var LoginController = function($scope, $location,$rootScope, UserService){
    $scope.loginInfo = {
        email: undefined,
        password: undefined
    }
    $scope.working = false;

    $scope.error = undefined;

    $scope.user = undefined;

    $scope.logIn= function(){
        $scope.working = true;
        UserService.login(
            $scope.loginInfo.email,
            $scope.loginInfo.password,
            //successCallback
            function(value){
                $scope.user = UserService.getUser();
                $rootScope.loggedInUser = UserService.getUser();
                $scope.working = false;
                $location.path('/account');
            },

            //failureCallback
            function(error){
                $scope.working = false;
                $scope.error = error.message;
                $scope.loginInfo.password =undefined;
            }

        )
    }
};

angular
    .module('dine.login')
    .controller("LoginController", LoginController);

LoginController.$inject = ['$scope', '$location', "$rootScope","UserService"];
