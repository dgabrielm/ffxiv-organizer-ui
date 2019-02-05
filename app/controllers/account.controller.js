(function () {
angular.module('ffxivOrganizer')
.controller('AccountController', function ($scope, userService) {

    $scope.editMode = false;

    $scope.resetVisualFeedbackVars = function () {
        $scope.dataSaved = false;
        $scope.dataNotSaved = false;
        $scope.accountDeleteFail = false;
        $scope.accountDeleteSuccess = false;
    };

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

    $scope.$watch(function () {
        return userService.user;
    }, function (newValue, oldValue) {
        $scope.user = userService.user;
    });

    $scope.deleteAccount = function () {
        $scope.resetVisualFeedbackVars();
        userService.deleteAccount($scope.current_password)
            .then(function () {
                $scope.accountDeleteSuccess = true;
                setTimeout(function () { userService.logout(); }, 1000);
            })
            .catch(function (error) {
                $scope.accountDeleteFail = true;
            });
    };

    $scope.updateUser = function () {
        $scope.resetVisualFeedbackVars();
        $scope.userUpdate.password = $scope.userUpdate.new_password;
        var usr = {};
        if ($scope.userUpdate.first_name !== undefined && $scope.userUpdate.first_name !== null &&
            $scope.userUpdate.first_name !== '' && $scope.userUpdate.first_name !== $scope.user.first_name) {
            usr.first_name = $scope.userUpdate.first_name;
        }
        if ($scope.userUpdate.last_name !== undefined && $scope.userUpdate.last_name !== null &&
            $scope.userUpdate.last_name !== '' && $scope.userUpdate.last_name !== $scope.user.last_name) {
            usr.last_name = $scope.userUpdate.last_name;
        }
        if ($scope.userUpdate.character_name !== undefined && $scope.userUpdate.character_name !== null &&
            $scope.userUpdate.character_name !== '' && $scope.userUpdate.character_name !== $scope.user.character_name) {
            usr.character_name = $scope.userUpdate.character_name;
        }
        if ($scope.userUpdate.email_address !== undefined && $scope.userUpdate.email_address !== null &&
            $scope.userUpdate.email_address !== '' && $scope.userUpdate.email_address !== $scope.user.email_address) {
            usr.email_address = $scope.userUpdate.email_address;
        }
        if ($scope.userUpdate.username !== undefined && $scope.userUpdate.username !== null &&
            $scope.userUpdate.username !== '' && $scope.userUpdate.username !== $scope.user.username) {
            usr.username = $scope.userUpdate.username;
        }
        if ($scope.userUpdate.password !== undefined && $scope.userUpdate.password !== null &&
            $scope.userUpdate.password !== '') {
            usr.password = $scope.userUpdate.password;
        }
        userService.updateUser(usr, $scope.userUpdate.current_password)
            .then(function (response) {
                if (response.data !== null) {
                    $scope.loginMode = true;
                    $scope.dataSaved = true;
                    setTimeout(function () { userService.logout(); }, 2000);
                } else {
                    $scope.dataNotSaved = true;
                }
            });
    }

})
})();
