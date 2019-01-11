app.factory('userService', ['$http', function ($http) {

    // example get request
    // $http.get("controllers/test.json")
    //     .then(function (response) {
    //         rtn.people = response.data;
    //     });

    // Starting with example data;
    var user = {
        _id: '1',
        first_name: 'Dario',
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
        getUser: function() {
            
        }
    };

    var UserLogIn = function() {

    };

    return user;

}]);
