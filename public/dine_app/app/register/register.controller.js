/* recommended */
var RegisterController = function($scope, $location,$rootScope, UserService){
    $scope.workingState = undefined;
    $scope.error = undefined;
    $scope.accountInfo = {
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        first_name: undefined,
        last_name: undefined,
        username: undefined
    }


    $scope.createAccount= function(){
        $scope.error = undefined;
        $scope.workingState = 'CREATING_ACCOUNT';
        if($scope.accountInfo.password !== $scope.accountInfo.confirmPassword){
            $scope.error = "Both passwords must match!";
            $scope.workingState = undefined;
            return;
        }

        UserService.createAccount(
            $scope.accountInfo,
            //successCallback
            function(value){
                $rootScope.loggedInUser = UserService.getUser();
                $location.path('/register/profile');
            },

            //failureCallback
            function(error){
                if(error.status == 409){
                    $scope.error = "This username already has an account!"
                }
                $scope.accountInfo.password =undefined;
                $scope.accountInfo.confirmPassword =undefined;
                $scope.workingState =undefined;
            }

        )
    }
};

angular
    .module('dine.register')
    .controller("RegisterController", RegisterController);

RegisterController.$inject = ['$scope', '$location', "$rootScope","UserService"];
