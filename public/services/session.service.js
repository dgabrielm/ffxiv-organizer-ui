app.factory('sessionService',[function() {

    return {
        loggedIn: false,
        login: function() {
            this.loggedIn = true;
        },
        logout: function() {
            this.loggedIn = false;
        }
    };

}]);