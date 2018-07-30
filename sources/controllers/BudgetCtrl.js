(function () {
    'use strict';
    angular.module('gt-tri').controller('BudgetCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$uibModal', '$firebaseObject', 'deleteModalSvc', BudgetCtrl]);
    function BudgetCtrl($scope, $state, authSvc, firebase, $uibModal, $firebaseObject, deleteModalSvc) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        if (['alumni', 'candidate', 'brother', 'chair', 'officer', 'financial officer', 'admin'].indexOf(authSvc.permission()) === -1) {
            $state.go('Home');
        }

        $scope.$on('permissionChange', function (event, newPermission) {
            if (['financial officer', 'admin'].indexOf(authSvc.permission()) !== -1) {
                delete vm.addDepartment;
                delete vm.editDepartment;
                delete vm.deleteDepartment;
                delete vm.addSource;
                delete vm.editSource;
                delete vm.deleteSource;
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
                deleteModalSvc.showModal().then(function (result) {
                    if (result) {
                        delete vm.departments[guid];
                    }
                });
            }

            vm.addSource = function (srcDict) {

            }

            vm.editSource = function (srcDict, guid) {

            }

            vm.deleteSource = function (srcDict, guid) {
                deleteModalSvc.showModal().then(function (result) {
                    if (result) {
                        delete srcDict[guid];
                    }
                });
            }
        }
    }
})();
