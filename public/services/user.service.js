app.factory('userService', ['$http', '$location', '$window', function ($http, $location, $window) {

    // example get request
    // $http.get("controllers/test.json")
    //     .then(function (response) {
    //         rtn.people = response.data;
    //     });

    var name = 'Dario';

    // Starting with example data;
    var rtn = {
        user: undefined,
        _id: '1',
        // leave this in temporarily so we don't break the account page... / register page
        first_name: name,
        last_name: 'Mincioni',
        email_address: 'dgm726@student.bham.ac.uk',
        character_name: 'Rufus Mao',
        username: 'dgabrielm',
        // needs to be implemented to check pw with id against server
        validatePassword: function(usr, pwd) {
            return true;
        },
        // need to implement to put new user object
        updateUserDatabase: function(usr, pwd, newUser) {

        },
        login: function() {
            // need to implement
            this.loggedIn = true;
            $location.path('/dashboard');
        },
        logout: function() {
            // need to implement
            this.loggedIn = false;
            $window.location.href = '/';
        },
        loggedIn: false
    };

    return rtn;

}]);
