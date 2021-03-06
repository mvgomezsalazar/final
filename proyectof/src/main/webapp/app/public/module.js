
var module = angular.module('mpApp.public', ['mpApp.ui', 'ui.router', 'ngResource']);

module.constant('comm', {
    url: '/proyectof/rest'
});

module.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('public', {
        abstract: true,
        data: {
            title: 'MP Enterprise'
        }
    });

    $stateProvider.state('public.eventos', {
        url: '/eventos',
        data: {
            title: 'Eventos'
        },
        component: 'eventosDirectivesComponent',
        lazyLoad: function ($transition$) {
            return $transition$.injector().get('$ocLazyLoad').load(['app/public/eventos/evento-directives-component.js',
                'app/public/eventos/evento-resource.js', ]);
        }
    });



    $stateProvider.state('public.list', {
        url: '/list',
        data: {
            title: 'Buscar'
        },
        component: 'eventosComponent',
        lazyLoad: function ($transition$) {
            return $transition$.injector().get('$ocLazyLoad').load(['app/public/eventos/evento-directives-component.js',
                'app/public/eventos/evento-resource.js', ]);
        }

    });


    $stateProvider.state('public.posts.edit', {
        url: '/edit/:id',
        component: 'editEventoComponent',
        lazyLoad: function ($transition$) {
            return $transition$.injector().get('$ocLazyLoad').load(['app/public/eventos/evento-directives-component.js',
                'app/public/eventos/evento-resource.js', ]);
        }
    });
    
    $stateProvider.state('public.consultar',{
            url: '/consultar_individual',
            data:{
                title: 'Eventos_consulta'
            },
            component: 'eventosConsultaComponent',
            lazyLoad: function ($transition$) {
                    return $transition$.injector().get('$ocLazyLoad').load(['app/public/eventos/evento-consulta-component.js',
                    'app/public/eventos/evento-resource.js',]);
            }
        });
});