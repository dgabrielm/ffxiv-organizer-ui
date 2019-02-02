app.controller('navController', ['$scope', 'userService', 'inventoryService', 'listsService', function ($scope, userService, inventoryService, listsService) {

    // loggedIn status watched from user service
    $scope.loggedIn = userService.loggedIn;
    $scope.$watch(function () {
        return userService.loggedIn;
    }, function (newValue, oldValue) {
        $scope.loggedIn = userService.loggedIn;
    });

    // watching user service to set username 
    $scope.$watch(function () {
        return userService.user;
    }, function (newValue, oldValue) {
        $scope.username = userService.getUsername();
    });

    $scope.login = userService.login;
    $scope.logout = userService.logout;

    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.inventoryChanges = inventoryService.unsavedChanges;
    });

    $scope.$watch(function () {
        return listsService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.listsChanges = listsService.unsavedChanges;
    });

}]);