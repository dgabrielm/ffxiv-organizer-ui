app.controller('accountController', ['$scope', 'userService', '$http', 'USERS_CONFIG', function ($scope, userService, $http, USERS_CONFIG) {

    $scope.deleteAccount = function () {
        userService.deleteAccount($scope.current_password);
    };

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

    $scope.cancelUpdate = function () {
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

        var usr = {};

        if ($scope.userUpdate.first_name !== undefined && $scope.userUpdate.first_name !== null && $scope.userUpdate.first_name !== '' && $scope.userUpdate.first_name !== userService.user.first_name) {
            usr.first_name = $scope.userUpdate.first_name;
        }

        if ($scope.userUpdate.last_name !== undefined && $scope.userUpdate.last_name !== null && $scope.userUpdate.last_name !== '' && $scope.userUpdate.last_name !== userService.user.last_name) {
            usr.last_name = $scope.userUpdate.last_name;
        }

        if ($scope.userUpdate.character_name !== undefined && $scope.userUpdate.character_name !== null && $scope.userUpdate.character_name !== '' && $scope.userUpdate.character_name !== userService.user.character_name) {
            usr.character_name = $scope.userUpdate.character_name;
        }

        if ($scope.userUpdate.email_address !== undefined && $scope.userUpdate.email_address !== null && $scope.userUpdate.email_address !== '' && $scope.userUpdate.email_address !== userService.user.email_address) {
            usr.email_address = $scope.userUpdate.email_address;
        }

        if ($scope.userUpdate.username !== undefined && $scope.userUpdate.username !== null && $scope.userUpdate.username !== '' && $scope.userUpdate.username !== userService.user.username) {
            usr.username = $scope.userUpdate.username;
        }

        if ($scope.userUpdate.password !== undefined && $scope.userUpdate.password !== null && $scope.userUpdate.password !== '') {
            usr.password = $scope.userUpdate.password;
        }

        $http.post(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + $scope.user.username + '/' + $scope.userUpdate.current_password, usr)
            .then(function (response) {
                if (response.data !== null) {
                    $scope.loginMode = true;
                    $scope.dataSaved = true;
                    setTimeout(function(){ userService.logout(); }, 2000);
                } else {
                    $scope.dataNotSaved = true;
                }
            });

    }

}])