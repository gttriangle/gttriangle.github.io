(function () {
    'use strict';
    angular.module('gt-tri').factory('authSvc', ['$q', 'firebase', '$firebaseObject', '$firebaseArray', authSvc]);
    function authSvc($q, firebase, $firebaseObject, $firebaseArray) {
        var loggedInUser = {
            email: null,
            name: null,
            permission: 'unregistered'
        }
        var loggedIn = false;
        var allUsers;
        var promise = $firebaseObject(firebase.database().ref().child('Users')).$loaded();
        promise.then(function (result) {
            allUsers = result;
        })

        var getError = function (error) {
            switch (error.message) {
                case 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.':
                    return 'Email cannot be empty';
                break;
                default:
                    console.log(error.message);
                    return error.message
            }
        }

        var loginUser = function (email, password) {
            var defer = $q.defer();
            try {
                firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
                    loggedInUser.email = allUsers[result.user.uid].email;
                    loggedInUser.name = allUsers[result.user.uid].name;
                    loggedInUser.permission = allUsers[result.user.uid].permission;
                    loggedIn = true;
                    defer.resolve();
                })
            } catch (e) {
                defer.reject(getError(e));
            }
            return defer.promise;
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
                }, function (error) {
                    defer.reject(error);
                });
            } catch (e) {
                defer.reject(getError(e));
            }
            return defer.promise;
        }

        return {
            loggedIn: loggedIn,
            loginUser: loginUser,
            loggedInUser: loggedInUser,
            createUser: createUser,
        }
    }
})();
