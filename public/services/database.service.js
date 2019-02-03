app.service('databaseService', ['$http', 'ITEMS_CONFIG', function($http, ITEMS_CONFIG) {
    
    this.results = []; 

    this.getItemById = function (id) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/id/' + id);
    };

    this.getItemsByName = function (searchQuery) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/name/' + searchQuery);
    };

    this.getCategories = function () {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/categories');
    };

    this.getItemsByCategory = function (category) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/category/' + category);
    };

}]);
