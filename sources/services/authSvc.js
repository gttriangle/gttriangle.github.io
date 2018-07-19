(function () {
    'use strict';
    angular.module('gt-tri').factory('authSvc', ['$q', 'firebase', '$firebaseObject', '$firebaseArray', '$scope', authSvc]);
    function authSvc($q, firebase, $firebaseObject, $firebaseArray, $scope) {
        var permission = 'unregistered';
        var dict = $firebaseObject(firebase.database().ref().child('Users'));
        dict.$bindTo($scope, "allUsers")

        var loginUser = function(email, password) {
            var defer = $q.defer();
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
                permission = $scope.allUsers[result.user.uid].permission;
                defer.resolve();
            }, function (error) {
                defer.reject(error)
            })
            return defer;
        }

        var createUser = function(name, email, password) {
            var defer = $q.defer();
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                $scope.allUsers[result.user.uid] = {
                    email: result.user.email,
                    name: name,
                    permission: 'unregistered'
                }
                defer.resolve('Success');
            }, function (error) {
                defer.reject(error);
            });
            return defer;
        }

        return {
            loginUser: loginUser,
            createUser: createUser,
            permission: permission
        }
    }
})();
