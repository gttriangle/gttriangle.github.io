(function () {
    'use strict';
    angular.module('gt-tri').controller('LoginCtrl', ['$scope', '$state', 'authSvc', 'toaster', LoginCtrl]);

    function LoginCtrl($scope, $state, authSvc, toaster) {
        var vm = $scope.vm || {};
        $scope.vm = vm;
        vm.errors = [];

        $scope.loginCreds = {
            email: null,
            password: null
        };

        $scope.registerCreds = {
            email: null,
            password: null,
            name: null
        };

        vm.login = function() {
            if (!!$scope.loginCreds.email && !!$scope.loginCreds.password) {
                authSvc.loginUser($scope.email, $scope.password).then(function () {
                    toaster.pop('success', null, 'Logged In!');
                    $state.go('Home');
                }, function (error) {
                    vm.errors.push(error);
                    toaster.pop('failure', null, 'Login Unsuccessful!');
                });
            }
        }

        vm.register = function() {
            if (!!$scope.registerCreds.name && !!$scope.registerCreds.email && !!$scope.registerCreds.password) {
                authSvc.createUser($scope.name, $scope.email, $scope.password).then(function () {
                    toaster.pop('success', null, 'User registered!');
                    $state.go('Home')
                }, function (error) {
                    vm.errors.push(error);
                });
            }
        }

        vm.cancel = function() {
            $scope.loginCreds = {
                email: null,
                password: null
            };

            $scope.registerCreds = {
                email: null,
                password: null,
                name: null
            };
        }
    };
})();
