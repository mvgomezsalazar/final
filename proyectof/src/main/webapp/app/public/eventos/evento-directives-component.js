
var module = angular.module('mpApp.public');


module.component('eventosDirectivesComponent', {
    templateUrl: 'app/public/eventos/evento-directives.html',
    bindings: {
        view: "@"
    },
    controller: function ($log, $location, EventosResource) {
        this.dev = {};

        this.save = function () {
            $log.info(this.dev.fecha);
            var successCallback = function (data, responseHeaders) {
                $log.info('saved successfuly ' + data);
                $location.path('/eventos');
            };

            var errorCallback = function (responseHeaders) {
                $log.error('error while persisting');
            };
            EventosResource.grabar(this.dev, successCallback, errorCallback);
        };

        this.cancel = function () {
            $log.info('entro a la funcion cancel');
            this.dev = {};
        };
    }


});


module.component('eventosComponent', {
    templateUrl: 'app/public/eventos/search.html',
    bindings: {
        view: "@"
    },
    controller: function ($log, $http, $q, EventosResource, $state) {

        this.eventos = [];
        this.eventos = EventosResource.queryAll({"max": 100});
             
        this.delete = function (evento) {
            $log.info(evento);
            var successCallback = function (data, responseHeaders) {
                $log.info('deleted successfuly ' + data);
                $state.reload();
                $location.path('/list');
            };

            var errorCallback = function (responseHeaders) {
                $log.error('error while removing');
            };
            EventosResource.eliminar({"id":evento.id}, successCallback, errorCallback);
        };

    }
});

//module.component('deleteEventoComponent', {
//    templateUrl: 'app/public/eventos/search.html',
//    bindings: {
//        view: "@"
//    },
//    controller: function ($log, $http, $q, EventosResource) {
//        this.dev = {};
//             
//        this.delete = function () {
//            $log.info(this.dev.id);
//            var successCallback = function (data, responseHeaders) {
//                $log.info('deleted successfuly ' + data);
//                $location.path('/list');
//            };
//
//            var errorCallback = function (responseHeaders) {
//                $log.error('error while removing');
//            };
//            EventosResource.eliminar(this.dev, successCallback, errorCallback);
//        };
//    }
//});




