/* recommended */
var AccountController = function($scope, $window, UserService) {
    $scope.test = "accounts page coming soon";
    $scope.user = UserService.getUser();
    $scope.state = {
        error: undefined,
        working: true
    };
    $scope.pos = 'one';

    $scope.center = {
        lat: 42.0451,
        lng: -87.6877,
        zoom: 2
    }

    $scope.markers = {}

    $scope.loc = navigator.geolocation.getCurrentPosition(function(position) {
        $scope.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 20
        }

        $scope.markers = {
            currentLoc: {
                lat: $scope.center.lat,
                lng: $scope.center.lng,
                focus: true
            }
        }
    });


    if ($scope.user == undefined) {
        UserService.getAccount(
            //successCallback
            function(value) {
                $scope.user = value.data[0];
                $scope.state.working = false;
                var keys = ['education', 'industry', 'job_title', 'employer'];

                for(var i = 0; i < keys.length; i++){
                    $scope.user[key] = $scope.user[key].charAt(0).toUpperCase() + $scope.user[key].substring(1);
                }


            },
            //failureCallback
            function(error) {
                $scope.error = error;
                $scope.state.working = false;
            }
        );
    } else {
        $scope.state.working = false;
    }

};

angular
    .module('dine.account')
    .controller("AccountController", AccountController);

AccountController.$inject = ['$scope', "$window", "UserService"];
