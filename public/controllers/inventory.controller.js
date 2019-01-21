app.controller('inventoryController', ['$scope', 'inventoryService', 'iconService', '$window', function ($scope, inventoryService, iconService, $window) {

    $scope.hasInventory = true;
    $scope.unsavedChanges = inventoryService.unsavedChanges;

    $scope.$watch(function () {
        return inventoryService.unsavedChanges;
    }, function (newValue, oldValue) {
        $scope.unsavedChanges = inventoryService.unsavedChanges;
    });

    // $scope.$watch(function () {
    //     return inventoryService.inventory;
    // }, function (newValue, oldValue) {
    //     populateInventory();
    // });

    $scope.setUnsaved = function() {
        inventoryService.unsavedChanges = true;
    };

    var populateInventory = function () {
        let obj = inventoryService.inventory;
        let array = [];
        Object.keys(obj).forEach((key) => {
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

    $scope.downloadInventory = function () {
        // implement export of inventory to csv file
    }

    $scope.top = function () {
        $window.scrollTo(0, 0);
    }

    // $scope.cancelChanges = function() {
    //     inventoryService.inventory = {"5056":{"name":"Bronze Ingot","icon_id":"20803","qty":1},"5057":{"name":"Iron Ingot","icon_id":"20801","qty":1},"5058":{"name":"Steel Ingot","icon_id":"20802","qty":1},"5059":{"name":"Cobalt Ingot","icon_id":"20802","qty":1},"5060":{"name":"Darksteel Ingot","icon_id":"20804","qty":1},"5062":{"name":"Copper Ingot","icon_id":"20813","qty":1},"5063":{"name":"Brass Ingot","icon_id":"20815","qty":1},"5064":{"name":"Silver Ingot","icon_id":"20810","qty":1},"5065":{"name":"Mythril Ingot","icon_id":"20811","qty":1},"5066":{"name":"Electrum Ingot","icon_id":"20812","qty":1},"5067":{"name":"Rose Gold Ingot","icon_id":"20814","qty":1},"5069":{"name":"Gold Ingot","icon_id":"20809","qty":1},"7607":{"name":"Wolfram Ingot","icon_id":"20801","qty":1},"9358":{"name":"Wootz Ingot","icon_id":"20803","qty":1},"9360":{"name":"Platinum Ingot","icon_id":"20810","qty":1},"12519":{"name":"Mythrite Ingot","icon_id":"20824","qty":1},"12521":{"name":"Hardsilver Ingot","icon_id":"20826","qty":1},"12523":{"name":"Aurum Regis Ingot","icon_id":"20828","qty":1},"12525":{"name":"Titanium Ingot","icon_id":"20830","qty":1},"12527":{"name":"Adamantite Ingot","icon_id":"20832","qty":1},"13019":{"name":"Forgemaster's Redingote","icon_id":"42427","qty":1},"13747":{"name":"Titanium Alloy Ingot","icon_id":"20801","qty":1},"14146":{"name":"High Mythrite Ingot","icon_id":"20824","qty":1},"14149":{"name":"Eikon Iron Ingot","icon_id":"20815","qty":1},"16705":{"name":"Heavy Metal Ingot","icon_id":"20830","qty":1},"16706":{"name":"Scintillant Ingot","icon_id":"20809","qty":1},"17567":{"name":"Cloud Mythril Ingot","icon_id":"20833","qty":1},"19940":{"name":"Koppranickel Ingot","icon_id":"20810","qty":1},"19941":{"name":"High Steel Ingot","icon_id":"20803","qty":1},"19943":{"name":"Oroshigane Ingot","icon_id":"20801","qty":1},"19944":{"name":"Durium Ingot","icon_id":"20835","qty":1},"19945":{"name":"Tama-hagane Ingot","icon_id":"20802","qty":1},"19947":{"name":"Molybdenum Ingot","icon_id":"20830","qty":1},"19948":{"name":"Palladium Ingot","icon_id":"20812","qty":1},"19949":{"name":"Chromite Ingot","icon_id":"20804","qty":1},"22427":{"name":"Nightsteel Ingot","icon_id":"20804","qty":1},"22428":{"name":"Silvergrace Ingot","icon_id":"20826","qty":1},"24250":{"name":"Chigusa Ingot","icon_id":"20801","qty":1},"24251":{"name":"Evergleam Ingot","icon_id":"20826","qty":1}};
    //     inventoryService.unsavedChanges = false;
    //     $scope.inventory = [{"_id":"5056","name":"Bronze Ingot","icon_id":"20803","qty":1},{"_id":"5057","name":"Iron Ingot","icon_id":"20801","qty":1},{"_id":"5058","name":"Steel Ingot","icon_id":"20802","qty":1},{"_id":"5059","name":"Cobalt Ingot","icon_id":"20802","qty":1},{"_id":"5060","name":"Darksteel Ingot","icon_id":"20804","qty":1},{"_id":"5062","name":"Copper Ingot","icon_id":"20813","qty":1},{"_id":"5063","name":"Brass Ingot","icon_id":"20815","qty":1},{"_id":"5064","name":"Silver Ingot","icon_id":"20810","qty":1},{"_id":"5065","name":"Mythril Ingot","icon_id":"20811","qty":1},{"_id":"5066","name":"Electrum Ingot","icon_id":"20812","qty":1},{"_id":"5067","name":"Rose Gold Ingot","icon_id":"20814","qty":1},{"_id":"5069","name":"Gold Ingot","icon_id":"20809","qty":1},{"_id":"7607","name":"Wolfram Ingot","icon_id":"20801","qty":1},{"_id":"9358","name":"Wootz Ingot","icon_id":"20803","qty":1},{"_id":"9360","name":"Platinum Ingot","icon_id":"20810","qty":1},{"_id":"12519","name":"Mythrite Ingot","icon_id":"20824","qty":1},{"_id":"12521","name":"Hardsilver Ingot","icon_id":"20826","qty":1},{"_id":"12523","name":"Aurum Regis Ingot","icon_id":"20828","qty":1},{"_id":"12525","name":"Titanium Ingot","icon_id":"20830","qty":1},{"_id":"12527","name":"Adamantite Ingot","icon_id":"20832","qty":1},{"_id":"13019","name":"Forgemaster's Redingote","icon_id":"42427","qty":1},{"_id":"13747","name":"Titanium Alloy Ingot","icon_id":"20801","qty":1},{"_id":"14146","name":"High Mythrite Ingot","icon_id":"20824","qty":1},{"_id":"14149","name":"Eikon Iron Ingot","icon_id":"20815","qty":1},{"_id":"16705","name":"Heavy Metal Ingot","icon_id":"20830","qty":1},{"_id":"16706","name":"Scintillant Ingot","icon_id":"20809","qty":1},{"_id":"17567","name":"Cloud Mythril Ingot","icon_id":"20833","qty":1},{"_id":"19940","name":"Koppranickel Ingot","icon_id":"20810","qty":1},{"_id":"19941","name":"High Steel Ingot","icon_id":"20803","qty":1},{"_id":"19943","name":"Oroshigane Ingot","icon_id":"20801","qty":1},{"_id":"19944","name":"Durium Ingot","icon_id":"20835","qty":1},{"_id":"19945","name":"Tama-hagane Ingot","icon_id":"20802","qty":1},{"_id":"19947","name":"Molybdenum Ingot","icon_id":"20830","qty":1},{"_id":"19948","name":"Palladium Ingot","icon_id":"20812","qty":1},{"_id":"19949","name":"Chromite Ingot","icon_id":"20804","qty":1},{"_id":"22427","name":"Nightsteel Ingot","icon_id":"20804","qty":1},{"_id":"22428","name":"Silvergrace Ingot","icon_id":"20826","qty":1},{"_id":"24250","name":"Chigusa Ingot","icon_id":"20801","qty":1},{"_id":"24251","name":"Evergleam Ingot","icon_id":"20826","qty":1}];
    //     // populateInventory();
    // };

    $scope.cancelChanges = function() {
        inventoryService.restoreInventory();
        inventoryService.unsavedChanges = false;
        populateInventory();
    };

    $scope.updateQty = function(id, qty) {
        if (qty !== 0 && qty !== null && qty !== undefined && qty != '') {
            inventoryService.inventory[id].qty = qty;
        }
    };

    $scope.removeItem = function(item) {
        // controller level deletion to trigger correct animation
        $scope.inventory.splice($scope.inventory.indexOf(item),1);
        // service level deletion
        delete inventoryService.inventory[item._id];
        $scope.setUnsaved();
    };

    $scope.removeAllItems = function(item) {
        $scope.inventory = [];
        inventoryService.inventory = {};
        $scope.setUnsaved();
    };

    $scope.persistChanges = inventoryService.persistChanges;

    // executes once every time this controller is loaded i.e. when the view changes to inventory.html
    populateInventory();

}]);