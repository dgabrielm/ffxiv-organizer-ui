app.service('databaseService', ['$http', function($http) {

    this.results = []; 

    this.getItemById = function (id) {
        return $http.get('http://192.168.0.4:6789/items/id/' + id);
    };

}]);