app.controller('listsController', ['$scope', 'listsService', 'iconService', 'inventoryService', function ($scope, listsService, iconService, inventoryService) {

    $scope.currentCraftList = listsService.lists.craft_lists.general;

    $scope.convertIcon = iconService.convertIcon;

    $scope.inventory = inventoryService.inventory;


}]);