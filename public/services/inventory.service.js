app.service('inventoryService', ['userService', '$http', function (userService, $http) {

    // var rtn = {};



    // rtn.unsavedChanges = false;
    // rtn.restoreInventory = function() {
    //     this.inventory = JSON.parse(JSON.stringify(this.backupInventory));
    // };

    // rtn.getInventory();

    // return rtn;

    // this.getInventory = function() {
        // $http.get('http://192.168.0.4:5678/inventories/0')
        // .then(function (response) {
        //     if (response.data !== null) {
        //         this.inventory = response.data.inventory;
        //         this.backupInventory = response.data.inventory;
        //         this.hasInventory = true;
        //     } else {
        //         // need to use this variable to provide some visual feedback
        //         this.hasInventory = false;
        //     }
        // });
    // };


}]);
