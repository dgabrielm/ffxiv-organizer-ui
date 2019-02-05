(function () {
angular.module('ffxivOrganizer')
.directive('ftr', function() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/footer.html',
        transclude: true,
        replace: true,
        controller: function () {
            
        }
    };
})
})();
