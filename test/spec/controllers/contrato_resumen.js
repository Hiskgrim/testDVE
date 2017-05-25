'use strict';

describe('Controller: ContratoResumenCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ContratoResumenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContratoResumenCtrl = $controller('ContratoResumenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContratoResumenCtrl.awesomeThings.length).toBe(3);
  });
});
