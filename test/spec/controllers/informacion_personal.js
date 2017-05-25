'use strict';

describe('Controller: InformacionPersonalCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var InformacionPersonalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InformacionPersonalCtrl = $controller('InformacionPersonalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InformacionPersonalCtrl.awesomeThings.length).toBe(3);
  });
});
