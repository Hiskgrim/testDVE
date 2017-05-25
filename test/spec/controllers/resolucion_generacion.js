'use strict';

describe('Controller: ResolucionGeneracionCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ResolucionGeneracionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResolucionGeneracionCtrl = $controller('ResolucionGeneracionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResolucionGeneracionCtrl.awesomeThings.length).toBe(3);
  });
});
