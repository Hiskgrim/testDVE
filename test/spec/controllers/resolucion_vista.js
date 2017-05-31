'use strict';

describe('Controller: ResolucionVistaCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ResolucionVistaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResolucionVistaCtrl = $controller('ResolucionVistaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResolucionVistaCtrl.awesomeThings.length).toBe(3);
  });
});
