app.directive('navBar', [function() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/nav-bar.html',
        transclude: true,
        replace: true,
        controller: function($scope, userService) {
            
            $scope.loggedIn = userService.loggedIn;

            $scope.$watch(function(){
                return userService.loggedIn;
             }, function(newValue, oldValue){
                $scope.loggedIn = userService.loggedIn;
             });

            $scope.login = userService.login;
            $scope.logout = userService.logout;

        }
    };
}]);