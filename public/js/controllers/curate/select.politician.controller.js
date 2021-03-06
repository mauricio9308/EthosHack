/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SelectPoliticianController', SelectPoliticianController);

    // Inject
    SelectPoliticianController.$inject = ['$scope', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the home view of the application
     * */
    function SelectPoliticianController($scope, $mdDialog, $firebaseArray) {

        /**
         * Closes the dialog
         * */
        $scope.onSelectPolitician = function( politician ) {
            console.log('select');
            console.log( politician );

            // We select one item to the reference
            $mdDialog.hide( politician );
        };

        /**
         * Cancels the dialog
         * */
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // We load the information of the sources
            $scope.complices = $firebaseArray( firebaseDB.ref('perfil') );
        }

        // We call the loading in the main page
        loadData();

    }

}());