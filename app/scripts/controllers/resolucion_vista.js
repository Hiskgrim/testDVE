'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ResolucionVistaCtrl
 * @description
 * # ResolucionVistaCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('ResolucionVistaCtrl', function (contratacion_request,academica_request,$mdDialog,$scope,) {
    
  	var self=this;

    self.nivelCarrera="pregrado";
    self.tipoDedicacion="TCO_MTO";
    self.idFacultad=33;

    academica_request.getAll("proyecto_curricular/"+self.nivelCarrera+"/"+self.idFacultad).then(function(response){
      	self.proyectos=response.data;
        self.generarResolucion();
    });

    self.contratados=[];

    alert(JSON.stringify(self.contratados));

    switch(self.tipoDedicacion){      
      case "TCO_MTO":
        contratacion_request.getAll("contratado/tco").then(function(response){
          if(response.data){
            self.contratados=self.contratados.concat(response.data);
          }
        });
        contratacion_request.getAll("contratado/mto").then(function(response){
          if(response.data){
            self.contratados=self.contratados.concat(response.data);
          }
        });
        break;
      case "HCP":
        contratacion_request.getAll("contratado/hcp").then(function(response){
          if(response.data){
            self.contratados=self.contratados.concat(response.data);
          }
        });
        break;
      case "HCH":
        contratacion_request.getAll("contratado/hch").then(function(response){
          if(response.data){
            self.contratados=self.contratados.concat(response.data);
          }
        });
        break;
    }

    contratacion_request.getOne("resolucion",1).then(function(response){
    	self.numero=response.data.NumeroResolucion;	
    	alert(self.numero);
    })

    /*contratacion_request.getOne("resolucion",1).then(function(response){
    	self.preambulo=response.data.PreambuloResolucion;
    	alert(self.preambulo)
    })*/

    $.getJSON("/resolucion.json", function(resolucion) {
        self.preambulo=resolucion["preambulo"];
    });

    $.getJSON("/resolucion.json", function(resolucion) {
        self.consideracion=resolucion["consideracion"];
    });
    
    $.getJSON("/resolucion.json", function(resolucion) {
        self.articulos=resolucion["articulos"];
    });


  	self.generarResolucion = function() {
	    var documento=getDocumento(self);
	    pdfMake.createPdf(documento).getDataUrl(function(outDoc){
	      document.getElementById('vistaPDF').src = outDoc;
	    });
	}

	

  });
