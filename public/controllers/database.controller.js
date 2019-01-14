app.controller('databaseController', ['$scope', '$http', 'searchResultsService', function ($scope, $http, searchResultsService) {

    $scope.results = searchResultsService.results;

    $scope.$watch(function () {
        return searchResultsService.results;;
    }, function (newValue, oldValue) {
        $scope.results = searchResultsService.results;
    });

    $scope.searchDatabase = function () {

        $http.get('http://192.168.0.4:6789/items/name/' + $scope.searchQuery)
            .then(function (response) {
                if (response.data !== null) {
                    $scope.temp = response.data;

                    $scope.temp.forEach(result => {
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
                        searchResultsService.results =  $scope.temp;
                    });
                } else {
                    // // need to use this variable to provide some visual feedback
                }
            });

    };

    $scope.convertIcon = function (icon) {
        var path = icon;

        if (icon.length < 6) {
            path = '0' + icon;
        }

        return path.charAt(0) + path.charAt(1) + path.charAt(2) + '000/' + path;
    }

}]);