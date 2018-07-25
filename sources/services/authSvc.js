(function () {
    'use strict';
    angular.module('gt-tri').factory('authSvc', ['$q', 'firebase', '$firebaseObject', '$firebaseArray', '$rootScope', authSvc]);
    function authSvc($q, firebase, $firebaseObject, $firebaseArray, $rootScope) {

        var allUsers;
        var promise = $firebaseObject(firebase.database().ref().child('Users')).$loaded();
        promise.then(function (result) {
            allUsers = result;
        })

        var loginUser = function (email, password) {
            var defer = $q.defer();
            try {
                firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
                    $rootScope.$broadcast('loginChange', true, allUsers[result.user.uid]);
                    defer.resolve();
                })
            } catch (e) {
                defer.reject(e);
            }
            return defer.promise;
        }

        var logoutUser = function() {
            firebase.auth().signOut().then(function () {
                $rootScope.$broadcast('loginChange', false);
                $state.go('Login');
            });
        }

        var createUser = function(name, email, password) {
            var defer = $q.defer();
            try {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                    allUsers[result.user.uid] = {
                        email: result.user.email,
                        name: name,
                        permission: 'unregistered'
                    }
                    allUsers.$save().then(function () {
                        loginUser(email, password).then(function () {
                            defer.resolve('Success');
                        });
                    });
                });
            } catch (e) {
                defer.reject(e);
            }
            return defer.promise;
        }

        var loggedInUser = function () {
            return allUsers[firebase.auth().currentUser.uid];
        }

        var loggedIn = function () {
            return !!firebase.auth().currentUser;
        }

        var permisison = function () {
            try {
                return allUsers[firebase.auth().currentUser.uid].permission;
            } catch (e) {
                return 'unregistered';
            }
        }

        return {
            loggedIn: loggedIn,
            loginUser: loginUser,
            logoutUser: logoutUser,
            loggedInUser: loggedInUser,
            createUser: createUser,
            permission: permisison
        }
    }
})();
