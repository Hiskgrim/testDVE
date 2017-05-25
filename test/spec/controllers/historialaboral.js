'use strict';

describe('Controller: HistorialaboralctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var HistorialaboralctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistorialaboralctrlCtrl = $controller('HistorialaboralctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HistorialaboralctrlCtrl.awesomeThings.length).toBe(3);
  });
});
