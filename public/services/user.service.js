app.service('userService', ['$http', '$location', '$window', function ($http, $location, $window) {
    
    var self = this;

    this.login = function (usr, pwd) {
        // reset user feedback variable
        self.loginFailed = false;

        $http.get('http://192.168.0.4:9876/users/' + usr + '/' + pwd)
            .then(function (response) {
                if (response.data !== null) {
                    self.user = response.data;
                    self.loggedIn = true;
                    $location.path('/dashboard');
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
