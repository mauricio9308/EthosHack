/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){
    'use strict';

    angular.module('ethos')
        .factory('CurrentSessionService', CurrentSessionService);

    //Adding the dependencies
    CurrentSessionService.$inject = ['$sessionStorage'];

    /**
     * Handler for the current session information
     * */
    function CurrentSessionService( $sessionStorage){

        //Public API
        return{
            isUserLoggedIn : isUserLoggedIn,
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
        function setUserInformation( applicationToken,name, email, roles ){

            /* setting the information to be saved */
            var userInformationReference = {
                applicationToken : applicationToken,
                name : name,
                email : email
            };

            // Saving the user information
            $sessionStorage.userInformation = JSON.stringify( userInformationReference );
        }
    }

}());
