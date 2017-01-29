/**
 * Created by Mauricio Lara on 1/28/17.
 */

(function () {
    'use strict';

    angular.module('ethos').factory('GoogleLoginService', GoogleLoginService);

    //Declaration of the factory
    GoogleLoginService.$inject = ['$q', '$localStorage', '$firebaseAuth', '$rootScope', 'CurrentSessionService', '$state'];
    /**
     * Service in charge of the Google Login Management
     * */
    function GoogleLoginService($q, $localStorage, $firebaseAuth, $rootScope, CurrentSessionService, $state) {
        var fbAuth = $firebaseAuth();

        // Public API
        return {
            googleLogin: googleLogin,
            logout: logout
        };

        /**
         * Executes the google login sequence
         * */
        function googleLogin() {
            return fbAuth.$signInWithPopup("google")
                .then(function (authData) {
                    /* storing the session information  */
                    CurrentSessionService.setUserInformation(
                        authData.user.displayName,
                        authData.user.email,
                        authData.user.photoURL,
                        authData.user.uid,
                        authData.credential.accessToken
                    );

                    /* we store the reference of the user in the database */
                    var ref = firebase.database().ref('/users/' + $localStorage.user.uid);
                    ref.on("value", function(snapshot) {
                        var values = {};
                        if (snapshot.val() != null) {
                            values = snapshot.val();
                        }

                        values.displayName = authData.user.displayName;
                        values.email = authData.user.email;
                        values.photoURL = authData.user.photoURL;

                        // We save the values in firebase
                        firebase.database().ref("/users/" + authData.user.uid).set(values);

                        /* broadcast the user update */
                        $rootScope.$emit('UserAuthenticationChanged', true);

                        // We emit the state change
                        $state.go('landing');


                    }, function (errorObject) {
                        console.log("FATAL: The read failed: " + errorObject.code);
                    });
                    return authData;
                }).catch(function (error) {
                    console.log("Authentication failed:", error);
                    throw error;
                });
        }

        /**
         * Just log outs the user of the API
         * */
        function logout() {
            fbAuth.$signOut();
            var logoutDefer = $q.defer();

            /* we destroy any reference of the user */
            $localStorage.$reset();

            /* we delete any firebase reference */
            firebase.auth().signOut().then(function() {
                // Sign-out successful.

                /* broadcast the user update */
                $rootScope.$emit('UserAuthenticationChanged');

                //Resolving the promise
                logoutDefer.resolve();
            }, function(error) {

                // An error happened.
                logoutDefer.reject();
            });

            return logoutDefer.promise;
        }
    }

}());