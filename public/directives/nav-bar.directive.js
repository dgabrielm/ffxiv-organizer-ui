app.directive('navBar', [function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'templates/nav-bar.html',
        transclude: true,
        replace: true,
        controller: function ($scope, userService, inventoryService, listsService, bgService) {
            // loggedIn status watched from user service
            $scope.loggedIn = userService.loggedIn;
            $scope.$watch(function () {
                return userService.loggedIn;
            }, function (newValue, oldValue) {
                $scope.loggedIn = userService.loggedIn;
            });

            $scope.getNewBg = function () {
                bgService.getNewBg();
            }

            $scope.$watch(function () {
                return userService.user;
            }, function (newValue, oldValue) {
                $scope.username = userService.getUsername();
            });

            $scope.login = function (usr, pwd) {
                $scope.resetLoginFailed();
                userService.login(usr, pwd)
                    .catch(function (error) {
                        userService.loginFailed = true;
                    });
            };

            $scope.resetLoginFailed = function () {
                userService.loginFailed = false;
            };

            $scope.$watch(function () {
                return userService.loginFailed;
            }, function (newValue, oldValue) {
                $scope.loginFailed = userService.loginFailed;
            });

            $scope.logout = userService.logout;

            $scope.$watch(function () {
                return inventoryService.unsavedChanges;
            }, function (newValue, oldValue) {
                $scope.inventoryChanges = inventoryService.unsavedChanges;
            });

            $scope.$watch(function () {
                return listsService.unsavedChanges;
            }, function (newValue, oldValue) {
                $scope.listsChanges = listsService.unsavedChanges;
            });
        }
    }
}]);