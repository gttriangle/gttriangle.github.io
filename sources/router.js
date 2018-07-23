(function (window) {
    'use strict';
    var baseUrl = 'https://gttriangle.github.io/';

    angular.module('gt-tri')
        .value('baseUrl', baseUrl)
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('Login', {
                url: "/Login",
                templateUrl: "/sources/views/LoginView.html",
                params: {obj: null}
            })
            .state('Home', {
                url: "/Home",
                templateUrl: "/sources/views/HomeView.html",
                params: {obj: null}
            });
            $urlRouterProvider.otherwise('Login');
        }]);
})(window);
