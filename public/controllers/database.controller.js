app.controller('databaseController', ['$scope', '$http', 'databaseService', '$window', 'iconService', 'inventoryService', 'listsService', function ($scope, $http, databaseService, $window, iconService, inventoryService, listsService) {

    $scope.results = databaseService.results;
    $scope.categories = databaseService.categories;
    $scope.resultsPerPage = 50;
    $scope.craftableOnly = true;

    $scope.resetVisualFeedbackVars = function () {
        $scope.noResults = false;
        $scope.noCategoryResults = false;
    };

    $scope.resetResults = function () {
        databaseService.results = [];
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

    $scope.$watch(function () {
        return databaseService.results;
    }, function (newValue, oldValue) {
        $scope.results = databaseService.results;
    });

    $scope.top = function () {
        $window.scrollTo(0, 0);
    }

    // INVENTORY 

    $scope.inventory = inventoryService.inventory;

    $scope.updateQtyOrAddItemToInventory = function (item) {
        if (item.qty > 0 && item.qty !== null && item.qty !== undefined && item.qty != '') {
            if (inventoryService.inventory[item._id] !== undefined) {
                inventoryService.inventory[item._id].qty = item.qty;
            } else {
                inventoryService.inventory[item._id] = {
                    "name": item.name,
                    "icon_id": item.icon_id,
                    "qty": item.qty
                };
            }
            inventoryService.unsavedChanges = true;
        }
    };

    // LISTS

    $scope.lists = listsService.lists;
    $scope.getListsObject = function () {
        var obj = {};
        listsService.lists.craft_lists[listsService.currentCraftList].forEach(item => {
            obj[item._id + item.craft_type] = {
                qty: item.qty
            };
        });
        $scope.listsObj = obj;
    };

    $scope.changeList = function (list) {
        listsService.currentCraftList = list;
    };

    $scope.$watch(function () {
        return listsService.currentCraftList;
    }, function (newValue, oldValue) {
        $scope.currentCraftList = listsService.currentCraftList;
        $scope.getListsObject();
    });

    $scope.updateQtyOrAddItemToList = function (item) {
        if (item.listQty > 0 && item.listQty !== null && item.listQty !== undefined && item.listQty != '') {
            if ($scope.listsObj[item._id + item.craft_type] !== undefined) {
                listsService.lists.craft_lists[listsService.currentCraftList].find(it => it._id + it.craft_type == item._id + item.craft_type).qty = item.listQty;
            } else {
                listsService.lists.craft_lists[listsService.currentCraftList].push({
                    _id: item._id,
                    name: item.name,
                    craft_type: item.craft_type,
                    icon_id: item.icon_id,
                    qty: item.listQty,
                    ingredients: item.ingredients[item.craft_type]
                });
            }
            listsService.unsavedChanges = true;
            $scope.getListsObject();
        }

    };

    // SEARCH DATABASE

    $scope.searchDatabaseByCategory = function (category) {
        $scope.resetResults();
        $scope.resetVisualFeedbackVars();
        databaseService.getItemsByCategory(category)
            .then(function (response) {
                if (response.data.length !== 0) {
                    $scope.processResults(response.data);
                    if (databaseService.results[0].length < 1) {
                        $scope.noCategoryResults = true;
                    }
                } else {
                    $scope.noCategoryResults = true;
                }
                $scope.searchNameQuery = category;
            });
    };

    $scope.searchDatabaseById = function (id, name) {
        $scope.resetResults();
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
        $scope.resetResults();
        $scope.resetVisualFeedbackVars();
        databaseService.getItemsByName($scope.searchNameQuery)
            .then(function (response) {
                if (response.data.length !== 0) {
                    $scope.processResults(response.data);
                    if (databaseService.results[0].length < 1) {
                        $scope.noResults = true;
                    }
                } else {
                    $scope.noResults = true;
                }
            });
    };

    $scope.getCategories = function () {
        if ($scope.categories === undefined) {
            databaseService.getCategories()
                .then(function (response) {
                    let array = response.data;
                    array.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                    $scope.categories = array;
                    databaseService.categories = array;
                });
        }
    };

    $scope.processResults = function (results) {
        databaseService.results[0] = [];
        var page = 0;
        var item = 0;

        results.forEach(result => {
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
                databaseService.results[page].push(result);
            } else { 
                if ($scope.craftableOnly === false) {
                    databaseService.results[page].push(result);
                }
            }
            if (item == $scope.resultsPerPage) {
                page++;
                $scope.numberOfPages.push(page);
                databaseService.results[page] = [];
                item = 0;
            }
        });
        $scope.numberOfResults = databaseService.results.length;
    }

    $scope.resetVisualFeedbackVars();

}]);
