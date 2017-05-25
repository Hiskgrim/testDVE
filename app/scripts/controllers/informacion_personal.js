'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:InformacionPersonalCtrl
 * @description
 * # InformacionPersonalCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('InformacionPersonalCtrl', function ($scope,$mdDialog,persona) {
    
    var self = this;
    self.persona=persona;

  });
