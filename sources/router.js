(function (window) {
    'use strict';
    var baseUrl = 'https://gttriangle.github.io/';

    angular.module('gt-tri')
        .value('baseUrl', baseUrl)
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('Home', {
                url: "/Home",
                templateUrl: "/sources/views/HomeView.html",
                params: {obj: null}
            });
            $urlRouterProvider.otherwise('Home');
        }]);
})(window);
