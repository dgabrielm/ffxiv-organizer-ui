app.controller('inventoryController', ['$scope', 'inventoryService', 'iconService', '$window', function ($scope, inventoryService, iconService, $window) {

    $scope.hasInventory = true;
    $scope.createInventory = function () {
        // 
    };




    var populateInventory = function () {
        let array = [];
        Object.keys(inventoryService.inventory).forEach((key) => {
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

    $scope.top = function () {
        $window.scrollTo(0, 0);
    }

    populateInventory();

}]);