
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

        
        this.editMode = false;

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
            EventosResource.eliminar({"id": evento.id}, successCallback, errorCallback);
        };

        this.handleModeChange = function (evento) {
            
             var successCallback = function (data, responseHeaders) {
                $log.info('edited successfuly ' + data);
                $state.reload();
                $location.path('/list');
            };

            var errorCallback = function (responseHeaders) {
                $log.error('error while editing');
            };
            
            if(this.editMode){
                EventosResource.update(evento, successCallback, errorCallback)              
            }
            
            
            this.editMode = !this.editMode;
        };

        this.reset = function () {
            this.fieldValue = this.fieldValueCopy;
        };
    }
});

module.component('editEventoComponent', {
    templateUrl: 'app/public/eventos/edit.html',
    bindings: {
        view: "@"
    },
    controller: function ($scope, $log, $stateParams, EventosResource) {
        this.dev = {};

        $scope.get = function () {
            var successCallback = function (data, responseHeaders) {
                $log.info('retrieved successfuly ' + JSON.stringify(data));
                $scope.post = data;
            };

            var errorCallback = function (responseHeaders) {
                $log.error('error while searching ' + responseHeaders);
            };

            EventosResource.query({id: $stateParams.id}, successCallback, errorCallback);
        };

        $scope.save = function () {

            var successCallback = function (data, responseHeaders) {
                $log.info('updating successfuly ' + data);
                $location.path('/list');
            };

            var errorCallback = function (responseHeaders) {
                $log.error('error while persisting');
            };

            //postResource.update($scope.post, successCallback, errorCallback);

            $scope.post.$update(successCallback, errorCallback);

        };
    }
});
        
 module.controller('eventoController', function () {
    this.dev = {foo:'test'};
    
    this.dev2 = {bar:'test'};
});
        
        




