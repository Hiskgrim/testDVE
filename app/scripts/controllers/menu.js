'use strict';
/**
 * @ngdoc function
 * @name clienteApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
.controller('menuCtrl', function($location, $http, $scope, token_service, notificacion, $translate, academica_request) {
    var paths = [];
    $scope.language = {
        es:"btn btn-primary btn-circle btn-outline active",
        en:"btn btn-primary btn-circle btn-outline"
    };
    $scope.notificacion = notificacion;
    $scope.actual = "";
    $scope.token_service = token_service;
    $scope.breadcrumb = [];
    academica_request.getAll("facultad","limit=0").then(function(response){
      $scope.facultades=response.data;
      var contenidoInscripcion=[];
      var contenidoResolucion=[];
      $scope.facultades.forEach(function(facultad){
        var contenidoPregrado=[];
        academica_request.getAll("proyecto_curricular/pregrado/"+facultad.Id).then(function(response){
          $scope.proyectosPregrado=response.data;
          if($scope.proyectosPregrado){
            $scope.proyectosPregrado.forEach(function(proyecto){
              var itemPregrado={
                "Id": 1,
                "Nombre": proyecto.Nombre,
                "Url": "hojas_de_vida_seleccion/pregrado/"+facultad.Id.toString()+"/"+proyecto.Id.toString(),
                "Opciones": null
              };
              contenidoPregrado.push(itemPregrado);
            });
          }else{
            contenidoPregrado = null;
          }
        });
        var contenidoPosgrado=[];
        academica_request.getAll("proyecto_curricular/posgrado/"+facultad.Id).then(function(response){
          $scope.proyectosPosgrado=response.data;
          if($scope.proyectosPosgrado){
            $scope.proyectosPosgrado.forEach(function(proyecto){
              var itemPosgrado={
                "Id": 1,
                "Nombre": proyecto.Nombre,
                "Url": "hojas_de_vida_seleccion/posgrado/"+facultad.Id.toString()+"/"+proyecto.Id.toString(),
                "Opciones":null
              };
              contenidoPosgrado.push(itemPosgrado);
            });
          }else{
            contenidoPosgrado = null;
          }
        });
        var itemInscripcion={
          "Id": 1,
          "Nombre": facultad.Nombre,
          "Opciones":[{
            "Id": 2,
            "Nombre": "PREGRADO",
            "Url": "hojas_de_vida_seleccion/pregrado/"+facultad.Id.toString(),
            "Opciones": contenidoPregrado
          },{
            "Id": 4,
            "Nombre": "POSGRADO",
            "Url": "hojas_de_vida_seleccion/posgrado/"+facultad.Id.toString(),
            "Opciones": contenidoPosgrado
          }]          
        }
        var itemResolucion={
          "Id": 1,
          "Nombre": facultad.Nombre,
          "Opciones":[{
            "Id": 7,
            "Nombre": "PREGRADO",
            "Url": "urnl_nivel_2",
            "Opciones": [{
              "Id": 16,
              "Nombre": "TCO - MTO",
              "Url": "resolucion_generacion/pregrado/TCO_MTO/"+facultad.Id.toString(),
              "Opciones": null
            },{
              "Id": 17,
              "Nombre": "HCP",
              "Url": "resolucion_generacion/pregrado/HCP/"+facultad.Id.toString(),
              "Opciones": null
            },{
              "Id": 18,
              "Nombre": "HCH",
              "Url": "resolucion_generacion/pregrado/HCH/"+facultad.Id.toString(),
              "Opciones": null
            }]
          },{
            "Id": 9,
            "Nombre": "POSGRADO",
            "Url": "url_nivel_2",
            "Opciones": [{
              "Id": 16,
              "Nombre": "HCP",
              "Url": "resolucionposgradoHCP/"+facultad.Id.toString(),
              "Opciones": null
            },{
              "Id": 17,
              "Nombre": "HCH",
              "Url": "resolucionposgradoHCH/"+facultad.Id.toString(),
              "Opciones": null
            }]
          }]          
        }
        contenidoInscripcion.push(itemInscripcion);
        contenidoResolucion.push(itemResolucion);
      });
      $scope.actual = "";
      $scope.token_service = token_service;
      $scope.breadcrumb = [];
      $scope.menu_service = [{ //aqui va el servicio de el app de configuracion
        "Id": 6,
        "Nombre": "Resoluciones",
        "Url": "resolucion_lista",
        "Opciones": null//contenidoResolucion
      },{ //aqui va el servicio de el app de configuracion
        "Id": 6,
        "Nombre": "Generación resolución",
        "Url": "url_nivel_1",
        "Opciones": contenidoResolucion
      },{ //aqui va el servicio de el app de configuracion
        "Id": 1,
        "Nombre": "Inscripción docentes",
        "Url": "url_nivel_1",
        "Opciones": contenidoInscripcion
      }];
      recorrerArbol($scope.menu_service, "");
    });

    var recorrerArbol = function(item, padre) {
      var padres = "";
      for (var i = 0; i < item.length; i++) {
        if (item[i].Opciones === null) {
          padres = padre + " , " + item[i].Nombre;
          paths.push({
            'path': item[i].Url,
            'padre': padres.split(",")
          });
        } else {
          recorrerArbol(item[i].Opciones, padre + "," + item[i].Nombre);
        }
      }
      return padres;
    };



    var update_url = function() {
      $scope.breadcrumb = [''];
      for (var i = 0; i < paths.length; i++) {
        if ($scope.actual === "/" + paths[i].path) {
          $scope.breadcrumb = paths[i].padre;
        } else if ('/' === $scope.actual) {
          $scope.breadcrumb = [''];
        }
      }
    };

    paths.push({padre:["","Notificaciones","Ver Notificaciones"],path:"notificaciones"});

    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.actual = $location.path();
      update_url();
      console.log(next + current);
    });

    $scope.changeLanguage = function (key){
        $translate.use(key);
        switch (key) {
            case 'es':
                $scope.language.es = "btn btn-primary btn-circle btn-outline active";
                $scope.language.en = "btn btn-primary btn-circle btn-outline";
                break;
            case 'en':
                $scope.language.en = "btn btn-primary btn-circle btn-outline active";
                $scope.language.es = "btn btn-primary btn-circle btn-outline";
                break;
            default:
        }
    };
    //Pendiente por definir json del menu
    (function($) {
      $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      });
    })(jQuery);
  });
