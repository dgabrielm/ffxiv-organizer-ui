app.controller('listsController', ['$scope', 'listsService', 'iconService', 'inventoryService', 'userService', 'databaseService', function ($scope, listsService, iconService, inventoryService, userService, databaseService) {



    $scope.$watch(function () {
        return listsService.lists;
    }, function (newValue, oldValue) {
        $scope.lists = listsService.lists;
    });

    $scope.assessQty = function (lstQty, invQty) {
        if (invQty == undefined) {
            return false;
        } else {
            if (lstQty <= invQty) {
                return true;
            } else {
                return false;
            }
        }
    };

    $scope.setJustCrafted = function (bool) {
        $scope.justCrafted = bool;
    };

    $scope.inventoryUpdater = function (id, quantity, item) {
        inventoryService.inventory[id] = {
            name: item.name,
            icon_id: item.icon_id,
            qty: quantity
        };
    };

    $scope.currentCraftList = listsService.currentCraftList;

    $scope.convertIcon = iconService.convertIcon;

    $scope.inventory = inventoryService.inventory;

    $scope.checkIngredients = function () {
        $scope.hasIngredients = true;
        Object.keys(listsService.requiredIngredients).forEach(function (key, index) {
            if (inventoryService.inventory[key] == undefined || inventoryService.inventory[key].qty < listsService.requiredIngredients[key].qty) {
                $scope.hasIngredients = false;
            }
        });
    };

    $scope.$watch(function () {
        return listsService.switch;
    }, function (newValue, oldValue) {
        $scope.switch = listsService.switch;
    });

    $scope.flickSwitch = function (position) {
        var obj = {};
        obj[position] = true
        listsService.switch = obj;
        listsService.generateRequiredIngredients();
    };

    $scope.generateRequiredIngredients = listsService.generateRequiredIngredients;

    $scope.$watch(function () {
        return listsService.requiredIngredients;
    }, function (newValue, oldValue) {
        $scope.requiredIngredients = listsService.requiredIngredients;
        $scope.checkIngredients();
    });

    $scope.setUnsavedInv = function () {
        inventoryService.unsavedChanges = true;
    };

    $scope.changeList = function (list) {
        listsService.currentCraftList = list;
    };

    $scope.createListRecords = function () {
        listsService.createListRecords(userService.user._id);
    };

    $scope.$watch(function () {
        return listsService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.unsavedChanges = listsService.unsavedChanges;
    });

    $scope.$watch(function () {
        return listsService.hasLists;
    }, function (newValue, oldValue) {
        $scope.hasLists = listsService.hasLists;
    });

    $scope.persistChanges = function () {
        listsService.persistChanges(userService.user._id);
        listsService.generateRequiredIngredients();
    };

    $scope.persistInventoryChanges = function () {
        inventoryService.persistChanges(userService.user._id);
    };

    $scope.cancelChanges = function () {
        listsService.restoreLists();
        listsService.unsavedChanges = false;
        listsService.generateRequiredIngredients();
    };

    $scope.cancelInventoryChanges = function () {
        inventoryService.restoreInventory();
        inventoryService.unsavedChanges = false;
    };

    $scope.setUnsaved = function () {
        listsService.unsavedChanges = true;
    };

    $scope.removeItem = function (item) {
        listsService.deleteItem(item);
        listsService.generateRequiredIngredients();
    };

    $scope.removeAllItems = function () {
        listsService.clearCurrentList();
        listsService.generateRequiredIngredients();
    };

    // CRAFT ITEM LOGIC IS WRONG!

    $scope.craftItem = function (item) {
        if (inventoryService.inventory[item._id].qty <= item.qty) {
            inventoryService.deleteItem(item._id);
        } else {
            inventoryService.inventory[item._id].qty -= item.qty;
        }
        $scope.removeItem(item);
        listsService.generateRequiredIngredients();
    };

    $scope.craftAllItems = function () {

        Object.keys(listsService.requiredIngredients).forEach(function (key, index) {
            var qtyToRemove = listsService.requiredIngredients[key].qty;
            if (inventoryService.inventory[key].qty <= qtyToRemove) {
                inventoryService.deleteItem(key);
            } else {
                inventoryService.inventory[key].qty -= qtyToRemove;
            }
        });

        listsService.clearCurrentList();
        listsService.generateRequiredIngredients();

    };

    listsService.generateRequiredIngredients();

}]);