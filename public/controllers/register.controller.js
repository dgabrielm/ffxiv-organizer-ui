app.controller('registerController', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

    $scope.loginMode = true;
    $scope.register = {};

    $scope.toggleLoginMode = function () {
        $scope.loginMode = !$scope.loginMode;
    }

    $scope.login = userService.login;

    $scope.registerFailed = false;
    $scope.registerSuccessful = false;

    $scope.isValidForm = function () {
        return $scope.register.validateEmail === $scope.register.email_address && $scope.register.password === $scope.register.validatePassword;
    };

    // need to implement this to check db for username
    // should cache a list of users on the api so that response can be fast!
    $scope.usernameIsAvailable = function () {
        return true;
    };

    $scope.registerUser = function () {

        // reset user feedback variables
        $scope.registerFailed = false;
        $scope.registerSuccessful = false;

        $http.post('http://192.168.0.4:9876/users/', $scope.register)
            .then(function (response) {
                if (response.data !== null) {
                    $scope.loginMode = true;
                    $scope.registerSuccessful = true;
                } else {
                    $scope.registerFailed = false;
                }
            });

    };

}]);