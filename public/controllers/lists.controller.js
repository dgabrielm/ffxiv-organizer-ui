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

    $scope.listToDelete = 'general';

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

    $scope.deleteList = function () {
        listsService.removeList($scope.listToDelete);
        $scope.listToDelete = 'general';
    };

    $scope.createList = function () {
        listsService.addList($scope.listToCreate);
        $scope.listToCreate = '';
        $scope.generateRequiredIngredients();
    }

    $scope.$watch(function () {
        return listsService.currentCraftList;
    }, function (newValue, oldValue) {
        $scope.currentCraftList = listsService.currentCraftList;
    });

    $scope.convertIcon = iconService.convertIcon;

    $scope.$watch(function () {
        return inventoryService.inventory;
    }, function (newValue, oldValue) {
        $scope.inventory = inventoryService.inventory;
    });

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
        $scope.generateRequiredIngredients();
    };

    $scope.assessListItems = function () {
        listsService.assessListItems(inventoryService.inventory);
    }

    $scope.generateRequiredIngredients = function () {
        listsService.generateRequiredIngredients();
        $scope.assessListItems();
    };

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
        $scope.generateRequiredIngredients();
    };

    $scope.persistInventoryChanges = function () {
        inventoryService.persistChanges(userService.user._id);
    };

    $scope.cancelChanges = function () {
        listsService.restoreLists();
        listsService.unsavedChanges = false;
        $scope.generateRequiredIngredients();
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
        $scope.generateRequiredIngredients();
    };

    $scope.removeAllItems = function () {
        listsService.clearCurrentList();
        $scope.generateRequiredIngredients();
    };

    $scope.craftItem = function (item) {

        // remove ingredients used from inventory
        for (i = 0; i < item.ingredients.length; i++) {
            if (i == 0 || i % 4 == 0) {
                if (inventoryService.inventory[item.ingredients[i]].qty <= parseInt(item.ingredients[i + 1])) {
                    inventoryService.deleteItem(item.ingredients[i]);
                } else {
                    inventoryService.inventory[item.ingredients[i]].qty -= parseInt(item.ingredients[i + 1]);
                }
            }
        }

        // add or update qty of recently crafted item in inventory
        if (inventoryService.inventory[item._id] == undefined) {
            inventoryService.inventory[item._id] = {
                name: item.name,
                icon_id: item.icon_id,
                qty: item.qty
            };
        } else {
            inventoryService.inventory[item._id].qty = parseInt(inventoryService.inventory[item._id].qty) + parseInt(item.qty);
        }

        listsService.deleteItem(item);
        $scope.generateRequiredIngredients();

    };

    $scope.checkValid = function (item) {
        var itemToValide = listsService.lists.craft_lists[listsService.currentCraftList].indexOf(item);
        if (listsService.lists.craft_lists[listsService.currentCraftList][itemToValide].qty == undefined || listsService.lists.craft_lists[listsService.currentCraftList][itemToValide].qty < 1) {
            listsService.lists.craft_lists[listsService.currentCraftList][itemToValide].qty = 1;
        }
    };

    $scope.craftAllItems = function () {

        // remove ingredients used from inventory
        Object.keys(listsService.requiredIngredients).forEach((key, index) => {
            var qtyToRemove = listsService.requiredIngredients[key].qty;
            if (inventoryService.inventory[key].qty <= qtyToRemove) {
                inventoryService.deleteItem(key);
            } else {
                inventoryService.inventory[key].qty -= qtyToRemove;
            }
        });

        // add or update qty of recently crafted items in inventory
        listsService.lists.craft_lists[listsService.currentCraftList].forEach(item => {
            if (inventoryService.inventory[item._id] == undefined) {
                inventoryService.inventory[item._id] = {
                    name: item.name,
                    icon_id: item.icon_id,
                    qty: item.qty
                };
            } else {
                inventoryService.inventory[item._id].qty = parseInt(inventoryService.inventory[item._id].qty) + parseInt(item.qty);
            }
        });

        // remove items from craft list and redraw required ingredients
        listsService.clearCurrentList();
        $scope.generateRequiredIngredients();

    };

    $scope.generateRequiredIngredients();

}]);