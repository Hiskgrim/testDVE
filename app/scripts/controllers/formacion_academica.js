'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:FormacionAcademicaCtrl
 * @description
 * # FormacionAcademicaCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('FormacionAcademicaCtrl', function ($scope,$mdDialog,hojas_de_vida_request,persona) {

  	alert(persona.Id);
  	
  	var self = this;

    hojas_de_vida_request.getAll("formacion_academica").then(function(response){
        self.estudios=response.data;
        self.estudios.forEach(function(estudio){
       		estudio.FechaInicio = new Date(estudio.FechaInicio).toLocaleDateString('es');
       		estudio.FechaFinalizacion = new Date(estudio.FechaFinalizacion).toLocaleDateString('es');
          hojas_de_vida_request.getOne("institucion",estudio.InstitucionId.Id).then(function(response){
            estudio.institucion=response.data;
          });
          hojas_de_vida_request.getOne("titulo",estudio.Titulo.Id).then(function(response){
            estudio.titulo=response.data;
          });
        });
      });

     $scope.getNumeros = function(objeto) {
        var numeros=[];
        if(objeto){
          for(var i = 0; i<objeto.length; i++){
            numeros.push(i);
          }
        }
        return numeros;
      }
      
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
  });
