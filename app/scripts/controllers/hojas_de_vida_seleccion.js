'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:HojasDeVidaSeleccionCtrl
 * @description
 * # HojasDeVidaSeleccionCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('HojasDeVidaSeleccionCtrl', function (contratacion_request,academica_request,contratacion_mid_request,hojas_de_vida_request,$scope,$mdDialog,$routeParams) {
    
    var self = this;

    self.idResolucion=$routeParams.idResolucion;

    contratacion_request.getOne("resolucion_vinculacion_docente",self.idResolucion).then(function(response){      
      self.datosFiltro=response.data;
      self.datosFiltro.NivelAcademico=self.datosFiltro.NivelAcademico.toLowerCase();
      academica_request.getAll("proyecto_curricular/"+self.datosFiltro.NivelAcademico.toLowerCase()+"/"+self.datosFiltro.IdFacultad).then(function(response){
        self.proyectos=response.data;
      });
    });

    self.nivelAcademico=$routeParams.nivelAcademico;
    self.idFacultad=$routeParams.idFacultad;
    self.idProyectoCurricular=$routeParams.idProyectoCurricular;

    self.datosPersonas = {
      enableSorting: true,
      enableFiltering : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'Id', visible : false},
        {field: 'getNombreCompleto()', width: '70%', displayName: 'NOMBRE'},
        {field: 'categoria', displayName: 'CATEGORÍA'}
      ],
      onRegisterApi : function(gridApi){
        self.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
          contratacion_request.getOne("informacion_persona_natural",row.entity.Id).then(function(response){
            if(typeof(response.data)=="object"){
              self.persona=row.entity;
              self.persona.FechaExpedicionDocumento = new Date(self.persona.FechaExpedicionDocumento).toLocaleDateString('es');
            }else{
              swal({
                title: "Problema",
                text: "No se han podido encontrar datos de la persona seleccionada",
                type: "danger",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
              }); 
            }
          });
        });
      }
    };

    self.datosPersonas.multiSelect=false;

    self.contratados = {
      enableFiltering : true,
      enableSorting : true,
      showGridFooter: true,
      showColumnFooter: true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      enableRowSelection: true,
      enableSelectAll: true,
      columnDefs : [
        {field: 'id', visible : false},
        {field: 'nombre', width: '30%', displayName: 'NOMBRE'},
        {field: 'categoria', displayName: 'CATEGORÍA'},
        {field: 'numHorasSemanales', displayName: 'HORAS SEMANALES'},
        {field: 'numSemanas', displayName: 'SEMANAS'},
        {field: 'dedicacion', displayName: 'DEDICACIÓN'},
        {field: 'valorContrato', displayName: 'VALOR CONTRATO'},
         {
          field: 'cancelar',
          enableSorting: false,
            enableFiltering: false,
            width: '5%',
            displayName: '',
            cellTemplate: '<button class="form-control fa fa-times" ng-click="grid.appScope.verCancelarResolucion(row)"></button>'
        }
      ]
    };

  	contratacion_request.getAll("informacion_persona_natural","limit=0").then(function(response){
      self.datosPersonas.data=response.data;
      self.datosPersonas.data.forEach(function(row){
        contratacion_request.getAll("escalafon_persona","query=IdPersonaNatural.Id%3A"+row.Id).then(function(response){
          contratacion_request.getOne("escalafon",response.data[0].IdEscalafon.Id).then(function(response){
            row.categoria=response.data.NombreEscalafon;
          });
        });
        row.getNombreCompleto = function(){
          return this.PrimerNombre + ' ' + this.SegundoNombre + ' ' + this.PrimerApellido + ' ' + this.SegundoApellido;
        }
      });
    });

    self.verInformacionPersonal = function(){
      $mdDialog.show({
        controller: "InformacionPersonalCtrl",
        controllerAs: 'informacionPersonal',
        templateUrl: 'views/informacion_personal.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {persona: self.persona}
      }) 
    }

    self.verHistoriaLaboral = function(){
      $mdDialog.show({
        controller: "HistoriaLaboralCtrl",
        controllerAs: 'historiaLaboral',
        templateUrl: 'views/experiencia_laboral_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {persona: self.persona}
      }) 
    }

    self.verFormacionAcademica = function(){
      $mdDialog.show({
        controller: "FormacionAcademicaCtrl",
        controllerAs: "formacionAcademica",
        templateUrl: 'views/formacion_academica_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {persona: self.persona}
      })
    };

    self.verTrabajosInvestigacion = function(){
       $mdDialog.show({
        controller: "TrabajosInvestigacionCtrl",
        controllerAs: "trabajosInvestigacion",
        templateUrl: 'views/trabajos_investigacion_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {persona: self.persona}
      })
    };

    self.registrarContrato = function(){
      contratacion_mid_request.post("validar_contrato/"+self.persona.Id+"/"+self.datosValor.NumHorasSemanales+"/"+self.datosValor.dedicacion.toLowerCase()).then(function(response){
        if(response.data==1){
          contratacion_mid_request.post("calculo_salario/"+self.datosFiltro.NivelAcademico+"/"+self.persona.Id+"/"+self.datosValor.NumSemanas+"/"+self.datosValor.NumHorasSemanales+"/"+self.persona.categoria.toLowerCase()+"/"+self.datosValor.dedicacion.toLowerCase()).then(function(response){
            if(typeof(response.data)=="number"){
              self.valorContrato=response.data;
              self.persona.valorContrato=self.valorContrato;
              swal({
                title: '¿Desea agregar a la lista de contratados?',
                text: "Valor del contrato: $"+response.data.toString()+" ("+NumeroALetras(response.data).toLowerCase()+")",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
              });
              self.agregarContrato();
              self.datosValor={};
            }else{
              swal({
                title: "Peligro",
                text: "El salario no ha podido ser calculado",
                type: "warning",
                confirmButtonText: "Aceptar",
                showLoaderOnConfirm: true,
              });
            }
          });
        }else{
          swal({
            title: "Peligro",
            text: "Los datos no son validos",
            type: "warning",
            confirmButtonText: "Aceptar",
            showLoaderOnConfirm: true,
          });
        }
      });
    }

    self.eliminarSeleccionados = function(){
      
    }

    self.agregarContrato = function(){
      var contratado = {
              id: self.persona.Id,
              nombre: self.persona.getNombreCompleto(),
              categoria: self.persona.categoria,
              numHorasSemanales: self.datosValor.NumHorasSemanales,
              numSemanas: self.datosValor.NumSemanas,
              dedicacion: self.datosValor.dedicacion,
              valorContrato: self.persona.valorContrato
            };
            self.persona=contratado;
            self.contratados.data.push(contratado);
    }

    self.inscribirContratos = function(){
      self.contratosInscritos = self.contratados.data;
      //alert(JSON.stringify(self.contratosInscritos));
      self.verCalcularSalario();
    }

    self.asignarContrato = function(){
      self.verCalcularSalario();
    }

    self.verCalcularSalario = function(){
       $mdDialog.show({
        controller: "ContratoRegistroCtrl",
        controllerAs: "contratoRegistro",
        templateUrl: 'views/contrato_registro.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {persona: self.persona, nivelAcademico: self.nivelAcademico, idFacultad: self.idFacultad, idProyectoCurricular: self.idProyectoCurricular,contratados: self.contratosInscritos}
      })
    };

    $scope.selectedIndex = 0;

  });
