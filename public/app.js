const app = angular.module('ffxivOrganizer', ['ngRoute', 'ngAnimate', 'angular-toArrayFilter', 'appConfig']);

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

app.run(['$location', 'userService', '$rootScope', function ($location, userService, $rootScope) {

    var backgrounds = function () {
        
        var backgrounds = [
            'img/jumbotron-images/1.jpg',
            'img/jumbotron-images/2.jpg',
            'img/jumbotron-images/3.jpg',
            'img/jumbotron-images/4.jpg',
            'img/jumbotron-images/5.jpg',
            'img/jumbotron-images/6.jpg',
            'img/jumbotron-images/7.jpg',
            'img/jumbotron-images/8.jpg',
            'img/jumbotron-images/9.jpg',
            'img/jumbotron-images/10.jpg'
        ];

        return backgrounds[Math.floor(Math.random() * backgrounds.length)];

    };

    $rootScope.getNewBg = function () {
        $rootScope.bg = backgrounds();
    };

    $rootScope.bg = backgrounds();

    if (!userService.loggedIn && $location.$$path != '/register') {
        $location.path('register');
    }

}]);
