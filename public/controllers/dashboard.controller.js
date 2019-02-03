app.controller('dashboardController', ['$scope', 'inventoryService', 'listsService', 'userService', '$location', function ($scope, inventoryService, listsService, userService, $location) {

    $scope.$watch(function () {
        return listsService.hasLists;
    }, function (newValue, oldValue) {
        $scope.hasLists = listsService.hasLists
    });

    $scope.createLists = function () {
        listsService.createListRecords(userService.user._id);
    };

    $scope.$watch(function () {
        return inventoryService.hasInventory;
    }, function (newValue, oldValue) {
        $scope.hasInventory = inventoryService.hasInventory;
    });

    $scope.createInventory = function () {
        inventoryService.createInventory(userService.user._id);
    };

}]);
