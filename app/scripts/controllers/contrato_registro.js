'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ContratoRegistroCtrl
 * @description
 * # ContratoRegistroCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('ContratoRegistroCtrl', function (contratacion_request,contratacion_mid_request,academica_request,sicapital_request,persona,nivelAcademico,idFacultad,idProyectoCurricular,contratados,$mdDialog) {
  	
  	var self = this;

    self.contratados=contratados;
    self.nivelAcademico=nivelAcademico;
    self.idFacultad=idFacultad;
    self.idProyectoCurricular=idProyectoCurricular;
    self.contratoGeneral={};

    self.contratoGeneral.SedeSolicitante=idFacultad;
    academica_request.getOne("facultad",self.idFacultad).then(function(response){
      self.contratoGeneral.SedeSolicitante=response.data.Id;
      self.sede_solicitante_defecto=response.data.Nombre;
    });

    academica_request.getOne("proyecto_curricular",self.idProyectoCurricular).then(function(response){
      self.contratoGeneral.DependeciaSolicitante=response.data.Id;
      self.dependencia_solicitante_defecto=response.data.Nombre;
    });

    academica_request.getAll("proyecto_curricular/"+self.nivelAcademico+"/"+self.idFacultad).then(function(response){
      self.proyectos=response.data;
    });

    sicapital_request.getAll("disponibilidad/cdpfiltro/2017/1/VIGENTE","limit=1").then(function(response){
      self.cdp_opciones=response.data;
    });

    self.asignarValoresDefecto = function(){
      self.contratoGeneral.ValorContrato=persona.valorContrato;
      //self.contratoGeneral.ValorContratoMe=Math.round(self.valorContrato/3000);
      self.contratoGeneral.Contratista=persona.id;
      self.contratoGeneral.Vigencia=new Date().getFullYear();
      if(persona.dedicacion=="HCH"){
        self.contratoGeneral.ObjetoContrato="Docente de Vinculación Especial - Honorarios";
        //self.contratoGeneral.TipoContrato="2";
      }else if(persona.dedicacion=="HCP" || persona.dedicacion=="MTO" || persona.dedicacion=="TCO"){
        self.contratoGeneral.ObjetoContrato="Docente de Vinculación Especial - Salario";
        //self.contratoGeneral.TipoContrato="3";
      }
      self.contratoGeneral.PlazoEjecucion=180;
      self.contratoGeneral.FormaPago={Id:240};
      self.contratoGeneral.DescripcionFormaPago="Abono a Cuenta Mensual de acuerdo a puntas y hotras laboradas";
      self.contratoGeneral.Justificacion="Docente de Vinculacion Especial";
      self.contratoGeneral.UnidadEjecucion={Id:205};
      self.contratoGeneral.LugarEjecucion={Id:2};
      self.contratoGeneral.Observaciones="Contrato de Docente Vinculación Especial";
      self.contratoGeneral.TipoControl=181;
      self.contratoGeneral.ClaseContratista=33;
      self.contratoGeneral.TipoMoneda=137;
      self.contratoGeneral.OrigenRecursos=149;
      self.contratoGeneral.OrigenPresupuesto=156;
      self.contratoGeneral.TemaGastoInversion=166;
      self.contratoGeneral.TipoGasto=146;
      self.contratoGeneral.RegimenContratacion=136;
      self.contratoGeneral.Procedimiento=132;
      self.contratoGeneral.ModalidadSeleccion=123;
      self.contratoGeneral.TipoCompromiso=35;
      self.contratoGeneral.TipologiaContrato=46;
      self.contratoGeneral.FechaRegistro=new Date();
      self.contratoGeneral.UnidadEjecutora={Id:1};
      self.contratoGeneral.Condiciones="Sin condiciones";
    }

    self.asignarValoresDefecto();

    //self.asignarValoresDefecto();

  	contratacion_request.getAll("supervisor_contrato","limit=-1").then(function(response){
  		self.supervisor_contrato_opciones=response.data;
  	})
  	contratacion_request.getOne("lugar_ejecucion",2).then(function(response){
  		self.lugar_ejecucion_defecto=response.data;
  	})
  	contratacion_request.getOne("parametros",205).then(function(response){
  		self.unidad_ejecucion_defecto=response.data;
  	})
  	contratacion_request.getOne("unidad_ejecutora",1).then(function(response){
  		self.unidad_ejecutora_defecto=response.data;
  	})
  	contratacion_request.getAll("tipo_contrato","limit=-1").then(function(response){
  		self.tipo_contrato_opciones=response.data;
  	})
  	contratacion_request.getOne("parametros",240).then(function(response){
  		self.forma_pago_defecto=response.data;
  	})
    contratacion_request.getOne("parametros",146).then(function(response){
      self.tipo_gasto_defecto=response.data;
    })
    contratacion_request.getOne("parametros",46).then(function(response){
      self.tipologia_contrato_defecto=response.data;
    })
    contratacion_request.getOne("parametros",35).then(function(response){
      self.tipo_compromiso_defecto=response.data;
    })
    contratacion_request.getOne("parametros",123).then(function(response){
      self.modalidad_seleccion_defecto=response.data;
    })
    contratacion_request.getOne("parametros",132).then(function(response){
      self.procedimiento_defecto=response.data;
    })
    contratacion_request.getOne("parametros",136).then(function(response){
      self.regimen_contratacion_defecto=response.data;
    })
    contratacion_request.getOne("parametros",166).then(function(response){
      self.tema_gasto_defecto=response.data;
    })
    contratacion_request.getOne("parametros",156).then(function(response){
      self.origen_presupuesto_defecto=response.data;
    })
    contratacion_request.getOne("parametros",149).then(function(response){
      self.origen_recursos_defecto=response.data;
    })
    contratacion_request.getOne("parametros",137).then(function(response){
      self.tipo_moneda_defecto=response.data;
    })
    contratacion_request.getOne("parametros",181).then(function(response){
      self.tipo_control_defecto=response.data;
    })
    contratacion_request.getOne("parametros",33).then(function(response){
      self.clase_contratista_defecto=response.data;
    })


  	self.cancelar = function(){
  		$mdDialog.hide();
  	}

  	self.calcularSalario = function(){
        contratacion_mid_request.post("calculo_salario/"+self.nivelAcademico+"/"+persona.Id+"/"+self.datosValor.NumSemanas+"/"+self.datosValor.NumHorasSemanales+"/asociado/"+self.datosValor.dedicacion).then(function(response){
	        if(typeof(response.data)=="number"){
	        	self.valorContrato=response.data;
	            swal({
		            title: "VALOR DEL CONTRATO",
		            text: NumeroALetras(response.data),
		            type: "info",
		            confirmButtonText: "Aceptar",
		            closeOnConfirm: false,
		            showLoaderOnConfirm: true,
	            });
	            self.asignarValoresDefecto();
	    	}else{
	    		swal({
		            title: "Peligro",
		            text: "El salario no ha podido ser calculado",
		            type: "danger",
		            confirmButtonText: "Aceptar",
		            closeOnConfirm: false,
		            showLoaderOnConfirm: true,
	            });
	    	}
        });
    }

    self.realizarContrato = function(){

      

  //    alert(JSON.stringify(contratosGenerales))

    	//self.contratoGeneral.Supervisor={Id:1} -- parseInt(self.contratoGeneral.Supervisor.Id);
    	self.contratoGeneral.UnidadEjecutora.Id;
    	//self.contratoGeneral.UnidadEjecucion.Id=parseInt(self.contratoGeneral.UnidadEjecucion.Id);
    	self.contratoGeneral.LugarEjecucion.Id=parseInt(self.contratoGeneral.LugarEjecucion.Id);
    	self.contratoGeneral.TipoContrato.Id=parseInt(self.contratoGeneral.TipoContrato.Id);
      self.contratoGeneral.DependeciaSolicitante=parseInt(self.idProyectoCurricular);
      self.contratoGeneral.NumeroCdp=parseInt(self.contratoGeneral.NumeroCdp);
    	//self.contratoGeneral.FormaPago.Id=parseInt(self.contratoGeneral.FormaPago.Id);
    	self.contratoGeneral.FechaRegistro = new Date();



/*      var contratosGenerales = []

      self.contratados.forEach(function(contratado){

        var contrato = self.contratoGeneral;
        contrato.ValorContrato = contratado.ValorContrato;
        contrato.Contratista = contratado.id;

        contratosGenerales.push(contrato);

      });

*/


      self.contratados.forEach(function(contratado){
        contratacion_request.post("contrato_general", self.contratoGeneral).then(function(response){
          self.contratoGeneral.ValorContrato=contratado.valorContrato;
          self.contratoGeneral.Contratista=contratado.id;
            if(typeof(response.data)=="object"){
              var dedicacionInt;
              switch(contratado.dedicacion){
                case "TCO":
                  dedicacionInt=4;
                  break;
                case "MTO":
                  dedicacionInt=3;
                  break;
                case "HCH":
                  dedicacionInt=2;
                  break;
                case "HCP":
                  dedicacionInt=1;
                  break;
              }
              self.contratoDocente = {
                NumeroContrato: response.data.Id.toString(),
                Vigencia: response.data.Vigencia,
                IdPersona: {Id: contratado.id},
                NumeroHorasSemanales: contratado.numHorasSemanales,
                NumeroSemanas: contratado.numSemanas,
                IdProyectoCurricular: parseInt(self.idProyectoCurricular),
                IdPuntoSalarial: {Id: 1},
                IdDedicacion: {Id: dedicacionInt},
                NivelAcademico: self.nivelAcademico
              };
              contratacion_request.post("contrato_docente", self.contratoDocente).then(function(response){
                if(typeof(response.data)=="object"){
                  swal({
                    title: "Contrato registrado",
                    text: "El contrato se ha registrado con éxito",
                    type: "success",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                  });
                }
              });
              $mdDialog.hide();
            }else{
              swal({
                title: "Problema",
                text: response.data,
                type: "warning",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
              }); 
            }
        });
      });
    }

  });
