
var module = angular.module('mpApp.public', ['mpApp.ui','ui.router','ngResource']);

module.constant('comm',{
    url : '/proyectof/rest'
});

module.config(function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/')
	$stateProvider.state('public', {
            abstract : true,
            data : {
                title : 'MP Enterprise'
            }
        });
        
        $stateProvider.state('public.eventos',{
            url: '/eventos',
            data:{
                title: 'Eventos'
            },
            component: 'eventosDirectivesComponent',
            lazyLoad: function ($transition$) {
                    return $transition$.injector().get('$ocLazyLoad').load(['app/public/eventos/evento-directives-component.js',
                    'app/public/eventos/evento-resource.js',]);
            }
        });
	
	
//	
//	$stateProvider.state('public.posts.edit', {
//        url : '/update/:id',
//        views : {
//            "root@app" : {
//                templateUrl : 'app/public/posts/detail.html',
//                controller : 'editPostController'
//            }
//        }
//    
//	});
//	
//	$stateProvider.state('public.posts.new', {
//        url : '/new',
//        views : {
//            "root@app" : {
//                templateUrl : 'app/public/posts/detail.html',
//                controller : 'newPostController'
//            }
//        }
//    
//	});

});
