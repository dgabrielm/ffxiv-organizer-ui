describe('AccountController', function () {
  beforeEach(function () { module('app'); });

  var $controller;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe('$scope.resetVisualFeedbackVars', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('AccountController', { $scope: $scope });
    });

    it('should set scope visual feedback variables to false', function () {
      $scope.resetVisualFeedbackVars();
      expect($scope.dataSaved).toEqual(false);
      expect($scope.dataNotSaved).toEqual(false);
      expect($scope.accountDeleteFail).toEqual(false);
      expect($scope.accountDeleteSuccess).toEqual(false);
    });

    //   it('sets the strength to "weak" if the password length <3 chars', function() {
    //     $scope.password = 'a';
    //     $scope.grade();
    //     expect($scope.strength).toEqual('weak');
    //   });

  });

});
