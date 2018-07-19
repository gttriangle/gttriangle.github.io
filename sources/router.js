(function (window) {

    var baseUrl = 'https://gttriangle.github.io/';

    angular
        .module('gt-tri', ['ui.router', 'ui.bootstrap', 'ui.calendar', 'ngAnimate', 'toaster', 'ngSanitize', 'LocalStorageModule', 'angularUtils.directives.dirPagination', 'angular-clipboard', 'angularCSS', 'ng-showdown', 'dndLists', 'firebase'])
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
