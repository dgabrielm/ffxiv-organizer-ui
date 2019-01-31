app.service('userService', ['$http', '$location', '$window', 'inventoryService', 'listsService', 'USERS_CONFIG', function ($http, $location, $window, inventoryService, listsService, USERS_CONFIG) {
    
    var self = this;

    this.login = function (usr, pwd) {
        // reset user feedback variable
        self.loginFailed = false;

        $http.get(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + usr + '/' + pwd)
            .then(function (response) {
                if (response.data !== null) {
                    self.user = response.data;
                    self.loggedIn = true;
                    $location.path('/dashboard');
                    inventoryService.getInventory(self.user._id);
                    listsService.getLists(self.user._id);
                } else {
                    // need to use this variable to provide some visual feedback
                    self.loginFailed = true;
                }
            });
    };

    this.logout = function () {
        self.loggedIn = false;
        $window.location.href = '/';
    };
    
    this.getUsername = function () {
        if (self.user === undefined) {
            return '';
        } else {
            return this.user.username;
        }
    };

}]);
