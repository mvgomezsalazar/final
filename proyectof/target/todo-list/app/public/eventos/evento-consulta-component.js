
var module = angular.module('mpApp.public');


module.component('eventosConsultaComponent', {
    templateUrl: 'app/public/eventos/evento-consulta-componente.html',
    bindings:{
        view:"@"
    },
    controller: function ($log,$location, EventosResource) {
    this.location = $location.path();
    this.dev = {};    
    this.res = {};
    this.get = function(){
//        var successCallback = function(data, responseHeaders) {
//            $log.info('retrieved successfuly ' + JSON.stringify(data));            
//            this.dev ={fecha: 'texto'               
//            }                         
//        };        
//        var errorCallback = function(responseHeaders) {
//            $log.error('error while searching ' + responseHeaders);
//        };        
//        $log.info('esto trae id'+this.dev.id);
          this.dev= EventosResource.query({id:this.dev.id});
    };       
    } 
    
    
});




            /*this.dev = {
                name: 'Victor Orozco',
                email: 'vorozco@nabenik.com'
            };
        };   */