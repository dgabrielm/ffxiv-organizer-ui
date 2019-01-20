app.controller('navController', ['$scope', 'userService', 'userAuthService', 'inventoryService', function ($scope, userService, userAuthService, inventoryService) {
            
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

    $scope.login = userAuthService.login;
    $scope.logout = userAuthService.logout;

    $scope.inventoryChanges = inventoryService.unsavedChanges;
    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.inventoryChanges = inventoryService.unsavedChanges;
    });

}]);