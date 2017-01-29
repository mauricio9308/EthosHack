/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SelectReferenceController', SelectReferenceController);

    // Inject
    SelectReferenceController.$inject = ['$scope', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the home view of the application
     * */
    function SelectReferenceController($scope, $mdDialog, $firebaseArray) {

        /**
         * Closes the dialog
         * */
        $scope.onSelectReference = function( reference ) {
            // We select one item to the reference
            $mdDialog.hide( reference );
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
            $scope.references = $firebaseArray( firebaseDB.ref('referencia') );
        }

        // We call the loading in the main page
        loadData();

    }

}());