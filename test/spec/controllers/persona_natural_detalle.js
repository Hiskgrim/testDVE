'use strict';

describe('Controller: PersonaNaturalDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var PersonaNaturalDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonaNaturalDetalleCtrl = $controller('PersonaNaturalDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonaNaturalDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
