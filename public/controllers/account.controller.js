app.controller('accountController', ['$scope', 'userService', function ($scope, userService) {

    $scope.editMode = false;

    $scope.dataSaved = false;
    $scope.dataNotSaved = false;

    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
    };

    $scope.newPasswordsMatch = function () {
        return $scope.userUpdate.new_password === $scope.userUpdate.new_password_confirm;
    };

    // need to implement
    $scope.update = function () {

        // Reset user feedback variables
        $scope.dataSaved = false;
        $scope.dataNotSaved = false;

        // update local user object (updates each field only if new information has been passed)
        $scope.user = {
            first_name: $scope.userUpdate.first_name === undefined || $scope.userUpdate.first_name === '' ? userService.first_name : $scope.userUpdate.first_name,
            last_name: $scope.userUpdate.last_name === undefined || $scope.userUpdate.last_name === '' ? userService.last_name : $scope.userUpdate.last_name,
            email_address: $scope.userUpdate.email_address === undefined || $scope.userUpdate.email_address === '' ? userService.email_address : $scope.userUpdate.email_address,
            character_name: $scope.userUpdate.character_name === undefined || $scope.userUpdate.character_name === '' ? userService.character_name : $scope.userUpdate.character_name,
            username: $scope.userUpdate.username === undefined || $scope.userUpdate.username === '' ? userService.username : $scope.userUpdate.username,
            new_password: $scope.userUpdate.new_password === undefined || $scope.userUpdate.new_password === '' ? undefined : $scope.userUpdate.new_password
        }

        // verify password
        if (userService.validatePassword($scope.username, $scope.userUpdate.current_passsword)) {
            // pass this user object to the db
            userService.updateUserDatabase($scope.username, $scope.userUpdate.current_passsword, $scope.user);

            // confirm success
            $scope.dataSaved = true;
        } else {
            // reset user object
            $scope.user = $scope.getUser();

            //confirm failure
            $scope.dataNotSaved = true;
        }
        // clear input data
        $scope.userUpdate = {};

        // return to 
        $scope.toggleEditMode();
    }

    $scope.getUser = function() {
        return {
            first_name: userService.first_name,
            last_name: userService.last_name,
            email_address: userService.email_address,
            character_name: userService.character_name,
            username: userService.username
        };
    }

    $scope.user = $scope.getUser();

}])