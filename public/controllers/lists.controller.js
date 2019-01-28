app.controller('listsController', ['$scope', 'listsService', 'iconService', 'inventoryService', function ($scope, listsService, iconService, inventoryService) {

    $scope.lists = listsService.lists;

    $scope.currentCraftList = listsService.lists.craft_lists.lessgeneral;

    $scope.convertIcon = iconService.convertIcon;

    $scope.inventory = inventoryService.inventory;

    $scope.hasIngredients = {currentCraftList: false};

    listsService.generateRequiredIngredients('lessgeneral');

    $scope.requiredIngredients = listsService.requiredIngredients;

    $scope.setUnsavedInv = function () {
        inventoryService.unsavedChanges = true;
    };

}]);