app.directive('navBar', [function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/nav-bar.html',
        transclude: true,
        replace: true,
        controller: 'navController'
    }
}]);