(function () {
    'use strict';
    angular.module('gt-tri').controller('BudgetsCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseObject', 'deleteModalSvc', BudgetsCtrl]);
    function BudgetsCtrl($scope, $state, authSvc, firebase, $firebaseObject, deleteModalSvc) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        var genGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        if (['alumni', 'candidate', 'brother', 'chair', 'officer', 'financial officer', 'admin'].indexOf(authSvc.permission()) === -1) {
            $state.go('Home');
        }

        var editTools = function () {
            vm.addBudget = function () {
                vm.tempBudget = {
                    name: null,
                    guid: genGuid()
                }
            }

            vm.editBudget = function (guid) {
                vm.tempBudget = $scope.budgets[guid];
            }

            vm.completeBudget = function () {
                $scope.budgets[vm.tempBudget.guid] = vm.tempBudget;
                delete vm.tempBudget;
            }

            vm.deleteBudget = function (guid) {
                deleteModalSvc.showModal().then(function (result) {
                    if (result) {
                        delete $scope.budgets[guid];
                    }
                });
            }
        }

        editTools();

        vm.openBudget = function (guid) {
            $state.go('Budget', { guid: guid })
        }

        $scope.$on('permissionChange', function (event, newPermission) {
            if (['financial officer', 'admin'].indexOf(newPermission) === -1) {
                delete vm.addBudget;
                delete vm.editBudget;
                delete vm.completeBudget;
                delete vm.deleteBudget;
            } else {
                editTools()
            }
        })

        $firebaseObject(firebase.database().ref().child('Budgets')).$bindTo($scope, 'budgets')
    }
})();
