var module = angular.module('mpApp.public');


module.factory('EventosResource', function ($resource, comm,$log) {
     $log.info('entro al factory');
    return $resource(comm.url + '/eventos/:id', {
            id : '@id'
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        },
        'query' : {
                method : 'GET',
                isArray : false
        },
        'update' : {
            method : 'PUT'
        }
        ,
        'grabar' : {
            method : 'POST'
        },
        
        'eliminar' : {
            method : 'DELETE'
        }         
//        'persistImage' : {
//            method : 'POST',
//            url: 'rest/protected/organizations/persist-image'
//        }
    });
});

