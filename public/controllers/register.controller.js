app.controller('registerController', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

    $scope.loginMode = true;
    $scope.register = {};

    $scope.resetVisualFeedbackVars = function () {
        $scope.registerFailed = false;
        $scope.registerSuccessful = false;
        $scope.usernameNotAvailable = false;
        userService.loginFailed = false;
        $scope.loginFailed = false;
    };

    $scope.$watch(function () {
        return userService.loginFailed;
    }, function (newValue, oldValue) {
        $scope.loginFailed = userService.loginFailed;
    });

    $scope.toggleLoginMode = function () {
        $scope.loginMode = !$scope.loginMode;
    }

    $scope.login = function (usr, pwd) {
        $scope.resetVisualFeedbackVars();
        userService.login(usr, pwd)
            .catch(function (error) {
                $scope.loginFailed = true;
            });
    };

    $scope.isValidForm = function () {
        return $scope.register.validateEmail === $scope.register.email_address && $scope.register.password === $scope.register.validatePassword;
    };

    $scope.usernameIsAvailable = function () {
        $scope.resetVisualFeedbackVars();
        var rtn = true;
        userService.usernames.forEach(usr => {
            if (usr.username == $scope.register.username) {
                rtn = false;
            }
        });
        $scope.usernameAvailable = rtn;
        $scope.usernameNotAvailable = !rtn;
    };

    $scope.registerUser = function () {
        $scope.resetVisualFeedbackVars();
        userService.createUser($scope.register)
            .then(function (response) {
                if (response.data.length != 0 && response.data != null) {
                    $scope.registerSuccessful = true;
                } else {
                    $scope.registerFailed = true;
                }
                $scope.loginMode = true;
                $scope.register = {};
            });
    };

    userService.getUsernames();
    $scope.resetVisualFeedbackVars();

}]);