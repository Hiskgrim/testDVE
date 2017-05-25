'use strict';

describe('Controller: HistoriaLaboralCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var HistoriaLaboralCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistoriaLaboralCtrl = $controller('HistoriaLaboralCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HistoriaLaboralCtrl.awesomeThings.length).toBe(3);
  });
});
