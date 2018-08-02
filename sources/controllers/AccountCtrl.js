(function () {
    'use strict';
    angular.module('gt-tri').controller('AccountCtrl', ['$scope', '$state', '$stateParams', 'authSvc', 'firebase', '$firebaseArray', AccountCtrl]);
    function AccountCtrl($scope, $state, $stateParams, authSvc, firebase, $firebaseArray) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        var genGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        vm.sortByDate = function () {
            if (vm.sortedBy != 'date') {
                vm.transactions.sort(function (a, b) { return b.date - a.date; });
                vm.sortedBy = 'date';
                vm.inverted = false;
            } else {
                vm.transactions.reverse();
                vm.inverted = !vm.inverted;
            }
        }

        vm.sortByAmount = function () {
            if (vm.sortedBy != 'amount') {
                vm.transactions.sort(function (a, b) { return parseInt(b.amount) - parseInt(a.amount); });
                vm.sortedBy = 'amount';
                vm.inverted = false;
            } else {
                vm.transactions.reverse();
                vm.inverted = !vm.inverted;
            }
        }

        var updatePage = function () {
            vm.transactions = [];
            vm.total = 0;
            var user = authSvc.loggedInUser().name;
            vm.dbList.forEach(function (item) {
                if (item.fromAccounts && user == item.from) {
                    vm.transactions.push({
                        from: item.from,
                        boldFrom: true,
                        to: item.to,
                        boldTo: false,
                        amount: item.amount,
                        date: new Date(item.date),
                        memo: item.memo
                    });
                    vm.total += parseInt(item.amount);
                } else if (item.toAccounts && user == item.to) {
                    vm.transactions.push({
                        from: item.from,
                        boldFrom: false,
                        to: item.to,
                        boldTo: true,
                        amount: item.amount,
                        date: new Date(item.date),
                        memo: item.memo
                    });
                    vm.total -= parseInt(item.amount);
                }
            });
            vm.sortByDate();
        }

        var promise = $firebaseArray(firebase.database().ref().child('Transactions')).$loaded();
        promise.then(function (value) {
            vm.dbList = value;
            updatePage();
            vm.dbList.$watch(function () {
                updatePage();
            });
        });


    }
})();
