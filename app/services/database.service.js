(function () {
angular.module('ffxivOrganizer')
.service('databaseService', function ($http, ITEMS_CONFIG) {

    var $this = this;
    
    this.getItemById = function (id) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/id/' + id);
    };

    this.getItemsByName = function (searchQuery) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/name/' + searchQuery);
    };

    this.getCategories = function () {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/categories')
            .then(function (response) {
                var array = response.data;
                array.sort(function (a, b) {
                    (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
                });
                $this.categories = array;
            });
    };

    this.getItemsByCategory = function (category) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/category/' + category);
    };

    this.getCategories();

})
})();
