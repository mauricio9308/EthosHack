/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){

    angular.module('ethos').controller('LoginController', LoginController);

    LoginController.$inject=['$scope','GoogleLoginService'];

    /**
     * Controller for the home view of the application
     * */
    function LoginController($scope, GoogleLoginService){

        /**
         * Callback for the login of the users
         * */
        $scope.onGoogleLogin = function(){
            GoogleLoginService.googleLogin();
        };


    }

}());