app.service('inventoryService', ['$http', function ($http) {

    var $this = this;

    this.unsavedChanges = false;
    this.restoreInventory = function () {
        $this.inventory = JSON.parse(JSON.stringify($this.backupInventory));
    };

    this.deleteItem = function (id) {
        delete $this.inventory[id];
    };

    this.persistChanges = function(id) {
        var inv = {};
        inv.inventory = $this.inventory;
        console.log(inv);
        $http.post('http://192.168.0.4:5678/inventories/' + id, inv)
        .then(function (response) {
            if (response.data !== null) {
                $this.unsavedChanges = false;
                $this.backupInventory = $this.inventory;
                // add user feedback variables: saveSuccess or something
            } else {
                // add user feedback variable: saveFailed or something
            }
        });
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
                    $this.backupInventory = {};
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
                    // $this.unregisteredInventory = false;
                    if (response.data.inventory != undefined) {
                        $this.backupInventory = response.data.inventory;
                    }
                } else {
                    $this.hasInventory = false;
                }
            });
    };


}]);
