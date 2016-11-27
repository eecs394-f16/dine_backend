/* recommended */
var CandidatesController = function($scope, $location, $timeout,CandidatesService, UserService, LikeService, MatchesService) {
    $scope.test = "Candidates Page Coming Soon!";
    $scope.state = {
        error: undefined,
        working: false
    }
    $scope.match = undefined;
    $scope.candidates = [];
    $scope.user = UserService.getUser();
    var tryCount = 5;

    var init = function(){
        $scope.state.working = true;
        $scope.getNextSetOfMatches();

    }


    $scope.goToMatches = function() {
        $scope.$parent.changeTabs(2);
        $location.path("/matches");
    }

    $scope.removeMatchOverlay = function(){
        $scope.match = false;
    }
    $scope.getNextSetOfMatches = function() {
        $scope.state.working = true;
        CandidatesService.getNextSetOfMatches(
            //successCallback
            function(value) {
                for(var i = 0; i<value.data.length; i ++){
                    if(value.data[i].photo_link == null || value.data[i].photo_link == undefined){
                        value.data[i].photo_link = "http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg";
                        value.data[i].index = i;
                    }
                    if(value.data[i].i_like == true){
                        value.data[i].liked = true
                    }
                }

                $scope.candidates = value.data;
                $scope.state.working = false;
            },
            //failureCallback
            function(error) {
                $scope.state.error = error;
                $scope.state.working = false;
            }
        )
    }


    $scope.like = function(candidate) {
        candidate.liked = true;

        LikeService.like($scope.user.username, candidate.username,
            function(result){
                console.log("Like Worked");
                if(result == "MATCH"){
                    $scope.match = true;
                    MatchesService.addMatch(candidate);
                    $scope.candidates.splice(candidate.index, 1);
                }
                console.log(result);
            },
            function(error){
                console.log("Like didn't work");
                candidate.liked = false;
                console.log(error);
            }
        )
    }

    $scope.unlike = function(candidate) {
        candidate.liked = false;

        LikeService.unlike($scope.user.username, candidate.username,
            function(result){
                console.log("Unlike Worked");
                console.log(result);
            },
            function(error){
                console.log("Unlike didn't work");
                candidate.liked = true;
                console.log(error);
            }
        )
    }


    $scope.viewProfile = function(){
        console.log("viewProfile");
    }



    init();
};

angular
    .module('dine.candidates')
    .controller("CandidatesController", CandidatesController);

CandidatesController.$inject = ['$scope', "$location", "$timeout","CandidatesService", "UserService", "LikeService", "MatchesService"];
