'use strict';

describe('Controller: FormacionAcademicaDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var FormacionAcademicaDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormacionAcademicaDetalleCtrl = $controller('FormacionAcademicaDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormacionAcademicaDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
