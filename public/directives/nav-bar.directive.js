app.directive('navBar', [function() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/nav-bar.html',
        transclude: true,
        replace: true,
        controller: function($scope, sessionService, $location, $window) {
            $scope.loggedIn = sessionService.loggedIn;

            $scope.$watch(function(){
                return sessionService.loggedIn;
             }, function(newValue, oldValue){
                $scope.loggedIn = sessionService.loggedIn;
             });

            $scope.login = function() {
                sessionService.login();
                $location.path('/database');
                // $scope.loggedIn = sessionService.loggedIn;
            };
        
            $scope.logout = function() {
                sessionService.logout();
                $window.location.href = '/';
            };
        },
        link: function(scope, element, attrs) {
            scope.$watch("loggedIn",function(newValue,oldValue) {
                //This gets called when data changes.
            });
         }
    };
}]);