/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){
    'use strict';

    angular.module('ethos')
        .factory('CurrentSessionService', CurrentSessionService);

    //Adding the dependencies
    CurrentSessionService.$inject = ['$sessionStorage', '$rootScope'];

    /**
     * Handler for the current session information
     * */
    function CurrentSessionService( $sessionStorage, $rootScope ){

        //Public API
        return{
            isUserLoggedIn : isUserLoggedIn,
            closeSession: closeSession,
            setUserInformation : setUserInformation,
            getUserInformation : getUserInformation
        };

        /**
         * Returns true if there's a session currently active in the client
         * */
        function isUserLoggedIn(){
            return ( getUserInformation() ? true : false );
        }

        /**
         * Method for the session close
         * */
        function closeSession(){
            // We remove the session storage
            $sessionStorage.$reset();

            // We propagate the reference of the user
            $rootScope.$broadcast('UserAuthenticationChanged', false);
        }

        /**
         * Obtains the logged in user information
         * */
        function getUserInformation(){
            /* we obtain the user information */
            var userInfo = $sessionStorage.userInformation;

            //Returning the user information
            return ( userInfo ? JSON.parse( userInfo ) : null );
        }

        /**
         * Saves the current user information
         * */
        function setUserInformation( displayName, email, photoURL, uid, accessToken ){

            /* setting the information to be saved */
            var userInformationReference = {
                displayName : displayName,
                email : email,
                photoURL : photoURL,
                uid: uid,
                accessToken: accessToken
            };

            // Saving the user information
            $sessionStorage.userInformation = JSON.stringify( userInformationReference );
        }
    }

}());
