app.controller('appController', ['$scope', '$location', 'sessionService', '$window', function ($scope, $location, sessionService, $window) {

    $scope.loggedIn = sessionService.loggedIn;

    $scope.login = function() {
        sessionService.login();
        $location.path('/dashboard');
        $scope.loggedIn = sessionService.loggedIn;
    };

    $scope.logout = function() {
        sessionService.logout();
        $window.location.href = '/';
    };

}]);