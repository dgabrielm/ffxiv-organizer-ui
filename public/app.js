const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate', 'angular-toArrayFilter', 'appConfig']);

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

app.run(['$location', 'userService', function ($location, userService) {

    if (!userService.loggedIn && $location.$$path != '/register') {
        $location.path('register');
    }

}]);
