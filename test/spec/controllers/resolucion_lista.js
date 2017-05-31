'use strict';

describe('Controller: ResolucionListaCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ResolucionListaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResolucionListaCtrl = $controller('ResolucionListaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResolucionListaCtrl.awesomeThings.length).toBe(3);
  });
});
