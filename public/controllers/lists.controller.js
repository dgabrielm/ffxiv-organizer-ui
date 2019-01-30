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

    $scope.hasIngredients = { currentCraftList: false };

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
        // implement persist
        listsService.persistChanges(userService.user._id);
        listsService.generateRequiredIngredients();
    };

    $scope.cancelChanges = function () {
        listsService.restoreLists();
        listsService.unsavedChanges = false;
    };

    $scope.setUnsaved = function () {
        listsService.unsavedChanges = true;
    };

    $scope.removeItem = function (id) {
        listsService.deleteItem(id);
    };

    listsService.generateRequiredIngredients();

}]);