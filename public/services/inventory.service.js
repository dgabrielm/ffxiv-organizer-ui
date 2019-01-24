app.service('inventoryService', ['$http', function ($http) {

    var self = this;

    this.unsavedChanges = false;
    this.restoreInventory = function() {
        this.inventory = JSON.parse(JSON.stringify(this.backupInventory));
    };

    this.getInventory = function(user_id) {
        $http.get('http://192.168.0.4:5678/inventories/' + user_id)
        .then(function (response) {
            if (response.data !== null) {
                self.inventory = response.data.inventory;
                self.backupInventory = response.data.inventory;
                self.hasInventory = true;
            } else {
                // need to use this variable to provide some visual feedback
                self.hasInventory = false;
            }
        });
    };


}]);
