(function () {
    'use strict';
    angular.module('gt-tri').controller('LoginCtrl', ['$scope', '$state', 'authSvc', 'toaster', LoginCtrl]);

    function LoginCtrl($scope, $state, authSvc, toaster) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        vm.loginCreds = {};
        vm.registerCreds = {};

        vm.login = function() {
            if (!!$scope.loginCreds.email && !!$scope.loginCreds.password) {
                authSvc.loginUser($scope.loginCreds.email, $scope.loginCreds.password).then(function () {
                    vm.loginCreds = {};
                    toaster.pop('success', null, 'Logged In!');
                    $state.go('Home');
                }, function (error) {
                    vm.loginCreds.error = error;
                    toaster.pop('failure', null, 'Login Unsuccessful!');
                });
            }
        }

        vm.register = function() {
            if (!!$scope.registerCreds.name && !!$scope.registerCreds.email && !!$scope.registerCreds.password) {
                authSvc.createUser($scope.registerCreds.name, $scope.registerCreds.email, $scope.registerCreds.password).then(function () {
                    vm.registerCreds = {};
                    toaster.pop('success', null, 'User registered!');
                    $state.go('Home')
                }, function (error) {
                    vm.registerCreds.error = error;
                    toaster.pop('failure', null, 'Register Unsuccessful!');
                });
            }
        }
    };
})();
