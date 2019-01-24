app.controller('inventoryController', ['$scope', 'inventoryService', 'iconService', '$window', 'userService', function ($scope, inventoryService, iconService, $window, userService) {

    $scope.hasInventory = inventoryService.hasInventory;
    $scope.$watch(function () {
        return inventoryService.hasInventory;
    }, function (newValue, oldValue) {
        $scope.hasInventory = inventoryService.hasInventory;
    });

    $scope.unregisteredInventory = inventoryService.unregisteredInventory;
    $scope.$watch(function () {
        return inventoryService.unregisteredInventory;
    }, function (newValue, oldValue) {
        $scope.unregisteredInventory = inventoryService.unregisteredInventory;
    });

    $scope.unsavedChanges = inventoryService.unsavedChanges;
    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.unsavedChanges = inventoryService.unsavedChanges;
    });

    $scope.createInventory = function () {
        // implement
        inventoryService.createInventory(userService.user._id);
    };

    $scope.setUnsaved = function () {
        inventoryService.unsavedChanges = true;
    };

    var populateInventory = function () {
        let obj = inventoryService.inventory;
        let array = [];
        Object.keys(obj).forEach((key) => {
            array.push(
                {
                    _id: key,
                    name: inventoryService.inventory[key].name,
                    icon_id: inventoryService.inventory[key].icon_id,
                    qty: inventoryService.inventory[key].qty
                }
            );
        });
        $scope.inventory = array;
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
        populateInventory();
    };

    $scope.updateQty = function (id, qty) {
        if (qty !== 0 && qty !== null && qty !== undefined && qty != '') {
            inventoryService.inventory[id].qty = qty;
        }
    };

    $scope.removeItem = function (item) {
        // controller level deletion to trigger correct animation
        $scope.inventory.splice($scope.inventory.indexOf(item), 1);
        // service level deletion
        delete inventoryService.inventory[item._id];
        $scope.setUnsaved();
    };

    $scope.removeAllItems = function (item) {
        $scope.inventory = [];
        inventoryService.inventory = {};
        $scope.setUnsaved();
    };

    $scope.persistChanges = inventoryService.persistChanges;

    try {populateInventory();} catch (error) {}




}]);