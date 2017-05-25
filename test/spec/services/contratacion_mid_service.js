'use strict';

describe('Service: contratacionMidService', function () {

  // load the service's module
  beforeEach(module('clienteApp'));

  // instantiate service
  var contratacionMidService;
  beforeEach(inject(function (_contratacionMidService_) {
    contratacionMidService = _contratacionMidService_;
  }));

  it('should do something', function () {
    expect(!!contratacionMidService).toBe(true);
  });

});
