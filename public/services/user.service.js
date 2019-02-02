app.service('userService', ['$http', '$location', '$window', 'inventoryService', 'listsService', 'USERS_CONFIG', 'INVENTORIES_CONFIG', 'LISTS_CONFIG', function ($http, $location, $window, inventoryService, listsService, USERS_CONFIG, INVENTORIES_CONFIG, LISTS_CONFIG) {

    var $this = this;

    this.login = function (usr, pwd) {
        // reset user feedback variable
        $this.loginFailed = false;

        $http.get(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + usr + '/' + pwd)
            .then(function (response) {
                if (response.data !== null) {
                    $this.user = response.data;
                    $this.loggedIn = true;
                    $location.path('/dashboard');
                    inventoryService.getInventory($this.user._id);
                    listsService.getLists($this.user._id);
                } else {
                    // need to use this variable to provide some visual feedback
                    $this.loginFailed = true;
                }
            });
    };

    this.deleteAccount = function (password) {

        $http.delete(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + $this.user.username + '/' + password)
            .then(function (response) {
                if (response.data.n == 0) {
                    throw new Error;
                }
                $http.delete(INVENTORIES_CONFIG.location + ':' + INVENTORIES_CONFIG.port + '/inventories/' + $this.user._id);
            })
            .then(function () {
                $http.delete(LISTS_CONFIG.location + ':' + LISTS_CONFIG.port + '/lists/' + $this.user._id);
            })
            .then(function () {
                // set good feedback variable!
                setTimeout(function () { $this.logout(); }, 2000);
            })
            .catch(function (error) {
                // set wrong password feedback variable!
                console.log(error);
            });

    };

    this.logout = function () {
        // remove this
        $this.loggedIn = false;
        $window.location.href = '/';
    };

    this.getUsername = function () {
        if ($this.user === undefined) {
            return '';
        } else {
            return this.user.username;
        }
    };

}]);
