(function () {
    angular.module('ffxivOrganizer')
        .controller('InventoryController', function ($scope, inventoryService, iconService, $window, userService) {

            var user = userService.user;

            $scope.$watch(function () {
                return inventoryService.inventory;
            }, function (newValue, oldValue) {
                $scope.inventory = inventoryService.inventory;
            });

            $scope.$watch(function () {
                return inventoryService.backupInventory;
            }, function (newValue, oldValue) {
                $scope.backupInventory = inventoryService.backupInventory;
            });

            $scope.$watch(function () {
                return inventoryService.hasInventory;
            }, function (newValue, oldValue) {
                $scope.hasInventory = inventoryService.hasInventory;
            });

            $scope.$watch(function () {
                return inventoryService.unsavedChanges;
            }, function (newValue, oldValue) {
                $scope.unsavedChanges = inventoryService.unsavedChanges;
            });

            $scope.createInventory = function () {
                inventoryService.createInventory(user._id);
            };

            $scope.setUnsaved = function () {
                inventoryService.unsavedChanges = true;
            };

            $scope.convertIcon = function (icon) {
                return iconService.convertIcon(icon);
            };

            $scope.downloadInventory = function () {
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.inventory));
                var dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", user.username + "inventory.json");
                dlAnchorElem.click();
            };

            $scope.top = function () {
                $window.scrollTo(0, 0);
            };

            $scope.cancelChanges = function () {
                inventoryService.restoreInventory();
                inventoryService.setUnsavedChanges(false);
            };

            $scope.updateQty = function (id, qty) {
                if (qty !== 0 && qty !== null && qty !== undefined && qty != '') {
                    $scope.inventory[id].qty = qty;
                }
            };

            $scope.checkValid = function (id) {
                if ($scope.inventory[id].qty == undefined || $scope.inventory[id].qty < 1) {
                    $scope.inventory[id].qty = 1;
                }
            };

            $scope.removeItem = function (id) {
                inventoryService.deleteItem(id);
            };

            $scope.removeAllItems = function () {
                inventoryService.clearInventory();
            };

            $scope.persistChanges = function () {
                inventoryService.persistChanges(user._id);
            };

        })
})();
