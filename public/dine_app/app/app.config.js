(function(angular) {

    angular.module("dine")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/account', {
                templateUrl: 'app/account/main.html',
                controller: 'AccountController'
            }).
            when('/candidates', {
                templateUrl: 'app/candidates/main.html',
                controller: 'CandidatesController'
            }).
            when('/matches', {
                templateUrl: "app/matches/main.html",
                controller: "MatchesController"
            }).
            when('/login', {
                templateUrl: "app/login/main.html",
                controller: "LoginController"
            }).
            when('/register', {
                templateUrl: "app/register/main.html",
                controller: "RegisterController"
            }).
            when('/register/profile', {
                templateUrl: "app/register/profile.html",
                controller: "RegisterProfileController"
            }).
            otherwise({
                redirectTo: '/candidates'
            });

        }])
        .run(function($rootScope, $location) {
            // register listener to watch route changes
            $rootScope.$on("$routeChangeStart", function(event, next, current) {
                if ($rootScope.loggedInUser == null) {
                    // no logged user, we should be going to #login
                    if (next.templateUrl == "app/login/main.html" || next.templateUrl=="app/register/main.html"|| next.templateUrl=="app/register/profile.html") {
                        // already going to #login, no redirect needed
                    } else {
                        // not going to #login, we should redirect now
                        $location.path("/login");
                    }
                }
            });
        });


}(angular));
