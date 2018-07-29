(function () {
    'useStrict';
    angular.module('gt-tri').service('deleteModalSvc', ['$uibModal', deleteModalSvc]);
    function deleteModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: false,     // do not allow dismiss with Esc key
            templateUrl: '/sources/modals/deleteModalView.html'
        };

        this.showModal = function (modalData) {
            return this.show(modalData);
        }

        this.show = function (modalData) {
            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($scope, $uibModalInstance) {
            var vm = $scope.vm || {};
            $scope.vm = vm;

            vm.delete = function () {
                $uibModalInstance.close(true);
            }

            vm.cancel = function () {
                $uibModalInstance.close(false);
            }
        }
    }
})();
