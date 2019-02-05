(function () {
angular.module('ffxivOrganizer')
.controller('DatabaseController',  function ($scope, databaseService, $window, iconService, inventoryService, listsService) {

    $scope.resultsPerPage = 25;

    $scope.resetVisualFeedbackVars = function () {
        $scope.noResults = false;
        $scope.noCategoryResults = false;
    };

    var resetResults = function () {
        $scope.results = [];
        $scope.currentPage = 0;
        $scope.numberOfPages = [0];
    };

    $scope.changeCurrentPage = function (pageNumber) {
        $scope.currentPage = pageNumber;
    };

    $scope.changeResultsPerPage = function (number) {
        $scope.resultsPerPage = number;
    };

    $scope.convertIcon = function (icon) {
        return iconService.convertIcon(icon);
    };

    $scope.top = function () {
        $window.scrollTo(0, 0);
    }

    // INVENTORY 

    $scope.$watch(function () {
        return inventoryService.inventory;
    }, function (newValue, oldValue) {
        $scope.inventory = inventoryService.inventory;
    });

    $scope.updateQtyOrAddItemToInventory = function (item) {
        if (item.qty > 0 && item.qty !== null && item.qty !== undefined && item.qty != '') {
            if ($scope.inventory[item._id] !== undefined) {
                $scope.inventory[item._id].qty = item.qty;
            } else {
                $scope.inventory[item._id] = {
                    "name": item.name,
                    "icon_id": item.icon_id,
                    "qty": item.qty
                };
            }
            inventoryService.setUnsavedChanges(true);
        }
    };

    // LISTS

    $scope.$watch(function () {
        return listsService.lists;
    }, function (newValue, oldValue) {
        $scope.lists = listsService.lists;
    });

    $scope.$watch(function () {
        return listsService.currentCraftList;
    }, function (newValue, oldValue) {
        $scope.currentCraftList = listsService.currentCraftList;
        $scope.getListsObject();
    });

    $scope.getListsObject = function () {
        var obj = {};
        $scope.lists.craft_lists[$scope.currentCraftList].forEach(function (item) {
            obj[item._id + item.craft_type] = {
                qty: item.qty
            };
        });
        $scope.listsObj = obj;
    };

    $scope.changeList = function (list) {
        listsService.setCurrentCraftList(list);
    };

    $scope.updateQtyOrAddItemToList = function (item) {
        if (item.listQty > 0 && item.listQty !== null && item.listQty !== undefined && item.listQty != '') {
            if ($scope.listsObj[item._id + item.craft_type] !== undefined) {
                $scope.lists.craft_lists[$scope.currentCraftList].find(function (it) { 
                    it._id + it.craft_type == item._id + item.craft_type
                }).qty = item.listQty;
            } else {
                $scope.lists.craft_lists[$scope.currentCraftList].push({
                    _id: item._id,
                    name: item.name,
                    craft_type: item.craft_type,
                    icon_id: item.icon_id,
                    qty: item.listQty,
                    ingredients: item.ingredients[item.craft_type]
                });
            }
            listsService.setUnsavedChanges(true);
            $scope.getListsObject();
        }
    };

    // SEARCH DATABASE

    $scope.searchDatabaseByCategory = function (category) {
        resetResults();
        $scope.resetVisualFeedbackVars();
        databaseService.getItemsByCategory(category)
            .then(function (response) {
                if (response.data.length !== 0) {
                    $scope.processResults(response.data);
                    if ($scope.results[0].length < 1) {
                        $scope.noCategoryResults = true;
                    }
                } else {
                    $scope.noCategoryResults = true;
                }
                $scope.searchNameQuery = category;
            });
    };

    $scope.searchDatabaseById = function (id, name) {
        resetResults();
        $scope.resetVisualFeedbackVars();
        $scope.craftableOnly = false;
        databaseService.getItemById(id)
            .then(function (response) {
                if (response.data.length !== 0) {
                    $scope.processResults(response.data);
                } else {
                    $scope.noResults = true;
                }
                $scope.searchNameQuery = name;
            });
    };

    $scope.searchDatabaseByName = function () {
        resetResults();
        $scope.resetVisualFeedbackVars();
        databaseService.getItemsByName($scope.searchNameQuery)
            .then(function (response) {
                if (response.data.length !== 0) {
                    $scope.processResults(response.data);
                    if ($scope.results[0].length < 1) {
                        $scope.noResults = true;
                    }
                } else {
                    $scope.noResults = true;
                }
            });
    };

    $scope.$watch(function () {
        return databaseService.categories;
    }, function (newValue, oldValue) {
        $scope.categories = databaseService.categories;
    });

    $scope.processResults = function (results) {
        var processedResults = [];
        processedResults[0] = [];
        var page = 0;
        var item = 0;

        results.forEach(function (result) {
            item++;
            if (result.ingredients != null) {
                if (result.ingredients.carpenter.length != 0) { result.craft_type = 'carpenter'; }
                else if (result.ingredients.blacksmith.length != 0) { result.craft_type = 'blacksmith'; }
                else if (result.ingredients.armorer.length != 0) { result.craft_type = 'armorer'; }
                else if (result.ingredients.goldsmith.length != 0) { result.craft_type = 'goldsmith'; }
                else if (result.ingredients.leatherworker.length != 0) { result.craft_type = 'leatherworker'; }
                else if (result.ingredients.weaver.length != 0) { result.craft_type = 'weaver'; }
                else if (result.ingredients.alchemist.length != 0) { result.craft_type = 'alchemist'; }
                else if (result.ingredients.culinarian.length != 0) { result.craft_type = 'culinarian'; }
                processedResults[page].push(result);
            } else {
                result.NotCraftable = true;
                processedResults[page].push(result);
            }
            if (item == $scope.resultsPerPage) {
                page++;
                $scope.numberOfPages.push(page);
                processedResults[page] = [];
                item = 0;
            }
        });
        $scope.numberOfResults = processedResults.length;
        $scope.results = processedResults;
    }

    $scope.resetVisualFeedbackVars();

})
})();
