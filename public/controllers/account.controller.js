app.controller('accountController', ['$scope', 'userService', '$http', 'USERS_CONFIG', function ($scope, userService, $http, USERS_CONFIG) {

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

        // Fix for corrupt data: construct new object which only takes info from $scope.userUpdate if it's valid and not empty.
        // fields which won't be updated are left undefined.  
        var usr = {};

        $http.post(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + $scope.user.username + '/' + $scope.userUpdate.current_password, $scope.userUpdate)
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