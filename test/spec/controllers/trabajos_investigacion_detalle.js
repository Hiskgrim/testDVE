'use strict';

describe('Controller: TrabajosInvestigacionDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var TrabajosInvestigacionDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajosInvestigacionDetalleCtrl = $controller('TrabajosInvestigacionDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajosInvestigacionDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
