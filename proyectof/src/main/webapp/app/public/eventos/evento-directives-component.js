
var module = angular.module('mpApp.public');


module.component('eventosDirectivesComponent', {
    templateUrl: 'app/public/eventos/evento-directives.html',
    bindings:{
        view:"@"
    },
    controller: function ($log,$location, EventosResource) {
        this.dev = {};
        
        this.save = function () {
        $log.info(this.dev.fecha);
        var successCallback = function(data,responseHeaders) {
            $log.info('saved successfuly ' + data);
            $location.path('/eventos');
        };

        var errorCallback = function(responseHeaders) {
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