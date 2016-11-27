angular.module('dine.services', []);

angular.module('dine.candidates', []);
angular.module('dine.matches', []);
angular.module('dine.account', []);
angular.module('dine.login', []);
angular.module('dine.register', []);

angular.module('dine', ['supersonic',
        'ngRoute',
        'ngResource',
        "leaflet-directive",
        "ui.bootstrap",
        'dine.matches',
        'dine.candidates',
        "dine.services",
        "dine.account",
        "dine.login",
        "dine.register"

    ])
    .controller('IndexController', function($scope, supersonic) {

    });

// app.filter('ageFilter', function() {
//			function calculateAge(birthday) { // birthday is a date
//					var ageDifMs = Date.now() - birthday.getTime();
//					var ageDate = new Date(ageDifMs); // miliseconds from epoch
//					return Math.abs(ageDate.getUTCFullYear() - 1970);
//			}
//
//			return function(birthdate) {
//						return calculateAge(birthdate);
//			};
// });
