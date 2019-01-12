app.controller('registerController', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

    $scope.logInMode = true;

    $scope.toggleLogInMode = function() {
        $scope.logInMode = !$scope.logInMode;
    };

    $scope.login = userService.login;

    $scope.isValidForm = function() {
        return $scope.register.validateEmail === $scope.register.email_address && $scope.register.password === $scope.register.validatePassword;
    };

    // need to implement this to check db for username
    // should cache a list of users on the api so that response can be fast!
    $scope.usernameIsAvailable = function() {
        return true;
    };

    // need to implement to create user on db
    $scope.registerUser = function() {

    };

}]);