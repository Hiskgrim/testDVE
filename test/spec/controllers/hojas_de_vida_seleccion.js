'use strict';

describe('Controller: HojasDeVidaSeleccionCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var HojasDeVidaSeleccionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HojasDeVidaSeleccionCtrl = $controller('HojasDeVidaSeleccionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HojasDeVidaSeleccionCtrl.awesomeThings.length).toBe(3);
  });
});
