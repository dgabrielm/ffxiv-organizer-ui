const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate']);

// before application runs
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html'
        })
        .when('/test-view', {
            templateUrl: 'views/test-view.html',
            controller: 'testController'
        })
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'accountController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })
        .otherwise({
            templateUrl: '/'
        });

}]);

// app.run(['', function() {

// }]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        if ($rootScope.loggedIn === false) {
            $location.path('login');
        }
    });


}]);

// Declaration of shared data
app.controller('appController', ['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) {

    $rootScope.loggedIn = false;

    // need to implement
    $rootScope.login = function () {
        $location.path('test-view');
        $rootScope.loggedIn = true;
    };

    // Get test data
    $http.get("controllers/test.json")
    .then(function(response) {
        $rootScope.people = response.data;
    });

}]);
