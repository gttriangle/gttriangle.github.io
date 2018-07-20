(function () {
    'use strict';
    angular.module('gt-tri').factory('authSvc', ['$q', 'firebase', '$firebaseObject', '$firebaseArray', '$scope', authSvc]);
    function authSvc($q, firebase, $firebaseObject, $firebaseArray, $scope) {
        var loggedInUser = {
            email: null;
            name: null,
            permission: 'unregistered'
        }
        var loggedIn = false;
        var dict = $firebaseObject(firebase.database().ref().child('Users'));
        dict.$bindTo($scope, "allUsers")

        var loginUser = function(email, password) {
            var defer = $q.defer();
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
                loggedInUser.email = $scope.allUsers[result.user.uid].email;
                loggedInUser.name = $scope.allUsers[result.user.uid].name;
                loggedInUser.permission = $scope.allUsers[result.user.uid].permission;
                loggedIn = true;
                defer.resolve();
            }, function (error) {
                defer.reject(error)
            })
            return defer;
        }

        var logoutUser = function() {
            firebase.auth().signOUt().then(function () {
                loggedInUser = {
                    email: null,
                    name: null,
                    permission: 'unregistered'
                }
                loggedIn = false;
            });
        }

        var createUser = function(name, email, password) {
            var defer = $q.defer();
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                $scope.allUsers[result.user.uid] = {
                    email: result.user.email,
                    name: name,
                    permission: 'unregistered'
                }
                loginUser(email, password).then(function () {
                    defer.resolve('Success');
                });
            }, function (error) {
                defer.reject(error);
            });
            return defer;
        }

        return {
            loggedIn: loggedIn,
            loginUser: loginUser,
            createUser: createUser,
            permission: permission
        }
    }
})();
