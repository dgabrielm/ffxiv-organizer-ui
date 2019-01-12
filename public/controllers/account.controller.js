app.controller('accountController', ['$scope', 'userService', '$http', function ($scope, userService, $http) {

    $scope.user = userService.user;
    $scope.editMode = false;

    $scope.dataSaved = false;
    $scope.dataNotSaved = false;

    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
    };

    $scope.newPasswordsMatch = function () {
        return $scope.userUpdate.new_password === $scope.userUpdate.new_password_confirm;
    };

    $scope.cancelUpdate = function() {
        $scope.userUpdate = {};
        $scope.toggleEditMode();
        $scope.dataNotSaved = true;
    }

    $scope.updateUser = function () {

        // Reset user feedback variables
        $scope.dataSaved = false;
        $scope.dataNotSaved = false;

        // Assign new password
        $scope.userUpdate.password = $scope.userUpdate.new_password;

        $http.post('http://192.168.0.4:9876/users/' + $scope.user.username + '/' + $scope.userUpdate.current_password, $scope.userUpdate)
            .then(function (response) {
                $scope.userUpdate = {};
                if (response.data !== null) {
                    $scope.loginMode = true;
                    $scope.dataSaved = true;
                } else {
                    $scope.dataNotSaved = true;
                }
            });

    }

}])