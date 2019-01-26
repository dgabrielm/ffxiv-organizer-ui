app.controller('inventoryController', ['$scope', 'inventoryService', 'iconService', '$window', 'userService', function ($scope, inventoryService, iconService, $window, userService) {

    $scope.$watch(function () {
        return inventoryService.inventory;
    }, function (newValue, oldValue) {
        $scope.inventory = inventoryService.inventory;
    });

    $scope.$watch(function () {
        return inventoryService.backupInventory;
    }, function (newValue, oldValue) {
        $scope.backupInventory = inventoryService.backupInventory;
    });

    $scope.$watch(function () {
        return inventoryService.hasInventory;
    }, function (newValue, oldValue) {
        $scope.hasInventory = inventoryService.hasInventory;
    });

    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.unsavedChanges = inventoryService.unsavedChanges;
    });

    $scope.createInventory = function () {
        inventoryService.createInventory(userService.user._id);
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

    $scope.checkValid = function(id) {
        if (inventoryService.inventory[id].qty == undefined || inventoryService.inventory[id].qty < 1) {
            inventoryService.inventory[id].qty = 1;
        }
    };

    $scope.removeItem = function (id) {
        inventoryService.deleteItem(id);
    };

    $scope.removeAllItems = function () {
        inventoryService.clearInventory();
    };

    $scope.persistChanges = function() {
        inventoryService.persistChanges(userService.user._id);
    };

}]);