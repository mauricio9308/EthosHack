/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){

    angular.module('ethos').controller('HeaderController', HeaderController);

    // Injecting the services
    HeaderController.$inject = [ '$scope', '$rootScope', 'CurrentSessionService', '$state'];

    /**
     * Controller for the home view of the application
     * */
    function HeaderController( $scope, $rootScope, CurrentSessionService, $state ){

        // Setting the logged
        $scope.isLoggedIn = CurrentSessionService.isUserLoggedIn();
        console.log('is user logged:' + $scope.isLoggedIn );

        // Object of the current session
        $scope.user = CurrentSessionService.getUserInformation();

        /**
         * Callback for the close of the session
         * */
        $scope.closeSession = function(){
            // We close the session
            CurrentSessionService.closeSession();

            // We go to the landing page
            $state.go('landing');
        };

        /* broadcast the user update */
        $rootScope.$on('UserAuthenticationChanged', function( ev, isLoggedIn ){
            // Setting the value for the logged in value
            $scope.isLoggedIn = isLoggedIn;
        });
    }

}());