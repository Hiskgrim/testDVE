'use strict';

describe('Controller: ExperienciaLaboralDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ExperienciaLaboralDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExperienciaLaboralDetalleCtrl = $controller('ExperienciaLaboralDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExperienciaLaboralDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
