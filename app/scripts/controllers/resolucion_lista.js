'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ResolucionListaCtrl
 * @description
 * # ResolucionListaCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('ResolucionListaCtrl', function (contratacion_request,$scope,$window,$mdDialog) {
    
  	var self = this;

	self.resolucionesInscritas = {
      enableSorting: true,
      enableFiltering : true,
      enableRowHeaderSelection: false,
      columnDefs : [
        {
        	field: 'Id', 
        	visible : false
        },
        {
        	field: 'Numero',
        	width: '17%', 
        	displayName: 'NÚMERO'
        },
        {
        	field: 'Vigencia', 
        	width: '17%', 
        	displayName: 'VIGENCIA'
        },
        {
        	field: 'Facultad', 
        	width: '17%', 
        	displayName: 'FACULTAD'
        },
        {
        	field: 'NivelAcademico', 
        	width: '17%', 
        	displayName: 'NIVEL'
        },
        {
        	field: 'Dedicacion', 
        	width: '17%', 
        	displayName: 'DEDICACIÓN'
        },
        {
        	field: 'editar',
        	enableSorting: false,
            enableFiltering: false,
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-edit" ng-click="grid.appScope.verEditarResolucion(row)"></button>'
        },
        {
        	field: 'docentes',
        	enableSorting: false,
            enableFiltering: false,
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-group" ng-click="grid.appScope.verEditarDocentes(row)"></button>'
        },
        {
        	field: 'expedir',
        	enableSorting: false,
            enableFiltering: false,
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-file" ng-click="grid.appScope.verRealizarExpedicion(row)"></button>'
        },
        {
        	field: 'ver',
        	enableSorting: false,
            enableFiltering: false,
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-search" ng-click="grid.appScope.verVisualizarResolucion(row)"></button>'
        },
        {
        	field: 'cancelar',
        	enableSorting: false,
            enableFiltering: false,
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-times" ng-click="grid.appScope.verCancelarResolucion(row)"></button>'
        }
      ]
    };

    contratacion_request.getAll("resolucion_vinculacion").then(function(response){
        self.resolucionesInscritas.data=response.data;
    });  

    $scope.verEditarResolucion = function(row){
    	$window.location.href = '#/resolucion_detalle/'+row.entity.Id.toString();
    }

    $scope.verEditarDocentes = function(row){
    	$window.location.href = '#/hojas_de_vida_seleccion/'+row.entity.Id.toString();
    }

    $scope.verRealizarExpedicion = function(row){
    	swal({
		  title: '¿Expedir la resolución?',
		  text: "No se podrá revertir la decisión!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Aceptar',
		  cancelButtonText: 'Cancelar',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  buttonsStyling: false
		}).then(function () {
		  swal(
		    'Expedida!',
		    'La resolución ha sido expedida con exito.',
		    'success'
		  )
		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  if (dismiss === 'cancel') {
		    swal(
		      'Cancelado!',
		      'La expedición de la resolución ha sido cancelada',
		      'error'
		    )
		  }
		})
    }

	$scope.verVisualizarResolucion = function(row){
    	$mdDialog.show({
            controller: "ResolucionVistaCtrl",
            controllerAs: 'resolucionVista',
            templateUrl: 'views/resolucion_vista.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: true,
            locals: {persona: self.persona}
        })
    }    

	$scope.verCancelarRsolucion = function(row){
    	swal({
		  title: '¿Cancelar la resolución?',
		  text: "No se podrá revertir la decisión!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Aceptar',
		  cancelButtonText: 'Cancelar',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  buttonsStyling: false
		}).then(function () {
		  swal(
		    'Deleted!',
		    'Your file has been deleted.',
		    'success'
		  )
		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  if (dismiss === 'cancel') {
		    swal(
		      'Cancelled',
		      'Your imaginary file is safe :)',
		      'error'
		    )
		  }
		})
    }    

  });

