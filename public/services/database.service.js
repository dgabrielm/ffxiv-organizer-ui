app.service('databaseService', ['$http', 'ITEMS_CONFIG', function($http, ITEMS_CONFIG) {
    
    this.results = []; 

    this.getItemById = function (id) {
        return $http.get(ITEMS_CONFIG.location + ':' + ITEMS_CONFIG.port + '/items/id/' + id);
    };

}])