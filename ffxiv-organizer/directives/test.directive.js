app.directive('randomPerson', [function() {
    return {
        restrict: 'E',
        scope: {
            people: '=',
            title: '='
        },
        template: '<div><h1>{{title}}</h1><h2>{{people[random].name}}</h2></div>',
        // with ng-transcule directive can include any html nested within a tag with this directive
        transclude: true,
        // replaces random-person tag with outermost template tag
        replace: true,
        controller: function($scope) { 
            $scope.random = Math.floor(Math.random() * 3);
        }
    };
}]);