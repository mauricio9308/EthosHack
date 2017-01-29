/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('AddReferenceDialogController', AddReferenceDialogController);

    // Inject
    AddReferenceDialogController.$inject = ['$scope', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the home view of the application
     * */
    function AddReferenceDialogController($scope, $mdDialog, $firebaseArray) {

        // Init of the reference of the source dialog
        $scope.ref = {};
        $scope.source = undefined;

        /**
         * Closes the dialog
         * */
        $scope.create = function() {
            // Definition of the item and save to firebase



            $mdDialog.hide();
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
            $scope.sources = $firebaseArray( firebaseDB.ref('fuente') );
        }

        // We call the loading in the main page
        loadData();

    }

}());