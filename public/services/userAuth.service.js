app.service('userAuthService', ['userService', '$http', '$location', '$window', function(userService, $http, $location, $window) {

    this.login = function(usr, pwd) {
        // reset user feedback variable
        userService.loginFailed = false;

        $http.get('http://192.168.0.4:9876/users/' + usr + '/' + pwd)
            .then(function (response) {
                if (response.data !== null) {
                    userService.user = response.data;
                    userService.loggedIn = true;
                    $location.path('/dashboard');
                } else {
                    // need to use this variable to provide some visual feedback
                    userService.loginFailed = true;
                }
            });
    };
    
    this.logout = function() {
        userService.loggedIn = false;
        $window.location.href = '/';
    };

}]);