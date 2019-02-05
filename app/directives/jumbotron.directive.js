app.directive('jumbotron', [function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/jumbotron.html',
        transclude: true,
        replace: true,
        controller: function (bgService, $scope) {

            $scope.$watch(function () {
                return bgService.bg;
            }, function (newValue, oldValue) {
                $scope.bg = bgService.bg;
            });

        }
    };
}]);