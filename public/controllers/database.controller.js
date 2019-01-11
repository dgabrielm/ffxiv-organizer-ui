app.controller('databaseController', ['$scope', 'sessionService', function ($scope, sessionService) {

    $scope.testLogIn = sessionService.loggedIn;

    // $scope.testLogIn = 'String';

}]);