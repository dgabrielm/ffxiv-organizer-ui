app.service('inventoryService', ['$http', function ($http) {

    var $this = this;

    this.alert = false;
    this.unsavedChanges = false;
    this.unregisteredInventory = false;

    this.restoreInventory = function () {
        $this.inventory = JSON.parse(JSON.stringify($this.backupInventory));
    };

    this.deleteItem = function(item) {
        delete $this.inventory[item._id];
    };

    this.inventoryToArray = function() {
        let obj = $this.inventory;
        let array = [];
        Object.keys(obj).forEach((key) => {
            array.push(
                {
                    _id: key,
                    name: $this.inventory[key].name,
                    icon_id: $this.inventory[key].icon_id,
                    qty: $this.inventory[key].qty
                }
            );
        });
        return array;
    };

    this.getInventory = function (id) {
        $http.get('http://192.168.0.4:5678/inventories/' + id)
            .then(function (response) {
                if (response.data !== null) {
                    $this.inventory = JSON.parse(JSON.stringify(response.data.inventory));
                    $this.backupInventory = JSON.parse(JSON.stringify(response.data.inventory));
                    $this.hasInventory = true;
                } else {
                    $this.inventory = {};
                    $this.hasInventory = false;
                }
            });
    };

    // INVENTORY CREATION WORKS - there is just one issue where the first time you create your inventory it is not automatically displayed properly, but it's there on next login

    this.createInventory = function (id) {
        let inv = {};
        inv.user_id = id;
        inv.inventory = $this.inventory;

        $http.post('http://192.168.0.4:5678/inventories/', inv)
            .then(function (response) {
                if (response.data !== null) {
                    $this.hasInventory = true;
                    $this.unsavedChanges = false;
                    $this.unregisteredInventory = false;
                } else {
                    $this.hasInventory = false;
                }
            });
    };


}]);
