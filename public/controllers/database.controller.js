app.controller('databaseController', ['$scope', '$http', 'searchResultsService', function ($scope, $http, searchResultsService) {

    $scope.results = searchResultsService.results;
    $scope.currentPage = 0;

    $scope.$watch(function () {
        return searchResultsService.results;
    }, function (newValue, oldValue) {
        $scope.results = searchResultsService.results;
        $scope.cache = searchResultsService.dbCache;
    });

    $scope.noresults = false;

    $scope.searchDatabaseByName = function () {

        // Reset user feedback variable
        $scope.noresults = false;

        // QUERY CACHE
        if (searchResultsService.dbCache[$scope.searchNameQuery] !== undefined) {
            $scope.results = searchResultsService.dbCache[$scope.searchNameQuery];
        } else {
            // QUERY DB
            $http.get('http://192.168.0.4:6789/items/name/' + $scope.searchNameQuery)
                .then(function (response) {
                    if (response.data !== null) {
                        var temp = response.data;
                        searchResultsService.results[0] = [];
                        var page = 0;
                        var item = 0;

                        temp.forEach(result => {
                            if (result.ingredients != null) {
                                if (result.ingredients.carpenter.length != 0) { result.displayMode = 'carpenter'; }
                                else if (result.ingredients.blacksmith.length != 0) { result.displayMode = 'blacksmith'; }
                                else if (result.ingredients.armorer.length != 0) { result.displayMode = 'armorer'; }
                                else if (result.ingredients.goldsmith.length != 0) { result.displayMode = 'goldsmith'; }
                                else if (result.ingredients.leatherworker.length != 0) { result.displayMode = 'leatherworker'; }
                                else if (result.ingredients.weaver.length != 0) { result.displayMode = 'weaver'; }
                                else if (result.ingredients.alchemist.length != 0) { result.displayMode = 'alchemist'; }
                                else if (result.ingredients.culinarian.length != 0) { result.displayMode = 'culinarian'; }
                            }
                            item++;
                            searchResultsService.results[page].push(result);
                            if (item == 99) {
                                page++;
                                searchResultsService.results[page] = [];
                                item = 0;
                            }
                        });
                        searchResultsService.dbCache[$scope.searchNameQuery] = searchResultsService.results;
                    } else {
                        // // need to use this variable to provide some visual feedback
                        $scope.noresults = true;
                    }
                });

        }
    };

    $scope.convertIcon = function (icon) {
        var path = icon;

        if (icon.length < 6) {
            path = '0' + icon;
        }

        return path.charAt(0) + path.charAt(1) + path.charAt(2) + '000/' + path;
    }

}]);