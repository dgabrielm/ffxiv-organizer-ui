app.controller('databaseController', ['$scope', '$http', 'searchResultsService', function ($scope, $http, searchResultsService) {

    $scope.searchDatabase = function () {

        $http.get('http://192.168.0.4:6789/items/name/' + $scope.searchQuery)
            .then(function (response) {
                if (response.data !== null) {
                    // userService.user = response.data;
                    // userService.loggedIn = true;
                    // $location.path('/dashboard');
                    $scope.results = response.data;
                } else {
                    // // need to use this variable to provide some visual feedback
                    // userService.loginFailed = true;
                }
            });

    };

    $scope.convertIcon = function(icon) {
        return '026000/026001';
    }

}]);