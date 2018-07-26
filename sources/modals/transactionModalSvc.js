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
                        from: null,
                        date: null,
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

            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$rootScope', '$scope', '$uibModalInstance', 'toaster'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($rootScope, $scope, $uibModalInstance, toaster) {
            var vm = {};
            $scope.vm = vm;
            vm.transaction = transaction;
            vm.type = type;

            vm.complete = function () {
                if (vm.transaction.to == null || vm.transaction.from == null || vm.transaction.amount == null || vm.transaction.date == null) {
                    toaster.pop('error', null, "Only memo may be blank");
                } else {
                    $uibModalInstance.close(vm.transaction);
                }
            }
            vm.cancel = function () {
                $uibModalInstance.close();
            }
        }
    }
})();
