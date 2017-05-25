'use strict';

describe('Controller: ContratoDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ContratoDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContratoDetalleCtrl = $controller('ContratoDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContratoDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
