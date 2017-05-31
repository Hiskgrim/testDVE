'use strict';

describe('Controller: HistorialContratosCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var HistorialContratosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistorialContratosCtrl = $controller('HistorialContratosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HistorialContratosCtrl.awesomeThings.length).toBe(3);
  });
});
