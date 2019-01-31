const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate', 'ngtweet', 'angular-toArrayFilter', 'appConfig']);

// before application runs
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'accountController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })
        .when('/database', {
            templateUrl: 'views/database.html',
            controller: 'databaseController'
        })
        .when('/lists', {
            templateUrl: 'views/lists.html',
            controller: 'listsController'
        })
        .when('/inventory', {
            templateUrl: 'views/inventory.html',
            controller: 'inventoryController'
        })
        .otherwise({
            redirectTo: '/register'
        });

}]);

// // while application runs
// app.run(['$location', function ($location) {

//     // $rootScope.$on("$locationChangeStart", function (event, next, current) {
//     //     if ($rootScope.loggedIn === false) {
//     //         $location.path('login');
//     //     }
//     // });

//     // sessionService.$on("$locationChangeStart", function(event, next, current) {

//     // });

//     // implement something which conditionally does not show the register or login pages if you are logged in and routes from /register to /dashboard - maybe the $location could be helpul in this
//     // Amd something which prevents you from being able to view pages intended for logged in users.
//     // don't want users viewing blank versions of pages either

// }]);
