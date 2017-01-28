/**
 * Created by Mauricio Lara on 1/28/17.
 */

(function () {
    'use strict';

    angular.module('ethos').factory('GoogleLoginService', GoogleLoginService);

    //Declaration of the factory
    GoogleLoginService.$inject = ['$q', '$localStorage', '$firebaseAuth', '$rootScope'];
    /**
     * Service in charge of the Google Login Management
     * */
    function GoogleLoginService($q, $localStorage, $firebaseAuth, $rootScope) {
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
                    $localStorage.accessToken = authData.credential.accessToken;

                    //We store the user information
                    $localStorage.user = {
                        displayName: authData.user.displayName,
                        email: authData.user.email,
                        photoURL: authData.user.photoURL,
                        uid: authData.user.uid
                    };

                    var ref = firebase.database().ref('/users/' + $localStorage.user.uid);
                    ref.on("value", function(snapshot) {
                        var values = {};
                        if (snapshot.val() != null) {
                            values = snapshot.val();
                        }

                        values.displayName = $localStorage.user.displayName;
                        values.email = $localStorage.user.email;
                        values.photoURL = $localStorage.user.photoURL;

                        firebase.database().ref("/users/" + $localStorage.user.uid).set(values);

                        /* broadcast the user update */
                        $rootScope.$emit('UserAuthenticationChanged');

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