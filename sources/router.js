(function (window) {
    'use strict';
    var baseUrl = 'https://gttriangle.github.io/';

    angular.module('gt-tri')
        .value('baseUrl', baseUrl)
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('Account', {
                url: "/Account",
                templateUrl: "/sources/views/AccountView.html",
                params: {obj: null}
            }).state('Budget', {
                url: "/Budget",
                templateUrl: "/sources/views/BudgetView.html",
                params: {obj: null}
            }).state('Calendar', {
                url: "/Calendar",
                templateUrl: "/sources/views/CalendarView.html",
                params: {obj: null}
            }).state('EventDiagnostics', {
                url: "/EventDiagnostics",
                templateUrl: "/sources/views/EventDiagnosticsView.html",
                params: {obj: null}
            }).state('Event', {
                url: "/Event?eventId",
                templateUrl: "/sources/views/EventView.html",
                params: {
                    eventId: {
                        value: '',
                        squash: true
                    }
                }
            }).state('EventPolicies', {
                url: "/EventPolicies",
                templateUrl: "/sources/views/EventPoliciesView.html",
                params: {obj: null}
            }).state('FamilyTrees', {
                url: "/FamilyTrees?person",
                templateUrl: "/sources/views/FamilyTreesView.html",
                params: {obj: null},
            }).state('FinancialStatus', {
                url: "/FinancialStatus",
                templateUrl: "/sources/views/FinancialStatusView.html",
                params: {obj: null}
            }).state('Home', {
                url: "/Home",
                templateUrl: "/sources/views/HomeView.html",
                params: {obj: null}
            }).state('Login', {
                url: "/Login",
                templateUrl: "/sources/views/LoginView.html",
                params: {obj: null}
            }).state('Transactions', {
                url: "/Transactions",
                templateUrl: "/sources/views/TransactionsView.html",
                params: {obj: null}
            });
            $urlRouterProvider.otherwise('Login');
        }]);
})(window);
