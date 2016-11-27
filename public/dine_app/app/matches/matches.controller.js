/* recommended */
var MatchesController = function($scope, MatchesService){
  $scope.matches = MatchesService.getMatches();
  $scope.state = {
      working: !MatchesService.getState().working,
      error: false
  }
  MatchesService.registerObserverCallback(
      function(){
          $scope.matches = MatchesService.getMatches();
      }
  )
};

angular
    .module('dine.matches')
    .controller("MatchesController", MatchesController);

MatchesController.$inject = ['$scope', 'MatchesService'];
