app.directive('jumbotron', [function() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/jumbotron.html',
        transclude: true,
        replace: true,
        controller: 'jumbotronController'
    };
}]);