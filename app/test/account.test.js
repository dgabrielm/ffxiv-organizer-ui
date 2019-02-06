describe('Account Controller Test Suite', function () {

  var $controller, $rootScope, userService;

  beforeEach(function () {
    angular.mock.module('ffxivOrganizer');
  });

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('resetVisualFeedbackVars', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = $rootScope.$new();
      controller = $controller('AccountController', { $scope: $scope });
    });

    it('Should set scope visual feedback variables to false', function () {
      $scope.resetVisualFeedbackVars();
      expect($scope.dataSaved).toEqual(false);
      expect($scope.dataNotSaved).toEqual(false);
      expect($scope.accountDeleteFail).toEqual(false);
      expect($scope.accountDeleteSuccess).toEqual(false);
    });

  });

});
