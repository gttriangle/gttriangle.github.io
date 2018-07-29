(function () {
    'use strict';
    angular.module('gt-tri').controller('BudgetCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseObject', BudgetCtrl]);
    function BudgetCtrl($scope, $state, authSvc, firebase, $firebaseObject) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        if (['alumni', 'candidate', 'brother', 'chair', 'officer', 'financial officer', 'admin'].indexOf(authSvc.permission()) === -1) {
            $state.go('Home');
        }

        $scope.$on('permissionChange', function (event, newPermission) {
            if (['financial officer', 'admin'].indexOf(authSvc.permission()) !== -1) {

            } else {

            }
        })

        var genGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        $firebaseObject(firebase.database().ref().child('Budget').child('Sources')).$bindTo($scope, 'sources');
        $firebaseObject(firebase.database().ref().child('Budget').child('Sources')).$bindTo($scope, 'departments');

        if (['financial officer', 'admin'].indexOf(authSvc.permission()) !== -1) {
            vm.addDepartment = function () {

            }

            vm.editDepartment = function (guid) {

            }

            vm.deleteDepartment = function (guid) {

            }

            vm.addSource = function (srcDict) {

            }

            vm.editSource = function (srcDict, guid) {

            }

            vm.deleteSource = function (srcDict, guid) {

            }
        }
    }
})();
