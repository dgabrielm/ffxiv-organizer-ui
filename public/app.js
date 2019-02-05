const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate', 'angular-toArrayFilter', 'appConfig', 'angular-mocks']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'AccountController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        })
        .when('/database', {
            templateUrl: 'views/database.html',
            controller: 'DatabaseController'
        })
        .when('/lists', {
            templateUrl: 'views/lists.html',
            controller: 'ListsController'
        })
        .when('/inventory', {
            templateUrl: 'views/inventory.html',
            controller: 'InventoryController'
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
