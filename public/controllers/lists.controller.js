app.controller('listsController', ['$scope', 'listsService', 'iconService', 'inventoryService', 'userService', function ($scope, listsService, iconService, inventoryService, userService) {

    $scope.$watch(function () {
        return listsService.lists;
    }, function (newValue, oldValue) {
        $scope.lists = listsService.lists;
    });

    $scope.currentCraftList = listsService.currentCraftList;

    $scope.convertIcon = iconService.convertIcon;

    $scope.inventory = inventoryService.inventory;

    $scope.hasIngredients = { currentCraftList: false };
    $scope.switch = { current: true };

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