app.controller('inventoryController', ['$scope', 'inventoryService', 'iconService', '$window', 'userService', function ($scope, inventoryService, iconService, $window, userService) {

    $scope.inventory = inventoryService.inventory;

    // $scope.inventory = inventoryService.inventoryToArray();
    // $scope.$watch(function () {
    //     return inventoryService.inventory;
    // }, function (newValue, oldValue) {
    //     console.log(oldValue);
    //     console.log(newValue);
    //     $scope.inventory = inventoryService.inventoryToArray();
    //     $scope.actualInv = inventoryService.inventory;
    // });
    
    // $scope.hasInventory = inventoryService.hasInventory;
    $scope.$watch(function () {
        return inventoryService.hasInventory;
    }, function (newValue, oldValue) {
        $scope.hasInventory = inventoryService.hasInventory;
    });

    // $scope.unregisteredInventory = inventoryService.unregisteredInventory;
    $scope.$watch(function () {
        return inventoryService.unregisteredInventory;
    }, function (newValue, oldValue) {
        $scope.unregisteredInventory = inventoryService.unregisteredInventory;
    });

    // $scope.unsavedChanges = inventoryService.unsavedChanges;
    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.unsavedChanges = inventoryService.unsavedChanges;
    });

    $scope.createInventory = function () {
        inventoryService.createInventory(userService.user._id);
        // should we call get inventory?
    };

    $scope.setUnsaved = function () {
        inventoryService.unsavedChanges = true;
    };

    $scope.convertIcon = iconService.convertIcon;

    $scope.downloadInventory = function () {
        // implement export of inventory to csv file
    }

    $scope.top = function () {
        $window.scrollTo(0, 0);
    }

    $scope.cancelChanges = function () {
        inventoryService.restoreInventory();
        inventoryService.unsavedChanges = false;
    };

    $scope.updateQty = function (id, qty) {
        if (qty !== 0 && qty !== null && qty !== undefined && qty != '') {
            inventoryService.inventory[id].qty = qty;
        }
    };

    $scope.removeItem = function (item) {
        // controller level deletion to trigger correct animation
        // $scope.inventory.splice($scope.inventory.indexOf(item), 1);
        // service level deletion
        inventoryService.deleteItem(item);
        // $scope.inventory = inventoryService.inventoryToArray();
        $scope.setUnsaved();
    };

    $scope.removeAllItems = function (item) {
        // $scope.inventory = [];
        inventoryService.inventory = {};
        // $scope.inventory = inventoryService.inventoryToArray();
        $scope.setUnsaved();
    };

    $scope.persistChanges = inventoryService.persistChanges;

}]);