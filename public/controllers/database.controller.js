app.controller('databaseController', ['$scope', 'userService', '$http',  function ($scope, userService, $http) {

    $scope.userService = userService;
    $scope.user = userService.user;

    $http.get('http://192.168.0.4:9876/users/rharold/ricks-password')
    .then(function (response) {
        $scope.direct = response.data;
    });

    // $scope.testLogIn = 'String';

}]);