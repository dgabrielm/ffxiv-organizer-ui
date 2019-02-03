app.service('inventoryService', ['$http', 'INVENTORIES_CONFIG', function ($http, INVENTORIES_CONFIG) {

    var $this = this;

    this.unsavedChanges = false;
    this.restoreInventory = function () {
        $this.inventory = JSON.parse(JSON.stringify($this.backupInventory));
    };

    this.deleteItem = function (id) {
        delete $this.inventory[id];
    };

    this.clearInventory = function() {
        $this.inventory = {};
    };

    this.persistChanges = function(id) {
        var inv = {};
        inv.inventory = $this.inventory;
        $http.post(INVENTORIES_CONFIG.location + ':' + INVENTORIES_CONFIG.port + '/inventories/' + id, inv)
        .then(function (response) {
            if (response.data !== null) {
                $this.unsavedChanges = false;
                $this.backupInventory = JSON.parse(JSON.stringify($this.inventory));
            } else {
            }
        });
    };

    this.getInventory = function (id) {
        $http.get(INVENTORIES_CONFIG.location + ':' + INVENTORIES_CONFIG.port + '/inventories/' + id)
            .then(function (response) {
                if (response.data !== null) {
                    if (response.data.inventory != undefined) {
                        $this.inventory = JSON.parse(JSON.stringify(response.data.inventory));
                        $this.backupInventory = JSON.parse(JSON.stringify(response.data.inventory));
                    } else {
                        $this.inventory = {};
                        $this.backupInventory = {}
                    }
                    $this.hasInventory = true;
                } else {
                    $this.inventory = {};
                    $this.backupInventory = {};
                    $this.hasInventory = false;
                }
            });
    };

    this.createInventory = function (id) {
        let inv = {};
        inv.user_id = id;
        inv.inventory = $this.inventory;
        $http.post(INVENTORIES_CONFIG.location + ':' + INVENTORIES_CONFIG.port + '/inventories/', inv)
            .then(function (response) {
                if (response.data !== null) {
                    $this.hasInventory = true;
                    $this.unsavedChanges = false;
                    if (response.data.inventory != undefined) {
                        $this.backupInventory = response.data.inventory;
                    }
                } else {
                    $this.hasInventory = false;
                }
            });
    };

}]);
