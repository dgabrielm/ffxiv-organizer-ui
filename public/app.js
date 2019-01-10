const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate']);

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
            templateUrl: '/dashboard'
        });

}]);

// while application runs
// app.run(['$rootScope', '$location', function ($rootScope, $location) {

//     $rootScope.$on("$locationChangeStart", function (event, next, current) {
//         if ($rootScope.loggedIn === false) {
//             $location.path('login');
//         }
//     });

// }]);