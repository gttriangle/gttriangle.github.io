(function () {
    'use strict';
    angular.module('gt-tri').service('transactionModalSvc', ['$uibModal', transactionModalSvc]);
    function transactionModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: false,     // do not allow dismiss with Esc key
            size: 'lg',
            templateUrl: '/sources/modals/transactionModalView.html'
        };

        var transaction;
        var type;
        this.showModal = function (modalData) {
            if (!modalData) {
                modalData = {
                    type: "Add",
                    transaction: {
                        to: null,
                        toAccounts: true,
                        from: null,
                        fromAccounts: true,
                        date: new Date(),
                        amount: null,
                        memo: null
                    }
                }
            } else {
                modalData.type = "Edit";
            }
            return this.show(modalData);
        };

        this.show = function (modalData) {
            type = modalData.type;
            transaction = angular.copy(modalData.transaction);
            transaction.date = new Date(transaction.date);
            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance', 'toaster', 'firebase', '$firebaseObject'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($scope, $uibModalInstance, toaster, firebase, $firebaseObject) {
            var vm = {};
            $scope.vm = vm;
            vm.transaction = transaction;
            vm.type = type;
            vm.accounts = [];

            var promise = $firebaseObject(firebase.database().ref().child('Users')).$loaded(function (result) {
                vm.accounts.push('Triangle at GT');
                for (var key in result) {
                    if (key[0] !== '$' && typeof result[key] !== 'function') {
                        vm.accounts.push(result[key].name);
                    }
                }
            });

            vm.complete = function () {
                if (vm.transaction.to == null || vm.transaction.from == null || vm.transaction.amount == null || vm.transaction.date == null) {
                    toaster.pop('error', null, "Only memo may be blank");
                } else {
                    vm.transaction.date = vm.transaction.date.toLocaleDateString("en-US");
                    $uibModalInstance.close(vm.transaction);
                }
            }
            vm.cancel = function () {
                $uibModalInstance.close();
            }
        }
    }
})();
