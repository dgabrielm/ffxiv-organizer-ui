app.controller('accountController', ['$scope', function ($scope) {

    $scope.editMode = false;
    $scope.userNew = { "first_name": undefined, "last_name": undefined, "email_address": undefined, "character_name": undefined, "username": undefined, "password": undefined };

    // Starting with test data;
    $scope.user = {
        "first_name": {"display": 'First Name', "value": 'Dario'},
        "last_name": {"display": 'Last Name', "value": 'Mincioni'},
        "email_address": {"display": 'Email Address', "value": 'dgm726@student.bham.ac.uk'},
        "character_name": {"display": 'Character Name', "value": 'Rufus Mao'},
        "username": {"display": 'Username', "value": 'dgabrielm'}
    };

    $scope.update = function() {
        $scope.user = {
            
        };
        $scope.toggleEditMode();
        $scope.userNew[field] = undefined;
    };

    $scope.toggleEditMode = function() {
        $scope.editMode = !$scope.editMode;
    };

    $scope.cancelUpdate = function (field) {
        $scope.toggleEditMode();
        $scope.userNew[field] = undefined;
    };

}]);