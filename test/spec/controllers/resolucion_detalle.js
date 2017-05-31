'use strict';

describe('Controller: ResolucionDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ResolucionDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResolucionDetalleCtrl = $controller('ResolucionDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResolucionDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
