'use strict';

describe('Service: contratacionService', function () {

  // load the service's module
  beforeEach(module('clienteApp'));

  // instantiate service
  var contratacionService;
  beforeEach(inject(function (_contratacionService_) {
    contratacionService = _contratacionService_;
  }));

  it('should do something', function () {
    expect(!!contratacionService).toBe(true);
  });

});
