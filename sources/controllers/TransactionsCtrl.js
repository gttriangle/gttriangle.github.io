(function () {
    'use strict';
    angular.module('gt-tri').controller('TransactionsCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseArray', 'transactionModalSvc', TransactionsCtrl]);
    function TransactionsCtrl($scope, $state, authSvc, firebase, $firebaseArray, transactionModalSvc) {
        $scope.permission = authSvc.permission();
        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) == -1) {
            $state.go('Home');
        }
        $scope.$on('permissionChange', function (event, newPermission) {
            $scope.permission = newPermission;
            if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) == -1) {
                $state.go('Home');
            }

            if (['financial officer', 'admin'].indexOf($scope.permission == -1)) {
                delete vm.addTransaction;
                delete vm.editTransaction;
                delete vm.deleteTransaction;
            } else {
                vm.addTransaction = function () {
                    transactionModalSvc.showModal().then(function (result) {
                        vm.transactions.$add(result);
                    });
                }

                vm.editTransaction = function (id) {
                    var idx = vm.transactions.$indexFor(id);
                    transactionModalSvc.showModal({ transaction: vm.transactions[idx] }).then(function (result) {
                        if (!!result) {
                            vm.transactions[idx] = result;
                            vm.transactions.$save(idx);
                        }
                    });
                }

                vm.deleteTransaction = function (id) {
                    var idx = vm.transactions.$indexFor(id);
                    vm.transactions.$remove(idx);
                }
            }
        })

        var vm = $scope.vm || {}
        $scope.vm = vm;
        var promise = $firebaseArray(firebase.database().ref().child('Transactions')).$loaded();
        promise.then(function (result) {
            vm.transactions = result.sort(function (a, b) { return a.date > b.date; });
        });

        vm.sortedBy = 'date';
        vm.up = true;

        $scope.sortByDate = function () {
            if (vm.sortedBy == 'date') {
                vm.transactions.reverse();
                vm.up = !vm.up;
            } else {
                vm.transactions.sort(function (a, b) { return a.date > b.date; });
                vm.sortedBy = 'date';
                vm.up = true;
            }
        }

        $scope.sortByMemo = function () {
            if (vm.sortedBy == 'memo') {
                vm.transactions.reverse();
                vm.up = !vm.up;
            } else {
                vm.transactions.sort(function (a, b) { return a.memo > b.memo; });
                vm.sortedBy = 'memo';
                vm.up = true;
            }
        }

        $scope.sortByFrom = function () {
            if (vm.sortedBy == 'from') {
                vm.transactions.reverse();
                vm.up = !vm.up;
            } else {
                vm.transactions.sort(function (a, b) { return a.from > b.from; });
                vm.sortedBy = 'from';
                vm.up = true;
            }
        }

        $scope.sortByTo = function () {
            if (vm.sortedBy == 'to') {
                vm.transactions.reverse();
                vm.up = !vm.up;
            } else {
                vm.transactions.sort(function (a, b) { return a.to > b.to; });
                vm.sortedBy = 'to';
                vm.up = true;
            }
        }

        $scope.sortByAmount = function () {
            if (vm.sortedBy == 'amount') {
                vm.transactions.reverse()
                vm.up = !vm.up;
            } else {
                vm.transactions.sort(function (a, b) { return a.amount > b.amount; });
                vm.sortedBy = 'amount';
                vm.up = true;
            }
        }

        if (['financial officer', 'admin'].indexOf($scope.permission) != -1) {
            vm.addTransaction = function () {
                transactionModalSvc.showModal().then(function (result) {
                    vm.transactions.$add(result);
                });
            }

            vm.editTransaction = function (id) {
                var idx = vm.transactions.$indexFor(id);
                transactionModalSvc.showModal({ transaction: vm.transactions[idx] }).then(function (result) {
                    if (!!result) {
                        vm.transactions[idx] = result;
                        vm.transactions.$save(idx);
                    }
                });
            }

            vm.deleteTransaction = function (id) {
                var idx = vm.transactions.$indexFor(id);
                vm.transactions.$remove(idx);
            }
        }
    }
})();
