(function () {
    'use strict';
    angular.module('gt-tri').controller('EventDiagnosticsCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseArray', 'eventModalSvc', EventDiagnosticsCtrl]);
    function EventDiagnosticsCtrl($scope, $state, authSvc, firebase, $firebaseArray, eventModalSvc) {
        $scope.permission = authSvc.permission();
        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) == -1) {
            $state.go('Home');
        }

        var vm = $scope.vm || {}
        $scope.vm = vm;
        var promise = $firebaseArray(firebase.database().ref().child('Events')).$loaded($scope, 'anEvent');
        promise.then(function (result) {
            vm.events = result.sort(function (a,b) { return a.date > b.date; });
        });

        vm.sortedBy = 'date';

        $scope.sortByDate = function () {
            if (vm.sortedBy === 'date') {
                vm.sortedBy = 'date-reverse';
                return vm.events.reverse();
            } else {
                vm.sortedBy = 'date';
                vm.events.sort(function (a,b) { return a.date > b.date; });
            }
        }

        $scope.sortByName = function () {
            if (vm.sortedBy === 'name') {
                vm.sortedBy = 'name-reverse';
                return vm.events.reverse();
            } else {
                vm.sortedBy = 'name';
                vm.events.sort(function (a,b) { return a.name > b.name; });
            }
        }

        $scope.sortByType = function () {
            if (vm.sortedBy === 'type') {
                vm.sortedBy = 'type-reverse';
                return vm.events.reverse();
            } else {
                vm.sortedBy = 'type';
                vm.events.sort(function (a,b) { return a.eventType > b.eventType; });
            }
        }

        $scope.checkIfDone = function (event) {
            if (event == null) {
                return false;
            }

            var now = new Date();

            if ((now > event.date) && (event.name == null || event.date == null || event.eventType == null || event.estAttendance == null
                || event.lead == null || event.moneySpent == null || event.structure == null || event.happiness == null || event.attendance == null)) {
                return false;
            } else if (!(now > event.date) && (event.name == null || event.date == null || event.eventType == null || event.estAttendance == null
                || event.lead == null || event.moneySpent == null || event.structure == null)) {
                return false;
            } else {
                return true
            }
        };

        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) != -1) {
            vm.addEvent = function () {
                eventModalSvc.showModal().then(function (result) {
                    vm.events.$add(result);
                });
            }

            vm.editEvent = function (id) {
                var idx = vm.events.$indexFor(id);
                eventModalSvc.showModal({ eventInfo: vm.events[idx] }).then(function (result) {
                    if (!!result) {
                        vm.events[idx] = result;
                        vm.events.$save(idx);
                    }
                });
            }

            vm.deleteEvent = function (id) {
                var idx = vm.events.$indexFor(id);
                vm.events.$remove(vm.events[idx]);
            }
        }
    }
})();
