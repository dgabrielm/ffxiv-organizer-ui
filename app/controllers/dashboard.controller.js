app.controller('DashboardController', ['$scope', 'inventoryService', 'listsService', 'userService', function ($scope, inventoryService, listsService, userService) {

    $scope.$watch(function () {
        return listsService.hasLists;
    }, function (newValue, oldValue) {
        $scope.hasLists = listsService.hasLists
    });

    $scope.$watch(function () {
        return inventoryService.hasInventory;
    }, function (newValue, oldValue) {
        $scope.hasInventory = inventoryService.hasInventory;
    });
    
    $scope.createLists = function () {
        listsService.createListRecords(userService.user._id);
    };

    $scope.createInventory = function () {
        inventoryService.createInventory(userService.user._id);
    };

}]);
