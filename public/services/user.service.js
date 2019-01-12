app.service('userService', [function () {

    this.loggedIn = false;
    this.loginFailed = false;
    this.loginSuccessful = false;
    this.getUsername = function() {
        if (this.user === undefined) {
            return '';
        } else {
            return this.user.username;
        }
    };

}]);
