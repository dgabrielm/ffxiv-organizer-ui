app.service('userService', ['$http', '$location', '$window', 'inventoryService', 'listsService', 'USERS_CONFIG', 'INVENTORIES_CONFIG', 'LISTS_CONFIG', function ($http, $location, $window, inventoryService, listsService, USERS_CONFIG, INVENTORIES_CONFIG, LISTS_CONFIG) {

    var $this = this;

    this.login = function (usr, pwd) {
        return $http.get(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + usr + '/' + pwd)
            .then(function (response) {
                if (response.data !== null) {
                    $this.user = response.data;
                    $this.loggedIn = true;
                    $location.path('/dashboard');
                    inventoryService.getInventory($this.user._id);
                    listsService.getLists($this.user._id);
                } else {
                    throw new Error;
                }
            })
            .catch(function (error) {
                $this.loginFailed = true;
            });
    };

    this.logout = function () {
        $window.location.href = '/';
    };

    // GETTERS & SETTERS

    this.getUsername = function () {
        if ($this.user === undefined) {
            return '';
        } else {
            return this.user.username;
        }
    };

    this.setLoginFailed = function (bool) {
        $this.loginFailed = bool;
    };

    // HTTP

    this.getUsernames = function () {
        $http.get(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/usernames')
            .then(function (response) {
                $this.usernames = response.data;
            });
    };

    this.updateUser = function (user, current_password) {
        return $http.post(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + $this.user.username + '/' + current_password, user);
    };

    this.deleteAccount = function (password) {
        return $http.delete(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/' + $this.user.username + '/' + password)
            .then(function (response) {
                if (response.data.n == 0) {
                    throw new Error;
                }
                $http.delete(INVENTORIES_CONFIG.location + ':' + INVENTORIES_CONFIG.port + '/inventories/' + $this.user._id);
            })
            .then(function () {
                $http.delete(LISTS_CONFIG.location + ':' + LISTS_CONFIG.port + '/lists/' + $this.user._id);
            })
    };

    this.createUser = function (register) {
        return $http.post(USERS_CONFIG.location + ':' + USERS_CONFIG.port + '/users/', register);
    };

}]);
