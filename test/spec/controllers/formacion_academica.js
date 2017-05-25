'use strict';

describe('Controller: FormacionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('clienteApp'));

  var FormacionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormacionAcademicaCtrl = $controller('FormacionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormacionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
