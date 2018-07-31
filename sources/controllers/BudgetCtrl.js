(function () {
    'use strict';
    angular.module('gt-tri').controller('BudgetCtrl', ['$scope', '$state', '$stateParams', 'authSvc', 'firebase', '$uibModal', '$firebaseObject', 'deleteModalSvc', 'lineItemModalSvc', BudgetCtrl]);
    function BudgetCtrl($scope, $state, $stateParams, authSvc, firebase, $uibModal, $firebaseObject, deleteModalSvc, lineItemModalSvc) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        if (['alumni', 'candidate', 'brother', 'chair', 'officer', 'financial officer', 'admin'].indexOf(authSvc.permission()) === -1) {
            $state.go('Home');
        }

        var genGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        var watchSourceFcn = function (newValue) {
            vm.sources = [];
            vm.sourceSum = 0;
            for (var guid in newValue) {
                if (guid[0] !== '$') {
                    vm.sources.push({
                        name: newValue[guid].name,
                        amount: newValue[guid].amount,
                        guid: guid
                    });
                    vm.sourceSum += parseInt(newValue[guid].amount);
                }
            }
        }

        var watchDepartmentFcn = function (newValue) {
            vm.departments = [];
            vm.expenseSum = 0;
            for (var dGuid in newValue) {
                if (dGuid[0] !== '$') {
                    var lineItems = [];
                    for (var liGuid in newValue[dGuid].lineItems) {
                        if (liGuid[0] !== '$') {
                            lineItems.push({
                                name: newValue[dGuid].lineItems[liGuid].name,
                                amount: newValue[dGuid].lineItems[liGuid].amount,
                                guid: liGuid
                            });
                            vm.expenseSum += parseInt(newValue[dGuid].lineItems[liGuid].amount);
                        }
                    }
                    vm.departments.push({
                        name: newValue[dGuid].name,
                        lineItems: lineItems,
                        guid: dGuid
                    });
                }
            }
        }

        var editControls = function () {
            vm.addDepartment = function () {
                vm.tempDepartment = {
                    guid: genGuid(),
                    name: null,
                    lineItems: {}
                }
            }

            vm.editDepartment = function (guid) {
                vm.tempDepartment = $scope.departments[guid];
                vm.tempDepartment.guid = guid;
            }

            vm.completeDepartment = function () {
                $scope.departments[vm.tempDepartment.guid] = {
                    name: vm.tempDepartment.name,
                    lineItems: vm.tempDepartment.lineItems
                }
                delete vm.tempDepartment;
                watchDepartmentFcn($scope.departments);
            }

            vm.deleteDepartment = function (guid) {
                deleteModalSvc.showModal().then(function (result) {
                    if (result) {
                        delete $scope.departments[guid];
                        watchDepartmentFcn($scope.departments);
                    }
                });
            }

            vm.addSource = function (srcDictGuid) {
                if (!srcDictGuid) {
                    lineItemModalSvc.showModal({}).then(function (result) {
                        if (!!result) {
                            $scope.sources = $scope.sources || {};
                            $scope.sources[genGuid()] = result;
                            watchSourceFcn($scope.sources);
                        }
                    });
                } else {
                    lineItemModalSvc.showModal({}).then(function (result) {
                        if (!!result) {
                            $scope.departments[srcDictGuid] = $scope.departments[srcDictGuid] || {};
                            $scope.departments[srcDictGuid].lineItems = $scope.departments[srcDictGuid].lineItems || {};
                            $scope.departments[srcDictGuid].lineItems[genGuid()] = result;
                            watchDepartmentFcn($scope.departments);
                        }
                    });
                }
            }

            vm.editSource = function (guid, srcDictGuid) {
                if (!srcDictGuid) {
                    lineItemModalSvc.showModal({ lineItem: $scope.sources[guid] }).then(function (result) {
                        if (!!result) {
                            $scope.sources[guid] = result;
                            watchSourceFcn($scope.sources);
                        }
                    });
                } else {
                    lineItemModalSvc.showModal({ lineItem: $scope.departments[srcDictGuid].lineItems[guid] }).then(function (result) {
                        if (!!result) {
                            $scope.departments[srcDictGuid].lineItems[guid] = result;
                            watchDepartmentFcn($scope.departments);
                        }
                    });
                }
            }

            vm.deleteSource = function (guid, srcDictGuid) {
                if (!srcDictGuid) {
                    deleteModalSvc.showModal().then(function (result) {
                        if (result) {
                            delete $scope.sources[guid];
                            watchSourceFcn($scope.sources);
                        }
                    });
                } else {
                    deleteModalSvc.showModal().then(function (result) {
                        if (result) {
                            delete $scope.departments[srcDictGuid].lineItems[guid];
                            watchDepartmentFcn($scope.departments);
                        }
                    });
                }
            }
        }

        $scope.$on('permissionChange', function (event, newPermission) {
            if (['financial officer', 'admin'].indexOf(authSvc.permission()) !== -1) {
                delete vm.addDepartment;
                delete vm.editDepartment;
                delete vm.completeDepartment;
                delete vm.deleteDepartment;
                delete vm.addSource;
                delete vm.editSource;
                delete vm.deleteSource;
            } else {
                editControls();
            }
        })

        vm.isSortedDepartment = false;
        vm.sortDepartment = function () {
            if (vm.isSortedDepartment) {
                vm.departments.reverse();
            } else {
                vm.departments.sort(function (a,b) { return a.name - b.name; });
                vm.isSortedDepartment = true;
            }
        }

        $firebaseObject(firebase.database().ref().child('Budget').child($stateParams.guid).child('Sources')).$bindTo($scope, 'sources').then(function () {
            $scope.sources = $scope.sources || {};
            watchSourceFcn($scope.sources);
        });
        $firebaseObject(firebase.database().ref().child('Budget').child($stateParams.guid).child('Departments')).$bindTo($scope, 'departments').then(function () {
            for (var guid in $scope.departments) {
                if (guid[0] !== '$') {
                    $scope.departments[guid].lineItems = $scope.departments[guid].lineItems || {};
                }
            }
            watchDepartmentFcn($scope.departments);
        });

        if (['financial officer', 'admin'].indexOf(authSvc.permission()) !== -1) {
            editControls();
        }
    }
})();
