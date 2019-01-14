app.controller('inventoryController', ['$scope', function ($scope) {

    $scope.hasInventory = true;

    $scope.inventory = {
        "item_id_1": {
            "qty": 100,
            "hq_qty": 0
        },
        "item_id_2": {
            "qty": 50,
            "hq_qty": 0
        },
        "item_id_3": {
            "qty": 50,
            "hq_qty": 50
        },
        "item_id_4": {
            "qty": 0,
            "hq_qty": 2
        },
        "item_id_5": {
            "qty": 999,
            "hq_qty": 0
        }
    }


}]);