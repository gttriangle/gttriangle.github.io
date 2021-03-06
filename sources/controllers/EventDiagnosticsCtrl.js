(function () {
    'use strict';
    angular.module('gt-tri').controller('EventDiagnosticsCtrl', ['$scope', '$state', 'authSvc', 'firebase', '$firebaseArray', 'eventModalSvc', 'deleteModalSvc', '$window', EventDiagnosticsCtrl]);
    function EventDiagnosticsCtrl($scope, $state, authSvc, firebase, $firebaseArray, eventModalSvc, deleteModalSvc, $window) {
        $scope.permission = authSvc.permission();
        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) == -1) {
            $state.go('Home');
        }

        var vm = $scope.vm || {}
        $scope.vm = vm;
        var promise = $firebaseArray(firebase.database().ref().child('Events')).$loaded($scope, 'anEvent');
        promise.then(function (result) {
            vm.events = result.sort(function (a,b) { return a.date > b.date; });
            for (var i = 0; i < vm.events.length; i++) {
                vm.events[i].date = new Date(vm.events[i].date);
                vm.events[i].date.setHours(0,0,0,0);
            }
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

        $scope.checkIfFormCompleted = function (event) {
            if (event == null) {
                return false;
            }

            var now = new Date();
            now.setHours(0,0,0,0);

            if ((now >= event.date) && (event.name == null || event.date == null || event.eventType == null || event.estAttendance == null || event.lead == null || event.moneySpent == null || event.structure == null ||
                typeof event.happiness === 'undefined' || typeof event.attendance === 'undefined' ||  event.happiness == null || event.attendance == null)) {
                return false;
            } else if ((now < event.date) && (event.name == null || event.date == null || event.eventType == null || event.estAttendance == null || event.lead == null || event.moneySpent == null || event.structure == null)) {
                return false;
            } else {
                return true
            }
        };

        if (['chair', 'officer', 'financial officer', 'admin'].indexOf($scope.permission) != -1) {
            vm.addEvent = function () {
                eventModalSvc.showModal().then(function (result) {
                    vm.events.$add(result);
                    $window.location.reload();
                });
            }

            vm.editEvent = function (id) {
                var idx = vm.events.$indexFor(id);
                eventModalSvc.showModal({ eventInfo: vm.events[idx] }).then(function (result) {
                    if (!!result) {
                        vm.events[idx] = result;
                        vm.events.$save(idx);
                        $window.location.reload();
                    }
                });
            }

            vm.deleteEvent = function (id) {
                deleteModalSvc.showModal().then(function (response) {
                    if (response) {
                        var idx = vm.events.$indexFor(id);
                        vm.events.$remove(vm.events[idx]);
                        $window.location.reload();
                    }
                });
            }
        }
    }
})();
