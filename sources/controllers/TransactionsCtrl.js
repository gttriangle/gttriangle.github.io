(function () {
    'use strict';
    angular.module('gt-tri').controller('TransactionsCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseArray', 'transactionModalSvc', TransactionsCtrl]);
    function TransactionsCtrl($scope, $state, authSvc, firebase, $firebaseArray, transactionModalSvc) {
        $scope.permission = authSvc.permission();
        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) == -1) {
            $state.go('Home');
        }
        var vm = $scope.vm || {}
        $scope.vm = vm;
        var promise = $firebaseArray(firebase.database().ref().child('Transactions')).$loaded($scope, 'transactions');
        promise.then(function (result) {
            vm.transactions = result.sort(function (a, b) { return a.date > b.date; });
        });

        vm.sortedBy = 'date';

        $scope.sortByDate = function () {
            if (vm.sortedBy == 'date') {
                vm.transactions.reverse();
            } else {
                vm.transactions.sort(function (a, b) { return a.date > b.date; });
                vm.sortedBy = 'date';
            }
        }

        $scope.sortByMemo = function () {
            if (vm.sortedBy == 'memo') {
                vm.transactions.reverse()
            } else {
                vm.transactions.sort(function (a, b) { return a.memo > b.memo; });
                vm.sortedBy = 'memo';
            }
        }

        $scope.sortByFrom = function () {
            if (vm.sortedBy == 'from') {
                vm.transactions.reverse()
            } else {
                vm.transactions.sort(function (a, b) { return a.from > b.from; });
                vm.sortedBy = 'from';
            }
        }

        $scope.sortByTo = function () {
            if (vm.sortedBy == 'to') {
                vm.transactions.reverse()
            } else {
                vm.transactions.sort(function (a, b) { return a.to > b.to; });
                vm.sortedBy = 'to';
            }
        }

        $scope.sortByAmount = function () {
            if (vm.sortedBy == 'amount') {
                vm.transactions.reverse()
            } else {
                vm.transactions.sort(function (a, b) { return a.amount > b.amount; });
                vm.sortedBy = 'amount';
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
        }
    }
})();
