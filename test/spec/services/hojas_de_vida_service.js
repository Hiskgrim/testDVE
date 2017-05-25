'use strict';

describe('Service: hojasDeVidaService', function () {

  // load the service's module
  beforeEach(module('clienteApp'));

  // instantiate service
  var hojasDeVidaService;
  beforeEach(inject(function (_hojasDeVidaService_) {
    hojasDeVidaService = _hojasDeVidaService_;
  }));

  it('should do something', function () {
    expect(!!hojasDeVidaService).toBe(true);
  });

});
