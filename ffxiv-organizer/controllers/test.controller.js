app.controller('testController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.title = "Testing Functions";

    $scope.removePerson = function(person) {
        let removedPerson = $rootScope.people.indexOf(person);
        $rootScope.people.splice(removedPerson, 1);
    };

    $scope.removeAll = function() {
        $rootScope.people = [];
    };

    $scope.addPerson = function() {
        $rootScope.people.push({
            name: $scope.newPerson.name,
            age: parseInt($scope.newPerson.age),
            working: $scope.newPerson.working
        });
        $scope.newPerson.name = '';
        $scope.newPerson.age = '';
        $scope.newPerson.working = false;
    };

    // Need to think about persisting!
    $scope.persist = function() {

    };

}]);