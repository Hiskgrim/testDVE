'use strict';

describe('Controller: ContratoRegistroCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var ContratoRegistroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContratoRegistroCtrl = $controller('ContratoRegistroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContratoRegistroCtrl.awesomeThings.length).toBe(3);
  });
});
