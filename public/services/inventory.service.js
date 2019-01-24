app.service('inventoryService', ['$http', function ($http) {

    var self = this;

    this.alert = false;
    this.unsavedChanges = false;
    this.unregisteredInventory = false;

    this.restoreInventory = function () {
        this.inventory = JSON.parse(JSON.stringify(this.backupInventory));
    };

    this.getInventory = function (id) {
        $http.get('http://192.168.0.4:5678/inventories/' + id)
            .then(function (response) {
                if (response.data !== null) {
                    self.inventory = response.data.inventory;
                    self.backupInventory = response.data.inventory;
                    self.hasInventory = true;
                } else {
                    self.inventory = {};
                    self.hasInventory = false;
                }
            });
    };

    // INVENTORY CREATION WORKS - there is just one issue where the first time you create your inventory it is not automatically displayed properly, but it's there on next login

    this.createInventory = function (id) {
        let inv = {};
        inv.user_id = id;
        inv.inventory = self.inventory;

        // $http.post('http://192.168.0.4:5678/inventories/', {user_id: id, inventory: self.inventory})
        $http.post('http://192.168.0.4:5678/inventories/', inv)
            .then(function (response) {
                if (response.data !== null) {
                    self.getInventory();
                    self.hasInventory = true;
                    self.unsavedChanges = false;
                    self.unregisteredInventory = false;
                } else {
                    // need to use this variable to provide some visual feedback
                    // self.hasInventory = false;
                }
            });
    };


}]);
