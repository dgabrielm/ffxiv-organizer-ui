app.directive('navBar', [function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/nav-bar.html',
        transclude: true,
        replace: true,
        controller: function ($scope, userService, userAuthService) {
            
            // loggedIn status watched from user service
            $scope.loggedIn = userService.loggedIn;
            $scope.$watch(function () {
                return userService.loggedIn;
            }, function (newValue, oldValue) {
                $scope.loggedIn = userService.loggedIn;
            });

            // watching user service to set username 
            $scope.$watch(function () {
                return userService.user;
            }, function (newValue, oldValue) {
                $scope.username = userService.getUsername();
            });

            $scope.login = userAuthService.login;
            $scope.logout = userAuthService.logout;

        }
    }
}]);