'use strict';

describe('Controller: CalculoSalarioCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var CalculoSalarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalculoSalarioCtrl = $controller('CalculoSalarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CalculoSalarioCtrl.awesomeThings.length).toBe(3);
  });
});
