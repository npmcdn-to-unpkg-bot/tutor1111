/**
 * Created by Administrator on 2016/8/1.
 */


angular.module('tutor',[
    'ui.router',
    'ui.bootstrap',
    'ngAnimate'
])
    .config(function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                url:'/index',
                views:{
                    '':{
                        templateUrl:'views/home/index.html'
                    },
                    'header@index':{
                        templateUrl:'views/home/header.html',
                        controller:'HeaderCtrl'
                    },
                    'workspace@index':{
                        templateUrl:'views/home/workspace.html',
                        controller:'WorkSpaceCtrl'
                    },
                    'footer@index':{
                        templateUrl:'views/home/footer.html'
                        // controller:'FooterCtrl'
                    }
                }
            })

    });